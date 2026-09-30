---
title: "Getting Started"
date: 2026-09-25
description: "Install the theme, point it at your content, and build your first page."
summary: "Three ways to install it, what to do if the theme folder is not where you want it, and the smallest config that works."
categories: ["Setup"]
tags: ["install", "setup", "git"]
series: ["Start Here"]
---

There is no build step. The theme is a folder of templates, one stylesheet and
one script, so installing it is copying a directory and naming it in your
config.

## Install it

Pick whichever suits you.

**Copy the directory** — simplest, and you can edit the theme in place:

```bash
cp -r retro-fusion /path/to/your-site/themes/
```

**Git submodule** — keeps the theme updatable with `git submodule update`:

```bash
cd /path/to/your-site
git submodule add https://github.com/you/retro-fusion themes/retro-fusion
```

**Hugo modules** — needs Go installed:

```bash
hugo mod init github.com/you/your-site
hugo mod get github.com/you/retro-fusion
```

Then name it in `hugo.toml`:

```toml
theme = "retro-fusion"
```

That is the whole install.

## The demo site is inside the theme

`exampleSite/` is a complete site — the one you are reading. It is not part of
the theme, and Hugo never mounts it, so its images and pages will not appear in
your build. Delete it, or keep it around as a reference.

To run it:

```bash
cd themes/retro-fusion/exampleSite
hugo server --themesDir ../..
```

The `--themesDir ../..` is only needed because the demo's site root lives
inside the theme folder. Your own site does not need it.

## Moving the theme somewhere else

`themes/` is a convention, not a requirement. If you keep your themes beside
your site instead of inside it, point Hugo at the directory:

```bash
hugo --themesDir ../hugo-themes
```

Or set it once in your config so you never think about it again:

```toml
themesDir = "../hugo-themes"
```

The folder name has to match the `theme =` value, so a theme at
`../hugo-themes/retro-fusion/` needs `theme = "retro-fusion"`.

## The smallest config that works

```toml
baseURL = "https://example.org/"
title   = "My Site"
theme   = "retro-fusion"

[params]
  mode = "blog"

[taxonomies]
  category = "categories"
  tag      = "tags"
```

Every other setting has a working default. Add them as you need them rather
than pasting the whole example config up front.

## Your first post

```bash
hugo new content posts/hello.md
hugo server
```

The archetype fills in the front matter for you. Which keys it sets, and which
ones the theme actually reads, is covered in
[Content and Front Matter](/posts/content-and-front-matter/).

## Next

- [Project Structure](/posts/project-structure/) — what is in the box
- [Where Your Config Lives](/posts/where-your-config-lives/) — `theme.toml` vs `hugo.toml`
- [Deployment](/posts/deployment/) — getting it online
