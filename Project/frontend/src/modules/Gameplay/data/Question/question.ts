export type Role =
  | "camp_leader"
  | "food_manager"
  | "resource_manager"
  | "safety_manager"
  | "maintenance_manager";

export interface StatDelta {
  supplies?: number;
  safety?: number;
  population?: number;
  morale?: number;
}

/**
 * Consequence Effect
 *
 * Ongoing effect applied automatically
 * for several days after making a choice.
 *
 * Example:
 * morale -2/day for 3 days
 */
export interface ConsequenceEffect {
  duration: number;

  statDeltaPerDay: StatDelta;
}

/**
 * Delayed event that fires
 * on a specific future day.
 *
 * Example:
 * Day 1 decision
 * -> Day 3 disease outbreak
 */
export interface TriggerChain {
  triggerDay: number;

  stat: keyof StatDelta;

  delta: number;

  narrative: string;
}

/**
 * Choice inside a scenario
 */
export interface Choice {
  id: string;

  text: string;

  /**
   * Immediate stat change
   */
  statDelta: StatDelta;

  /**
   * Optional ongoing consequence
   *
   * Example:
   * morale -2/day for 3 days
   */
  consequenceEffect?: ConsequenceEffect;

  /**
   * Optional delayed consequence
   *
   * Example:
   * disease outbreak on Day 4
   */
  triggerChain?: TriggerChain;
}

/**
 * Scenario shown to player
 */
export interface Question {
  id: string;

  day: number;

  role: Role;

  scenario: string;

  choices: Choice[];
}

/**
 * Current game stats
 */
export interface GameStats {
  supplies: number;
  safety: number;
  population: number;
  morale: number;
}

/**
 * Runtime chain registered
 * after player selects a choice.
 */
export interface ActiveChain extends TriggerChain {
  id: string;

  sourceQuestionId: string;

  sourceChoiceId: string;

  isFired: boolean;
}

/**
 * Runtime consequence effect
 * applied every day until expired.
 */
export interface ActiveConsequenceEffect {
  id: string;

  sourceQuestionId: string;

  sourceChoiceId: string;

  remainingDays: number;

  statDeltaPerDay: StatDelta;
}

/**
 * Player history
 */
export interface DecisionLog {
  day: number;

  questionId: string;

  choiceId: string;
}