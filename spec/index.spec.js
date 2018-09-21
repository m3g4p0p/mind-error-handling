const meh = require('../lib/index')

describe('mindErrorHandling', () => {
  const onSuccess = jasmine.createSpy('callback')
  const onError = jasmine.createSpy('handleError')

  beforeEach(() => {
    onSuccess.calls.reset()
    onError.calls.reset()
  })

  describe('no error occurred', () => {
    it('should call the callback', () => {
      const doSomething = callback => callback(null, 'foo', 42)

      doSomething(meh(onSuccess, onError))
      expect(onSuccess).toHaveBeenCalledWith('foo', 42)
      expect(onError).not.toHaveBeenCalled()
    })

    it('should apply this', done => {
      const context = {}
      const doSomething = callback => callback.call(context, null)

      doSomething(meh(function () {
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
        doSomething(meh(onSuccess))
      } catch (e) {
        expect(e).toBe(error)
        expect(onSuccess).not.toHaveBeenCalled()
        done()
      }
    })

    it('should call the error handler', () => {
      doSomething(meh(onSuccess, onError))
      expect(onSuccess).not.toHaveBeenCalled()
      expect(onError).toHaveBeenCalledWith(error)
    })

    it('should work with promises', done => {
      new Promise((resolve, reject) => {
        doSomething(meh(resolve, reject))
      }).then(onSuccess).catch(onError).finally(() => {
        expect(onSuccess).not.toHaveBeenCalled()
        expect(onError).toHaveBeenCalledWith(error)
        done()
      })
    })

    it('should do nothing when passing false', () => {
      doSomething(meh(onSuccess, false))
      expect(onSuccess).not.toHaveBeenCalled()
    })
  })
})
