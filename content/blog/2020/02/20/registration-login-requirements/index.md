---
title: 'What it Takes to Roll Your Own Registration and Authentication Implementation for Your Web App'
date: '2020-02-20T00:00:00.000Z'
description: |
    If you are considering implementing your own user registration and authentication, this article will list most of
    the things you have think about and implement.
---

## Warning

Security is hard. It's easy to get this stuff wrong! Think carefully before you decide to implement your own registration and authentication. There are paid services out there that can handle this for you, will be much faster to implement, will provide more features, and will do it more securely. I strongly recommend *against* implementing your own registration and authentication.

On the other hand, I feel like every web developer should try this at least once just to gain an appreciation and understanding for what it takes. Maybe do this once for your own toy website.

So, *proceed with caution*. It's not my fault if you f\*\*k this up.

## OWASP

If you're actually going to go through with this (are you sure you want to?!!) make sure you familiarize yourself with the [OWASP Authentication Cheat Sheet](https://owasp.org/www-project-cheat-sheets/cheatsheets/Authentication_Cheat_Sheet).

## The List

Here are the things you'll probably want to consider and/or implement for your website's registration and authentication workflow.

- TLS/SSL
- Registration Form
- Registration Form Validation
- Username and/or Email Availability REST API
- Registration REST API
- Registration REST API Validation
- Registration Request Accepted Notice
- Registration Request Failed Notice
- Database Storage
- Password Requirements
- Secure Password Storage
- Registration Confirmation Emails
- Bounced Registration Confirmation Emails
- Confirmation REST API
- Confirmation Success Notice
- Confirmation Failed Notice
- Log In Form
- Log In Form Validation
- Log In REST API
- Log In REST API Validation
- JWTs (JSON Web Tokens)
- Cookies vs Localstorage
- Restricting Routes to Authenticated Users
- User Profile REST API
- Customizing Pages for Authenticated Users
- Invalidating JWTs
- Log Out
- Password Reset Request REST API
- Password Reset Request REST API Validation
- Password Reset Request Accepted Notice
- Password Reset Request Failed Notice
- Password Reset Email
- Password Reset Form
- Password Reset Form Validation
- Password Reset REST API
- Password Reset REST API Validation
- Password Reset Success Notice
- Password Reset Failed Notice

### TLS/SSL

You must require encrypted communication between browsers and your servers.

### Registration Form

You need a place for new users to enter registration information that you'll require for your site. For example:

* Username and/or email address
* Full name
* Password

### Registration Form Validation

Give the user a chance to correct problems in the browser before submitting the registration form:

* Username and/or email address is not already being used (case-insensitive check)
* Username is valid (e.g. only uses valid characters, meets minimum and maximum length requirements)
* Email is valid (e.g. meets the HTML5 spec for email formats)
* Password meets requirements (e.g. minimum length)
* Required fields aren't empty or blank

### Username and/or Email Availability REST API

If you want to let the user know that a username or email is unavailable before submitting a login form, you'll need an
API to call from the browser to check it (e.g. when the username or email address field loses focus)

###  Registration REST API

You'll need an API to call when the user submits the registration form.

### Registration REST API Validation

You need to do the same validations in the registration REST API that you did in the form. You can't rely on form validation
to protect your application. Assume someone will try to call your REST API with invalid values.

### Registration Request Accepted Notice

Let the user know that their request was accepted, and they should receive an email confirmation from you soon. This can
be its own page.

### Registration Request Failed Notice

Let the user know that their request could not be accepted (e.g. if the database is down) with information on how to
contact you for support.

### Database Storage

You need a database to store the account information in (e.g. a relational database with a table called Accounts or Users).
An example of some of the columns you may want in your table are:

- uid - A unique ID assigned to the user when the account is created. I like using this rather than the email or username so that they can change those things later. This can be your primary key.
- date_created - An automatic date/time so you know when the account was created
- username - Case insensitive, and you can enforce format requirements 
- email - Case insensitive, and you can enforce format requirements
- Full name - Real names are complicated, so I prefer just to have a full name field
- password_hash - You'll store a cryptographic hash of the password (e.g. using bcrypt), not the password itself
- confirmation_token - Will store a random token used in the confirmation email to confirm that the user owns the email account.
- confirmed - Boolean to indicate that the user confirmed that they own the email account.
- password_reset_token - Will store a random token used in the password reset email

### Password Requirements

At least 8 characters long, allow all unicode characters, etc. The [OWASP authentication cheat sheet](https://owasp.org/www-project-cheat-sheets/cheatsheets/Authentication_Cheat_Sheet) is an excellent resource.

### Secure Password Storage

Never store passwords. Always store a secure cryptographic hash. My recommendation is to use bcrypt. [How to Safely Store a Password](https://codahale.com/how-to-safely-store-a-password/) should be mandatory reading.

When the user logs in you will hash the password they provide and compare it with the stored password hash. The bcrypt library provides this compare function for you.

### Registration Confirmation Emails

If you accept an email address you need to send an email with a link to a page that confirms the user actually owns the email address. Generate a random token and save it in the user record. When the user follows the link in the email to the page using the random token, you can verify that the token is correct, flag the account as confirmed, and remove the confirmation token from the account.

### Bounced Registration Confirmation Emails

If the confirmation email bounces you'll want to know. Your email provider may shut you down if you keep sending emails to addresses that bounce. When an email bounces, store it in a blacklist and don't send to it again.

### Confirmation REST API

You'll need an endpoint that the confirmation page calls to update the database.

### Confirmation Success Notice

When the confirmation is successful you need to let the user know they can log in. You show the notice on the confirmation page, or redirect them to another page with a confirmation success notice.

### Confirmation Failed Notice

When the confirmation fails you need to let the user know how to contact you for support. You show the notice on the confirmation page, or redirect them to another page with a confirmation failure notice.

### Log In Form

You need a form users can enter their username and/or email address and password in.

### Log In Form Validation

Make sure the fields aren't blank.

### Log In REST API

You need an API to submit the login request to. This API hashes the password and compares it to the password hash stored in the database for the user.

### Log In REST API Validation

Use the same validation that you used on the login form. Assume someone could try calling the API with invalid values.

### JWTs (JSON Web Tokens)

When the user successfully logs in, generate and return a JSON Web Token containing the uid (and possibly other information) about the user. This JWT will be stored in the browser and presented with each request. This is how routes in your website will know whether the user is logged in or not. You'll need to decide when you want the JWT to expire. Too soon and the user will have to keep logging in. Too long and a stolen JWT can be used by someone else.

### Cookies vs Localstorage

You need to protect the JWT. If it's stolen then someone else could impersonate the user. The general consensus that I've read is that localstorage is not secure. Store the JWT in a cookie (e.g. named "token").

### Restricting Routes to Authenticated Users

Check for the JWT in the "token" cookie, and verify the JWT to confirm that the user is logged in.

### User Profile REST API

You may want to show the user's name and other profile information to the user (e.g. in a profile page). You'll need an API to get this information. Make sure you only return sensitive (a.k.a. Personally Identifiable Information) information such as a birthday after you've verified the JWT. 

### Customizing Pages for Authenticated Users

Your app bar might have a log out button for logged in users, and log in and sign up buttons for other users.

### Invalidating JWTs

One option is to change the secret that the website uses to generate JWTs. This will invalidate all JWTs and require all users to log in again. It's a drastic, worse-case scenario. There are other methods out there that you'll have to research (e.g. short-lived login token and long-lived refresh token).

### Log Out

Delete the cookie that stores the JWT. Optionally invalidate the JWT.

### Password Reset Request REST API

Users will need to reset their passwords. This API will generate a random token, save it in the
account record, and send an email using that token with a link to a password reset form.

### Password Reset Request Accepted Notice

Let the user know that they will receive an email with password reset instructions.

### Password Reset Request Failed Notice

Let the user know that their request for a password reset has failed (e.g. the database is down) and how to contact you for support.

### Password Reset Email

The email should have a link to a password reset form using the reset token that's saved in the account record for that user.

### Password Reset Form

They should enter their new password and submit the form.

### Password Reset Form Validation

Make sure the new password meets password requirements (e.g. length).

### Password Reset REST API

Check that the token matches what's stored in the database account record for that user.

### Password Reset REST API Validation

Make sure the password is in a valid format. Assume someone will try to call the API with invalid values.

### Password Reset Success Notice

Notify the user their password was reset, and they can log in. The notice can be on the same page as the reset form, or you can redirect them to a new page.

### Password Reset Failed Notice

Notify the user that their password was not reset (e.g. database is down) and how to contact you for support. The notice can be on the same page as the reset form, or you can redirect them to a new page.

## Conclusion

I hope you can see what an undertaking it is to implement your own registration and authentication for your website. I'm sure there are other things that you might need to handle (e.g. agreeing to Terms of Service). It's a good experience, but one not to be taken lightly.