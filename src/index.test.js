import fs from 'fs'
import fountain from './index'

describe('fountain', () => {
  describe('#parse', () => {
    it('should match small fixture', () => {
      const sample = fs.readFileSync('./samples/brick&steel.fountain', {
        encoding: 'utf-8',
      })
      expect(fountain.parse(sample, true)).toMatchSnapshot()
    })

    it('should match large fixture', () => {
      const sample = fs.readFileSync('./samples/bigfish.fountain', {
        encoding: 'utf-8',
      })
      expect(fountain.parse(sample, true)).toMatchSnapshot()
    })
  })

  describe('#tokenize', () => {
    it('should match small fixture', () => {
      const sample = fs.readFileSync('./samples/brick&steel.fountain', {
        encoding: 'utf-8',
      })
      expect(fountain.tokenize(sample)).toMatchSnapshot()
    })

    it('should match large fixture', () => {
      const sample = fs.readFileSync('./samples/bigfish.fountain', {
        encoding: 'utf-8',
      })
      expect(fountain.tokenize(sample)).toMatchSnapshot()
    })
  })
})
