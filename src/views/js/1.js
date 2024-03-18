function inputT(input) {
  const lines = input.trim().split('\n')
  const T = parseInt(lines[0], 10);
  const res = []

  let curLine = 1
  for (let i = 0; i < T; i++) {
    const n = parseInt(lines[curLine++], 10)
    const monsterHealths = lines[curLine++].split(' ').map(h => parseInt(h, 10))
    const [E, R] = lines[curLine++].split(' ').map(x => parseInt(x, 10))
    res.push(monsterNum(monsterHealths, E, R))
    console.log(monsterHealths, E, R)
    console.log('1111)', monsterHealths)

  }
  return res.map(res => res.join(' ')).join('\n')
}
function monsterNum(monsterHealths, E, R) {
  let sumE = 0, sumR = 0
  let halfHealths = new Set();
  let tempHealths = monsterHealths
  while (monsterHealths.some(health => health > 0)) {
    sumE++
    let isR = false
    for (let i = 0; i < monsterHealths.length; i++) {
      monsterHealths[i] = monsterHealths[i] - E
      if (monsterHealths[i] <= monsterHealths[i] * 0.5 && !halfHealths.has(i)) {
        halfHealths.add(i)
        isR = true
      }
    }

    while (isR) {
      sumR++
      isR = false
      for (let i = 0; i < monsterHealths.length; i++) {
        if (monsterHealths[i] > 0) {
          monsterHealths[i] = monsterHealths[i] - R
          if (monsterHealths[i] <= monsterHealths[i] * 0.5 && !halfHealths.has(i)) {
            halfHealths.add(i)
            isR = true
          }
        }
      }
    }
  }
  return [sumE, sumR]
}

let res = inputT(`3
5
100 50 60 80 70
25 10
5
100 50 60 80 70
20 20
5
100 200 300 4000 5000
50 1000`)

console.log('res',res)