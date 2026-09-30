---
title: "The Single Post Page"
date: 2026-09-05
description: "Table of contents, share buttons, previous and next, related posts, and the byline."
summary: "What appears on a post, in what order, and how to switch any of it off."
categories: ["Appearance"]
tags: ["posts", "toc", "share"]
series: ["Make It Yours"]
cover:
  image: "/images/demo/cover-1.svg"
  alt: "A retro browser window showing a personal homepage"
lastmod: 2026-09-06
---

A post renders in this order: title bar, metadata, table of contents, body,
tags, share buttons, byline, previous and next, related posts.

## Table of contents

```toml
[params.post]
  toc      = true
  tocOpen  = true
  tocTitle = "Contents"
```

Built from your headings, and it hides itself entirely on a page with none. A
single post can override it:

```yaml
toc: false
```

## Share buttons

```toml
[params.post]
  share = true
  shareNetworks = ["x", "facebook", "linkedin", "reddit", "mastodon", "email", "copy", "print"]
```

Every button is a plain link, or a `mailto:`, so nothing third-party loads and
they work with JavaScript off. Remove any you do not want from the list, or
turn the row off per post with `share: false`.

Mastodon has no single share endpoint, so that button asks which instance you
are on.

## Byline

```toml
[params.post]
  authorBox = true
```

Shown on posts only, never on standalone pages. The name, avatar and bio come
from `params.author*`, and a single post can override the lot from its own
front matter.

## Previous, next and related

```toml
[params.post]
  prevNext     = true
  related      = true
  relatedCount = 3
```

Related posts use Hugo's built-in matching. Tune the weighting under
`[related]` in your config if you want to change what counts as related.

## Metadata

```toml
[params.post]
  readingTime = true
  wordCount   = false
  showLastmod = true
```

The strip under the title. `showLastmod` only shows when a post is actually
newer than its publish date.

## Next

- [Content and Front Matter](/posts/content-and-front-matter/)
- [Taxonomies](/posts/taxonomies/)
