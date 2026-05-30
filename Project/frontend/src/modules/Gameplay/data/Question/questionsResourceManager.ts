import type { Question } from "./question";

export const questionsResourceManager: Question[] = [
  // ==================================================
  // DAY 1
  // ==================================================

  {
    id: "rm_day1",
    day: 1,
    role: "resource_manager",

    scenario:
      "You discover an abandoned warehouse containing fuel, batteries, and medicine. However, the building appears unstable and could collapse at any time.",

    choices: [
      {
        id: "A",
        text: "Take everything before the structure collapses.",

        statDelta: {
          supplies: 25,
          safety: -15,
        },

        triggerChain: {
          triggerDay: 3,
          stat: "population",
          delta: -2,
          narrative:
            "Two scavengers suffer injuries caused by debris exposure and become unable to work.",
        },
      },

      {
        id: "B",
        text: "Retrieve only medicine and leave quickly.",

        statDelta: {
          supplies: 10,
          safety: 5,
        },
      },

      {
        id: "C",
        text: "Send a small team to inspect first.",

        statDelta: {
          supplies: 5,
          safety: 10,
        },
      },

      {
        id: "D",
        text: "Ignore the warehouse.",

        statDelta: {
          safety: 15,
          morale: -10,
        },
      },
    ],
  },

  // ==================================================
  // DAY 2
  // ==================================================

  {
    id: "rm_day2",
    day: 2,
    role: "resource_manager",

    scenario:
      "Another survivor camp offers a trade: fuel in exchange for medical supplies.",

    choices: [
      {
        id: "A",
        text: "Accept the trade.",

        statDelta: {
          supplies: 15,
          safety: -5,
        },
      },

      {
        id: "B",
        text: "Demand a better deal.",

        statDelta: {
          supplies: 5,
          morale: -5,
        },

        triggerChain: {
          triggerDay: 4,
          stat: "supplies",
          delta: -10,
          narrative:
            "Negotiations collapse and future trade opportunities disappear.",
        },
      },

      {
        id: "C",
        text: "Reject the trade.",

        statDelta: {
          safety: 10,
          morale: -5,
        },
      },

      {
        id: "D",
        text: "Trade only part of the medicine.",

        statDelta: {
          supplies: 10,
          safety: 5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 3
  // ==================================================

  {
    id: "rm_day3",
    day: 3,
    role: "resource_manager",

    scenario:
      "The camp generator is consuming fuel faster than expected.",

    choices: [
      {
        id: "A",
        text: "Keep it running normally.",

        statDelta: {
          morale: 10,
          supplies: -15,
        },
      },

      {
        id: "B",
        text: "Limit generator usage.",

        statDelta: {
          supplies: 10,
          morale: -10,
        },

        consequenceEffect: {
          duration: 2,
          statDeltaPerDay: {
            morale: -2,
          },
        },
      },

      {
        id: "C",
        text: "Reserve fuel for emergencies only.",

        statDelta: {
          supplies: 15,
          morale: -15,
          safety: 5,
        },
      },

      {
        id: "D",
        text: "Search for alternative fuel.",

        statDelta: {
          supplies: 5,
          safety: -5,
        },

        triggerChain: {
          triggerDay: 5,
          stat: "supplies",
          delta: 15,
          narrative:
            "The team discovers usable fuel from abandoned vehicles.",
        },
      },
    ],
  },

  // ==================================================
  // DAY 4
  // ==================================================

  {
    id: "rm_day4",
    day: 4,
    role: "resource_manager",

    scenario:
      "A scavenger finds a locked pharmacy that may still contain valuable medicine.",

    choices: [
      {
        id: "A",
        text: "Force entry immediately.",

        statDelta: {
          supplies: 20,
          safety: -10,
        },

        triggerChain: {
          triggerDay: 6,
          stat: "population",
          delta: -1,
          narrative:
            "A survivor suffers complications from injuries sustained during the break-in.",
        },
      },

      {
        id: "B",
        text: "Open it carefully.",

        statDelta: {
          supplies: 10,
          safety: 5,
        },
      },

      {
        id: "C",
        text: "Leave it untouched.",

        statDelta: {
          safety: 10,
          morale: -5,
        },
      },

      {
        id: "D",
        text: "Trade information about the pharmacy.",

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
    id: "rm_day5",
    day: 5,
    role: "resource_manager",

    scenario:
      "Several survivors suggest building a hidden emergency stockpile.",

    choices: [
      {
        id: "A",
        text: "Create a secret reserve.",

        statDelta: {
          supplies: 15,
          morale: -10,
        },

        consequenceEffect: {
          duration: 2,
          statDeltaPerDay: {
            morale: -2,
          },
        },
      },

      {
        id: "B",
        text: "Keep all resources public.",

        statDelta: {
          morale: 10,
          supplies: -5,
        },
      },

      {
        id: "C",
        text: "Build a small emergency reserve.",

        statDelta: {
          supplies: 10,
          morale: 5,
        },
      },

      {
        id: "D",
        text: "Let camp leaders vote.",

        statDelta: {
          morale: 10,
          safety: 5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 6
  // ==================================================

  {
    id: "rm_day6",
    day: 6,
    role: "resource_manager",

    scenario:
      "A trader arrives offering batteries in exchange for food.",

    choices: [
      {
        id: "A",
        text: "Accept the trade.",

        statDelta: {
          supplies: -10,
          safety: 10,
        },
      },

      {
        id: "B",
        text: "Reject the trade.",

        statDelta: {
          supplies: 5,
          morale: -5,
        },
      },

      {
        id: "C",
        text: "Negotiate a smaller deal.",

        statDelta: {
          supplies: -5,
          safety: 5,
        },
      },

      {
        id: "D",
        text: "Attempt to steal the batteries.",

        statDelta: {
          supplies: 15,
          safety: -15,
        },

        triggerChain: {
          triggerDay: 7,
          stat: "safety",
          delta: -15,
          narrative:
            "The trader returns with armed allies seeking revenge.",
        },
      },
    ],
  },

  // ==================================================
  // DAY 7
  // ==================================================

  {
    id: "rm_day7",
    day: 7,
    role: "resource_manager",

    scenario:
      "The camp must decide how resources will be managed if survival continues beyond this week.",

    choices: [
      {
        id: "A",
        text: "Prioritize efficiency above all else.",

        statDelta: {
          supplies: 15,
          morale: -15,
        },
      },

      {
        id: "B",
        text: "Distribute resources equally.",

        statDelta: {
          morale: 15,
          supplies: -10,
        },
      },

      {
        id: "C",
        text: "Invest heavily in future stockpiles.",

        statDelta: {
          supplies: 20,
          morale: -5,
        },
      },

      {
        id: "D",
        text: "Focus on trade and diplomacy.",

        statDelta: {
          morale: 10,
          safety: 5,
        },
      },
    ],
  },
];