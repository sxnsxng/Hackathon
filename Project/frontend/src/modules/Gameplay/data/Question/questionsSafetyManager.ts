import type { Question } from "./question";

export const questionsSafetyManager: Question[] = [
  // ==================================================
  // DAY 1
  // ==================================================

  {
    id: "sm_day1",
    day: 1,
    role: "safety_manager",

    scenario:
      "During the night, scouts report movement near the school perimeter. It could be survivors, raiders, or something else hidden in the fog.",

    choices: [
      {
        id: "A",
        text: "Send an armed patrol to investigate.",

        statDelta: {
          safety: 15,
          supplies: -5,
        },

        triggerChain: {
          triggerDay: 3,
          stat: "population",
          delta: -1,
          narrative:
            "A patrol member suffers complications from injuries sustained during the mission.",
        },
      },

      {
        id: "B",
        text: "Lock down the camp and wait.",

        statDelta: {
          safety: 10,
          morale: -10,
        },
      },

      {
        id: "C",
        text: "Signal the unknown group peacefully.",

        statDelta: {
          morale: 10,
          safety: -5,
        },

        triggerChain: {
          triggerDay: 2,
          stat: "safety",
          delta: -10,
          narrative:
            "The strangers learn valuable information about the camp's defenses.",
        },
      },

      {
        id: "D",
        text: "Strengthen defenses instead of investigating.",

        statDelta: {
          safety: 10,
          supplies: -10,
        },
      },
    ],
  },

  // ==================================================
  // DAY 2
  // ==================================================

  {
    id: "sm_day2",
    day: 2,
    role: "safety_manager",

    scenario:
      "Several survivors request weapons for personal protection.",

    choices: [
      {
        id: "A",
        text: "Distribute weapons widely.",

        statDelta: {
          safety: 10,
          morale: 10,
        },

        triggerChain: {
          triggerDay: 4,
          stat: "safety",
          delta: -15,
          narrative:
            "A dispute escalates into violence because too many weapons are available.",
        },
      },

      {
        id: "B",
        text: "Keep all weapons under guard control.",

        statDelta: {
          safety: 15,
          morale: -10,
        },
      },

      {
        id: "C",
        text: "Issue weapons only to trained volunteers.",

        statDelta: {
          safety: 10,
          morale: 5,
        },
      },

      {
        id: "D",
        text: "Refuse all requests.",

        statDelta: {
          supplies: 5,
          morale: -15,
        },
      },
    ],
  },

  // ==================================================
  // DAY 3
  // ==================================================

  {
    id: "sm_day3",
    day: 3,
    role: "safety_manager",

    scenario:
      "A section of the outer fence has been damaged during a storm.",

    choices: [
      {
        id: "A",
        text: "Repair it immediately.",

        statDelta: {
          safety: 20,
          supplies: -10,
        },
      },

      {
        id: "B",
        text: "Assign extra guards instead.",

        statDelta: {
          safety: 10,
          morale: -5,
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
        text: "Leave it until tomorrow.",

        statDelta: {
          supplies: 5,
          safety: -15,
        },

        triggerChain: {
          triggerDay: 4,
          stat: "safety",
          delta: -10,
          narrative:
            "Intruders exploit the damaged section during the night.",
        },
      },

      {
        id: "D",
        text: "Block the area with vehicles and debris.",

        statDelta: {
          safety: 10,
          supplies: -5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 4
  // ==================================================

  {
    id: "sm_day4",
    day: 4,
    role: "safety_manager",

    scenario:
      "Scouts discover a group of armed survivors camped nearby.",

    choices: [
      {
        id: "A",
        text: "Approach them diplomatically.",

        statDelta: {
          morale: 10,
          safety: -5,
        },

        triggerChain: {
          triggerDay: 6,
          stat: "safety",
          delta: -10,
          narrative:
            "Some members of the armed group later attempt to infiltrate the camp.",
        },
      },

      {
        id: "B",
        text: "Launch a preemptive attack.",

        statDelta: {
          safety: 15,
          population: -1,
        },
      },

      {
        id: "C",
        text: "Observe them from a distance.",

        statDelta: {
          safety: 10,
          supplies: -5,
        },
      },

      {
        id: "D",
        text: "Move the camp patrol routes away from them.",

        statDelta: {
          supplies: 5,
          safety: -5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 5
  // ==================================================

  {
    id: "sm_day5",
    day: 5,
    role: "safety_manager",

    scenario:
      "The night watch reports growing exhaustion among guards.",

    choices: [
      {
        id: "A",
        text: "Increase guard shifts.",

        statDelta: {
          safety: 15,
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
        text: "Reduce patrol frequency.",

        statDelta: {
          morale: 5,
          safety: -10,
        },
      },

      {
        id: "C",
        text: "Recruit volunteers for security duty.",

        statDelta: {
          safety: 10,
          morale: 5,
        },
      },

      {
        id: "D",
        text: "Allow guards to rest completely for one night.",

        statDelta: {
          morale: 15,
          safety: -15,
        },
      },
    ],
  },

  // ==================================================
  // DAY 6
  // ==================================================

  {
    id: "sm_day6",
    day: 6,
    role: "safety_manager",

    scenario:
      "A suspicious survivor is caught mapping the camp's defenses.",

    choices: [
      {
        id: "A",
        text: "Detain and interrogate them.",

        statDelta: {
          safety: 15,
          morale: -5,
        },
      },

      {
        id: "B",
        text: "Expel them from the camp.",

        statDelta: {
          safety: 10,
          population: -1,
        },

        triggerChain: {
          triggerDay: 7,
          stat: "safety",
          delta: -10,
          narrative:
            "The expelled survivor returns with hostile outsiders seeking revenge.",
        },
      },

      {
        id: "C",
        text: "Release them with a warning.",

        statDelta: {
          morale: 5,
          safety: -10,
        },
      },

      {
        id: "D",
        text: "Assign someone to monitor them.",

        statDelta: {
          safety: 10,
          supplies: -5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 7
  // ==================================================

  {
    id: "sm_day7",
    day: 7,
    role: "safety_manager",

    scenario:
      "The camp debates its long-term security strategy for the future.",

    choices: [
      {
        id: "A",
        text: "Create a heavily fortified settlement.",

        statDelta: {
          safety: 20,
          supplies: -10,
          morale: -5,
        },
      },

      {
        id: "B",
        text: "Focus on diplomacy with neighboring camps.",

        statDelta: {
          morale: 15,
          safety: -5,
        },
      },

      {
        id: "C",
        text: "Train every survivor in self-defense.",

        statDelta: {
          safety: 15,
          morale: 5,
        },
      },

      {
        id: "D",
        text: "Reduce security efforts and prioritize resources elsewhere.",

        statDelta: {
          supplies: 10,
          safety: -20,
        },
      },
    ],
  },
];