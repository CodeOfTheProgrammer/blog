# Code of the Programmer Blog

## Prerequisites

The following must be installed:

- Node.js
- Gatsby

## Install dependencies

```
npm ci
```

## Writing blog posts

Run the app locally:

```
gatsby develop
```

Open http://localhost:8000, then create and edit a markdown file in `content/blog/<year>/<month>/<day>/<topic>/index.md`

Each markdown file must have frontmatter at the top containing at least three properties:

```
---
title: 'A Title'
date: '2020-01-01T00:00:00.000Z'
description: 'A description of the blog post.'
---
```

## Publishing

The `.github/workflows/ci.yml` will cause Github Actions to automatically build and deploy the blog to an AWS S3 bucket and invalidate the CloudFront CDN cache when changes are pushed to a `deploy` branch in Github.

This requires a few Github Secrets to be defined in the Github account:

* COTP_AWS_S3_BUCKET
* COTP_AWS_ACCESS_KEY_ID
* COTP_AWS_SECRET_ACCESS_KEY
* COTP_AWS_CLOUDFRONT_DISTRIBUTION
