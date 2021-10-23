# ftnbuild

ftnbuild is a JS processor for [Fountain](http://fountain.io/). Forked from the lovely [Fountain.js](https://github.com/mattdaly/Fountain.js) implementation by Matt Daly.

Roadmap:

- [ ] JSON output
- [ ] Update docs
- [ ] Better test coverage

## Installation

```
npm install ftnbuild
```

## Usage

Parse as HTML:

```js
import fs from 'fs'
import { parse } from 'ftnbuild'

const contents = fs.readFileSync('screenplay.fountain', { encoding: 'utf-8' })
const output = parse(contents)
// output.title -> 'Big Fish'
// output.content.title_page -> '<h1>Big Fish</h1><p class="author">...'
// output.content.script -> '<h2><span class="bold">FADE IN:</span></h2>...'
```

Parse as JSON (good for programmatic integrations):

```js
import fs from 'fs'
import { parse } from 'ftnbuild'

const contents = fs.readFileSync('screenplay.fountain', { encoding: 'utf-8' })
const output = parse(contents, { format: 'json' })
// TODO
```

Get the raw tokens (write your own parser):

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

```
wip
```
