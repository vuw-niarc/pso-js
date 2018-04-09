module.exports = function pso(
  costFn,
  searchSpace = { lower: [ 0, 0 ], upper: [ 1000, 1000 ] },
  swarmSize = 100,
  ω = 0.5,
  φp = 0.5,
  φg = 0.5
) {
  const particles = []
  
  let bestPosition
  let bestPositionCost = Infinity

  for (let i = 0; i < swarmSize; i++) {
    particles[i] = {}
    particles[i].position = randomVector(searchSpace)
    particles[i].bestPosition = particles[i].position
    particles[i].bestPositionCost = costFn(particles[i].position)
    particles[i].velocity = randomVelocity(searchSpace)

    if (particles[i].bestPositionCost < bestPositionCost) {
      bestPosition = particles[i].position
      bestPositionCost = particles[i].bestPositionCost
    }
  }

  const start = nanoTime()
  let j = 0

  while (nanoTime() - start < 1e8) {
    for (const particle of particles) {
      particle.position = [...particle.position]

      for (let dim = 0; dim < searchSpace.upper.length; dim++) {
        const rp = Math.random()
        const rg = Math.random()

        // ω vi,d + φp rp (pi,d-xi,d) + φg rg (gd-xi,d)
        particle.velocity[dim] = ω * particle.velocity[dim] +
          φp * rp * (particle.bestPosition[dim] - particle.position[dim]) +
          φg * rg * (bestPosition[dim] - particle.position[dim])
        
        particle.position[dim] += particle.velocity[dim]
      }

      const positionCost = costFn(particle.position)

      if (positionCost < particle.bestPositionCost) {
        particle.bestPosition = particle.position
        particle.bestPositionCost = positionCost

        if (positionCost < bestPositionCost) {
          bestPosition = particle.position
          bestPositionCost = particle.bestPositionCost
        }
      }
    }
    
    j++
  }

  return { j, bestPosition, bestPositionCost }
}

function randomVector({ upper, lower }) {
  return (new Array(upper.length)).fill(0).map(
    (_, i) => Math.random() * (upper[i] - lower[i]) + lower[i]
  )
}

function randomVelocity({ upper, lower }) {
  return (new Array(upper.length)).fill(0).map(
    (_, i) => Math.random() * 2 * (upper[i] - lower[i]) - (upper[i] - lower[i])
  )
}

function nanoTime() {
  const time = process.hrtime()
  return time[0] * 1e9 + time[1]
}
