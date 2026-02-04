import {
  categorizeIngredient,
  displayIngredient,
  findRoleForIngredient,
  normalizeIngredient,
  resolveRoleIngredient,
  type Diet,
  type Region,
  type Role
} from "@/lib/substitutions";
import { RECIPE_TEMPLATES, type IngredientSpec, type RecipeTemplate } from "./templates";

export type GeneratedIngredient = {
  name: string;
  amount: string;
  status: "have" | "missing" | "swap";
  substitution?: string;
  note?: string;
  category: string;
};

export type GeneratedRecipe = {
  id: string;
  title: string;
  time: number;
  diet: Diet;
  tags: string[];
  ingredients: GeneratedIngredient[];
  steps: string[];
  missingItems: string[];
};

const ROLE_AMOUNT: Record<Role, { metric: string; us: string }> = {
  Acid: { metric: "15 ml", us: "1 tbsp" },
  "Creamy/Fat": { metric: "60 g", us: "1/4 cup" },
  Protein: { metric: "100 g", us: "1/2 cup" },
  "Base/Carb": { metric: "150 g", us: "3/4 cup" },
  Heat: { metric: "1/2 tsp", us: "1/2 tsp" },
  "Herbs/Freshness": { metric: "10 g", us: "1/4 cup" },
  Crunch: { metric: "20 g", us: "2 tbsp" }
};

const NOTES: Record<string, string> = {
  vinegar: "Vinegar is stronger than lemon/lime; use about half the amount.",
  "dried herbs": "Dried herbs are stronger than fresh; use about one third amount."
};

const DIET_ORDER: Record<Diet, number> = {
  Any: 3,
  Vegetarian: 2,
  Vegan: 1
};

const matchesDiet = (dietFilter: Diet, recipeDiet: Diet) => {
  if (dietFilter === "Any") return true;
  if (dietFilter === "Vegetarian") return recipeDiet === "Vegetarian" || recipeDiet === "Vegan";
  return recipeDiet === "Vegan";
};

const pickUnit = (region: Region) => (region === "US" ? "us" : "metric");

const ingredientAmount = (ingredient: IngredientSpec, region: Region) =>
  region === "US" ? ingredient.amountUs : ingredient.amountMetric;

const unique = (items: string[]) => Array.from(new Set(items));

const getNote = (ingredient: string) => {
  const normalized = normalizeIngredient(ingredient);
  return NOTES[normalized];
};

const buildIngredient = (
  ingredient: IngredientSpec,
  pantry: string[],
  region: Region
): { item: GeneratedIngredient; missing: boolean } => {
  const normalized = normalizeIngredient(ingredient.name);
  const has = pantry.includes(normalized);
  if (has) {
    return {
      item: {
        name: displayIngredient(ingredient.name, region),
        amount: ingredientAmount(ingredient, region),
        status: "have",
        category: categorizeIngredient(ingredient.name)
      },
      missing: false
    };
  }

  const role = ingredient.role ?? findRoleForIngredient(ingredient.name);
  if (role) {
    const substitution = resolveRoleIngredient(role, pantry, region);
    const substitutionDisplay = displayIngredient(substitution.ingredient, region);
    const note = getNote(substitution.ingredient);
    return {
      item: {
        name: displayIngredient(ingredient.name, region),
        amount: ingredientAmount(ingredient, region),
        status: substitution.source === "pantry" ? "swap" : "missing",
        substitution: substitutionDisplay,
        note,
        category: categorizeIngredient(ingredient.name)
      },
      missing: substitution.source !== "pantry"
    };
  }

  return {
    item: {
      name: displayIngredient(ingredient.name, region),
      amount: ingredientAmount(ingredient, region),
      status: "missing",
      category: categorizeIngredient(ingredient.name)
    },
    missing: true
  };
};

const buildRoleIngredient = (
  role: Role,
  pantry: string[],
  region: Region
) => {
  const unitKey = pickUnit(region);
  const substitution = resolveRoleIngredient(role, pantry, region);
  const note = getNote(substitution.ingredient);
  return {
    name: displayIngredient(substitution.ingredient, region),
    amount: ROLE_AMOUNT[role][unitKey],
    status: substitution.source === "pantry" ? "have" : "missing",
    substitution: substitution.source === "pantry" ? undefined : displayIngredient(substitution.ingredient, region),
    note,
    category: categorizeIngredient(substitution.ingredient)
  } as GeneratedIngredient;
};

const renderSteps = (template: RecipeTemplate, roleMap: Record<string, string>) => {
  return template.steps.map((step) =>
    step
      .replace("{acid}", roleMap.acid || "acid")
      .replace("{heat}", roleMap.heat || "heat")
      .replace("{herbs}", roleMap.herbs || "herbs")
      .replace("{creamy}", roleMap.creamy || "creamy element")
      .replace("{protein}", roleMap.protein || "protein")
      .replace("{crunch}", roleMap.crunch || "crunch")
      .replace("{base}", roleMap.base || "base")
  );
};

export const parsePantry = (value: string) =>
  unique(
    value
      .split(",")
      .map((item) => normalizeIngredient(item))
      .filter(Boolean)
  );

export const generateRecipes = (
  pantry: string[],
  region: Region,
  diet: Diet,
  maxTime: number
): GeneratedRecipe[] => {
  const filtered = RECIPE_TEMPLATES.filter(
    (recipe) => recipe.time <= maxTime && matchesDiet(diet, recipe.diet)
  );

  const scored = filtered.map((recipe) => {
    const baseNames = recipe.baseIngredients.map((item) => normalizeIngredient(item.name));
    const score = baseNames.filter((name) => pantry.includes(name)).length;
    return { recipe, score };
  });

  scored.sort((a, b) => b.score - a.score || DIET_ORDER[b.recipe.diet] - DIET_ORDER[a.recipe.diet]);

  return scored.slice(0, 5).map(({ recipe }) => {
    const missingItems: string[] = [];
    const ingredients: GeneratedIngredient[] = [];
    const roleMap: Record<string, string> = {};

    recipe.baseIngredients.forEach((ingredient) => {
      const { item, missing } = buildIngredient(ingredient, pantry, region);
      ingredients.push(item);
      if (missing) missingItems.push(item.name);
      if (ingredient.role === "Base/Carb") {
        roleMap.base = item.name;
      }
    });

    recipe.roleSlots.forEach((role) => {
      const roleKey = role.toLowerCase().split("/")[0];
      const resolved = resolveRoleIngredient(role, pantry, region);
      roleMap[roleKey] = displayIngredient(resolved.ingredient, region);
      const existing = ingredients.find(
        (item) => normalizeIngredient(item.name) === normalizeIngredient(resolved.ingredient)
      );
      if (!existing) {
        const roleIngredient = buildRoleIngredient(role, pantry, region);
        ingredients.push(roleIngredient);
        if (roleIngredient.status === "missing") {
          missingItems.push(roleIngredient.name);
        }
      }
    });

    recipe.optionalIngredients.forEach((ingredient) => {
      if (pantry.includes(normalizeIngredient(ingredient.name))) {
        ingredients.push({
          name: displayIngredient(ingredient.name, region),
          amount: ingredientAmount(ingredient, region),
          status: "have",
          category: categorizeIngredient(ingredient.name)
        });
      }
    });

    return {
      id: recipe.id,
      title: recipe.title,
      time: recipe.time,
      diet: recipe.diet,
      tags: recipe.tags,
      ingredients,
      steps: renderSteps(recipe, roleMap),
      missingItems: unique(missingItems)
    };
  });
};
