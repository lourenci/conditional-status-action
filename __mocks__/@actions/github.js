const context = {
  eventName: undefined,
  repo: {},
  sha: 'sha',
  payload: {},
}

const createStatus = jest.fn()

const GitHub = jest.fn(() => {
  return { repos: { createStatus } }
})

module.exports = {
  GitHub,
  context,
  setEvent: function(event) {
    context.eventName = event
  },
  setPayload: function(payload) {
    context.payload = payload
  },
  createStatus
}
