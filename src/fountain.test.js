import fs from 'fs'
import fountain from './fountain'

describe('fountain', () => {
  describe('#parse', () => {
    it('should run against fixture', () => {
      const sample = fs.readFileSync('./samples/brick&steel.fountain', {
        encoding: 'utf-8',
      })
      expect(fountain.parse(sample, true)).toMatchSnapshot()
    })
  })

  describe('#tokenize', () => {
    it('should run against fixture', () => {
      const sample = fs.readFileSync('./samples/brick&steel.fountain', {
        encoding: 'utf-8',
      })
      expect(fountain.tokenize(sample)).toMatchSnapshot()
    })
  })
})
