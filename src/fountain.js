import { html } from './formats/html'
import { tokenize } from './tokenize'

var parse = function (script, toks, callback) {
  if (callback === undefined && typeof toks === 'function') {
    callback = toks
    toks = undefined
  }

  const tokens = tokenize(script)
  const result = html(tokens)

  const output = {
    ...result,
    tokens: toks ? tokens.reverse() : undefined,
  }

  if (typeof callback === 'function') {
    return callback(output)
  }

  return output
}

export default {
  tokenize: function (script) {
    return tokenize(script)
  },
  parse: function (script, tokens, callback) {
    return parse(script, tokens, callback)
  },
}
