import type { GeneratedRecipe } from "@/lib/recipes";
import { categorizeIngredient } from "@/lib/substitutions";

const categoryOrder = ["produce", "dairy", "protein", "pantry"];

type ShoppingListProps = {
  recipes: GeneratedRecipe[];
};

export default function ShoppingList({ recipes }: ShoppingListProps) {
  const missing = recipes.flatMap((recipe) => recipe.missingItems);
  const uniqueMissing = Array.from(new Set(missing));

  const grouped = uniqueMissing.reduce<Record<string, string[]>>((acc, item) => {
    const category = categorizeIngredient(item);
    acc[category] = acc[category] ? [...acc[category], item] : [item];
    return acc;
  }, {});

  return (
    <section className="rounded-3xl border border-avocado-100 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="section-title">Shopping List</h2>
        <span className="text-xs text-slate-400">Only missing items</span>
      </div>
      {uniqueMissing.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          You’re set! No extra items needed for your current meal plan.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {categoryOrder
            .filter((category) => grouped[category])
            .map((category) => (
              <div key={category} className="rounded-2xl border border-avocado-100 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-avocado-700">
                  {category}
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600">
                  {grouped[category].map((item) => (
                    <li key={`${category}-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
