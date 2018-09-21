# mind-error-handling

Remove error handling boilerplate from node-style callbacks.

## Installation

```bash
yarn install mind-error-handling
```

## Usage

Turns

```javascript
const fs = require('fs')

fs.readdir(__dirname, (error, files) => {
  if (error) {
    throw error
  }

  // ...
})
```

into

```javascript
const fs = require('fs')
const meh = require('mind-error-handling')

fs.readdir(__dirname, meh(files => {
  // ...
}))
```

This will throw the error by default. It is also possible to pass an error handler instead:

```javascript
fs.readdir(__dirname, meh(files => {
  // ...
}, console.error))
```

When passing `false` as the second argument, the error will be silently ignored:

```javascript
fs.readdir(__dirname, meh(files => {
  // ...
}, false))
```

## API

```
mindErrorHandling(onSuccess: function, onError?: boolen|function)
```


## License

MIT
