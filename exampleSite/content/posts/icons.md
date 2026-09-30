---
title: "Icons"
date: 2026-08-30
description: "The built-in inline SVG set, its aliases, and how to add your own."
summary: "No icon font, no sprite sheet, no extra request. Icons inherit their colour from the text and their size from the font."
categories: ["Content"]
tags: ["icons", "svg", "social"]
---

Social links, footer links, service cards and hero buttons all take an `icon`
value that names an icon rather than pasting one.

```toml
[[params.footer.social]]
  name = "GitHub"
  url  = "https://github.com/"
  icon = "github"
```

Each icon is inlined into the page, so there is no icon font, no sprite sheet
and no third-party request. They inherit the surrounding colour and font size,
which is why they follow your palette automatically.

## Available names

| Brands | | | |
|---|---|---|---|
| `github` | `mastodon` | `x` | `linkedin` |
| `facebook` | `instagram` | `youtube` | `reddit` |
| `bluesky` | `telegram` | `discord` | `twitch` |
| `dribbble` | | | |

| Interface | | | |
|---|---|---|---|
| `email` | `rss` | `link` | `home` |
| `document` | `tools` | `user` | `folder` |
| `tag` | `search` | `arrow-up` | `chevron-right` |
| `calendar` | `clock` | `pencil` | `refresh` |
| `list` | `printer` | | |

Aliases exist for the obvious guesses: `twitter` for `x`, `mail` and
`envelope` for `email`, `doc` and `file` for `document`, `person` for `user`,
`feed` for `rss`, `hash` for `tag`, `wrench` for `tools`, `date` for
`calendar`, `reading` and `time` for `clock`, `edit` and `author` for `pencil`,
`update` and `modified` for `refresh`, `print` for `printer`, `url` for `link`.

## Emoji still work

Anything the set does not recognise is rendered as plain text, so
`icon = "🦞"` gives you a lobster and nothing breaks. Service cards and hero
buttons work the same way.

## Adding your own

Icons live in one dictionary at the top of
`layouts/partials/svg-icon.html`. Drop in a 24×24 path and it is available
everywhere:

```
"mysite" `<path d="M12 2 ..." />`
```

Copy the file into your own `layouts/partials/` first if you would rather not
edit the theme.

## Credits

Brand marks come from [Simple Icons](https://simpleicons.org/) (CC0); the
interface icons come from
[Material Design Icons](https://pictogrammers.com/library/mdi/) (Apache-2.0).
Both are 24×24 fills, so they sit together consistently.

## Next

- [The Footer](/posts/the-footer/)
- [Analytics and Privacy](/posts/analytics-and-privacy/)
