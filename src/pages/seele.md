---
layout: ../layouts/MDLayout.astro
title: 'seele - Standard Extensible Elements'
---

# seele - Standard Extensible Elements

[![npm package](https://img.shields.io/npm/v/%40vollowx%2Fseele)](https://www.npmjs.com/package/@vollowx/seele)
[![builds.sr.ht status](https://builds.sr.ht/~lucaz/seele.svg)](https://builds.sr.ht/~lucaz/seele?)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@vollowx/seele)

[https://tideover.cc/seele/](https://tideover.cc/seele/)
[docs/](https://tideover.cc/seele/docs/)

Seele (**S**tandard **E**xtensible **Ele**ments) is a extensible
[Web Components][web-comps] library with a focus on accessibility and
keyboard-control.

It also provides styled components in the following design guideline(s):

- [Material You Expressive](https://m3.material.io/)

![seele components screenshot](/20260619-seele-components.png)

## Features

What's the differences comparing to other projects?

- Accessible and keyboard-accessible - all components are based on the
  [APG Patterns][apg-patterns]
- Flexible - seele provides not only the styled components, but also the base
  ones and the mix-ins that compose them, allowing you to write your components
  easily
- Up-to-date - seele uses new Web features as much as possible, (see the README),
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

- [`ElementInternals`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals), Baseline 2023
- [Constructable Stylesheets](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet), Baseline 2024, C[^1] 90, F 126
- [`:dir()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:dir), Baseline 2023, C 120, F 49
- [`:state()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:state), Baseline 2024, C 125, F 126

And all that result in:

- Chromium: >= 125
- Firefox: >= 126

It is 2026 now, you don't really need to worry about this. But in the future,
these following web features might be used and require higher browser versions:

- [anchor()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/anchor), Baseline 2026, C 125, F 147, will remove the dependency `floating-dom`
- [`::view-*`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::view-transition), Baseline 2025, C 111, F 144, will optimize some animations for menu, dialog, etc

[^1]: C = Chromium, F = Firefox.

## Similar Projects

- [Material Web](https://material-web.dev/) - similar to seele, this project
  uses [Lit][lit] but is dedicated to Material Design instead of a generic
  library and developed by Google developers
- [M3E](https://matraic.github.io/m3e/#/getting-started/overview.html) - also
  built on [Lit][lit] and has a rather complete component collection
- [MUI (Material UI)](https://mui.com/material-ui/) - tried-and-tested React
  component library, supporting only Material Design 2
- [Vuetify](https://vuetifyjs.com/en/) - tried-and-tested Vue component library,
  supporting only Material Design 2
- [MDUI](https://www.mdui.org/en/) - [Lit][lit], Material Design 3, not much
  accessible but definitely complete

[web-comps]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[apg-patterns]: https://www.w3.org/WAI/ARIA/apg/patterns/
[lit]: https://lit.dev/
