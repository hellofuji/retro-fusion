---
title: "The Footer"
date: 2026-09-13
description: "Columns, links, social icons, badges, copyright and the attribution line."
summary: "One brand column, one column per links block, then badges and social — plus how to change or remove the copyright."
categories: ["Layout"]
tags: ["footer", "social"]
cover:
  image: "/images/demo/slide-3.svg"
  alt: "A ring of retro website badges"
---

The footer is one brand column, then one column for each links block you
define, then a badges and social column.

```toml
[params.footer]
  showLogo     = true
  aboutTitle   = "About This Site"
  about        = "A hand-built corner of the web."
  backToTop    = true
  defaultBadges = true
  badgesTitle  = "Web Rings & Badges"
```

Adding link columns is just adding blocks — the grid follows:

```toml
  [[params.footer.links]]
    title = "Explore"
    [[params.footer.links.items]]
      name = "Blog"
      url  = "/posts/"
      icon = "document"
```

## Social icons

```toml
  [[params.footer.social]]
    name = "GitHub"
    url  = "https://github.com/"
    icon = "github"
```

`icon` takes a name from the built-in SVG set — see [Icons](/posts/icons/).
An emoji still works if you prefer one.

## Badges

Four 88x31 badges ship with the theme. Replace them with your own:

```toml
  [[params.footer.badges]]
    image = "/images/my-badge.svg"
    alt   = "My badge"
    url   = "https://example.org"
```

Defining any `badges` replaces the built-in four. To drop the default
badges and add none of your own, set `defaultBadges = false`.

## Copyright and attribution

Leave `copyright` unset for the default, which is the current year and your
site title:

```toml
  copyright = "&copy; 2026 My Studio. All rights reserved."
```

The small line underneath is the attribution. Three options:

```toml
  showBuiltWith = true     # the default "Powered by Hugo · Theme Retro Fusion"
  showBuiltWith = false    # remove the line entirely
  builtWith     = "Hand-built with <a href='https://gohugo.io/'>Hugo</a>"
```

An empty string falls back to the default, so use `showBuiltWith = false` to
drop the line rather than setting it blank.

## Next

- [Sidebar Widgets](/posts/sidebar-widgets/)
- [Icons](/posts/icons/)
Defining any `badges` replaces the built-in four. To drop them and add nothing,
set `defaultBadges = false`.

Defining any `badges` replaces the built-in four. To drop the default
badges and add none of your own, set `defaultBadges = false`.

## Copyright and attribution

Leave `copyright` unset for the default, which is the current year and your
site title:

```toml
  copyright = "&copy; 2026 My Studio. All rights reserved."
```

The small line underneath is the attribution. Three options:

```toml
  showBuiltWith = true     # the default "Powered by Hugo · Theme Retro Fusion"
  showBuiltWith = false    # remove the line entirely
  builtWith     = "Hand-built with <a href='https://gohugo.io/'>Hugo</a>"
```

An empty string falls back to the default, so use `showBuiltWith = false` to
drop the line rather than setting it blank.

## Next

- [Sidebar Widgets](/posts/sidebar-widgets/)
- [Icons](/posts/icons/)
