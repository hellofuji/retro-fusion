---
title: "FAQ"
description: "Answers to the questions we get asked most."
date: 2026-01-01
---

The questions below are also rendered as an interactive accordion on the
homepage when `params.mode = "business"`. This page exists so the content is
also reachable as a normal, linkable, bookmarkable URL.

## What exactly is a "static site"?

A site where every page is a pre-built HTML file. There's no application server,
no database, and no server-side rendering at request time. When someone visits,
the host returns a file. That's the whole request.

The practical consequences: it's fast, it's cheap to host, and it has a very
small attack surface. The trade-off is that anything requiring user accounts or
live data doesn't fit.

## Do I need to know how to code to maintain it?

No. Content lives in Markdown files with a small header block:

```markdown
---
title: "My New Post"
date: 2026-04-01
tags: ["news"]
---

The post text goes here.
```

If you can write an email, you can write a post. The build step is one command
(`hugo`), and we document it in plain language at handover.

## What happens if I want to leave?

You take the repository and walk away. There's no proprietary format, no export
process, no data hostage situation. The site is a folder of text files and
templates.

## Can you make it look less... 1998?

Yes. The retro layer is entirely CSS custom properties. Changing `primary` from
navy to a muted charcoal and `tile` from `checker` to `none` gets you a clean,
modern-looking site in about thirty seconds. The layout engine — grid, cards,
responsive breakpoints — is modern either way.

## Do you offer hosting?

No, but we'll set you up with one. Static sites deploy to Netlify, Cloudflare
Pages, GitHub Pages, S3, or literally any web server with a directory. Most of
our clients pay under $5/month for hosting, and some pay nothing.

## How do analytics work without cookies?

We use [Plausible](https://plausible.io/) or a self-hosted equivalent, which
counts pageviews without cookies or personal data. No consent banner required,
because there's nothing to consent to.

If you need Google Analytics for organisational reasons, that's supported too —
it's one line of config.

## What about comments?

Options, in rough order of how much we recommend them:

1. **Webmentions** — other sites ping you when they link to you.
2. **Git-based comments** — a form that opens a pull request.
3. **A hosted service** — easy, but it's a third-party dependency and a
   tracking vector.

We default to none. A blog without comments is a blog.
