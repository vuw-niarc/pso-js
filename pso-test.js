const search = require('./pso')

describe('pso', () => {
  it('works with euclidean cost fn', () => {
    const actual = [ 500, 500, Math.PI ]
    const err = [ 50, 50, Math.PI * 1.5 ]
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
  
  it('works with euclidean cost fn with local minima', () => {
    const actual = [ 500, 500, Math.PI ]
    const err = [ 50, 50, Math.PI * 1.5 ]
    const costFn = ([ x, y, r ]) => Math.sqrt(
      (Math.abs(actual[0] - x) / 1000) ** 2 +
      (Math.abs(actual[1] - y) / 1000) ** 2 +
      (Math.abs(actual[2] - r) / Math.PI / 2) ** 2
    )
    const costFnDash = (p) => {
      const err = costFn(p)
      return err > 0.4 && err < 0.5
        ? 0.4 + (0.5 - err)
        : err
    }

    const searchSpace = {
      lower: [ 0, 0, 0 ],
      upper: [ 1000, 1000, Math.PI * 2 ]
    }
    
    const result = search(costFnDash, searchSpace)

    console.log(result)
  })

  // it('asdgf', () => {
  //   const a0 = 10000, a1 = 3, a2 = 5, a3 = 2;
  //   const costFnDash = (p) => {
  //     const err = p
  //     return err > 40 && err < 60
  //       ? 40 + (60 - err)
  //       : err
  //   }

  //   let last = 0
  //   for (let x = 0; x < 100; x++) {
  //     const err = costFnDash(x)
  //     console.log(`${x}\t${err}\t${err - last}`)
  //     last = err
  //   }
  // })
})
