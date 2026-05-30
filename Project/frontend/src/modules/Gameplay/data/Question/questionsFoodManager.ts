import type { Question } from "./question";

export const questionsFoodManager: Question[] = [
  // ==================================================
  // DAY 1
  // ==================================================

  {
    id: "fm_day1",
    day: 1,
    role: "food_manager",

    scenario:
      "The camp only has enough food for three more days. A nearby convenience store may still contain supplies, but toxic fog levels remain dangerous.",

    choices: [
      {
        id: "A",
        text: "Send a scavenging team immediately.",

        statDelta: {
          supplies: 20,
          safety: -10,
          population: -1,
        },

        triggerChain: {
          triggerDay: 3,
          stat: "population",
          delta: -3,
          narrative:
            "A scavenger develops severe toxic fog poisoning and can no longer work.",
        },
      },

      {
        id: "B",
        text: "Reduce all food portions by half.",

        statDelta: {
          supplies: 15,
          morale: -15,
        },

        consequenceEffect: {
          duration: 3,
          statDeltaPerDay: {
            morale: -2,
          },
        },
      },

      {
        id: "C",
        text: "Maintain normal food distribution.",

        statDelta: {
          morale: 10,
          supplies: -5,
        },

        triggerChain: {
          triggerDay: 2,
          stat: "supplies",
          delta: -10,
          narrative:
            "Food consumption exceeded expectations and reserves shrink rapidly.",
        },
      },

      {
        id: "D",
        text: "Trade medicine for food.",

        statDelta: {
          supplies: 15,
          safety: -5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 2
  // ==================================================

  {
    id: "fm_day2",
    day: 2,
    role: "food_manager",

    scenario:
      "Several cans of food appear damaged. Some survivors insist they are still edible.",

    choices: [
      {
        id: "A",
        text: "Use all cans.",

        statDelta: {
          supplies: 20,
          safety: -10,
        },

        triggerChain: {
          triggerDay: 4,
          stat: "population",
          delta: -2,
          narrative:
            "Food poisoning spreads among survivors who consumed contaminated food.",
        },
      },

      {
        id: "B",
        text: "Discard all damaged cans.",

        statDelta: {
          supplies: -10,
          safety: 15,
        },
      },

      {
        id: "C",
        text: "Inspect and separate usable cans.",

        statDelta: {
          supplies: 10,
          safety: 5,
        },
      },

      {
        id: "D",
        text: "Trade the damaged cans away.",

        statDelta: {
          supplies: 5,
          morale: -10,
        },
      },
    ],
  },

  // ==================================================
  // DAY 3
  // ==================================================

  {
    id: "fm_day3",
    day: 3,
    role: "food_manager",

    scenario:
      "Children are struggling with hunger and ask for extra portions.",

    choices: [
      {
        id: "A",
        text: "Provide extra food to children.",

        statDelta: {
          supplies: -10,
          morale: 15,
        },
      },

      {
        id: "B",
        text: "Keep rations equal for everyone.",

        statDelta: {
          safety: 5,
          morale: -5,
        },
      },

      {
        id: "C",
        text: "Reduce worker rations instead.",

        statDelta: {
          morale: 10,
          safety: -10,
        },

        consequenceEffect: {
          duration: 2,
          statDeltaPerDay: {
            supplies: -2,
          },
        },
      },

      {
        id: "D",
        text: "Reject all requests.",

        statDelta: {
          supplies: 10,
          morale: -15,
        },
      },
    ],
  },

  // ==================================================
  // DAY 4
  // ==================================================

  {
    id: "fm_day4",
    day: 4,
    role: "food_manager",

    scenario:
      "Scouts discover a pond full of fish outside the safe zone.",

    choices: [
      {
        id: "A",
        text: "Launch a large fishing expedition.",

        statDelta: {
          supplies: 25,
          safety: -15,
        },
      },

      {
        id: "B",
        text: "Send a small fishing team.",

        statDelta: {
          supplies: 10,
          safety: -5,
        },
      },

      {
        id: "C",
        text: "Ignore the opportunity.",

        statDelta: {
          safety: 10,
          morale: -10,
        },
      },

      {
        id: "D",
        text: "Trade the pond location with another camp.",

        statDelta: {
          supplies: 5,
          morale: 5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 5
  // ==================================================

  {
    id: "fm_day5",
    day: 5,
    role: "food_manager",

    scenario:
      "Several survivors are secretly storing food for themselves.",

    choices: [
      {
        id: "A",
        text: "Confiscate all hidden food.",

        statDelta: {
          supplies: 10,
          morale: -15,
        },
      },

      {
        id: "B",
        text: "Allow private reserves.",

        statDelta: {
          morale: 10,
          supplies: -10,
        },

        consequenceEffect: {
          duration: 3,
          statDeltaPerDay: {
            supplies: -2,
          },
        },
      },

      {
        id: "C",
        text: "Create a regulated reserve system.",

        statDelta: {
          morale: 5,
          supplies: 5,
        },
      },

      {
        id: "D",
        text: "Punish offenders publicly.",

        statDelta: {
          safety: 10,
          morale: -10,
        },
      },
    ],
  },

  // ==================================================
  // DAY 6
  // ==================================================

  {
    id: "fm_day6",
    day: 6,
    role: "food_manager",

    scenario:
      "A nearby farm may still contain vegetables, but it lies beyond a dangerous area.",

    choices: [
      {
        id: "A",
        text: "Organize a full scavenging mission.",

        statDelta: {
          supplies: 20,
          safety: -10,
        },
      },

      {
        id: "B",
        text: "Send volunteers only.",

        statDelta: {
          supplies: 10,
          population: -1,
        },
      },

      {
        id: "C",
        text: "Stay inside the camp.",

        statDelta: {
          safety: 10,
          morale: -5,
        },
      },

      {
        id: "D",
        text: "Trade with another settlement.",

        statDelta: {
          supplies: 5,
          morale: 5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 7
  // ==================================================

  {
    id: "fm_day7",
    day: 7,
    role: "food_manager",

    scenario:
      "The camp discusses how food should be managed if everyone survives beyond this week.",

    choices: [
      {
        id: "A",
        text: "Maintain strict rationing.",

        statDelta: {
          supplies: 15,
          morale: -15,
        },
      },

      {
        id: "B",
        text: "Increase food distribution.",

        statDelta: {
          supplies: -10,
          morale: 15,
        },
      },

      {
        id: "C",
        text: "Invest in farming projects.",

        statDelta: {
          supplies: 10,
          morale: 10,
        },

        consequenceEffect: {
          duration: 2,
          statDeltaPerDay: {
            supplies: 3,
          },
        },
      },

      {
        id: "D",
        text: "Allow families to manage their own food.",

        statDelta: {
          morale: 5,
          safety: -10,
        },
      },
    ],
  },
];