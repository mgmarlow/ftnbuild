import { tokenize } from './tokenize'
import { html } from './formats/html'

export const parse = (script, callback) => {
  const tokens = tokenize(script)
  const output = html(tokens)

  if (typeof callback === 'function') {
    return callback(output)
  }

  return output
}
