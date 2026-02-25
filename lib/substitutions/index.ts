export type Region = "US" | "Australia" | "India" | "Other";

export type Diet = "Any" | "Vegetarian" | "Vegan";

export type Role =
  | "Acid"
  | "Creamy/Fat"
  | "Protein"
  | "Base/Carb"
  | "Heat"
  | "Herbs/Freshness"
  | "Crunch";

export const REGION_OPTIONS: Region[] = ["India", "Australia", "US", "Other"];

export const REGION_LABELS: Record<Region, string> = {
  India: "India",
  Australia: "Australia",
  US: "US",
  Other: "Other"
};

export const DIET_OPTIONS: Diet[] = ["Any", "Vegetarian", "Vegan"];

const REGION_INGREDIENT_NAMES: Record<Region, Record<string, string>> = {
  US: { cilantro: "cilantro", yogurt: "yogurt", chili: "chili" },
  Australia: { cilantro: "coriander", yogurt: "yogurt", chili: "chilli" },
  India: { cilantro: "coriander", yogurt: "curd", chili: "chilli" },
  Other: { cilantro: "cilantro", yogurt: "yogurt", chili: "chili" }
};

const INGREDIENT_ALIASES: Record<string, string> = {
  coriander: "cilantro",
  curd: "yogurt",
  chilli: "chili",
  jalapenos: "jalapeno"
};

export const ROLE_SUBSTITUTIONS: Record<Region, Record<Role, string[]>> = {
  US: {
    Acid: ["lemon", "lime", "vinegar"],
    "Creamy/Fat": ["yogurt", "sour cream", "olive oil"],
    Protein: ["chickpeas", "eggs", "tofu", "tuna"],
    "Base/Carb": ["bread", "rice", "pasta", "tortilla"],
    Heat: ["chili", "jalapeno", "pepper flakes"],
    "Herbs/Freshness": ["cilantro", "basil", "parsley", "mint"],
    Crunch: ["pumpkin seeds", "almonds", "cucumber", "radish"]
  },
  Australia: {
    Acid: ["lemon", "vinegar", "apple cider vinegar"],
    "Creamy/Fat": ["greek yogurt", "sour cream", "olive oil"],
    Protein: ["chickpeas", "eggs", "tofu", "tuna"],
    "Base/Carb": ["sourdough", "rice", "pasta", "tortilla"],
    Heat: ["chilli", "jalapeno", "pepper flakes"],
    "Herbs/Freshness": ["coriander", "basil", "parsley", "mint"],
    Crunch: ["pepitas", "almonds", "cucumber", "radish"]
  },
  India: {
    Acid: ["lemon", "tamarind", "vinegar"],
    "Creamy/Fat": ["curd", "yogurt", "ghee"],
    Protein: ["chickpeas", "paneer", "tofu", "eggs"],
    "Base/Carb": ["roti", "rice", "poha", "bread"],
    Heat: ["chilli", "green chili", "red chili powder"],
    "Herbs/Freshness": ["coriander", "mint", "curry leaves"],
    Crunch: ["roasted peanuts", "sev", "cucumber", "onion"]
  },
  Other: {
    Acid: ["lemon", "lime", "vinegar"],
    "Creamy/Fat": ["yogurt", "sour cream", "olive oil"],
    Protein: ["chickpeas", "eggs", "tofu", "beans"],
    "Base/Carb": ["bread", "rice", "pasta", "wrap"],
    Heat: ["chili", "jalapeno", "pepper flakes"],
    "Herbs/Freshness": ["cilantro", "basil", "parsley", "mint"],
    Crunch: ["nuts", "seeds", "cucumber", "radish"]
  }
};

export const ROLE_NOTES: Record<string, string> = {
  vinegar: "Vinegar is stronger than lemon/lime; use about half the amount.",
  "dried herbs": "Dried herbs are stronger than fresh; use about one third amount."
};

const CATEGORY_MAP: Record<string, string> = {
  avocado: "produce",
  tomato: "produce",
  spinach: "produce",
  cucumber: "produce",
  onion: "produce",
  garlic: "produce",
  lemon: "produce",
  lime: "produce",
  basil: "produce",
  cilantro: "produce",
  coriander: "produce",
  mint: "produce",
  parsley: "produce",
  banana: "produce",
  berries: "produce",
  corn: "produce",
  carrot: "produce",
  kale: "produce",
  yogurt: "dairy",
  "greek yogurt": "dairy",
  "sour cream": "dairy",
  curd: "dairy",
  cheese: "dairy",
  paneer: "dairy",
  milk: "dairy",
  bread: "pantry",
  tortilla: "pantry",
  wrap: "pantry",
  pasta: "pantry",
  rice: "pantry",
  quinoa: "pantry",
  oats: "pantry",
  beans: "pantry",
  chickpeas: "pantry",
  lentils: "pantry",
  tofu: "protein",
  eggs: "protein",
  tuna: "protein",
  chicken: "protein",
  nuts: "pantry",
  seeds: "pantry",
  almonds: "pantry",
  pepitas: "pantry",
  "olive oil": "pantry",
  vinegar: "pantry",
  "apple cider vinegar": "pantry",
  tamarind: "pantry",
  "pepper flakes": "pantry",
  "red chili powder": "pantry",
  chilli: "produce",
  chili: "produce",
  "green chili": "produce"
};

export const normalizeIngredient = (value: string): string => {
  const cleaned = value.trim().toLowerCase();
  return INGREDIENT_ALIASES[cleaned] ?? cleaned;
};

export const displayIngredient = (ingredient: string, region: Region): string => {
  const normalized = normalizeIngredient(ingredient);
  const regionalMap = REGION_INGREDIENT_NAMES[region];
  return regionalMap[normalized] ?? normalized;
};

export const categorizeIngredient = (ingredient: string): string => {
  const normalized = normalizeIngredient(ingredient);
  return CATEGORY_MAP[normalized] ?? "pantry";
};

export const findRoleForIngredient = (ingredient: string): Role | null => {
  const normalized = normalizeIngredient(ingredient);
  for (const role of Object.keys(ROLE_SUBSTITUTIONS.US) as Role[]) {
    const list = [
      ...ROLE_SUBSTITUTIONS.US[role],
      ...ROLE_SUBSTITUTIONS.Australia[role],
      ...ROLE_SUBSTITUTIONS.India[role],
      ...ROLE_SUBSTITUTIONS.Other[role]
    ];
    if (list.some((item) => normalizeIngredient(item) === normalized)) {
      return role;
    }
  }
  return null;
};

export const resolveRoleIngredient = (
  role: Role,
  pantry: string[],
  region: Region
) => {
  const options = ROLE_SUBSTITUTIONS[region][role];
  const pantryMatch = options.find((item) => pantry.includes(normalizeIngredient(item)));
  if (pantryMatch) {
    return { ingredient: pantryMatch, source: "pantry" as const };
  }
  return { ingredient: options[0], source: "suggested" as const };
};

export const getRegionFromLocale = (locale?: string): Region => {
  if (!locale) return "Other";
  const lower = locale.toLowerCase();
  if (lower.includes("en-in") || lower.endsWith("-in")) return "India";
  if (lower.includes("en-au") || lower.endsWith("-au")) return "Australia";
  if (lower.includes("en-us") || lower.endsWith("-us")) return "US";
  return "Other";
};
