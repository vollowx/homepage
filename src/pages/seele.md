---
layout: ../layouts/MDLayout.astro
title: 'seele - Standard Extensible Elements'
---

# seele - Standard Extensible Elements

[![npm package](https://img.shields.io/npm/v/%40vollowx%2Fseele)](https://www.npmjs.com/package/@vollowx/seele)
[![builds.sr.ht status](https://builds.sr.ht/~lucaz/seele.svg)](https://builds.sr.ht/~lucaz/seele?)

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
