---
title: "Where Your Config Lives"
date: 2026-09-21
description: "theme.toml, hugo.toml, and the config/_default directory."
summary: "Two files with similar names do very different jobs. Also: Hugo merges config found inside a theme, which surprises people."
categories: ["Setup"]
tags: ["config", "hugo.toml"]
series: ["Start Here"]
---

Two files are easy to confuse:

| File | Lives in | What it is |
|---|---|---|
| `theme.toml` | the **theme** folder | Metadata for the Hugo themes showcase — name, licence, `min_version`. Never read as configuration. |
| `hugo.toml` | **your site** root | Your actual settings. |

You never need to edit `theme.toml`. Everything you configure goes in your
site's config.

## One file or a config directory

Both work. A single `hugo.toml` is simpler; the directory is nicer once you have
a lot of settings or more than one person editing them.

```
your-site/
├── config/
│   └── _default/
│       ├── hugo.toml        baseURL, title, theme, taxonomies
│       ├── params.toml      everything under [params]
│       └── menus.toml       menu definitions
├── content/
└── themes/retro-fusion/
```

The one gotcha when splitting: **each file's contents are that section's
top-level keys**, so the wrapper disappears.

```toml
# hugo.toml (single file)        # config/_default/params.toml (split)
[params]                         mode    = "blog"
  mode = "blog"                  author  = "Ada Lovelace"
  author = "Ada Lovelace"
```

Same for menus — `[[menus.main]]` in a single file becomes `[[main]]` in
`menus.toml`.

The directory form is also the only way to get per-environment config. Hugo
merges `config/_default/` first, then overlays `config/<environment>/`:

```
config/
├── _default/          merged first, every environment
└── production/        overlaid on `hugo --environment production`
    └── params.toml    e.g. turn analytics on with real IDs
```

Note that `hugo` builds as **production** and `hugo server` runs as
**development**, so a production-only setting will not fire while you preview.

## Themes can ship config, and Hugo merges it

This is why published themes often spread settings across several files. Hugo
treats a theme as a module and merges any config it finds inside the theme into
your site's config, with your site winning on conflicts. Both of these are read:

```
themes/retro-fusion/hugo.toml
themes/retro-fusion/config/_default/params.toml
```

So a theme can ship defaults in labelled sections and your site overrides only
what it cares about.

This theme ships no config of its own. Its defaults live in the templates as
fallbacks, so there is one source of truth, and everything is documented in
`exampleSite/hugo.toml`.

## Full config reference

The demo's `hugo.toml` is the reference — it is the file this site is built
from, with every option present and commented. Copy it whole or take the parts
you need.

## Next

- [Blog Mode and Business Mode](/posts/blog-mode-and-business-mode/)
- [Theming](/posts/theming/)
