import type { Question } from "./question";

export const questionsMaintenanceManager: Question[] = [
  // ==================================================
  // DAY 1
  // ==================================================

  {
    id: "mm_day1",
    day: 1,
    role: "maintenance_manager",

    scenario:
      "The school's water filtration system is failing. Without repairs, clean water may run out within days.",

    choices: [
      {
        id: "A",
        text: "Repair the filtration system immediately.",

        statDelta: {
          supplies: -10,
          safety: 15,
        },
      },

      {
        id: "B",
        text: "Ration clean water while delaying repairs.",

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
        text: "Use untreated water temporarily.",

        statDelta: {
          supplies: 15,
          safety: -15,
        },

        triggerChain: {
          triggerDay: 3,
          stat: "population",
          delta: -2,
          narrative:
            "Several survivors fall ill after consuming contaminated water.",
        },
      },

      {
        id: "D",
        text: "Search nearby buildings for spare parts.",

        statDelta: {
          safety: -5,
          supplies: 5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 2
  // ==================================================

  {
    id: "mm_day2",
    day: 2,
    role: "maintenance_manager",

    scenario:
      "A storm damages part of the school's roof. Rainwater is beginning to leak into the dormitories.",

    choices: [
      {
        id: "A",
        text: "Repair the roof immediately.",

        statDelta: {
          safety: 15,
          supplies: -10,
        },
      },

      {
        id: "B",
        text: "Use temporary tarps and covers.",

        statDelta: {
          safety: 5,
          supplies: -5,
        },
      },

      {
        id: "C",
        text: "Move survivors to unaffected rooms.",

        statDelta: {
          morale: -5,
          safety: 10,
        },
      },

      {
        id: "D",
        text: "Ignore the damage for now.",

        statDelta: {
          supplies: 5,
          safety: -15,
        },

        triggerChain: {
          triggerDay: 4,
          stat: "morale",
          delta: -15,
          narrative:
            "Continuous leaks damage personal belongings and create frustration throughout the camp.",
        },
      },
    ],
  },

  // ==================================================
  // DAY 3
  // ==================================================

  {
    id: "mm_day3",
    day: 3,
    role: "maintenance_manager",

    scenario:
      "The camp's generator begins showing signs of overheating.",

    choices: [
      {
        id: "A",
        text: "Shut it down for maintenance.",

        statDelta: {
          safety: 15,
          morale: -10,
        },
      },

      {
        id: "B",
        text: "Keep it running at full power.",

        statDelta: {
          morale: 10,
          safety: -10,
        },

        triggerChain: {
          triggerDay: 5,
          stat: "supplies",
          delta: -15,
          narrative:
            "The generator suffers major damage and requires expensive repairs.",
        },
      },

      {
        id: "C",
        text: "Reduce power usage across the camp.",

        statDelta: {
          supplies: 10,
          morale: -5,
        },
      },

      {
        id: "D",
        text: "Attempt a risky repair while running.",

        statDelta: {
          safety: -5,
          supplies: 10,
        },
      },
    ],
  },

  // ==================================================
  // DAY 4
  // ==================================================

  {
    id: "mm_day4",
    day: 4,
    role: "maintenance_manager",

    scenario:
      "The outer walls of the school are showing structural cracks after repeated storms.",

    choices: [
      {
        id: "A",
        text: "Reinforce the walls immediately.",

        statDelta: {
          safety: 20,
          supplies: -15,
        },
      },

      {
        id: "B",
        text: "Repair only the worst sections.",

        statDelta: {
          safety: 10,
          supplies: -5,
        },
      },

      {
        id: "C",
        text: "Monitor the damage and wait.",

        statDelta: {
          supplies: 5,
          safety: -10,
        },
      },

      {
        id: "D",
        text: "Use scavenged materials to reinforce weak points.",

        statDelta: {
          safety: 15,
          supplies: -10,
        },

        consequenceEffect: {
          duration: 2,
          statDeltaPerDay: {
            safety: 2,
          },
        },
      },
    ],
  },

  // ==================================================
  // DAY 5
  // ==================================================

  {
    id: "mm_day5",
    day: 5,
    role: "maintenance_manager",

    scenario:
      "A large classroom could be converted into a workshop, but doing so would reduce available living space.",

    choices: [
      {
        id: "A",
        text: "Build the workshop.",

        statDelta: {
          supplies: 10,
          morale: -10,
        },

        consequenceEffect: {
          duration: 2,
          statDeltaPerDay: {
            supplies: 3,
          },
        },
      },

      {
        id: "B",
        text: "Keep the classroom as housing.",

        statDelta: {
          morale: 10,
        },
      },

      {
        id: "C",
        text: "Create a smaller workshop.",

        statDelta: {
          supplies: 5,
          morale: 5,
        },
      },

      {
        id: "D",
        text: "Convert another room instead.",

        statDelta: {
          safety: -5,
          supplies: 5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 6
  // ==================================================

  {
    id: "mm_day6",
    day: 6,
    role: "maintenance_manager",

    scenario:
      "The school's sewage system is beginning to fail. Repairs will require significant effort and resources.",

    choices: [
      {
        id: "A",
        text: "Repair the sewage system immediately.",

        statDelta: {
          safety: 20,
          supplies: -15,
        },
      },

      {
        id: "B",
        text: "Use temporary sanitation measures.",

        statDelta: {
          safety: 5,
          supplies: -5,
        },
      },

      {
        id: "C",
        text: "Delay repairs until next week.",

        statDelta: {
          supplies: 10,
          safety: -15,
        },

        triggerChain: {
          triggerDay: 7,
          stat: "population",
          delta: -2,
          narrative:
            "Poor sanitation causes several survivors to become ill.",
        },
      },

      {
        id: "D",
        text: "Relocate sanitation facilities outdoors.",

        statDelta: {
          safety: -5,
          supplies: 5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 7
  // ==================================================

  {
    id: "mm_day7",
    day: 7,
    role: "maintenance_manager",

    scenario:
      "The camp begins discussing long-term infrastructure plans if survival continues beyond the first week.",

    choices: [
      {
        id: "A",
        text: "Focus on stronger defenses and structures.",

        statDelta: {
          safety: 20,
          supplies: -10,
        },
      },

      {
        id: "B",
        text: "Focus on comfort and living conditions.",

        statDelta: {
          morale: 15,
          supplies: -10,
        },
      },

      {
        id: "C",
        text: "Invest in renewable systems and sustainability.",

        statDelta: {
          supplies: 10,
          safety: 10,
        },

        consequenceEffect: {
          duration: 2,
          statDeltaPerDay: {
            supplies: 2,
          },
        },
      },

      {
        id: "D",
        text: "Delay all major projects and conserve resources.",

        statDelta: {
          supplies: 15,
          morale: -10,
        },
      },
    ],
  },
];
