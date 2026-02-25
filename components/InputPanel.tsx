"use client";

import type { Diet, Region } from "@/lib/substitutions";
import { DIET_OPTIONS, REGION_OPTIONS, REGION_LABELS } from "@/lib/substitutions";

type InputPanelProps = {
  pantryInput: string;
  onPantryChange: (value: string) => void;
  region: Region;
  onRegionChange: (value: Region) => void;
  diet: Diet;
  onDietChange: (value: Diet) => void;
  maxTime: number;
  onMaxTimeChange: (value: number) => void;
  servings: number;
  onServingsChange: (value: number) => void;
  onGenerate: () => void;
  onDemo: () => void;
  onClear: () => void;
};

export default function InputPanel({
  pantryInput,
  onPantryChange,
  region,
  onRegionChange,
  diet,
  onDietChange,
  maxTime,
  onMaxTimeChange,
  servings,
  onServingsChange,
  onGenerate,
  onDemo,
  onClear
}: InputPanelProps) {
  return (
    <section className="rounded-3xl border border-avocado-100 bg-white p-6 shadow-card md:p-8">
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-night">Your pantry ingredients</label>
          <textarea
            className="mt-2 min-h-[96px] w-full rounded-2xl border border-avocado-100 bg-avocado-50 px-4 py-3 text-sm focus:border-avocado-300 focus:outline-none focus:ring-2 focus:ring-avocado-100"
            placeholder="e.g. avocado, bread, tomato, yogurt, lemon, chili flakes"
            value={pantryInput}
            onChange={(event) => onPantryChange(event.target.value)}
          />
          <p className="mt-2 text-xs text-slate-500">
            Tip: separate items with commas. We’ll match your pantry first and suggest smart swaps.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="text-sm font-medium text-night">Region</label>
            <select
              value={region}
              onChange={(event) => onRegionChange(event.target.value as Region)}
              className="mt-2 w-full rounded-xl border border-avocado-100 bg-white px-3 py-2 text-sm"
            >
              {REGION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {REGION_LABELS[option]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-night">Diet</label>
            <select
              value={diet}
              onChange={(event) => onDietChange(event.target.value as Diet)}
              className="mt-2 w-full rounded-xl border border-avocado-100 bg-white px-3 py-2 text-sm"
            >
              {DIET_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-night">Max time</label>
            <select
              value={maxTime}
              onChange={(event) => onMaxTimeChange(Number(event.target.value))}
              className="mt-2 w-full rounded-xl border border-avocado-100 bg-white px-3 py-2 text-sm"
            >
              {[10, 20, 40].map((value) => (
                <option key={value} value={value}>
                  {value} min
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-night">Servings</label>
            <select
              value={servings}
              onChange={(event) => onServingsChange(Number(event.target.value))}
              className="mt-2 w-full rounded-xl border border-avocado-100 bg-white px-3 py-2 text-sm"
            >
              {[1, 2, 3, 4].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onGenerate}
            className="rounded-full bg-avocado-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-avocado-700"
          >
            Generate recipes
          </button>
          <button
            onClick={onDemo}
            className="rounded-full border border-avocado-200 px-5 py-2 text-sm font-semibold text-avocado-700 hover:border-avocado-300"
          >
            Try demo pantry
          </button>
          <button
            onClick={onClear}
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-500 hover:border-slate-300"
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}
