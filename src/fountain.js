import { html } from './formats/html'
import { tokenize } from './tokenize'

const parse = function (script, callback) {
  const tokens = tokenize(script)
  const output = html(tokens)

  if (typeof callback === 'function') {
    return callback(output)
  }

  return output
}

export default {
  tokenize: function (script) {
    return tokenize(script)
  },
  parse: function (script, callback) {
    return parse(script, callback)
  },
}
