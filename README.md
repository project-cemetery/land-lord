# Land-lord

Simple temaplte for creating static sites with no effort.

## Usage

- [Create a repository from the template](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)
- Install dependencies by `yarn install`
- Start dev server by `yarn gulp dev`
- You are great!

## How to write code

For markup use [pug](https://pugjs.org/), just write code in `./src/index.pug`. All styles will be processed with [PostCSS](https://postcss.org). All scripts will be processed with [esbuild](https://esbuild.github.io).

Warning! This template is for very small landing pages. Therefore, all scripts and styles will be inlined into the HTML.

### Widgets

This temaplte has s very simple component-like system — you can create pug-file, css-file and js-file for reusable component.

Some rules:

- Use `[name].pug` filename for markup of widget and put mixin inside, then use mixin in other pug-file.
- Use `[name].entry.js` filename for scripts of widget, it will be scoped by [IFFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).
- Use `[name].css` filename for styles of widget, use [BEM Naming](http://getbem.com/naming/) (or other naming-strategy) for scoping.

[Example](./src/widgets).
