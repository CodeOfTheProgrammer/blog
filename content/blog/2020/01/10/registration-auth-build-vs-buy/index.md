---
title: "Registration and Authentication: Making a Build vs. Buy Decision"
date: "2020-01-10T00:00:00.000Z"
description: "Weighing the pros and cons of building your own registration and authentication system, or using a third-party service."
---

Today I'm starting to work on the first of the registration and login user stories for an application that I'm developing:

> As a User I want to register using my email address and a password so I can start using the application.

It raises the question about whether I should implement this myself, or use a third-party service. In this post I'll describe some of the things I'm considering when making the decision.

## Things to consider when deciding whether to use a third-party registration/authentication service or build your own

### Security

Unless you already have experience implementing and supporting registration and authentication systems, it's safer to use one of the popular third-party services (e.g. Auth0, Firebase, etc). No system is 100% secure, but those third-party services are used by a lot of applications and have developers dedicated to that domain.

### Features

Typical features needed for email/password registration and authentication are:

* Email verification
* Login form handling
* Two-factor authentication (2FA)
* Rate limiting login attempts
* Lock out after too many failed login attempts
* Changing email
* Changing password
* Password recovery
* CAPTCHA
* Account removal

Some obvious features that you'll likely need beyond email/password registration and authentication are:

* Login with social media accounts (e.g. Twitter, Facebook)
* Support for mobile

Without researching it, I assume the popular third-party services offer all of these features. If you build your own then you will have to implement the features you need.

### User experience

When you build your own, you have complete control over the user experience. You don't need to jump to a third-party dialog to register or authenticate, which might confuse or alarm users.

### Speed of development

While there is certainly a learning curve to using a third-party service, the learning curve should be much easier than building your own service. That should speed up development tremendously.

### Initial and ongoing costs

The popular third-party services offer free tiers, but as your user base grows the costs will increase. At some point it will probably be more cost-effective to implement your own registration and authentication system. Certainly when you are starting out you can't beat the free tier in terms of cost.

### Control

What happens if a third-party service has some down time, goes out of business, raises their prices, changes their terms of service, changes or removes a feature, doesn't provide something you end up needing, etc? At the very least you should make sure a third-party service allows you to export all of your data so you can switch to something else (or build your own). When you build your own service, you have complete control (and responsibility) for everything.

### Professional growth

If I have the time and interest, I like to take opportunities to expand my development experience whenever possible. You won't learn much about the technologies, protocols, pitfalls, etc of registration and authentication systems if you offload that work to a third party.

## Conclusion

Obviously I can't give you a recommendation for your situation. I haven't even decided for myself yet! You will need to weigh all of these considerations when making your own build-vs-buy decision.

If there are other things you think should be considered, please leave a comment below!