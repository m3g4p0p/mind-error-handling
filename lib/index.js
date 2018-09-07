const withErrorHandler = (callback, handleError) => function withErrorHandler (err, ...args) {
  if (err) {
    if (typeof handleError === 'function') {
      handleError.call(this, err)
    } else if (handleError !== false) {
      throw err
    }
  } else {
    return callback.apply(this, args)
  }
}

module.exports = withErrorHandler
