const fs = require('fs')
const fountain = require('./fountain')

describe('fountain', () => {
  it('should run against fixture', () => {
    const sample = fs.readFileSync('./samples/brick&steel.fountain', {
      encoding: 'utf-8',
    })
    expect(fountain.parse(sample, true)).toMatchSnapshot()
  })
})
