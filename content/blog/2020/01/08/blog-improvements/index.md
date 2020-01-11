---
title: Blog Improvements
date: '2020-01-08T00:00:00.000Z'
description: 'Integrated commenting, and improved styling.'
---

Today I integrated the Disqus commenting system into my blog. I chose Disqus because it's mature/well-tested and fully-featured, and has excellent documentation to make integration easier. It also saves me from having to implement, secure, and back up my own commenting system, which would require setting up a database to store comments, implementing the UI components for accepting and displaying comments, etc.

I also improved some of the styling of the blog a little. While doing this I decided to alter the React components provided by `gatsby-starter-blog` to utilize [styled-components](https://www.styled-components.com/) so that altering styles will be easier in the future.
