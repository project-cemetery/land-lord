# Land-lord

Simple template for creating static sites with no effort.

- _Customizable_ — all configurations are exposed by default
- _Zero bundle-size_ — build-time system, no runtime dependencies

## Usage

- [Create a repository from the template](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)
- Install dependencies by `yarn install`
- Start dev server by `yarn gulp dev`
- You are great!

## Development

For markup use [pug](https://pugjs.org/), just write code in `./src/index.pug`. All styles will be processed with [PostCSS](https://postcss.org). All scripts will be processed with [esbuild](https://esbuild.github.io).

Warning! This template is for very small landing pages. Therefore, all scripts and styles will be inlined into the HTML by default. You can disable it.

### Widgets

This template has s very simple component-like system — you can create pug-file, css-file and js-file for reusable component.

Some rules:

- Use `[name].pug` filename for markup of widget and put mixin inside, then use mixin in other pug-file.
- Use `[name].entry.js` filename for scripts of widget, it will be scoped by [IFFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).
- Use `[name].css` filename for styles of widget, use [BEM Naming](http://getbem.com/naming/) (or other naming-strategy) for scoping.

[Example](./src/widgets).

## Production

Build page with `yarn gulp build` or use Docker. This template provide the Dockerfile — build container `docker build -t my-app .` and run production application `docker run -p 8080:8080 my-app`.
