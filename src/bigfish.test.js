import fs from 'fs'
import fountain from './index'

describe('fountain', () => {
  describe('#parse', () => {
    it('should match fixture', () => {
      const sample = fs.readFileSync('./samples/bigfish.fountain', {
        encoding: 'utf-8',
      })
      expect(fountain.parse(sample)).toMatchSnapshot()
    })

    describe('#json', () => {
      it('should match fixture', () => {
        const sample = fs.readFileSync('./samples/bigfish.fountain', {
          encoding: 'utf-8',
        })
        expect(fountain.parse(sample, { format: 'json' })).toMatchSnapshot()
      })
    })
  })

  describe('#tokenize', () => {
    it('should match fixture', () => {
      const sample = fs.readFileSync('./samples/bigfish.fountain', {
        encoding: 'utf-8',
      })
      expect(fountain.tokenize(sample)).toMatchSnapshot()
    })
  })
})
