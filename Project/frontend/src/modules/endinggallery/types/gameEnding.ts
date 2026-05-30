export interface GameStats {
  food:   number
  safety: number
  people: number
  morale: number
}

// endingId calculate by resolveEnding() in endingChecker.ts
export interface GameEndingResult {
  stats:      GameStats
  survived:   boolean
  score:      number
  dayReached: number
  role:       string
  
}
