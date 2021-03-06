# ftnbuild

[![CI](https://github.com/mgmarlow/ftnbuild/actions/workflows/main.yml/badge.svg)](https://github.com/mgmarlow/ftnbuild/actions/workflows/main.yml)
[![npm version](https://badge.fury.io/js/ftnbuild.svg)](https://badge.fury.io/js/ftnbuild)

ftnbuild is a JS processor for [Fountain](http://fountain.io/). Forked from the lovely [Fountain.js](https://github.com/mattdaly/Fountain.js) implementation by Matt Daly.

ftnbuild extends Fountain.js with new features designed to make it work better with programmatic integrations. The core lexer is currently the same as the original Fountain.js project, but the goal is to improve it along with the parsing engine to support different output formats.

Roadmap to `v1.0.0`:

- [x] JSON output mvp
- [ ] JSON: inlineLexer
- [ ] JSON: boneyard/note support (fetch root for every token)
- [ ] Try out w/ codesandbox + React
- [ ] Expose proper AST via `parse` API (breaking)
- [ ] Script metadata and analytics
- [ ] Contributing guide

## Installation

```
npm install ftnbuild
```

## Usage

`#parse` arguments:

1. Fountain file as a string
2. (Optional) options object

```js
parse(screenplay, {
  format: 'html', // html (default) or json
})
```

Returns an object containing:

- `title`: string
- `content`: object with `titlePage` and `script`

The shape of `content.titlePage` and `content.script` will change depending on your desired format.

### Parse as HTML

```js
import fs from 'fs'
import { parse } from 'ftnbuild'

const contents = fs.readFileSync('screenplay.fountain', { encoding: 'utf-8' })
const output = parse(contents)
// output.title -> 'Big Fish'
// output.content.titlePage -> '<h1>Big Fish</h1><p class="author">...'
// output.content.script -> '<h2><span class="bold">FADE IN:</span></h2>...'
```

### Parse as JSON

(good for programmatic integrations)

```js
import fs from 'fs'
import { parse } from 'ftnbuild'

const contents = fs.readFileSync('screenplay.fountain', { encoding: 'utf-8' })
const output = parse(contents, { format: 'json' })
// output.title -> "BRICK & STEEL"
// output.content.titlePage -> { "author": "Stu Maschwitz", ... }
// output.content.script ->
// {
//   "children": [
//     {
//       "type": "slugline",
//       "value": "EXT. BRICK'S PATIO - DAY"
//     },
//     {
//       "type": "dialogue_block",
//       "character": "STEEL",
//       "children": [
//         {
//           "type": "dialogue",
//           "value": "Beer's ready!"
//         }
//       ]
//     }
//   ]
// }
```

### Get the raw tokens

(write your own parser)

**Note**: The tokens are returned in reverse order. Take a look at `src/formats/` for examples of creating a parser/formatter.

```js
import fs from 'fs'
import { tokenize } from 'ftnbuild'

const contents = fs.readFileSync('screenplay.fountain', { encoding: 'utf-8' })
const tokens = tokenize(contents)
// [
//   ...,
//   { type="scene_heading", text="EXT. BRICK'S PATIO - DAY", scene_number="1"},
//   { type="action", text="A gorgeous day. The su...emplating -- something."},
//   { type="action", text="The SCREEN DOOR slides ...es with two cold beers."},
//   { type="dialogue_begin"},
//   ...
// ]
```

## Syntax Support

The full Fountain syntax is supported.

Currently ftnbuild supports a limited range of key-value pairs for title pages:

- Title, Credit, Author/s, Source, Notes, Draft date, Date, Contact, Copyright

## Styling guide

### Class and element list

Title page:

- `.credit`
- `.author`
- `.authors`
- `.source`
- `.notes`
- `.draft-date`
- `.date`
- `.contact`
- `.copyright`

Script:

- Inline formats: `.bold`, `.italic`, `.underline`
- Transitions: `h2`
- Sluglines: `h3`
- Character: `h4`
- Dual dialogue: `.dual-dialogue`
- Dialogue block: `.dialogue`
- Parenthetical: `.parenthetical`
- Dialogue, action: `p`
- Section: `p.section`
- Synopsis: `p.synopsis`
- Centered: `p.centered`
- Page break: `hr`
- Line break: `br`
