import type { GeneratedRecipe } from "@/lib/recipes";

type MealPlanSlot = {
  day: string;
  recipe?: GeneratedRecipe;
};

type MealPlanProps = {
  plan: MealPlanSlot[];
  onRemove: (day: string) => void;
};

export default function MealPlan({ plan, onRemove }: MealPlanProps) {
  return (
    <section className="rounded-3xl border border-avocado-100 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="section-title">3-Day Meal Plan</h2>
        <span className="text-xs text-slate-400">Auto-fills in order</span>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {plan.map((slot) => (
          <div
            key={slot.day}
            className="rounded-2xl border border-avocado-100 bg-avocado-50 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-avocado-700">
              {slot.day}
            </p>
            {slot.recipe ? (
              <div className="mt-3">
                <p className="text-sm font-semibold text-night">{slot.recipe.title}</p>
                <p className="text-xs text-slate-500">
                  {slot.recipe.time} min · {slot.recipe.diet}
                </p>
                <button
                  onClick={() => onRemove(slot.day)}
                  className="mt-3 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-400">Add a recipe to plan.</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export type { MealPlanSlot };
