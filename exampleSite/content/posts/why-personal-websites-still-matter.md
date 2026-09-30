---
title: "Why Personal Websites Still Matter"
date: 2026-03-14
lastmod: 2026-04-02
description: "The case for owning a small, strange, hand-built corner of the internet in an era of rented feeds."
summary: "Renting your presence from a platform means renting your audience, your archive, and your voice. Here's the argument for going back to owning a few kilobytes of your own."
categories: ["Web Culture"]
tags: ["indieweb", "small-web", "writing", "hugo"]
series: ["The Small Web"]
featured: true
cover:
  image: "/images/demo/cover-1.svg"
  alt: "A retro browser window showing a personal homepage"
---

There's a particular feeling you get when you type a URL that belongs to a
person rather than a company. The page loads in under a second. There's no
cookie banner, no newsletter modal, no autoplaying video. Just someone's
thoughts, arranged the way they wanted to arrange them.

That feeling used to be the *default* state of the web.

## The platform bargain

When you publish on someone else's platform, you're making a trade. You get
distribution, and in exchange you give up:

- **Your archive.** The platform decides how long your back catalogue stays
  reachable, and in what order.
- **Your format.** Your 2,000-word essay is now a thread. Your photo essay is
  now a carousel.
- **Your audience.** You cannot export a follower. You can only export a list
  of names the platform chose to show you.
- **Your aesthetic.** Your site looks like every other site on the platform,
  because it *is* every other site on the platform.

None of this is a secret, and yet the trade keeps getting made, because
distribution is genuinely hard and platforms genuinely solve it.

## What you get back

A personal site is a small amount of work and a large amount of autonomy. The
costs are real: you have to figure out hosting, and DNS, and how to make a page
that doesn't look like a spreadsheet. But the returns compound.

### You own the links

A URL you control is a promise you can keep. When a platform shuts down — and
they all do, eventually — your links survive, because they point at a file you
own.

### You own the shape

A blog post can be a blog post. It can have footnotes, a table of contents, an
appendix, and a 4,000-word digression about modem handshakes, because nobody is
optimising for time-on-feed. The medium can match the message.

### You own the pace

There's no algorithm rewarding frequency. You can publish four times a year and
lose nothing. The archive doesn't decay because you went quiet for a season.

## The technical bar is lower than you think

The thing that stops most people is the assumption that a personal site means
*becoming a web developer*. It doesn't. A static site generator like Hugo turns
a folder of Markdown files into a website:

```
content/posts/my-thought.md   ->   public/posts/my-thought/index.html
```

That's the whole trick. You write text. A build step turns it into HTML. You
upload the HTML. There is no database to patch, no plugin to update, no
`npm audit` blinking red at you at 2am.

## Start small, start ugly

The best personal site is the one that exists. A single `index.html` with three
paragraphs on it is a complete personal website. You can add a stylesheet next
week.

The web was built by people who didn't wait for permission, using tools they
half-understood, making pages that were strange and specific and theirs. That
door never closed. It's still just sitting there, unlocked.
