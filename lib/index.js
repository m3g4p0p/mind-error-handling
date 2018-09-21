'use strict'

const mindErrorHandling = (onSuccess, onError) => function mind (err, ...args) {
  if (err) {
    if (typeof onError === 'function') {
      onError.call(this, err)
    } else if (onError !== false) {
      throw err
    }
  } else {
    return onSuccess.apply(this, args)
  }
}

module.exports = mindErrorHandling
