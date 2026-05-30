import { resolveEnding, debugAllMatches } from "./endingChecker"

const cases = [
  // success cases
  { stats: { food: 50, safety: 20, people: 3, morale: 68 }, expect: "sustainable_haven" },
  { stats: { food: 80, safety: 80, people: 80, morale: 80 }, expect: "new_dawn" },
  { stats: { food: 80, safety: 80, people: 1,  morale: 70 }, expect: "lone_overseer" },
  { stats: { food: 80, safety: 80, people: 20, morale: 0  }, expect: "benevolent_dictatorship" },
  { stats: { food: 80, safety: 10, people: 10, morale: 80 }, expect: "fog_merchants" },
  { stats: { food: 10, safety: 80, people: 80, morale: 10 }, expect: "iron_garrison" },
  { stats: { food: 10, safety: 10, people: 80, morale: 80 }, expect: "megacity_of_hope" },
  { stats: { food: 10, safety: 10, people: 10, morale: 80 }, expect: "optimistic_nomads" },

  // fail cases
  { stats: { food: 0,  safety: 10, people: 1,  morale: 9  }, expect: "starvation_graveyard" },
  { stats: { food: 0,  safety: 10, people: 5,  morale: 0  }, expect: "cannibalistic_feast" },
  { stats: { food: 80, safety: 0,  people: 80, morale: 50 }, expect: "breached_wall" },
  { stats: { food: 80, safety: 0,  people: 10, morale: 50 }, expect: "swallowed_by_fog" },
  { stats: { food: 10, safety: 80, people: 5,  morale: 0  }, expect: "mass_despair" },
  { stats: { food: 10, safety: 0,  people: 5,  morale: 0  }, expect: "total_anarchy" },
  { stats: { food: 80, safety: 80, people: 0,  morale: 50 }, expect: "ghost_camp" },
  { stats: { food: 10, safety: 80, people: 0,  morale: 10 }, expect: "great_exodus" },
]

let pass = 0; let fail = 0
for (const c of cases) {
  const result = resolveEnding(c.stats)
  const ok = result === c.expect
  if (ok) { pass++ } else {
    fail++
    console.log(`FAIL food=${c.stats.food} safety=${c.stats.safety} people=${c.stats.people} morale=${c.stats.morale}`)
    console.log(`  expected: ${c.expect}`)
    console.log(`  got:      ${result}`)
    console.log(`  matches:  ${debugAllMatches(c.stats).join(", ")}`)
  }
}
console.log(`\n${pass}/${cases.length} passed`)
