---
title: "Header, Logo and Navigation"
date: 2026-09-15
description: "The banner, the logo, the ticker and the menu — including the menu trap that catches everyone."
summary: "Text or image logo, the scrolling marquee, sticky navigation, and why a nested children array does nothing."
categories: ["Layout"]
tags: ["header", "logo", "menus", "navigation"]
---

## Logo

```toml
[params.logo]
  text  = "Retro Fusion"
  style = "pixel"        # pixel | plain | rainbow | chrome
  image = ""             # set this to use a graphic instead
  alt   = "Retro Fusion"
  width = 220
  height = 60
```

A text logo is used unless `image` is set. The four styles are pure CSS —
`pixel` gets a hard offset shadow, `rainbow` animates a gradient, `chrome` is a
metallic gradient, `plain` is just the text.

There is also `tagline`, shown under the logo:

```toml
[params]
  tagline = "Hand-coded since 1996"
```

## The ticker

```toml
[params.navbar]
  marquee     = "Welcome to my homepage"
  showMarquee = true
```

The black bar under the header. It pauses on hover and is disabled for
reduced-motion users. Emoji work; HTML is escaped, so a stray tag shows as
text rather than becoming an element.

## Navigation

```toml
[params.navbar]
  sticky = true
  [params.navbar.cta]
    label = "Hire Us"
    url   = "/contact/"
```

`sticky` pins the bar to the top as you scroll. The optional CTA renders a
button at the right-hand end. A small search form appears if you set
`searchURL` to your search page.

## Menus

Menu entries live in a **flat array**. Nesting is expressed with `parent`,
which names the parent's `identifier`:

```toml
[menus]
  [[menus.main]]
    name       = "Docs"
    identifier = "docs"
    pageRef    = "/posts"
    weight     = 20

  [[menus.main]]
    name    = "Getting Started"
    parent  = "docs"
    pageRef = "/posts/getting-started/"
    weight  = 10
```

Two things to watch out for:

- A nested `[[menus.main.children]]` array parses fine but Hugo ignores it, so
  no dropdowns render. Use `identifier` + `parent` instead.
- A child's `identifier` defaults to its `name`. If the same label appears
  twice anywhere in the menu the two collide and one disappears silently, so
  set an explicit `identifier` whenever a label repeats.

Nesting works to any depth — give a child its own `identifier` and point a
grandchild's `parent` at it. The menu in this demo nests two levels.

## Breadcrumbs

Every page below the homepage gets a breadcrumb trail built from Hugo's page
ancestors, plus matching `BreadcrumbList` structured data. Change the separator
with `breadcrumbSeparator`, or switch them off entirely:

```toml
[params.features]
  breadcrumbs = false
```

## Next

- [The Footer](/posts/the-footer/)
- [Sidebar Widgets](/posts/sidebar-widgets/)
