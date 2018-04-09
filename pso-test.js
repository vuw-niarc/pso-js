const search = require('./pso')

describe('pso', () => {
  it('works with euclidean cost fn', () => {
    const actual = [ 500, 500, Math.PI ]
    const costFn = ([ x, y, r ]) => Math.sqrt(
      (Math.abs(actual[0] - x) / 1000) ** 2 +
      (Math.abs(actual[1] - y) / 1000) ** 2 +
      (Math.abs(actual[2] - r) / Math.PI / 2) ** 2
    )
    const searchSpace = {
      lower: [ 0, 0, 0 ],
      upper: [ 1000, 1000, Math.PI * 2 ]
    }
    
    const result = search(costFn, searchSpace)

    console.log(result)
  })
})
