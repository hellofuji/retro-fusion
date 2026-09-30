---
title: "Content and Front Matter"
date: 2026-09-03
description: "Every front matter key the theme reads, and what happens when it is missing."
summary: "Nothing is required beyond a title. Here is what each optional key does and where it appears."
categories: ["Content"]
tags: ["front-matter", "content", "author"]
series: ["Make It Yours"]
---

Nothing is required beyond a title. Every key below is optional, so posts
written for another theme will still render.

```yaml
---
title: "My Post"
date: 2026-03-14
lastmod: 2026-04-02
description: "Used for the meta description, og:description and the archive header."
summary: "Overrides the auto-generated card excerpt."
author: "Grace Hopper"
categories: ["Web Culture"]
tags: ["indieweb", "hugo"]
series: ["The Small Web"]
featured: true
toc: false
share: false
cover:
  image: "/images/cover.svg"
  alt: "What the image shows"
---
```

| Key | What it does |
|---|---|
| `description` | Meta description, Open Graph, archive page header |
| `summary` | Card and feed excerpt. Without it, Hugo uses the opening words |
| `author` | Byline for this page. Falls back to the site author |
| `categories`, `tags` | Taxonomies. Any custom one works the same way |
| `series` | An example custom taxonomy |
| `featured` | Star and a tint on the card |
| `toc`, `share` | Per-page overrides of the site defaults |
| `cover.image`, `cover.alt` | Card thumbnail and social image |
| `lastmod` | Only shown when it is later than `date` |

## Multiple authors

A single post can override the site author entirely:

```yaml
author: "Grace Hopper"
authorBio: "Rear admiral, compiler author, guest poster."
authorImage: "/images/grace.jpg"
```

The byline box then shows that name, avatar and bio instead of yours. Nothing
else has to change, and normal posts still fall back to the site author.

The same keys are read at site level under `[params]`:

```toml
[params]
  author      = "Abhishek Kumar"
  authorImage = "/images/avatar.svg"
  authorBio   = "Systems thinker and web preservationist."
  authorLink  = "/about/"
```

`authorBio` is rendered as raw HTML, so links work. Write literal angle
brackets as entities — the browser parses a real tag here, and an unclosed one
swallows the rest of the page.

## Excerpts

Hugo takes roughly the first 70 words of the opening paragraph as the summary
unless you set one. Putting `<!--more-->` in the body marks an explicit cut
point.

## Next

- [Taxonomies](/posts/taxonomies/)
- [Icons](/posts/icons/)
