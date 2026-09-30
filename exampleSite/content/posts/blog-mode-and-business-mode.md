---
title: "Blog Mode and Business Mode"
date: 2026-09-19
description: "One value switches the entire homepage between two layouts."
summary: "What each mode renders, what it changes elsewhere, and why the switch is a config value rather than two themes."
categories: ["Layout"]
tags: ["homepage", "modes"]
---

```toml
[params]
  mode = "blog"      # or "business"
```

| | `blog` | `business` |
|---|---|---|
| **Homepage** | Intro window, post cards, sidebar | Hero, then the blocks in `params.home.sections` |
| **Sidebar** | Yes — on the homepage, archive and post pages | No |
| **Business blocks** | Not rendered | Hero, carousel, services, FAQ, posts, CTA |

Both modes use the same templates, the same stylesheet and the same content.
Only `layouts/index.html` branches on the mode, which is why switching does not
require rebuilding anything else.

## Blog mode

A classic index: an optional intro pulled from `content/_index.md`, then post
cards with the sidebar beside them. Archive pages, taxonomy pages and single
posts look the same in both modes — the sidebar is the only thing that follows
the mode.

This site is in blog mode, so what you are reading is it.

## Business mode

A landing page assembled from blocks you order yourself:

```toml
[params.home]
  sections = ["hero", "carousel", "services", "content", "faq", "posts", "cta"]
```

Reorder or delete entries to change the page. Each block also has its own
`enable` flag, so ordering and visibility stay separate concerns. Full details
in [Building the Business Homepage](/posts/building-the-business-homepage/).

## What does not change

Section pages, taxonomy pages, single posts, the 404 page, the footer, the
header and the breadcrumbs behave identically. A blog post is a blog post in
either mode.

## Next

- [Building the Business Homepage](/posts/building-the-business-homepage/)
- [Header, Logo and Navigation](/posts/header-logo-and-navigation/)
