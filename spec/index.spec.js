const withErrorHandler = require('../lib/index')

describe('withErrorHandler', () => {
  const callback = jasmine.createSpy('callback')
  const handleError = jasmine.createSpy('handleError')

  beforeEach(() => {
    callback.calls.reset()
    handleError.calls.reset()
  })

  describe('no error occurred', () => {
    it('should call the callback', () => {
      const doSomething = callback => callback(null, 'foo', 42)

      doSomething(withErrorHandler(callback, handleError))
      expect(callback).toHaveBeenCalledWith('foo', 42)
      expect(handleError).not.toHaveBeenCalled()
    })

    it('should apply this', done => {
      const context = {}
      const doSomething = callback => callback.call(context, null)

      doSomething(withErrorHandler(function () {
        expect(this).toBe(context)
        done()
      }))
    })
  })

  describe('an error did occur', () => {
    const error = new Error('something went wrong')
    const doSomething = callback => callback(error)

    it('should throw by default', done => {
      try {
        doSomething(withErrorHandler(callback))
      } catch (e) {
        expect(e).toBe(error)
        expect(callback).not.toHaveBeenCalled()
        done()
      }
    })

    it('should call the error handler', () => {
      doSomething(withErrorHandler(callback, handleError))
      expect(callback).not.toHaveBeenCalled()
      expect(handleError).toHaveBeenCalledWith(error)
    })

    it('should work with promises', done => {
      new Promise((resolve, reject) => {
        doSomething(withErrorHandler(resolve, reject))
      }).then(callback).catch(handleError).finally(() => {
        expect(callback).not.toHaveBeenCalled()
        expect(handleError).toHaveBeenCalledWith(error)
        done()
      })
    })

    it('should do nothing when passing false', () => {
      doSomething(withErrorHandler(callback, false))
      expect(callback).not.toHaveBeenCalled()
    })
  })
})
