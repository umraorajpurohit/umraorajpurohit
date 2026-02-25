"use client";

import { useState } from "react";
import type { GeneratedRecipe } from "@/lib/recipes";

const statusLabel: Record<string, string> = {
  have: "in pantry",
  missing: "missing",
  swap: "swap"
};

type RecipeCardProps = {
  recipe: GeneratedRecipe;
  servings: number;
  onAdd: (recipe: GeneratedRecipe) => void;
};

export default function RecipeCard({ recipe, servings, onAdd }: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-3xl border border-avocado-100 bg-white p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-night">{recipe.title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {recipe.time} min · {recipe.diet} · serves {servings}
          </p>
        </div>
        <button
          onClick={() => onAdd(recipe)}
          className="rounded-full bg-night px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
        >
          Add to Meal Plan
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <span key={tag} className="input-chip">
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => setExpanded((value) => !value)}
        className="mt-5 text-sm font-semibold text-avocado-700"
      >
        {expanded ? "Hide details" : "View details"}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-night">Ingredients</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {recipe.ingredients.map((ingredient) => (
                <li key={`${recipe.id}-${ingredient.name}-${ingredient.amount}`}>
                  <span className="font-medium text-night">
                    {ingredient.amount} {ingredient.name}
                  </span>{" "}
                  <span className="text-xs text-slate-400">({statusLabel[ingredient.status]})</span>
                  {ingredient.substitution ? (
                    <span className="block text-xs text-avocado-700">
                      Missing? Swap with {ingredient.substitution}.
                    </span>
                  ) : null}
                  {ingredient.note ? (
                    <span className="block text-xs text-slate-400">{ingredient.note}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-night">Steps</h4>
            <ol className="mt-2 list-decimal space-y-2 pl-4 text-sm text-slate-600">
              {recipe.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </article>
  );
}
