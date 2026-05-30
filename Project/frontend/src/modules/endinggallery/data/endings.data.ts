export interface EndingData {
  id: string
  nameEn: string
  description: string
  conditionLabel: string
  isSuccess: boolean
  imageFile: string
}

export const ALL_ENDINGS: EndingData[] = [
  // ── SUCCESS ───────────────────────────────────────────────────────────
  {
    id: "new_dawn",
    nameEn: "The New Dawn",
    description:
      "Against all odds, you led your people to safety. The fog recedes, and with it, the darkness of seven terrible days. A new world begins.",
    conditionLabel: "Food ≥60 · Safety ≥60 · People ≥60 · Morale ≥60",
    isSuccess: true,
    imageFile: "download (1).jpg",
  },
  {
    id: "fallen_saint",
    nameEn: "The Fallen Saint",
    description:
      "You gave everything you had, leaving nothing for yourself. Your kindness will be remembered, even if no one is left to tell the story.",
    conditionLabel: "People ≥60 · Morale ≥60 · Food <30",
    isSuccess: true,
    imageFile: "download (2).jpg",
  },
  {
    id: "iron_citadel",
    nameEn: "The Iron Citadel",
    description:
      "Your walls held. Your stores were full. The few who remained lived in comfort behind impenetrable stone, survivors of a world that forgot warmth.",
    conditionLabel: "Safety ≥60 · Food ≥60 · People <30",
    isSuccess: true,
    imageFile: "download (3).jpg",
  },
  {
    id: "the_wanderers",
    nameEn: "The Wanderers",
    description:
      "Fed and full of spirit, your people stepped beyond the walls and into the unknown. The fog could not stop those who refused to fear it.",
    conditionLabel: "Food ≥60 · Morale ≥60 · Safety <30",
    isSuccess: true,
    imageFile: "download (4).jpg",
  },
  {
    id: "last_guardian",
    nameEn: "The Last Guardian",
    description:
      "One soul remained. The camp was quiet, the shelves were full, the gate was locked. You survived alone — and that was enough.",
    conditionLabel: "Food ≥60 · Safety ≥60 · People = 1",
    isSuccess: true,
    imageFile: "download (5).jpg",
  },
  {
    id: "peoples_republic",
    nameEn: "The People's Republic",
    description:
      "Every voice was heard. Every hand helped. What began as survival became a community — proof that people are stronger together.",
    conditionLabel: "People ≥60 · Morale ≥60 · Safety ≥30 · Food ≥30",
    isSuccess: true,
    imageFile: "download (6).jpg",
  },
  {
    id: "quiet_refuge",
    nameEn: "The Quiet Refuge",
    description:
      "Hidden from the fog, your small group endured in silence. Not glory, not fame — just survival in its most honest form.",
    conditionLabel: "Safety ≥60 · Food <30 · People <30",
    isSuccess: true,
    imageFile: "download (7).jpg",
  },
  {
    id: "eco_survivors",
    nameEn: "The Eco Survivors",
    description:
      "You learned the land's rhythms and lived within its rules. Balanced, careful, and alive — your camp became a model for what could be.",
    conditionLabel: "Food ≥60 · Safety ≥60 · Morale 30–59",
    isSuccess: true,
    imageFile: "download (8).jpg",
  },

  // ── FAILURE ───────────────────────────────────────────────────────────
  {
    id: "empty_camp",
    nameEn: "The Empty Camp",
    description:
      "No one remained. The fire died days ago. Whatever happened to them, the fog swallowed the answer along with the rest.",
    conditionLabel: "People = 0",
    isSuccess: false,
    imageFile: "download (9).jpg",
  },
  {
    id: "starving_ground",
    nameEn: "The Starving Ground",
    description:
      "The last ration ran out on day five. By day seven, the silence was absolute. Hunger is a slow and merciless end.",
    conditionLabel: "Food = 0 · Morale <30",
    isSuccess: false,
    imageFile: "download (10).jpg",
  },
  {
    id: "fallen_wall",
    nameEn: "The Fallen Wall",
    description:
      "There were so many of you — and nowhere safe to run. The wall came down in the night. What the fog carried in, no one survived to name.",
    conditionLabel: "Safety = 0 · People ≥60",
    isSuccess: false,
    imageFile: "download (11).jpg",
  },
  {
    id: "broken_spirit",
    nameEn: "The Broken Spirit",
    description:
      "The camp was secure. The food was plentiful. But the will to live was gone. Not every battle is fought with weapons.",
    conditionLabel: "Morale = 0 · Safety ≥60",
    isSuccess: false,
    imageFile: "download (12).jpg",
  },
  {
    id: "red_revolt",
    nameEn: "The Red Revolt",
    description:
      "Too many people. Too little hope. The crowd turned on itself in the dark, and by morning there was nothing left to lead.",
    conditionLabel: "Morale = 0 · People ≥60",
    isSuccess: false,
    imageFile: "download (13).jpg",
  },
  {
    id: "final_feast",
    nameEn: "The Final Feast",
    description:
      "When the food ran out and all hope with it, the camp crossed a line no one speaks of. Some choices cannot be undone.",
    conditionLabel: "Food = 0 · Morale = 0",
    isSuccess: false,
    imageFile: "download (14).jpg",
  },
  {
    id: "the_plague",
    nameEn: "The Plague",
    description:
      "Too many bodies, too little food, too little safety. The fog brought something with it. It spread fast, and it showed no mercy.",
    conditionLabel: "Food <30 · People ≥60 · Safety <30",
    isSuccess: false,
    imageFile: "download (15).jpg",
  },
  {
    id: "the_abyss",
    nameEn: "The Abyss",
    description:
      "Everything fell apart at once. There are no lessons here, no silver lining. Sometimes the fog simply wins.",
    conditionLabel: "Morale = 0 · Safety = 0 · Food <30",
    isSuccess: false,
    imageFile: "cute hamster.jpg",
  },
]
