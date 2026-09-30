---
title: "Building a Webring in 2026"
date: 2026-01-28
description: "A webring is a linked list of websites that share an audience. Here's how to build one that doesn't rot."
summary: "Webrings were the original recommendation engine, and they were better than what replaced them. A practical guide to building one that survives its members."
categories: ["Web Culture"]
tags: ["webring", "indieweb", "small-web", "html"]
series: ["The Small Web"]
cover:
  image: "/images/demo/cover-3.svg"
  alt: "A ring of interconnected website badges"
---

Before recommendation algorithms, there were webrings. A group of sites that
covered a similar topic would agree to link to each other in a loop: each site
carried a small widget with **Prev**, **Next**, **Random**, and **List** links.
You navigated by clicking, not by scrolling.

It was crude. It was also *human-curated*, non-extractive, and impossible to
SEO-gamify, which is more than can be said for what replaced it.

## The data model

A webring is fundamentally a linked list. You need four things per member:

| Field     | Purpose                                  |
| --------- | ---------------------------------------- |
| `name`    | Display label for the ring listing        |
| `url`     | Canonical link to the site                |
| `owner`   | Who to contact when the link rots         |
| `added`   | When they joined, for ordering            |

That's it. You can store it in a YAML file, a JSON file, or a static site's
data directory.

## Rendering the widget

The widget needs four links, and the `prev`/`next` links must be computed
relative to the *current* site — which is the only genuinely tricky part.

```go-html-template
{{/* layouts/partials/webring.html */}}
{{ $ring := site.Data.webring.members }}
{{ $me := site.Params.webring.memberID }}
{{ $i := 0 }}
{{ range $idx, $m := $ring }}{{ if eq $m.id $me }}{{ $i = $idx }}{{ end }}{{ end }}
{{ $prev := index $ring (mod (sub $i 1) (len $ring)) }}
{{ $next := index $ring (mod (add $i 1) (len $ring)) }}

<nav class="webring" aria-label="Webring">
  <a href="{{ $prev.url }}" rel="prev">« Prev</a>
  <a href="{{ (index $ring (mod (now.Unix) (len $ring))).url }}">Random</a>
  <a href="{{ $next.url }}" rel="next">Next »</a>
</nav>
```

The `mod` arithmetic is what makes it a *ring* rather than a list — the last
member's `next` wraps to the first, and the first member's `prev` wraps to the
last. No special-casing the ends.

## Making it survive

Webrings die of link rot. A ring where 40% of the links 404 is worse than no
ring at all, so build in the maintenance from the start:

- **Keep it small.** Twenty sites you vouch for beats two hundred you don't.
- **Check the links on a schedule.** A weekly CI job that curls each member URL
  and opens an issue on failure takes twenty lines of YAML.
- **Publish a removal policy.** Say up front that dead sites get dropped after
  two failed checks and a month's notice.
- **Make the widget light.** A ring widget should be inline HTML on the member's
  own site — not a JavaScript include from a central server that might vanish.

That last one matters more than it looks. The whole appeal of a webring is that
it's decentralised. The moment you host a shared script that every member must
load, you've rebuilt the centralised platform you were trying to escape — just
with worse uptime.

## Why bother

A webring is a recommendation engine where the recommendation is a *promise*:
this person thought this other person's site was worth your time. There's no
engagement metric in the loop, no ad inventory to fill, and nothing to optimise
except the actual quality of the sites in the ring.

That's a small thing. It's also the entire difference.
