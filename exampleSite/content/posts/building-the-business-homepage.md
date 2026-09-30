---
title: "Building the Business Homepage"
date: 2026-09-17
description: "The hero, the carousel, the services grid, the FAQ and the closing band."
summary: "Every block in business mode, the config that drives it, and how to reorder or drop any of them."
categories: ["Layout"]
tags: ["homepage", "hero", "carousel", "faq"]
cover:
  image: "/images/demo/hero.svg"
  alt: "A retro desktop window showing a website"
---

Business mode assembles the homepage from blocks. You choose the order and
which ones appear.

```toml
[params.home]
  sections = ["hero", "carousel", "services", "content", "faq", "posts", "cta"]
```

| Key | Block |
|---|---|
| `hero` | Headline, buttons, image |
| `carousel` | Sliding banners or testimonials |
| `services` | The card grid |
| `content` | Body of `content/_index.md` |
| `faq` | The accordion |
| `posts` | Latest posts strip |
| `cta` | Closing call-to-action band |

Unknown names are ignored rather than failing the build, and a comma-separated
string works too, so `sections = "hero,faq"` does what you meant if you forget
the brackets.

## Hero

```toml
[params.hero]
  enable   = true
  layout   = "split"        # split | stacked
  align    = "left"         # left | center | right
  eyebrow  = "Since 1996"
  title    = "We Build <em>Retro-Fast</em> Websites"
  subtitle = "Hand-crafted static sites with a 90s soul."
  image    = "/images/hero.svg"
  imageAlt = "A retro desktop"

  [[params.hero.buttons]]
    label = "Get a Quote"
    url   = "/contact/"
    style = "accent"        # primary | accent | ghost
    icon  = "email"
```

`title`, `subtitle`, `text` and `note` accept HTML. The image renders inside a
retro window frame; leave it out for a plain banner.

The hero supplies the page's `<h1>`. If you drop `hero` from `sections` or set
`enable = false`, the theme falls back to a visually hidden site title so the
document outline stays valid.

## Carousel

```toml
[params.carousel]
  enable     = true
  title      = "Testimonials"
  autoplay   = true
  interval   = 6000
  showDots   = true
  showArrows = true

  [[params.carousel.slides]]
    image = "/images/slide-1.svg"
    alt   = "A retro computer"
    title = "Static Sites That Fly"
    text  = "Sub-second loads."
    link  = "/services/"
    label = "Read more"
```

It is a scroll-snap track, so swiping and scrolling work with JavaScript off.
The script only adds autoplay, arrows and dots. Autoplay pauses on hover and
focus, and is disabled entirely for anyone whose system asks for reduced
motion.

## Services grid

```toml
[params.services]
  enable   = true
  title    = "What We Do"
  columns  = 3              # 2, 3 or 4
  linkLabel = "Learn more"

  [[params.services.items]]
    icon  = "tools"         # any name from the icon set, or an emoji
    title = "Static Site Engineering"
    text  = "..."
    link  = "/services/"
    badge = "Popular"       # optional corner flag
```

## FAQ

```toml
[params.faq]
  enable   = true
  single   = true           # only one panel open at a time
  title    = "Frequently Asked Questions"

  [[params.faq.items]]
    question = "Does it work without JavaScript?"
    answer   = "Yes. The accordion is built on **details**, so it opens natively."
    open     = true
```

Answers are rendered as Markdown, so links and emphasis work.

## Closing band

```toml
[params.home.cta]
  title = "Ready to build something that lasts?"
  text  = "Tell us what you need."
  [params.home.cta.button]
    label = "Start a Project"
    url   = "/contact/"
```

## Blocks that render nothing

Every block collapses to zero output when it has nothing to show — no carousel
slides, no FAQ items, or an empty `_index.md` leaves no empty frame behind.

## Next

- [Post Cards and Lists](/posts/post-cards-and-lists/)
- [The Footer](/posts/the-footer/)
