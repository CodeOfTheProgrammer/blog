---
title: The Blog is Up
date: '2020-01-06T00:00:00.000Z'
description: 'How I set up my blog.'
---

Today I'm working on setting up my blog (deployment, hosting, etc) and thought you might like to see my approach at a high level. My approach isn't the easiest from a technical perspective, but it gives me the flexibility I want, and hosting costs should be quite low.

I write the blog using the [Gatsby static site generator](https://www.gatsbyjs.org/) in conjunction with the [gatsby-starter-blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/) starter. I chose a static site generator because it allows me to write content in [Markdown](https://daringfireball.net/projects/markdown/), version control it in [git](https://git-scm.com/), and deploy it to any web server. I specifically chose Gatsby because I can leverage my Javascript and [React](https://reactjs.org/) experience to customize it. Gatsby supports interactive development (via `gatsby develop`) so that I can run the blog locally and see changes in my browser as I write content. The static web files (e.g. html, js) that we need to deploy to a web server can be created using `gatsby build`.

Every change to the blog is committed to [my Github repository](https://github.com/CodeOfTheProgrammer/blog), and I use [Github Actions](https://help.github.com/en/actions) to automatically run `gatsby build`, deploy the blog, and invalidate the [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) (Content Delivery Network) cache so readers visiting the blog will get the latest version rather than a stale version.

The blog is hosted in an [AWS (Amazon Web Services) S3 Bucket](https://aws.amazon.com/s3/) with [AWS Route 53](https://aws.amazon.com/route53/) handling the DNS (Domain Name System) lookup for `codeoftheprogrammer.com`. [AWS CloudFront](https://aws.amazon.com/cloudfront/) handles TLS/SSL certificate and CDN caching.

The `codeoftheprogrammer.com` domain name is registered with [Namecheap.com](https://www.namecheap.com/). I've had good experience with their support, and their prices are competitive.

If you would like me to elaborate on any of these topics, contact me (links below) and let me know!
