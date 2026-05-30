import type { Question } from "./question";

export const questionsCampLeader: Question[] = [
  // ==================================================
  // DAY 1: The Strangers
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
            "The child's illness spreads through the shelter. Several survivors become too sick to work and pass away.",
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
        text: "Admit only the healthy parents and leave the child outside.",
        statDelta: {
          safety: 15,
          morale: -25,
          population: 5,
        },
        triggerChain: {
          triggerDay: 2,
          stat: "morale",
          delta: -10,
          narrative:
            "The parents could not bear the guilt. They sabotaged the water supply in a grief-stricken rage.",
        },
      },
    ],
  },

  // ==================================================
  // DAY 2: The Truth
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
            "A survivor discovers the true inventory logs. Rumors of you hoarding food spread quickly.",
        },
      },
      {
        id: "C",
        text: "Share partial information and promise a rationing plan.",
        statDelta: {
          morale: 5,
          safety: 5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 3: The Dispute
  // ==================================================
  {
    id: "cl_day3",
    day: 3,
    role: "camp_leader",
    scenario:
      "A violent brawl breaks out in the cafeteria. One of the strongest scavengers accuses an elderly man of stealing his late wife's locket.",
    choices: [
      {
        id: "A",
        text: "Side with the scavenger and banish the old man.",
        statDelta: {
          safety: 10,
          morale: -15,
          population: -5,
        },
        triggerChain: {
          triggerDay: 5,
          stat: "morale",
          delta: -10,
          narrative:
            "The old man's body was found frozen near the gate. Guilt haunts the camp.",
        },
      },
      {
        id: "B",
        text: "Intervene peacefully and force a compromise.",
        statDelta: {
          morale: 10,
          safety: -5,
        },
        consequenceEffect: {
          duration: 2,
          statDeltaPerDay: {
            safety: -2,
          },
        },
      },
      {
        id: "C",
        text: "Let them sort it out themselves.",
        statDelta: {
          safety: -15,
          population: -5,
          morale: -10,
        },
      },
    ],
  },

  // ==================================================
  // DAY 4: The Signal
  // ==================================================
  {
    id: "cl_day4",
    day: 4,
    role: "camp_leader",
    scenario:
      "The old PA system picks up a faint military broadcast claiming a rescue helicopter will land nearby. Sending up a signal flare might save you, but could also attract raiders.",
    choices: [
      {
        id: "A",
        text: "Fire the signal flare.",
        statDelta: {
          morale: 20,
          supplies: -5,
        },
        triggerChain: {
          triggerDay: 5,
          stat: "safety",
          delta: -25,
          narrative:
            "The rescue was a lie. Raiders saw your flare and attacked the outer perimeter in the night!",
        },
      },
      {
        id: "B",
        text: "Ignore the signal. It's too risky.",
        statDelta: {
          safety: 15,
          morale: -20,
        },
      },
      {
        id: "C",
        text: "Send a small scout team into the fog instead.",
        statDelta: {
          safety: -10,
          population: -5,
        },
        triggerChain: {
          triggerDay: 6,
          stat: "supplies",
          delta: 30,
          narrative:
            "The scout team returned! No helicopter, but they found a massive military supply drop.",
        },
      },
    ],
  },

  // ==================================================
  // DAY 5: The Cult
  // ==================================================
  {
    id: "cl_day5",
    day: 5,
    role: "camp_leader",
    scenario:
      "Despair has taken root. A charismatic survivor has started a doomsday cult, convincing others to stop working and 'embrace the cleansing fog'.",
    choices: [
      {
        id: "A",
        text: "Arrest the cult leader and lock them up.",
        statDelta: {
          safety: 15,
          morale: -15,
          supplies: -5,
        },
      },
      {
        id: "B",
        text: "Tolerate their presence to avoid conflict.",
        statDelta: {
          morale: -5,
          safety: -5,
        },
        consequenceEffect: {
          duration: 3,
          statDeltaPerDay: {
            supplies: -3,
          },
        },
      },
      {
        id: "C",
        text: "Exile the entire cult into the fog.",
        statDelta: {
          population: -15,
          safety: 20,
          morale: -20,
        },
        triggerChain: {
          triggerDay: 7,
          stat: "safety",
          delta: -15,
          narrative:
            "The exiled cultists mutated in the fog and returned to tear down your barricades.",
        },
      },
    ],
  },

  // ==================================================
  // DAY 6: The Ultimatum
  // ==================================================
  {
    id: "cl_day6",
    day: 6,
    role: "camp_leader",
    scenario:
      "Tensions peak. An armed group of survivors demands half the camp's remaining supplies, threatening to leave and take it by force if necessary.",
    choices: [
      {
        id: "A",
        text: "Order the guards to fire upon them.",
        statDelta: {
          population: -15,
          safety: 15,
          morale: -25,
        },
      },
      {
        id: "B",
        text: "Give them what they want to avoid bloodshed.",
        statDelta: {
          supplies: -30,
          population: -10,
          safety: 5,
        },
      },
      {
        id: "C",
        text: "Negotiate and share a smaller portion.",
        statDelta: {
          supplies: -15,
          morale: 10,
          safety: -5,
        },
      },
    ],
  },

  // ==================================================
  // DAY 7: The Final Stand
  // ==================================================
  {
    id: "cl_day7",
    day: 7,
    role: "camp_leader",
    scenario:
      "The toxic fog is finally clearing, but a massive horde of mutated wanderers is drawn to the school's noise. This is your final stand.",
    choices: [
      {
        id: "A",
        text: "Barricade the main hall and defend it with everything.",
        statDelta: {
          safety: 30,
          supplies: -25,
          population: -10,
        },
      },
      {
        id: "B",
        text: "Sacrifice the lower floors and retreat everyone to the roof.",
        statDelta: {
          supplies: -35,
          safety: 15,
          morale: -10,
        },
      },
      {
        id: "C",
        text: "Charge out and fight them head-on in the courtyard.",
        statDelta: {
          population: -25,
          safety: -20,
          morale: 20,
        },
      },
    ],
  },
];