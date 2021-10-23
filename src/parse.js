import { tokenize } from './tokenize'
import { html } from './formats/html'

const defaultOptions = {
  format: 'html',
}

export const parse = (script, opt = defaultOptions) => {
  const tokens = tokenize(script)
  return html(tokens)
}
