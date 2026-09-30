---
title: "Post Cards and Lists"
date: 2026-09-07
description: "Card height, columns, excerpts, tag chips and thumbnails."
summary: "How the cards are kept the same height, and every knob that controls what appears on them."
categories: ["Appearance"]
tags: ["cards", "lists", "layout"]
series: ["Make It Yours"]
---

Cards are padded to a uniform height, so a list of posts reads as an even grid
rather than a ragged stack — regardless of how long each summary or title is,
or whether a post has a cover image.

```toml
[params.list]
  showThumbnails = true
  showTags       = true

  columns       = 1     # 1 = full-width list; 2, 3 or 4 = grid of tiles
  excerptLines  = 3     # excerpt is clamped and padded to this many lines
  titleLines    = 2     # same trick for titles
  excerptLength = 220   # character cap, applied first
  maxTags       = 3     # tag chips on a card in the list
  maxTagsGrid   = 2     # tag chips in a narrower grid tile
```

Setting `columns = 2` or higher turns the list into a grid of tiles, and the
thumbnail moves above the text rather than beside it.

## Why the caps exist

A tag chip is a single unbreakable label, so a row of them has a hard minimum
width. In a three-column tile the content area is around 288px, and four
average chips need about 300px — so something has to give. Showing fewer chips
is the only fix that neither clips a chip in half nor lets the row escape the
card. Tune `maxTagsGrid` to suit your own tag names.

## Thumbnails

A post with `cover.image` in its front matter shows that image. A post without
one gets a hatched placeholder of the same aspect ratio rather than a shorter
card.

```yaml
cover:
  image: "/images/my-post.svg"
  alt: "What the image shows"
```

Set `showThumbnails = false` if you would rather have no images at all.

## Featured posts

```yaml
featured: true
```

Adds a star and tints the card, which is useful when a post should stand out at
the top of a list.

## Next

- [The Single Post Page](/posts/the-single-post-page/)
- [Content and Front Matter](/posts/content-and-front-matter/)
