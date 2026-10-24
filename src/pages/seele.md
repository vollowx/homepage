---
layout: ../layouts/MDLayout.astro
title: 'seele - Standard Extensible Elements'
description: 'seele is an extensible Web Components library with a focus on accessibility and keyboard-control, and also provides Material You Expressive ones.'
---

# seele

[![npm package](https://img.shields.io/npm/v/%40vollowx%2Fseele)](https://www.npmjs.com/package/@vollowx/seele)
[![builds.sr.ht status](https://builds.sr.ht/~lucaz/seele.svg)](https://builds.sr.ht/~lucaz/seele?)

[https://tideover.cc/seele/](https://tideover.cc/seele/)
[docs/](https://tideover.cc/seele/docs/)

seele is an extensible [Web Components][web-comps] library with a focus on
accessibility and keyboard-control.

It provides not only basic classes, mixins and controllers for authoring
components in the design you want, but also provides styled components in the
following design guideline(s):

- [Material You Expressive](https://m3.material.io/)
- Windows 98, most styles are from [98.css](https://jdan.github.io/98.css/)

![seele components screenshot](/20260619-seele-components.png)

seele is an abbrev for "Standard Extensible Elements". Though having nothing to
do with "souls", seele is pronounced /ˈzeːlə/, as it is in German.

## Features

What's the differences comparing to other projects?

- Accessible and keyboard-accessible - all components are based on the
  [APG Patterns][apg-patterns]
- Flexible - seele provides not only the styled components, but also the base
  ones and the mix-ins that compose them, allowing you to write your components
  easily
- Up-to-date - seele uses new Web features as much as possible, (see below),
  meaning that its size is relatively small and the compatibility is not the
  best

## Documentations

[Documentations and demos](https://tideover.cc/seele/docs/).

## Download

- [npm package](https://www.npmjs.com/package/@vollowx/seele)
- [The source at SourceHut](https://sr.ht/~lucaz/seele)
- [The source at GitHub](https://github.com/vollowx/seele)

## Browser Support

seele relies on the folling modern web standards:

| feature                                                | baseline | Chromium | Firefox | Safari |
| ---                                                    | :---:    | :---:    | :---:   | :---:  |
| [`ElementInternals`][element-internals]                | 2023     | -        | -       | -      |
| [`:dir()`][:dir]                                       | 2023     | 120      | -       | -      |
| [Constructable Stylesheets][constructable-stylesheets] | 2024     | -        | 126     | -      |
| [`:state()`][:state]                                   | 2024     | 125      | 126     | -      |
| [`@starting-style`][starting-style]                    | 2024     | -        | -       | 17.5   |
| [`aria*Element`][aria-active] and similar              | 2025     | 135      | 136     | 16.4   |
| [Popover API][popover-api]                             | 2025     | -        | -       | 17     |
| [`CSSNumericValue`][css-numeric-value]                 | not yet  | -        | Nightly | -      |

_* `CSSNumericValue` is worked around currently so it does not raise the minimum
version of Firefox_

All of the above result in the following minimum requirements:

- Chromium: >= 135
- Firefox: >= 136
- Safari: >= 17.5

It is 2026 now, so you don't really need to worry about this. However, in the
future, the following web features might be used and require higher browser
versions:

| feature                  | benefits                             | baseline | Chromium | Firefox | Safari  |
| ---                      | ---                                  | :---:    | :---:    | :---:   | :---:   |
| [`anchor()`][anchor]     | remove the dependency `floating-dom` | 2026     | -        | 147     | 26      |
| [`alpha()`][alpha]       | replace `oklch()`                    | 2026     | 151      | 155     | 27      |
| [focusgroup][focusgroup] | replace roving focus code            | not yet  | 150      | not yet | not yet |

_* omitting a specific browser version means using that standard does not raise
the minimum required version of seele_

## Similar Projects

- [Material Web](https://material-web.dev/) - similar to seele, this project
  uses [Lit][lit] but is dedicated to Material Design instead of a generic
  library and developed by Google developers
- [MUI (Material UI)](https://mui.com/material-ui/) - tried-and-tested React
  component library, supporting only Material Design 2
- [Vuetify](https://vuetifyjs.com/en/) - tried-and-tested Vue component library,
  supporting only Material Design 2
- [M3 Svelte](https://kendell.dev/m3-svelte/) - Svelte component library, it
  seeks for the optimal size when building!
- [MDUI](https://www.mdui.org/en/) - [Lit][lit], Material Design 3, not much
  accessible but definitely complete
- [M3E](https://matraic.github.io/m3e/#/getting-started/overview.html) - also
  built on [Lit][lit] and has a rather complete component collection;
  unfortunately it's vibe-coded and has many weird behavior

[web-comps]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[apg-patterns]: https://www.w3.org/WAI/ARIA/apg/patterns/
[lit]: https://lit.dev/
[element-internals]: https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals
[:dir]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:dir
[constructable-stylesheets]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet
[:state]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:state
[aria-active]: https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/ariaActiveDescendantElement
[css-numeric-value]: https://developer.mozilla.org/en-US/docs/Web/API/CSSNumericValue
[popover-api]: https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
[starting-style]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style
[anchor]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/anchor
[alpha]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/alpha
[focusgroup]: https://open-ui.org/components/focusgroup-v2.explainer/
