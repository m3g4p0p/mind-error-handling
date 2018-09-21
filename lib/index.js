'use strict'

const mindErrorHandling = (onSuccess, onError) => function mind (error, ...args) {
  if (error) {
    if (typeof onError === 'function') {
      onError.call(this, error)
    } else if (onError !== false) {
      throw error
    }
  } else if (onSuccess) {
    return onSuccess.apply(this, args)
  }
}

module.exports = mindErrorHandling
