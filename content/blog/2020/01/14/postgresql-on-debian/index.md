---
title: 'A Database for Developing my App'
date: '2020-01-14T00:00:00.000Z'
description: |
  Installing PostgreSQL 11 on LMDE (Linux Mint Debian Edition... essentially Debian 9.3 Stretch) and creating a database for developing my app.
---

I've been working on setting up a PostgreSQL database server on my development computer. I need it to support the email registration user story that I'm currently implementing.

## Installation

My development computer is running LMDE (Linux Mint Debian Edition), which is essentially Debian 9.3 (Stretch). Unfortunately Debian does not have PostgreSQL 11 available in their APT repositories, but PostgreSQL provides their own APT repository that we can use.

Add the APT repository:

```
$ sudo tee /etc/apt/sources.list.d/pgdg.list <<END
deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main
END
```

Add the key:

```
$ wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
$ sudo apt-get update
```

Install PosgreSQL 11:

```
sudo apt-get install postgresql-11

```

Uncomment the following line in `/etc/postgresql/11/main/postgresql.conf`:

```
listen_addresses = 'localhost'
```

Restart the server:

```
$ sudo systemctl restart postgresql
```

PostgreSQL should now be up and running. Test it by connecting to it using the `psql` command, and you should see something like the following:

```
$ sudo -u postgres psql
psql (11.6 (Debian 11.6-1.pgdg90+1))
Type "help" for help.

postgres=# \l
                                        List of databases
     Name      |      Owner       | Encoding |   Collate   |    Ctype    |   Access privileges   
---------------+------------------+----------+-------------+-------------+-----------------------
 postgres      | postgres         | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 template0     | postgres         | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
               |                  |          |             |             | postgres=CTc/postgres
 template1     | postgres         | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
               |                  |          |             |             | postgres=CTc/postgres
(3 rows)
```

## Database Creation

Now it's time to create a database with a `users` table so my app has a place to store user registrations.

For this use case I want a `users` table with fields for the user's email address and password.

- `email` - This is the field that uniquely identifies a user. It's almost impossible to do strict email validation by the IETF specs, so I follow the much simpler HTML5 spec, which should be sufficent for my use.

- `password` - This field will store an encrypted form of the user's password. My plan at the moment is to use `bcrypt` to encrypt the password with a random salt when they register or update it. When the user logs in I will encrypt the supplied password and compare it to the encrypted password stored in the database. More research is required on this to make sure I'm doing this in a secure way.

I put the steps to create the database in a `create-database.sql` file that looks like this:

```
\c postgres postgres

CREATE ROLE myapp_admin WITH ENCRYPTED PASSWORD '********' LOGIN;
CREATE ROLE myapp_user WITH ENCRYPTED PASSWORD '********';
GRANT myapp_admin TO postgres;
CREATE DATABASE myapp_db WITH OWNER myapp_admin;

\c myapp_db postgres

/* Create a domain that validates email according to the HTML5 spec. */

CREATE EXTENSION citext;

CREATE DOMAIN email_address AS citext
CHECK (
      VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
);

\c postgres://myapp_admin:********@localhost:5432/myapp_db;

CREATE SCHEMA myapp AUTHORIZATION myapp_admin;
GRANT USAGE ON SCHEMA myapp TO myapp_user;

/*
   When myapp_admin creates tables, sequences, or functions in the myapp schema, the default privileges on
   those objects for myapp_user should be restricted to the minimum they need to support the application's
   functionality.
*/
ALTER DEFAULT PRIVILEGES FOR ROLE myapp_admin IN SCHEMA myapp
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO myapp_user;

ALTER DEFAULT PRIVILEGES FOR ROLE myapp_admin IN SCHEMA myapp
    GRANT SELECT, USAGE ON SEQUENCES TO myapp_user;

ALTER DEFAULT PRIVILEGES FOR ROLE myapp_admin IN SCHEMA myapp
    GRANT EXECUTE ON FUNCTIONS TO myapp_user;

/* Create the tables */

DROP TABLE IF EXISTS myapp.users;
CREATE TABLE myapp.users (
       id BIGSERIAL PRIMARY KEY,
       date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
       email email_address UNIQUE NOT NULL,
       full_name TEXT,
       password TEXT
);

/* Create the indexes for faster querying */

CREATE INDEX idx_users_email
ON myapp.users(email);
```

Then I execute it using the `psql` command:

```
$ sudo -u postgres psql -f create-database.sql
```

Finally, inspect the database to make sure the script worked:

```
psql -h localhost -d myapp_db -U myapp_admin
Password for user myapp_admin: 
psql (11.6 (Debian 11.6-1.pgdg90+1))
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.

myapp_db=> \d myapp.*
     Index "myapp.idx_users_email"
 Column |     Type      | Key? | Definition 
--------+---------------+------+------------
 email  | email_address | yes  | email
btree, for table "myapp.users"

                                             Table "myapp.users"
    Column    |            Type             | Collation | Nullable |                   Default                    
--------------+-----------------------------+-----------+----------+----------------------------------------------
 id           | bigint                      |           | not null | nextval('myapp.users_id_seq'::regclass)
 date_created | timestamp without time zone |           | not null | timezone('utc'::text, now())
 email        | email_address               |           | not null | 
 password     | text                        |           | not null | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
    "idx_users_email" btree (email)

     Index "myapp.users_email_key"
 Column |     Type      | Key? | Definition 
--------+---------------+------+------------
 email  | email_address | yes  | email
unique, btree, for table "myapp.users"

                      Sequence "myapp.users_id_seq"
  Type  | Start | Minimum |       Maximum       | Increment | Cycles? | Cache 
--------+-------+---------+---------------------+-----------+---------+-------
 bigint |     1 |       1 | 9223372036854775807 |         1 | no      |     1
Owned by: myapp.users.id

    Index "myapp.users_pkey"
 Column |  Type  | Key? | Definition 
--------+--------+------+------------
 id     | bigint | yes  | id
primary key, btree, for table "myapp.users"

myapp_db=>
```

## Conclusion

This should be enough to support implementing the user story for registering with an email address and password. If you see any mistakes or have suggestions for better ways of doing things, please leave a comment below. Thanks!