---
layout: ../../layouts/MDBlogLayout.astro
title: 'Anchor and button, how to make them components?'
pubDate: 2026-10-19
description: 'Native elements nested or not; merge or separate'
tags: ['web-components', 'web']
---

I've been writing a (or some) web component library for a long time, and
always, _buttons_ are the first ones to be implemented. Buttons in design
systems can be not just `<button>`s, but also links (anchors) deep down
though they look all the same.

## Design decisions on buttons

Let's first talk about buttons. You usually have such two options:

1. Native elements inside
2. Use the host as the button

The former one leads to the structure down below, and you will have to write
bindings for attributes including `aria-label`, `aria-expanded`, etc, not to
mention that they also need to be prefixed, while the un-prefixed ones have to
be observed and handled as well. Furthermore, methods and events like `focus()`
and `click` need to be redirected, too. It's really a complicated work to do,
but in return you can use your component as `CommandInvoker`. Does that worth
it?

```html
<my-button data-aria-haspopup=true (role=presentation)>
  #shadow-root
    <button aria-haspopup=true>
    </button>
</my-button>
```

The latter one is mush simpler - `[tabindex=0]` and `[role=button]`, plus event
listeners to the keyboard pretty much make it a functional button.

```html
<my-button aria-haspopup=true (tabindex=0 role=button)>
  #shadow-root
</my-button>
```

## Writing button-look-alike anchors

For the approach 1 of buttons, people usually write anchor and button feature
in the same component, judging which one it is through `[href]`. This pattern
is used by [material-web][mat-web].

For the approach 2, there are options. You can write a separate anchor
component nesting `<a>` inside and style it the same as button, some also choose
to extract the styles for buttons from `CSSStyleSheet` to CSS files, and use
native unwrapped `<a>` elements, like [Spectrum Web Components][spectrum]. Some
does not provide such component, like vaadin.

Without a native anchor element being used, you can still navigate through
`location = 'target'` or `navigation.navigate('target')`, but you will lose
features provided browser like copying the link from context menu, previewing
and open in new tab, etc.

> Note: Use the HTML a element to create links whenever possible. Browsers
> provide valuable functionality for native HTML links, e.g., open the target in
> a new window and copy the target URL to the system clipboard.
>
> https://www.w3.org/WAI/ARIA/apg/patterns/link/examples/link/

Therefore I prefer not to pretend that non-`<a>` element is a link through JS.

## How to style anchor element without extra selectors

Now this is a specific case where buttons are those with approach 2 and styles
are applied to `:host`, while links are like below, and the styles need to get
applied to `a` instead of `:host` since it is the interactive element now.

```html
<my-button-link href=target>
  #shadow-root
    <a href=target>
    </a>
</my-button-link>
```

```css
:host {
  display: contents;
}

a {
  all: inherit;
  display: inline-flex;
}
```

Now anchors can share the styles with buttons. That's the solution I'd like to
share.

[mat-web]: https://github.com/material-components/material-web/blob/main/button/internal/button.ts
[spectrum]: https://opensource.adobe.com/spectrum-web-components/components/button/#link-api-deprecation
