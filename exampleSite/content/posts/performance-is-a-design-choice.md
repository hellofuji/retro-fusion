---
title: "Performance Is a Design Choice, Not a Cleanup Task"
date: 2026-01-09
description: "Most slow sites aren't slow because of engineering. They're slow because nobody decided they shouldn't be."
summary: "Speed is decided in the design review, not in the performance audit. By the time you're optimising, the expensive decisions have already shipped."
categories: ["Performance"]
tags: ["performance", "web-vitals", "static-sites", "design"]
---

Every performance audit I've ever run has the same shape. The site loads in
eleven seconds. I open the network panel. There's a 2.4MB hero image, three
analytics vendors, a chat widget, and a font stack with nine weights.

None of that was an engineering mistake. Every one of those was a *decision*
someone made in a design review, and every one of them was approved.

## The budget conversation

The reason performance work feels like cleanup is that the budget arrives too
late. By the time anyone says "we should be faster," the hero image has already
been cropped and approved, the chat widget is in the contract, and the marketing
team has already A/B tested the nine font weights into a 4% conversion lift.

The fix is boring: **agree on a number before the design exists.**

> This page will ship under 500KB total, including images and fonts.

That single sentence eliminates most of the expensive decisions for free,
because now they have to be argued for rather than assumed.

## What actually costs you

Ranked by how often they show up in real audits:

1. **Unoptimised images.** Usually the single biggest win. A 4000px-wide JPEG
   displayed at 800px is 3.5MB of pure waste. Responsive `srcset` plus a modern
   format fixes it, and it's a build-step change, not a redesign.
2. **Third-party scripts.** Every one is a separate DNS lookup, TLS handshake,
   and main-thread tax you don't control. They also tend to load *more* scripts.
3. **Fonts.** Every weight is a file. A variable font is often one file for the
   whole range.
4. **JavaScript frameworks for static content.** If the content doesn't change
   without a deploy, it didn't need a client-side router.

Notice that three of the four are fixable at build time, and the fourth is a
procurement decision.

## The static site advantage

This is why static sites keep winning benchmarks that frameworks were supposed
to win. When you pre-render HTML at build time:

- There's no server rendering on the request path — it's a file read.
- There's no hydration cost, because there's nothing to hydrate.
- There's no database query, so there's nothing to cache.
- Your CDN story is trivial, because everything is already immutable.

The trade is real: no personalisation, no real-time data, and a build step
between you and a typo fix. For a blog, a marketing site, or documentation,
that trade is almost always worth taking.

## The uncomfortable part

The uncomfortable part is that performance and business incentives are often
misaligned in the short term. The chat widget does convert. The tracking pixels
do feed attribution. The 4MB hero *does* look great on the designer's 5K
display.

Which is exactly why the budget has to be a constraint rather than a
preference. Constraints force the trade-offs into the open, where they can be
argued about by people with the full picture — instead of being discovered
eighteen months later by someone with a Lighthouse report and no authority to
change anything.
