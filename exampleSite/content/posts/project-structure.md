---
title: "Project Structure"
date: 2026-09-23
description: "What is in the theme folder, and which parts Hugo actually mounts."
summary: "Only four directories are the theme. Knowing which is which saves a lot of confusion when something does not render."
categories: ["Setup"]
tags: ["structure", "modules"]
series: ["Start Here"]
---

```
retro-fusion/
├── layouts/       templates Hugo renders
├── static/        stylesheet, script, badges
├── archetypes/    front matter for `hugo new`
├── theme.toml     theme metadata
├── README.md
└── exampleSite/   a full demo site — not part of the theme
```

## Only four directories are the theme

Hugo mounts `layouts/`, `static/`, `assets/`, `i18n/` and `archetypes/` from a
theme. Nothing else. So `exampleSite/`, `README.md` and any notes you keep
alongside them are invisible to your build.

That is worth knowing for one practical reason: files you drop in
`exampleSite/static/` will not appear on your site. Only `static/` is mounted.

## What lives where

**`layouts/`** — the templates. `_default/` holds the page types, `partials/`
holds the pieces they assemble, `index.html` is the homepage. Every file is
short and meant to be read.

**`static/css/style.css`** — the entire look, in one file with a numbered table
of contents at the top.

**`static/js/main.js`** — about 400 lines, no dependencies. Everything it does
is an enhancement: with JavaScript off the site still navigates, the carousel
still scrolls, the FAQ still opens and the visitor counter still shows a
server-rendered number.

**`static/images/badges/`** — four 88x31 badges, used by the footer unless you
supply your own.

**`archetypes/default.md`** — the front matter `hugo new` starts you with.

## Where your own files go

Anything you put in your site's `layouts/` overrides the theme's version of the
same path. That is how you customise without forking:

```
your-site/layouts/partials/footer.html   overrides   themes/retro-fusion/layouts/partials/footer.html
```

Start by copying the theme's file into your site and editing it. See
[Overriding templates](/posts/theming/#overriding-templates).

## Next

- [Where Your Config Lives](/posts/where-your-config-lives/)
- [Getting Started](/posts/getting-started/)
