# Rag

Real Geeks UI Kit.

## Usage

It is recommended that you include [Normalize.css](http://necolas.github.io/normalize.css/) and ideally from a [CDN](https://cdnjs.com/libraries/normalize).

Every folder except _lib_ and _generated_ is a UI component.

## Available commands

### `npm run scss`

Create _generated/_variables.scss_ from _lib/js/variables.js_ and inline _svg_ files into _generated/_images.scss_ while also creating _generated/png.css_ as fallback for IE8.

### `npm run css`

Generate the UI stylesheet by compiling _style.scss_.

## Components

### Surface

A _surface_ is an element that has interactions enabled (touch/mouse).

## Development

Make sure to execute `npm run scss` whenever changes are made to _lib/js/variables.js_ or any of the _svg_ files, and commit the generated files.

## Known Issues

Because css vendor prefixing is done on the client, the rendered markup is different than the one returned by the server, making them incompatible.
