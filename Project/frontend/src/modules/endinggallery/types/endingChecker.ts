export interface GameStats {
  food:   number   // 0-100
  safety: number   // 0-100
  people: number   // 0-100
  morale: number   // 0-100
}

const hi  = (v: number) => v >= 60 
const med = (v: number) => v >= 30 && v < 60
const lo  = (v: number) => v > 0 && v < 30
const zer = (v: number) => v === 0

// ── Condition map ─────────────────────────────────────────────────────────────

const CONDITIONS: Record<string, (s: GameStats) => boolean> = {

  // ── SUCCESS (14) ─────────────────────────────────────────────────────────

  // 1. All high
  new_dawn: (s) =>
    hi(s.food) && hi(s.safety) && hi(s.people) && hi(s.morale),

  // 2. All medium (none high, none zero)
  sustainable_haven: (s) =>
    med(s.food) && med(s.safety) && s.people >= 2 && !hi(s.people) && med(s.morale),

  // 3. High food + High morale + Low safety
  fog_merchants: (s) =>
    hi(s.food) && hi(s.morale) && lo(s.safety),

  // 4. High food + High safety + Low people
  contented_fortress: (s) =>
    hi(s.food) && hi(s.safety) && lo(s.people),

  // 5. High safety + High people + Low morale
  iron_garrison: (s) =>
    hi(s.safety) && hi(s.people) && lo(s.morale),

  // 6. High safety + Low food + Low people
  isolated_sanctuary: (s) =>
    hi(s.safety) && lo(s.food) && lo(s.people),

  // 7. High people + High morale + Low food
  megacity_of_hope: (s) =>
    hi(s.people) && hi(s.morale) && lo(s.food),

  // 8. High people + High safety + Low food
  crowded_sanctuary: (s) =>
    hi(s.people) && hi(s.safety) && lo(s.food),

  // 9. High morale + High people + Low safety
  cult_of_mist: (s) =>
    hi(s.morale) && hi(s.people) && lo(s.safety),

  // 10. High morale + food NOT high + Low safety
  //     ครอบ baseline: morale=68(hi) food=50(med) safety=20(lo)
  optimistic_nomads: (s) =>
    hi(s.morale) && !hi(s.food) && lo(s.safety),

  // 11. High safety + High food + Morale = 0
  benevolent_dictatorship: (s) =>
    hi(s.safety) && hi(s.food) && zer(s.morale),

  // 12. High morale + High people + food>=30 + safety>=30
  democratic_oasis: (s) =>
    hi(s.morale) && hi(s.people) && s.food >= 30 && s.safety >= 30,

  // 13. High food + High safety + Medium morale
  eco_survivors: (s) =>
    hi(s.food) && hi(s.safety) && med(s.morale),

  // 14. High food + High safety + people = 1
  lone_overseer: (s) =>
    hi(s.food) && hi(s.safety) && s.people === 1,

  // ── FAIL (14) ────────────────────────────────────────────────────────────

  // 15. Food=0 + Low morale (morale>0)
  starvation_graveyard: (s) =>
    zer(s.food) && lo(s.morale),

  // 16. Food=0 + Morale=0
  cannibalistic_feast: (s) =>
    zer(s.food) && zer(s.morale),

  // 17. Safety=0 + High people
  breached_wall: (s) =>
    zer(s.safety) && hi(s.people),

  // 18. Safety=0 + High food
  swallowed_by_fog: (s) =>
    zer(s.safety) && hi(s.food),

  // 19. People=0 + morale>0
  ghost_camp: (s) =>
    zer(s.people) && s.morale > 0,

  // 20. People=0 + Low morale
  great_exodus: (s) =>
    zer(s.people) && lo(s.morale),

  // 21. Morale=0 + High safety
  mass_despair: (s) =>
    zer(s.morale) && hi(s.safety),

  // 22. Morale=0 + High people
  bloody_mutiny: (s) =>
    zer(s.morale) && hi(s.people),

  // 23. Morale=0 + Safety=0 + Low food
  total_anarchy: (s) =>
    zer(s.morale) && zer(s.safety) && lo(s.food),

  // 24. Low food + High people + Low safety
  fogs_plague: (s) =>
    lo(s.food) && hi(s.people) && lo(s.safety),

  // 25. Low morale + High food
  ultimate_betrayal: (s) =>
    lo(s.morale) && hi(s.food),

  // 26. High safety + Food=0 + Morale=0
  engineers_overreach: (s) =>
    hi(s.safety) && zer(s.food) && zer(s.morale),

  // 27. High morale + Food=0 + Safety=0
  politicians_promises: (s) =>
    hi(s.morale) && zer(s.food) && zer(s.safety),

  // 28. High people + Food=0 + Safety=0
  medics_mercy: (s) =>
    hi(s.people) && zer(s.food) && zer(s.safety),
}

// ── Priority order ────────────────────────────────────────────────────────────

const FAIL_ORDER = [
  "cannibalistic_feast",    // food=0 + morale=0  (most specific)
  "engineers_overreach",    // safety=hi + food=0 + morale=0
  "politicians_promises",   // morale=hi + food=0 + safety=0
  "medics_mercy",           // people=hi + food=0 + safety=0
  "mass_despair",           // morale=0 + safety=hi
  "bloody_mutiny",          // morale=0 + people=hi
  "total_anarchy",          // morale=0 + safety=0
  "breached_wall",          // safety=0 + people=hi
  "swallowed_by_fog",       // safety=0 + food=hi
  "starvation_graveyard",   // food=0 + morale=lo
  "great_exodus",           // people=0 + morale=lo
  "ghost_camp",             // people=0
  "fogs_plague",
  "ultimate_betrayal",
]

const SUCCESS_ORDER = [
  "lone_overseer",          // people=1 (most specific)
  "benevolent_dictatorship",
  "new_dawn",
  "eco_survivors",
  "contented_fortress",
  "iron_garrison",
  "isolated_sanctuary",
  "fog_merchants",
  "crowded_sanctuary",
  "megacity_of_hope",
  "cult_of_mist",
  "democratic_oasis",
  "optimistic_nomads",
  "sustainable_haven",
]

// ── Map condition IDs → endings.data.ts IDs ──────────────────────────────────

const TO_ENDING_ID: Record<string, string> = {
  // success
  new_dawn:                "new_dawn",
  sustainable_haven:       "quiet_refuge",
  fog_merchants:           "the_wanderers",
  contented_fortress:      "iron_citadel",
  iron_garrison:           "iron_citadel",
  isolated_sanctuary:      "quiet_refuge",
  megacity_of_hope:        "fallen_saint",
  crowded_sanctuary:       "peoples_republic",
  cult_of_mist:            "peoples_republic",
  optimistic_nomads:       "the_wanderers",
  benevolent_dictatorship: "iron_citadel",
  democratic_oasis:        "peoples_republic",
  eco_survivors:           "eco_survivors",
  lone_overseer:           "last_guardian",
  // fail
  starvation_graveyard:    "starving_ground",
  cannibalistic_feast:     "final_feast",
  breached_wall:           "fallen_wall",
  swallowed_by_fog:        "fallen_wall",
  ghost_camp:              "empty_camp",
  great_exodus:            "empty_camp",
  mass_despair:            "broken_spirit",
  bloody_mutiny:           "red_revolt",
  total_anarchy:           "the_abyss",
  fogs_plague:             "the_plague",
  ultimate_betrayal:       "red_revolt",
  engineers_overreach:     "broken_spirit",
  politicians_promises:    "the_abyss",
  medics_mercy:            "the_plague",
}

// ── Main export ───────────────────────────────────────────────────────────────

export function resolveEnding(stats: GameStats, survived: boolean): string {
  let conditionId: string
  if (!survived) {
    conditionId = "ghost_camp"
    for (const id of FAIL_ORDER) {
      if (CONDITIONS[id]?.(stats)) { conditionId = id; break }
    }
  } else {
    conditionId = "sustainable_haven"
    for (const id of SUCCESS_ORDER) {
      if (CONDITIONS[id]?.(stats)) { conditionId = id; break }
    }
  }
  return TO_ENDING_ID[conditionId] ?? conditionId
}


export function debugAllMatches(stats: GameStats): string[] {
  return Object.entries(CONDITIONS)
    .filter(([, fn]) => fn(stats))
    .map(([id]) => id)
}
