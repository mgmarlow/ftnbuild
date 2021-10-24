import uniq from 'lodash/uniq'
import findLast from 'lodash/findLast'

export const json = (tokens) => {
  const characters = []
  const sluglines = []
  const titlePage = {}
  const root = {
    type: 'root',
    children: [],
    metadata: {},
  }

  let title
  let i = tokens.length

  const getLastDialogue = () => {
    const dialogue = findLast(
      root.children,
      (t) => t.type === 'dialogue_block' || t.type === 'dual_dialogue_block',
    )

    if (!dialogue) {
      throw new Error('found dialogue contents, but no dialogue beginning')
    }

    return dialogue
  }

  while (i--) {
    const token = tokens[i]
    // TODO: Fountain.js doesn't lex token text. Instead, it replaces
    // tokens with equivalent HTML tags, which support nested context.
    // The JSON format cannot replicate this, since it actually needs
    // the context of the tokens to create nested JSON trees.
    // token.text = inlineLexer(token.text)

    switch (token.type) {
      case 'title':
        title = token.text
        titlePage.title = token.text
        break
      case 'credit':
        titlePage.credit = token.text
        break
      case 'author':
        titlePage.author = token.text
        break
      case 'authors':
        titlePage.authors = token.text
        break
      case 'source':
        titlePage.source = token.text
        break
      case 'notes':
        titlePage.notes = token.text
        break
      case 'draft_date':
        titlePage.draft_date = token.text
        break
      case 'date':
        titlePage.date = token.text
        break
      case 'contact':
        titlePage.contact = token.text
        break
      case 'copyright':
        titlePage.copyright = token.text
        break

      case 'scene_heading':
        root.children.push({
          type: 'slugline',
          value: token.text,
          metadata: {
            scene_number: token.scene_number,
          },
        })
        sluglines.push(token.text)
        break
      case 'transition':
        root.children.push({ type: 'transition', value: token.text })
        break

      case 'dual_dialogue_begin':
        root.children.push({ type: 'dual_dialogue_block', children: [] })
        break
      case 'dialogue_begin':
        root.children.push({ type: 'dialogue_block', children: [] })
        break
      case 'character': {
        const dialogue = getLastDialogue()
        dialogue.character = token.text
        characters.push(token.text)
        break
      }
      case 'parenthetical': {
        const dialogue = getLastDialogue()
        dialogue.children.push({ type: 'parenthetical', value: token.text })
        break
      }
      case 'dialogue': {
        const dialogue = getLastDialogue()
        dialogue.children.push({ type: 'dialogue', value: token.text })
        break
      }

      case 'section':
        root.children.push({
          type: 'section',
          value: token.text,
          metadata: { depth: token.depth },
        })
        break
      case 'synopsis':
        root.children.push({ type: 'synopsis', value: token.text })
        break

      case 'action':
        root.children.push({ type: 'action', value: token.text })
        break
      case 'centered':
        root.children.push({ type: 'centered', value: token.text })
        break

      case 'dialogue_end':
      case 'dual_dialogue_end':
      case 'note':
      case 'boneyard_begin':
      case 'boneyard_end':
      case 'page_break':
      case 'line_break':
        break
    }
  }

  root.metadata = {
    characters: uniq(characters),
    sluglines,
  }

  return {
    title,
    content: { titlePage: titlePage, script: root },
  }
}
