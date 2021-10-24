import { tokenize } from './tokenize'
import { html } from './formats/html'
import { json } from './formats/json'

const defaultOptions = {
  format: 'html',
}

const formatters = {
  html,
  json,
}

export const parse = (script, opt = defaultOptions) => {
  const tokens = tokenize(script)

  const formatter = formatters[opt.format] || html

  return formatter(tokens)
}
