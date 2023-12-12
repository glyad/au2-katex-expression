# The Aurelia 2 KaTeX Component

This is a plugin for Aurelia 2 that provides a custom element for rendering math expressions using [KaTeX](https://katex.org/).

## Usage

### Install

Using NPM:

```shell
    npm i au2-katex-expression
```

If you want to directly use plugin's git repo:

```shell
    npm install git@github.com:username/au2-katex-expression.git
```

or

```shell
    npm install https://some.git.server/username/au2-katex-expression.git
```

If you want to install from local folder, don't do "npm install ../local/au2-katex-expression/" as the folder's `node_modules/` will cause webpack to complain about duplicated dependency like "@aurelia/metadata".

In this plugin's folder, do

```shell
    npm pack
```

This will pack the plugin into au2-katex-expression.tgz file.

### Register the plugin

In an application project's main, usually main.ts, file .

```js

import * as katexPlugin from 'au2-katex-expression';
...
...
Aurelia
  // Register the plugin
  .register(katexPlugin) // Load all exports from the plugin
  .app(MyApp)
  .start();
```

### Consume the plugin

Declaratively in a view template:

```html
<katex-expression expression="x^2 + y^2 = z^2"></katex-expression>
```

Using the `expression` attribute to bind to a property on the view model:

```ts
export class App {
  expression = 'x^2 + y^2 = z^2';
}
```

```html
<katex-expression expression.bind="expression"></katex-expression>
```

## Development

### Start dev web server

```shell
    npm start
```

```text
Note:
This plugin project comes with a dev-app. The above command starts the dev app in `dev-app/` 
folder. The plugin source code is `src` folder.
```

### Build the plugin in production mode

```shell
    npm run build
```

It builds plugin into `dist/index.js` file.

```text
Note:
When you do `npm publish` or `npm pack` to prepare the plugin package, it automatically run
the above build command by the `prepare` script defined in your package.json `"scripts"` section.
```

### Unit Tests

```shell
    npm run test
```

Run unit tests in watch mode.

```shell
    npm run test:watch
```

### Analyze webpack bundle

```shell
    npm run analyze
```

### Acknowledgement

This project is bootstrapped by [aurelia/new](https://github.com/aurelia/new).

## License

`The Aurelia 2 KaTeX Component` is licensed under the [MIT License](http://opensource.org/licenses/MIT).
