const core = require('@actions/core');
const github = require('@actions/github');

beforeEach(jest.clearAllMocks)

describe('#status', () => {
  beforeEach(() => github.setEvent('status'))

  describe('when the received context is from a specified context', () => {
    describe('when the received context status is "error"', () => {
      beforeEach(() => {
        core.setInput('context', 'specified')
        github.setPayload({
          context: 'specified',
          state: 'error'
        })
        jest.isolateModules(() => {
          require('../index.js')
        })
      })

      it('updates the commit status as "error"', () => {
        expect(github.createStatus).toHaveBeenCalledTimes(1)
        expect(github.createStatus).toHaveBeenCalledWith(expect.objectContaining({
          sha: 'sha',
          state: 'error',
          context: 'conditional-status'
        }))
      })
    })

    describe('when the received context status is "failure"', () => {
      beforeEach(() => {
        core.setInput('context', 'specified')
        github.setPayload({
          context: 'specified',
          state: 'failure'
        })
        jest.isolateModules(() => {
          require('../index.js')
        })
      })

      it('updates the commit status as "error"', () => {
        expect(github.createStatus).toHaveBeenCalledTimes(1)
        expect(github.createStatus).toHaveBeenCalledWith(expect.objectContaining({
          sha: 'sha',
          state: 'error',
          context: 'conditional-status'
        }))
      })
    })

    describe('when the received context status is "pending"', () => {
      beforeEach(() => {
        core.setInput('context', 'specified')
        github.setPayload({
          context: 'specified',
          state: 'pending'
        })
        jest.isolateModules(() => {
          require('../index.js')
        })
      })

      it('updates the commit status as "pending"', () => {
        expect(github.createStatus).toHaveBeenCalledTimes(1)
        expect(github.createStatus).toHaveBeenCalledWith(expect.objectContaining({
          sha: 'sha',
          state: 'pending',
          context: 'conditional-status'
        }))
      })
    })

    describe('when the received context status is "success"', () => {
      beforeEach(() => {
        core.setInput('context', 'specified')
        github.setPayload({
          context: 'specified',
          state: 'success'
        })
        jest.isolateModules(() => {
          require('../index.js')
        })
      })

      it('updates the commit status as "success"', () => {
        expect(github.createStatus).toHaveBeenCalledTimes(1)
        expect(github.createStatus).toHaveBeenCalledWith(expect.objectContaining({
          sha: 'sha',
          state: 'success',
          context: 'conditional-status'
        }))
      })
    })
  })

  describe('when the received context is not from a specified context', () => {
    beforeEach(() => {
      core.setInput('context', 'not-specified')
        github.setPayload({
          context: 'specified',
          state: 'success'
        })
      jest.isolateModules(() => {
        require('../index.js')
      })
    })

    it('does not update the commit status', () => {
      expect(github.createStatus).not.toHaveBeenCalled()
    })
  })
})
