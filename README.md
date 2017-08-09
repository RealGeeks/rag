# Rag

Real Geeks UI Kit.

Every folder except _lib_ and _generated_ is a UI component.

## Available commands

### `npm run prepublish`

Create _generated/_variables.scss_ from _lib/js/variables.js_ and inline _svg_
files into _generated/_images.scss_ while also creating _generated/png.css_ as
fallback for IE8. This is run automatically when publishing the module.

### `npm run css`

Generate the UI stylesheet by compiling _style.scss_.

## Components

### Surface

A _surface_ is an element that has interactions enabled (touch/mouse).

### Facebook Login Button

An iframe to hold a Facebook login button.  Requires an `iframeSource` prop
which should be something like
`//www.somedomain.com/socialmedia/facebook/button/`.

## Development
