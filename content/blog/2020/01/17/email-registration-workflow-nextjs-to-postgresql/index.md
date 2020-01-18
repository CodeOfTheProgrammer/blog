---
title: 'Implementing Email Registration using Next.js & PostgreSQL'
date: '2020-01-17T00:00:00.000Z'
description: |
   In this post I show how to implement website registration with email address and password using Next.js and PostgreSQL.
---
![Wireframes in Assorted Colors](./hal-gatewood-tZc3vjPCk-Q-unsplash.jpg)

In the last two posts I described [how I set up a PostgreSQL database](/2020/01/14/postgresql-on-debian) on my development computer, and [how all the API routes re-use the same database connection object](/2020/01/16/postgresql-from-nextjs-api-route). In this post I'll pull it all together by creating an HTML form and API route in Next.js that saves a user's email address and cryptographic hash of their password in the database.

## Caveats

I'm leaving out most of the validation and error handling in this article just to keep things as clear as possible. In a real implementation you would want to:

* Prevent duplicate form submission
* Validate headers (e.g. Content-Type, Accept)
* Check for missing or malformed request body
* Check for missing properties in the request body
* Validate properties in the request body (e.g. email address format)
* Handle database errors (e.g. constraint violations)

Also make sure that your web app is protected by TLS so passwords aren't being sent from the browser to your server in plain text.

There are a lot of other features that I haven't implemented yet that are needed for a reasonable user experience (e.g. email confirmation). I'll probably blog about those things when I get around to implementing them.

## React Component for the Registration Form

Implement a React component (e.g. `components/RegistrationForm.js`) that renders the registration form on a a page. Some things to note about my implementation:

* Email and password are state variables managed with the `useState` React hook
* Submitting the form calls a `handleSubmit` function that uses `fetch` to POST a JSON
body to the `/api/users` API route to create a new user 

Here is my implementation of `components/RegisterForm.js`:

```
import React, {useState} from 'react';
import fetch from 'isomorphic-unfetch';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const clearForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (response.ok) {
            clearForm();
        }
    };

    return (
        <div className='register-form'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' name='email' value={email}
                       onChange={e => setEmail(e.target.value)} />

                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' value={password}
                       onChange={e => setPassword(e.target.value)} />

                <button type='submit'>Register</button>
            </form>
            <style jsx>{`
                padding: 0.5rem;
                form {
                    display: flex;
                    flex-direction: column;
                }
                button {
                    margin-top: 1rem;
                }
            `}</style>
        </div>
    );
};

export default RegisterForm;
```

To use this component I first import it into `pages/index.js`, then use it in the JSX as `<RegisterForm />`.

## API Route to Accept Form Submission and Save to the Database

Implement an API route (e.g. `pages/api/users.js`) that accepts a JSON body with `email` and `password` properties, hashes the password using `bcrypt`, and executes an INSERT sql statement using the shared database connection. Some things to note about my implementation:

* Read [the note on choosing salt rounds](https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds) to figure out what value to use for `saltRounds`
* The API route has to check which HTTP method was used (e.g. `POST`) and react accordingly


Here is my implementation of `pages/api/users.js`:

```
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const db = require('../../lib/db').instance;

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const createUser = async (req, res) => {
    const password = await hashPassword(req.body.password);
    const user = {email: req.body.email, password};
    await db.none('INSERT INTO myapp.users(${this:name}) VALUES(${this:csv})', user);
    res.status(HttpStatus.CREATED).end();
};

export default async (req, res) => {
    try {
        switch (req.method) {
            case 'POST':
                await createUser(req, res);
                break;
            default:
                res.status(HttpStatus.METHOD_NOT_ALLOWED).end();
                break;
        }
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
};
```

## Password Hashing

Never store passwords in plain text in your database. Also never store a weak hash of them (e.g. MD5 is weak). For my application I have decided to use `bcrypt` to cryptographically hash the passwords. If you want more information read [How to Safely Store a Password](https://codahale.com/how-to-safely-store-a-password/);

## Conclusion

Let me know if anything is unclear, you find an error, or have a recommendation for an improvement in the comments.

Thanks!