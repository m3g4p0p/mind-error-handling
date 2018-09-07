# with-error-handler

Remove error handling boilerplate from node callbacks.

## Installation

```bash
yarn install with-error-handler
```

## Usage

```javascript
fs.readdir(__dirname, (error, files) => {
  if (error) throw error
  // ...
})
```

Becomes:

```javascript
const weh = require('with-error-handler')

fs.readdir(__dirname, weh(files => {
  // ...
}))
```

This will throw the error by default. It is also possible to pass an error handler instead:

```javascript
fs.readdir(__dirname, weh(files => {
  // ...
}, console.error))
```

When passing `false` as the second argument, the error will be silently ignored:

```javascript
fs.readdir(__dirname, weh(files => {
  // ...
}, false))
```

## License

MIT
