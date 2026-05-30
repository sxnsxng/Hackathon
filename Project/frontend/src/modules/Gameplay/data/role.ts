import camp from "../assets/CampLeader.png";
import food from "../assets/FoodManager.png";
import maintenance from "../assets/MaintenanceManager.png";
import resource from "../assets/ResourceManager.png";
import safety from "../assets/SafetyManager.png";

export type Role = {
  id: string;
  lines: [string, string];
  image: string | null;
  description: string;
  stats: Record<string, number>;
};

export const roles: Role[] = [
  {
    id: "camp-leader",
    lines: ["CAMP", "LEADER"],
    image: camp,
    description:
      "Lead your group through crisis. Make critical decisions that affect everyone's survival.",
    stats: { Leadership: 95, Combat: 70, Survival: 80 },
  },
  {
    id: "resource-manager",
    lines: ["RESOURCE", "MANAGER"],
    image: resource,
    description:
      "Manage supplies, allocate resources, and keep the camp stocked through scarcity.",
    stats: { Logistics: 90, Trading: 85, Planning: 75 },
  },
  {
    id: "food-manager",
    lines: ["FOOD", "MANAGER"],
    image: food,
    description:
      "Source, prepare, and ration food to keep survivors fed and morale high.",
    stats: { Cooking: 95, Foraging: 80, Rationing: 85 },
  },
  {
    id: "safety-manager",
    lines: ["SAFETY", "MANAGER"],
    image: safety,
    description:
      "Protect the camp perimeter and ensure everyone's physical security at all times.",
    stats: { Combat: 90, Vigilance: 85, Tactics: 80 },
  },
  {
    id: "maintenance-manager",
    lines: ["MAINTENANCE", "MANAGER"],
    image: maintenance,
    description:
      "Keep equipment running, repair structures, and build tools for survival.",
    stats: { Engineering: 90, Crafting: 95, Repair: 85 },
  },
];