---
title: 'Connecting to PostgreSQL from Next.js API Routes'
date: '2020-01-16T00:00:00.000Z'
description: |
   Here's how I manage my connection to a PostgreSQL database server from API routes in my Next.js web app.
---

Next.js is my current preferred framework for developing React-based web applications, and I'm using its [API routes](https://nextjs.org/docs/api-routes/introduction) to implement a REST API. This REST API needs to store and retrieve data to and from a PostgreSQL database, so it needs a connection to the database server. This article describes how I create and manage that database connection within the API routes.

## Caveats

Two things you should keep in mind:

I am not using [Serverless Next.js](https://nextjs.org/blog/next-8#serverless-nextjs). I doubt this article applies to that usage.

I have not tried this on a Next.js app experiencing heavy load, so I don't know how well it will scale. I'm planning to do some load testing, so when that happens I'll post an article with the results.

## Establishing a Connection

It's very easy to connect to a PostgreSQL database in a Next.js API route using the `pg-promise` Node.js module:

```
const pgp = require('pg-promise')();

// Get the values for these variables from configuration
const user = ...
const password = ...
const host = ...
const port = ...
const database = ...

const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`)
```

Then you can `await` on it in an `async` function:

```
const post = await db.one('SELECT * FROM myapp.posts WHERE id=$1', id);
```

## Avoiding Too Many Connections

A problem arises when the number of requests made to your REST API increases. The default maximum connections that PostgreSQL allows is typically 100. PostgreSQL will start rejecting requests when that limit is exceeded.

If each API route creates a new connection to the database server each time an API endpoint is called, you can quickly run out of available connections.

My solution to this is to call the `pgp()` function once to establish a database connection, and share that connection among all of the API routes. To accomplish this I moved the connection code into a separate module in `lib/db.js`, exported the `db` object from the module, and then required it in each API route that needs it.

For example:

```
// lib/db.js

const pgp = require('pg-promise')();

// Get the values for these variables from configuration
const user = ...
const password = ...
const host = ...
const port = ...
const database = ...

const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);

export default db;
```

Then use it in an API route:

```
// pages/api/posts/[id].js

const db = require('../../../lib/db');

export default async (req, res) => {
   try {
      const {query: {id}} = req;
      const post = await db.one('SELECT * FROM myapp.posts WHERE id=$1', id);
      res.status(200).json(post);
   } catch (e) {
      console.error(e);
      res.status(500).end();
   }
};
```


Because Node.js caches a module's exported values, this *should theoretically* make every API route use the same `db` connection object. I did run into a problem when running the Next.js app in development. Each time I made a change to the source code, and webpack rebuilt and hot-deployed the assets, I would get a warning:

```
WARNING: Creating a duplicate database object for the same connection.
```

To overcome this I resorted to using the Singleton pattern to re-use the database connection object.

## The Singleton Pattern

If you aren't aware of the [Singleton pattern](https://en.wikipedia.org/wiki/Singleton_pattern), it's a design pattern for restricting the number of instances of a class or type of object to 1. This is more prevalent in Object Oriented Programming, but we can use it when it's appropriate.

## Implementing a Singleton Database Connection

Here is my Singleton implementation of `lib/db.js`:

```
const pgp = require('pg-promise')();

// Get these values from configuration
const user = ...
const password = ...
const host = ...
const port = ...
const database = ...

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for("MyApp.db");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = (globalSymbols.indexOf(DB_KEY) > -1);
if (!hasDb) {
    global[DB_KEY] = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);
}

// Create and freeze the singleton object so that it has an instance property.
const singleton = {};
Object.defineProperty(singleton, "instance", {
    get: function () {
        return global[DB_KEY];
    }
});
Object.freeze(singleton);

module.exports = singleton;
```

## Using the Singleton Database Connection

Now each API route can use the one instance of the database connection simply by adding the `.instance` to the `require()` statement:

```
const db = require('../../../lib/db').instance;
```

## Conclusion

Further testing is needed to make sure there aren't any performance issues with this solution, but it appears to be working well.

Let me know in the comments if you find any errors or have suggestions for improvements.