module.exports = {
  input: {},
  setInput: function(input, value) {
    this.input[input] = value
  },
  getInput: function(input) {
    return this.input[input]
  }
}
