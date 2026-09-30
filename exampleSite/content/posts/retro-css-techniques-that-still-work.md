---
title: "Retro CSS Techniques That Still Work in 2026"
date: 2026-02-20
lastmod: 2026-03-01
description: "Beveled borders, tiled backgrounds, and 3D buttons — rebuilt with modern CSS, no images required."
summary: "The 90s look was originally made of GIFs and table hacks. Here's how to get the same effect with twenty lines of modern CSS and zero image requests."
categories: ["Design", "CSS"]
tags: ["css", "design", "retro", "frontend"]
series: ["The Small Web"]
cover:
  image: "/images/demo/cover-2.svg"
  alt: "Beveled retro UI buttons"
---

The classic Web 1.0 look was an accident of its tooling. People wanted raised
buttons, so they used `border: 2px outset`. They wanted tiled backgrounds, so
they shipped a 32×32 GIF and let the browser repeat it. They wanted gradients,
so they sliced a 1-pixel-wide image into a table.

Almost every one of those tricks now has a pure-CSS equivalent — which means the
retro aesthetic costs you *zero* extra network requests.

## Beveled borders without images

The `outset` and `inset` border styles still work, and they're the fastest way
to a 1996 button:

```css
.btn {
  background: #d4d0c8;
  border: 3px outset #ffffff;
  padding: 0.5em 1em;
}
.btn:active { border-style: inset; }
```

The catch is that `outset`/`inset` derive their shading from the element's own
`border-color`, which is fiddly to theme. A more controllable approach is a pair
of inset box-shadows:

```css
.window {
  background: #fff;
  border: 3px solid #000;
  box-shadow:
    inset -2px -2px 0 #6e6e6e,   /* dark bottom-right */
    inset  2px  2px 0 #ffffff,   /* light top-left  */
    4px 4px 0 rgba(0,0,0,0.35);  /* drop shadow     */
}
```

This gives you the light source in the top-left, exactly like the Win95 chrome
it's imitating, and every colour is a variable you can swap.

## Tiled backgrounds with gradients

The old approach was a repeating GIF. The new approach is a CSS gradient that
tiles as a background-image. A checkerboard is one `conic-gradient`:

```css
body {
  background-image: conic-gradient(
    from 90deg at 50% 50%,
    #b8b8b8 25%, #c0c0c0 0 50%,
    #b8b8b8 0 75%, #c0c0c0 0
  );
  background-size: 32px 32px;
}
```

A dotted grid is a single `radial-gradient` with a `background-size`. Diagonal
stripes are a `repeating-linear-gradient`. All of them scale to any DPI, all of
them are a few hundred bytes of CSS instead of a few kilobytes of PNG per tile.

## Retro title bars

The navy-to-teal gradient across the top of a window is a two-stop linear
gradient, and it's the single most recognisable element of the era:

```css
.window__bar {
  background: linear-gradient(90deg, #000080 0%, #008080 100%);
  color: #fff;
  font-weight: 700;
  padding: 5px 10px;
  border-bottom: 3px solid #000;
}
```

Pair it with three little `outset` squares on the right and you have a window
that reads as a window instantly.

## Where retro stops being a good idea

A few things from the era are worth leaving behind:

- **Table-based layout.** CSS Grid does everything tables did, with less markup
  and actual accessibility semantics.
- **`<font>` tags.** Custom properties exist now.
- **Tiny fixed-width layouts.** Fluid type via `clamp()` keeps the retro feel
  while remaining usable on a phone.
- **`<marquee>`.** Keep it as CSS animation so you can honour
  `prefers-reduced-motion` — which the real tag never could.

That last point is the whole thesis, really. The aesthetic was never the
problem. The *implementation* was. Keep the look, fix the engineering, and you
get something that feels nostalgic and performs better than most modern sites.
