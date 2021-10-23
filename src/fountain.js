import { html } from './formats/html'
import { regex } from './regex'

var lexer = function (script) {
  return script
    .replace(regex.boneyard, '\n$1\n')
    .replace(regex.standardizer, '\n')
    .replace(regex.cleaner, '')
    .replace(regex.whitespacer, '')
}

var tokenize = function (script) {
  var src = lexer(script).split(regex.splitter),
    i = src.length,
    line,
    match,
    parts,
    text,
    meta,
    x,
    xlen,
    dual,
    tokens = []

  while (i--) {
    line = src[i]

    // title page
    if (regex.title_page.test(line)) {
      match = line
        .replace(regex.title_page, '\n$1')
        .split(regex.splitter)
        .reverse()
      for (x = 0, xlen = match.length; x < xlen; x++) {
        parts = match[x].replace(regex.cleaner, '').split(/\:\n*/)
        tokens.push({
          type: parts[0].trim().toLowerCase().replace(' ', '_'),
          text: parts[1].trim(),
        })
      }
      continue
    }

    // scene headings
    if ((match = line.match(regex.scene_heading))) {
      text = match[1] || match[2]

      if (text.indexOf('  ') !== text.length - 2) {
        if ((meta = text.match(regex.scene_number))) {
          meta = meta[2]
          text = text.replace(regex.scene_number, '')
        }
        tokens.push({
          type: 'scene_heading',
          text: text,
          scene_number: meta || undefined,
        })
      }
      continue
    }

    // centered
    if ((match = line.match(regex.centered))) {
      tokens.push({ type: 'centered', text: match[0].replace(/>|</g, '') })
      continue
    }

    // transitions
    if ((match = line.match(regex.transition))) {
      tokens.push({ type: 'transition', text: match[1] || match[2] })
      continue
    }

    // dialogue blocks - characters, parentheticals and dialogue
    if ((match = line.match(regex.dialogue))) {
      if (match[1].indexOf('  ') !== match[1].length - 2) {
        // we're iterating from the bottom up, so we need to push these backwards
        if (match[2]) {
          tokens.push({ type: 'dual_dialogue_end' })
        }

        tokens.push({ type: 'dialogue_end' })

        parts = match[3].split(/(\(.+\))(?:\n+)/).reverse()

        for (x = 0, xlen = parts.length; x < xlen; x++) {
          text = parts[x]

          if (text.length > 0) {
            tokens.push({
              type: regex.parenthetical.test(text)
                ? 'parenthetical'
                : 'dialogue',
              text: text,
            })
          }
        }

        tokens.push({ type: 'character', text: match[1].trim() })
        tokens.push({
          type: 'dialogue_begin',
          dual: match[2] ? 'right' : dual ? 'left' : undefined,
        })

        if (dual) {
          tokens.push({ type: 'dual_dialogue_begin' })
        }

        dual = match[2] ? true : false
        continue
      }
    }

    // section
    if ((match = line.match(regex.section))) {
      tokens.push({ type: 'section', text: match[2], depth: match[1].length })
      continue
    }

    // synopsis
    if ((match = line.match(regex.synopsis))) {
      tokens.push({ type: 'synopsis', text: match[1] })
      continue
    }

    // notes
    if ((match = line.match(regex.note))) {
      tokens.push({ type: 'note', text: match[1] })
      continue
    }

    // boneyard
    if ((match = line.match(regex.boneyard))) {
      tokens.push({
        type: match[0][0] === '/' ? 'boneyard_begin' : 'boneyard_end',
      })
      continue
    }

    // page breaks
    if (regex.page_break.test(line)) {
      tokens.push({ type: 'page_break' })
      continue
    }

    // line breaks
    if (regex.line_break.test(line)) {
      tokens.push({ type: 'line_break' })
      continue
    }

    tokens.push({ type: 'action', text: line })
  }

  return tokens
}

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
