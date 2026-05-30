import type { Question } from "./question";

export const questionsCampLeader: Question[] = [
  // ==================================================
  // DAY 1
  // ==================================================

  {
    id: "cl_day1",
    day: 1,
    role: "camp_leader",

    scenario:
      "A family of four arrives at the school gate seeking shelter. One child appears sick and keeps coughing. The toxic fog will return before sunset.",

    choices: [
      {
        id: "A",

        text: "Allow the entire family into the camp.",

        statDelta: {
          supplies: -10,
          morale: 15,
          population: 10,
        },

        triggerChain: {
          triggerDay: 3,
          stat: "population",
          delta: -15,
          narrative:
            "The child's illness spreads through the shelter. Several survivors become too sick to work.",
        },
      },

      {
        id: "B",

        text: "Refuse entry and close the gates.",

        statDelta: {
          safety: 10,
          morale: -15,
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

        text: "Quarantine the family in a separate classroom.",

        statDelta: {
          safety: 5,
          morale: 5,
          supplies: -5,
        },
      },

      {
        id: "D",

        text: "Accept only the healthy members.",

        statDelta: {
          safety: 10,
          population: 5,
          morale: -10,
        },

        triggerChain: {
          triggerDay: 4,
          stat: "safety",
          delta: -10,
          narrative:
            "The rejected parent returns with desperate survivors and damages the outer fence.",
        },
      },
    ],
  },

  // ==================================================
  // DAY 2
  // ==================================================

  {
    id: "cl_day2",
    day: 2,
    role: "camp_leader",

    scenario:
      "Food reserves are running low. Survivors demand to know the exact amount remaining in storage.",

    choices: [
      {
        id: "A",

        text: "Reveal the full truth.",

        statDelta: {
          morale: 10,
          safety: -5,
        },

        consequenceEffect: {
          duration: 2,

          statDeltaPerDay: {
            morale: -1,
          },
        },
      },

      {
        id: "B",

        text: "Hide the real numbers.",

        statDelta: {
          safety: 5,
          morale: -10,
        },

        triggerChain: {
          triggerDay: 4,
          stat: "morale",
          delta: -15,
          narrative:
            "A survivor discovers the truth and rumors spread throughout the camp.",
        },
      },

      {
        id: "C",

        text: "Share partial information.",

        statDelta: {
          morale: 5,
          safety: 5,
        },
      },

      {
        id: "D",

        text: "Hold a public meeting and let everyone discuss solutions.",

        statDelta: {
          morale: 15,
          supplies: -5,
        },

        consequenceEffect: {
          duration: 3,

          statDeltaPerDay: {
            morale: 1,
          },
        },
      },
    ],
  },
];