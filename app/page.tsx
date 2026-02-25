"use client";

import { useEffect, useMemo, useState } from "react";
import InputPanel from "@/components/InputPanel";
import MealPlan, { type MealPlanSlot } from "@/components/MealPlan";
import RecipeCard from "@/components/RecipeCard";
import ShoppingList from "@/components/ShoppingList";
import { generateRecipes, parsePantry, type GeneratedRecipe } from "@/lib/recipes";
import { getRegionFromLocale, type Diet, type Region } from "@/lib/substitutions";

const defaultPlan: MealPlanSlot[] = [
  { day: "Day 1" },
  { day: "Day 2" },
  { day: "Day 3" }
];

const demoPantry =
  "avocado, bread, tomato, yogurt, lemon, chili flakes, chickpeas, rice, cucumber, basil";

export default function Home() {
  const [pantryInput, setPantryInput] = useState("");
  const [region, setRegion] = useState<Region>("Other");
  const [diet, setDiet] = useState<Diet>("Any");
  const [maxTime, setMaxTime] = useState(20);
  const [servings, setServings] = useState(2);
  const [recipes, setRecipes] = useState<GeneratedRecipe[]>([]);
  const [plan, setPlan] = useState<MealPlanSlot[]>(defaultPlan);

  useEffect(() => {
    const stored = window.localStorage.getItem("avopantry-state");
    if (stored) {
      const parsed = JSON.parse(stored) as {
        pantryInput?: string;
        region?: Region;
        diet?: Diet;
        maxTime?: number;
        servings?: number;
        plan?: MealPlanSlot[];
      };
      if (parsed.pantryInput) setPantryInput(parsed.pantryInput);
      if (parsed.region) setRegion(parsed.region);
      if (parsed.diet) setDiet(parsed.diet);
      if (parsed.maxTime) setMaxTime(parsed.maxTime);
      if (parsed.servings) setServings(parsed.servings);
      if (parsed.plan && parsed.plan.length) setPlan(parsed.plan);
    } else {
      setRegion(getRegionFromLocale(window.navigator.language));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "avopantry-state",
      JSON.stringify({ pantryInput, region, diet, maxTime, servings, plan })
    );
  }, [pantryInput, region, diet, maxTime, servings, plan]);

  const pantry = useMemo(() => parsePantry(pantryInput), [pantryInput]);

  const handleGenerate = () => {
    const generated = generateRecipes(pantry, region, diet, maxTime);
    setRecipes(generated);
  };

  const handleDemo = () => {
    setPantryInput(demoPantry);
    const generated = generateRecipes(parsePantry(demoPantry), region, diet, maxTime);
    setRecipes(generated);
  };

  const handleClear = () => {
    setPantryInput("");
    setRecipes([]);
    setPlan(defaultPlan);
  };

  const handleAddToPlan = (recipe: GeneratedRecipe) => {
    setPlan((current) => {
      const updated = [...current];
      const emptyIndex = updated.findIndex((slot) => !slot.recipe);
      const targetIndex = emptyIndex === -1 ? updated.length - 1 : emptyIndex;
      updated[targetIndex] = { ...updated[targetIndex], recipe };
      return updated;
    });
  };

  const handleRemoveFromPlan = (day: string) => {
    setPlan((current) =>
      current.map((slot) => (slot.day === day ? { day: slot.day } : slot))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="gradient-ring">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-avocado-500">
              AvoPantry
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-night md:text-4xl">
              Use what you have. Cook something with avocado.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-600">
              Premium, pantry-first recipes that adapt to your region and diet. We spot
              missing items, recommend easy swaps, and build a 3-day plan in seconds.
            </p>
          </div>
          <div className="rounded-3xl border border-avocado-100 bg-white/80 p-6 shadow-card">
            <p className="text-sm font-semibold text-night">Region-aware tips</p>
            <ul className="mt-3 space-y-2 text-xs text-slate-500">
              <li>Units adapt to local preferences automatically.</li>
              <li>Ingredient names match your region.</li>
              <li>Substitutions are pantry-first and light-touch.</li>
            </ul>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16">
        <InputPanel
          pantryInput={pantryInput}
          onPantryChange={setPantryInput}
          region={region}
          onRegionChange={setRegion}
          diet={diet}
          onDietChange={setDiet}
          maxTime={maxTime}
          onMaxTimeChange={setMaxTime}
          servings={servings}
          onServingsChange={setServings}
          onGenerate={handleGenerate}
          onDemo={handleDemo}
          onClear={handleClear}
        />

        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="section-title">Recipe results</h2>
            <p className="text-sm text-slate-500">
              Showing pantry-first recipes using your ingredients.
            </p>
          </div>
          {recipes.length === 0 ? (
            <div className="mt-4 rounded-3xl border border-dashed border-avocado-200 bg-white p-6 text-sm text-slate-500">
              Add your pantry, set preferences, and generate recipes to see results here.
            </div>
          ) : (
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  servings={servings}
                  onAdd={handleAddToPlan}
                />
              ))}
            </div>
          )}
        </section>

        <MealPlan plan={plan} onRemove={handleRemoveFromPlan} />

        <ShoppingList recipes={plan.flatMap((slot) => (slot.recipe ? [slot.recipe] : []))} />
      </main>

      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-slate-400">
          <p>
            Affiliate disclosure: Some links in future versions of AvoPantry may earn us a
            commission at no extra cost to you.
          </p>
          <p className="mt-2">
            Disclaimer: AvoPantry provides inspiration, not dietary advice. Always check
            ingredients for allergens and adjust portions to your needs.
          </p>
        </div>
      </footer>
    </div>
  );
}
