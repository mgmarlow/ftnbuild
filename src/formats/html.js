import { inlineLexer } from '../inlineLexer'

export const html = (tokens) => {
  const titlePage = []
  const tags = []

  let title
  let i = tokens.length

  while (i--) {
    const token = tokens[i]
    token.text = inlineLexer(token.text)

    switch (token.type) {
      case 'title':
        titlePage.push('<h1>' + token.text + '</h1>')
        title = token.text.replace('<br />', ' ').replace(/<(?:.|\n)*?>/g, '')
        break
      case 'credit':
        titlePage.push('<p class="credit">' + token.text + '</p>')
        break
      case 'author':
        titlePage.push('<p class="authors">' + token.text + '</p>')
        break
      case 'authors':
        titlePage.push('<p class="authors">' + token.text + '</p>')
        break
      case 'source':
        titlePage.push('<p class="source">' + token.text + '</p>')
        break
      case 'notes':
        titlePage.push('<p class="notes">' + token.text + '</p>')
        break
      case 'draft_date':
        titlePage.push('<p class="draft-date">' + token.text + '</p>')
        break
      case 'date':
        titlePage.push('<p class="date">' + token.text + '</p>')
        break
      case 'contact':
        titlePage.push('<p class="contact">' + token.text + '</p>')
        break
      case 'copyright':
        titlePage.push('<p class="copyright">' + token.text + '</p>')
        break

      case 'scene_heading':
        tags.push(
          '<h3' +
            (token.scene_number ? ' id="' + token.scene_number + '">' : '>') +
            token.text +
            '</h3>',
        )
        break
      case 'transition':
        tags.push('<h2>' + token.text + '</h2>')
        break

      case 'dual_dialogue_begin':
        tags.push('<div class="dual-dialogue">')
        break
      case 'dialogue_begin':
        tags.push(
          '<div class="dialogue' + (token.dual ? ' ' + token.dual : '') + '">',
        )
        break
      case 'character':
        tags.push('<h4>' + token.text + '</h4>')
        break
      case 'parenthetical':
        tags.push('<p class="parenthetical">' + token.text + '</p>')
        break
      case 'dialogue':
        tags.push('<p>' + token.text + '</p>')
        break
      case 'dialogue_end':
        tags.push('</div> ')
        break
      case 'dual_dialogue_end':
        tags.push('</div> ')
        break

      case 'section':
        tags.push(
          '<p class="section" data-depth="' +
            token.depth +
            '">' +
            token.text +
            '</p>',
        )
        break
      case 'synopsis':
        tags.push('<p class="synopsis">' + token.text + '</p>')
        break

      case 'note':
        tags.push('<!-- ' + token.text + '-->')
        break
      case 'boneyard_begin':
        tags.push('<!-- ')
        break
      case 'boneyard_end':
        tags.push(' -->')
        break

      case 'action':
        tags.push('<p>' + token.text + '</p>')
        break
      case 'centered':
        tags.push('<p class="centered">' + token.text + '</p>')
        break

      case 'page_break':
        tags.push('<hr />')
        break
      case 'line_break':
        tags.push('<br />')
        break
    }
  }

  return {
    title,
    content: { title_page: titlePage.join(''), script: tags.join('') },
  }
}
