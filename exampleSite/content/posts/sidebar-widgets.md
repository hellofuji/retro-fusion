---
title: "Sidebar Widgets"
date: 2026-09-11
description: "Author, visitor counter, recent posts, categories, tags and your own HTML."
summary: "Six widgets, each toggled independently, plus how the retro visitor counter keeps working without JavaScript."
categories: ["Layout"]
tags: ["sidebar", "widgets"]
---

The sidebar appears in blog mode on the homepage, archive pages and single
posts.

```toml
[params.sidebar]
  enable   = true
  sticky   = true
  onSingle = true
```

`sticky` keeps it in view on desktop. `onSingle` controls whether it appears
beside posts; the homepage and archive pages follow `enable`.

## Author

```toml
  author      = true
  authorTitle = "About the Author"
```

The name, avatar, bio and link come from `params.author*` — set them once at
the top level. See [Content and Front Matter](/posts/content-and-front-matter/)
for how a single post can override them.

## Visitor counter

```toml
  counter       = true
  counterTitle  = "Visitors"
  counterBase   = 1048576
  counterPerDay = 137
```

The number is computed at build time from `counterBase + days × counterPerDay`,
so it shows a plausible figure with JavaScript disabled. When the script is
available it adds a small per-visitor bump through `localStorage`, which never
leaves the browser.

## Recent posts

```toml
  recent      = true
  recentTitle = "Fresh Off the Press"
  recentCount = 5
```

Sorted by date, newest first. It deliberately ignores `weight`, so a post given
a weight for menu ordering does not jump to the top here.

## Categories and tags

```toml
  categories      = true
  categoriesTitle = "Categories"

  tags      = true
  tagsTitle = "Tags"
  tagCount  = 24
```

Tags render as a cloud: the size class scales with how many posts carry the
tag, so you can see at a glance what the site is mostly about. Each tag is
still an ordinary link to its term page.

## Your own widgets

Anything else goes in as raw HTML:

```toml
  [[params.sidebar.widgets]]
    title   = "Now Playing"
    content = "<p>Dial-up.mp3</p>"
```

`content` is not escaped, so links and markup work.

## Badges

The sidebar can also show the 88x31 badge strip, off by default:

```toml
  badges      = true
  badgesTitle = "Link Back"
```

On narrow screens the sidebar stacks under the page, and the author widget is
hidden on posts — the post already ends with its own byline, so showing both
would just repeat it.

## Next

- [Theming](/posts/theming/)
- [Icons](/posts/icons/)
