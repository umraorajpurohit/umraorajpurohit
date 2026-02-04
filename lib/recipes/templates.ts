import type { Diet, Role } from "@/lib/substitutions";

export type IngredientSpec = {
  name: string;
  amountMetric: string;
  amountUs: string;
  role?: Role;
};

export type RecipeTemplate = {
  id: string;
  title: string;
  time: number;
  diet: Diet;
  baseIngredients: IngredientSpec[];
  roleSlots: Role[];
  optionalIngredients: IngredientSpec[];
  steps: string[];
  tags: string[];
};

export const RECIPE_TEMPLATES: RecipeTemplate[] = [
  {
    id: "avo-toast-classic",
    title: "Classic Avocado Toast",
    time: 10,
    diet: "Vegetarian",
    baseIngredients: [
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "bread", amountMetric: "2 slices", amountUs: "2 slices", role: "Base/Carb" }
    ],
    roleSlots: ["Acid", "Heat", "Herbs/Freshness"],
    optionalIngredients: [
      { name: "tomato", amountMetric: "1/2", amountUs: "1/2" },
      { name: "olive oil", amountMetric: "10 ml", amountUs: "2 tsp" }
    ],
    steps: [
      "Toast the {base} until golden.",
      "Mash avocado with {acid} and a pinch of salt.",
      "Spread the mash on toast, finish with {heat} and {herbs}."
    ],
    tags: ["snack", "breakfast"]
  },
  {
    id: "avo-toast-mediterranean",
    title: "Mediterranean Avocado Toast",
    time: 10,
    diet: "Vegetarian",
    baseIngredients: [
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "sourdough", amountMetric: "2 slices", amountUs: "2 slices", role: "Base/Carb" },
      { name: "tomato", amountMetric: "1", amountUs: "1" }
    ],
    roleSlots: ["Acid", "Herbs/Freshness", "Crunch"],
    optionalIngredients: [
      { name: "feta", amountMetric: "40 g", amountUs: "1.5 oz" }
    ],
    steps: [
      "Toast the {base} and rub with garlic if available.",
      "Layer sliced tomato and avocado.",
      "Finish with {acid}, {herbs}, and {crunch}."
    ],
    tags: ["breakfast", "light"]
  },
  {
    id: "avo-chickpea-smash",
    title: "Avocado Chickpea Smash",
    time: 15,
    diet: "Vegan",
    baseIngredients: [
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "chickpeas", amountMetric: "150 g", amountUs: "3/4 cup", role: "Protein" }
    ],
    roleSlots: ["Acid", "Heat", "Herbs/Freshness"],
    optionalIngredients: [
      { name: "onion", amountMetric: "1/4", amountUs: "1/4" }
    ],
    steps: [
      "Roughly mash chickpeas with avocado.",
      "Stir in {acid}, {heat}, and salt.",
      "Fold in {herbs} and serve in bowls or wraps."
    ],
    tags: ["protein", "meal"]
  },
  {
    id: "avo-tomato-bowl",
    title: "Avocado Tomato Salsa Bowl",
    time: 15,
    diet: "Vegan",
    baseIngredients: [
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "tomato", amountMetric: "2", amountUs: "2" },
      { name: "corn", amountMetric: "80 g", amountUs: "1/2 cup" }
    ],
    roleSlots: ["Acid", "Herbs/Freshness", "Heat"],
    optionalIngredients: [
      { name: "beans", amountMetric: "120 g", amountUs: "1/2 cup" }
    ],
    steps: [
      "Dice tomato and avocado into a bowl.",
      "Add corn, {acid}, {herbs}, and {heat}.",
      "Toss and serve with tortilla or rice."
    ],
    tags: ["bowl", "fresh"]
  },
  {
    id: "avo-raita",
    title: "Avocado Yogurt Raita",
    time: 10,
    diet: "Vegetarian",
    baseIngredients: [
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "yogurt", amountMetric: "120 g", amountUs: "1/2 cup", role: "Creamy/Fat" },
      { name: "cucumber", amountMetric: "1/2", amountUs: "1/2" }
    ],
    roleSlots: ["Herbs/Freshness", "Heat"],
    optionalIngredients: [
      { name: "cumin", amountMetric: "1/2 tsp", amountUs: "1/2 tsp" }
    ],
    steps: [
      "Whisk yogurt with mashed avocado.",
      "Fold in cucumber, {herbs}, and {heat}.",
      "Chill for 5 minutes and serve."
    ],
    tags: ["dip", "cool"]
  },
  {
    id: "avo-smoothie",
    title: "Avocado Green Smoothie",
    time: 10,
    diet: "Vegan",
    baseIngredients: [
      { name: "avocado", amountMetric: "1/2", amountUs: "1/2" },
      { name: "banana", amountMetric: "1", amountUs: "1" },
      { name: "spinach", amountMetric: "30 g", amountUs: "1 cup" }
    ],
    roleSlots: ["Creamy/Fat", "Acid"],
    optionalIngredients: [
      { name: "oats", amountMetric: "20 g", amountUs: "1/4 cup" }
    ],
    steps: [
      "Blend avocado, banana, spinach, and {creamy}.",
      "Add {acid} to brighten the flavor.",
      "Blend until smooth and serve cold."
    ],
    tags: ["drink", "quick"]
  },
  {
    id: "avo-rice-bowl",
    title: "Avocado Rice Bowl",
    time: 20,
    diet: "Vegan",
    baseIngredients: [
      { name: "rice", amountMetric: "200 g", amountUs: "1 cup", role: "Base/Carb" },
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "cucumber", amountMetric: "1/2", amountUs: "1/2" }
    ],
    roleSlots: ["Acid", "Heat", "Herbs/Freshness"],
    optionalIngredients: [
      { name: "edamame", amountMetric: "80 g", amountUs: "1/2 cup" }
    ],
    steps: [
      "Layer warm rice in a bowl and top with avocado and cucumber.",
      "Drizzle with {acid} and a pinch of salt.",
      "Finish with {heat} and {herbs}."
    ],
    tags: ["bowl", "meal"]
  },
  {
    id: "avo-pasta-sauce",
    title: "Creamy Avocado Pasta",
    time: 20,
    diet: "Vegetarian",
    baseIngredients: [
      { name: "pasta", amountMetric: "200 g", amountUs: "7 oz", role: "Base/Carb" },
      { name: "avocado", amountMetric: "1", amountUs: "1" }
    ],
    roleSlots: ["Acid", "Herbs/Freshness", "Creamy/Fat"],
    optionalIngredients: [
      { name: "parmesan", amountMetric: "30 g", amountUs: "1 oz" }
    ],
    steps: [
      "Blend avocado with {acid}, {creamy}, and {herbs} to make a sauce.",
      "Toss hot pasta with the sauce off the heat.",
      "Finish with black pepper and optional parmesan."
    ],
    tags: ["pasta", "comfort"]
  },
  {
    id: "avo-egg-salad",
    title: "Avocado Egg Salad",
    time: 15,
    diet: "Vegetarian",
    baseIngredients: [
      { name: "eggs", amountMetric: "2", amountUs: "2", role: "Protein" },
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "bread", amountMetric: "2 slices", amountUs: "2 slices", role: "Base/Carb" }
    ],
    roleSlots: ["Acid", "Herbs/Freshness"],
    optionalIngredients: [
      { name: "mustard", amountMetric: "1 tsp", amountUs: "1 tsp" }
    ],
    steps: [
      "Chop boiled eggs and mash with avocado.",
      "Add {acid} and {herbs} for freshness.",
      "Pile onto toast or wrap."
    ],
    tags: ["protein", "lunch"]
  },
  {
    id: "avo-bean-taco",
    title: "Avocado Bean Tacos",
    time: 20,
    diet: "Vegan",
    baseIngredients: [
      { name: "beans", amountMetric: "150 g", amountUs: "3/4 cup", role: "Protein" },
      { name: "tortilla", amountMetric: "3", amountUs: "3", role: "Base/Carb" },
      { name: "avocado", amountMetric: "1", amountUs: "1" }
    ],
    roleSlots: ["Heat", "Acid", "Herbs/Freshness"],
    optionalIngredients: [
      { name: "onion", amountMetric: "1/4", amountUs: "1/4" }
    ],
    steps: [
      "Warm tortillas and spoon in beans.",
      "Top with sliced avocado, {acid}, and {heat}.",
      "Finish with {herbs} and serve."
    ],
    tags: ["tacos", "weeknight"]
  },
  {
    id: "avo-salad",
    title: "Crisp Avocado Salad",
    time: 15,
    diet: "Vegan",
    baseIngredients: [
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "greens", amountMetric: "60 g", amountUs: "2 cups" },
      { name: "cucumber", amountMetric: "1/2", amountUs: "1/2" }
    ],
    roleSlots: ["Acid", "Herbs/Freshness", "Crunch"],
    optionalIngredients: [
      { name: "tomato", amountMetric: "1", amountUs: "1" }
    ],
    steps: [
      "Toss greens with {acid} and olive oil.",
      "Add avocado and cucumber.",
      "Finish with {herbs} and {crunch}."
    ],
    tags: ["salad", "fresh"]
  },
  {
    id: "avo-chilled-soup",
    title: "Chilled Avocado Soup",
    time: 20,
    diet: "Vegetarian",
    baseIngredients: [
      { name: "avocado", amountMetric: "2", amountUs: "2" },
      { name: "yogurt", amountMetric: "120 g", amountUs: "1/2 cup", role: "Creamy/Fat" }
    ],
    roleSlots: ["Acid", "Herbs/Freshness"],
    optionalIngredients: [
      { name: "cucumber", amountMetric: "1/2", amountUs: "1/2" }
    ],
    steps: [
      "Blend avocado with {creamy} and cold water.",
      "Season with {acid} and salt.",
      "Chill and top with {herbs}."
    ],
    tags: ["soup", "cool"]
  },
  {
    id: "avo-overnight-oats",
    title: "Avocado Overnight Oats",
    time: 10,
    diet: "Vegan",
    baseIngredients: [
      { name: "oats", amountMetric: "60 g", amountUs: "1/2 cup", role: "Base/Carb" },
      { name: "avocado", amountMetric: "1/2", amountUs: "1/2" },
      { name: "milk", amountMetric: "200 ml", amountUs: "3/4 cup", role: "Creamy/Fat" }
    ],
    roleSlots: ["Acid"],
    optionalIngredients: [
      { name: "berries", amountMetric: "60 g", amountUs: "1/2 cup" }
    ],
    steps: [
      "Mash avocado and whisk with milk.",
      "Stir in oats and {acid}.",
      "Chill overnight and top with fruit."
    ],
    tags: ["breakfast", "make-ahead"]
  },
  {
    id: "avo-stuffed-tomato",
    title: "Avocado Stuffed Tomatoes",
    time: 15,
    diet: "Vegan",
    baseIngredients: [
      { name: "tomato", amountMetric: "2", amountUs: "2" },
      { name: "avocado", amountMetric: "1", amountUs: "1" }
    ],
    roleSlots: ["Acid", "Herbs/Freshness", "Crunch"],
    optionalIngredients: [
      { name: "corn", amountMetric: "60 g", amountUs: "1/2 cup" }
    ],
    steps: [
      "Scoop tomato centers and chop the pulp.",
      "Mix pulp with avocado, {acid}, and {herbs}.",
      "Stuff tomatoes and top with {crunch}."
    ],
    tags: ["starter", "fresh"]
  },
  {
    id: "avo-sushi-bowl",
    title: "Avocado Sushi Bowl",
    time: 25,
    diet: "Vegan",
    baseIngredients: [
      { name: "rice", amountMetric: "200 g", amountUs: "1 cup", role: "Base/Carb" },
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "cucumber", amountMetric: "1/2", amountUs: "1/2" }
    ],
    roleSlots: ["Acid", "Crunch"],
    optionalIngredients: [
      { name: "carrot", amountMetric: "1/2", amountUs: "1/2" }
    ],
    steps: [
      "Season rice with {acid} and a pinch of sugar.",
      "Top with avocado and cucumber ribbons.",
      "Finish with {crunch} and sesame if available."
    ],
    tags: ["bowl", "sushi"]
  },
  {
    id: "avo-quinoa-bowl",
    title: "Avocado Quinoa Power Bowl",
    time: 25,
    diet: "Vegan",
    baseIngredients: [
      { name: "quinoa", amountMetric: "180 g", amountUs: "1 cup", role: "Base/Carb" },
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "spinach", amountMetric: "40 g", amountUs: "1.5 cups" }
    ],
    roleSlots: ["Acid", "Protein", "Crunch"],
    optionalIngredients: [
      { name: "tomato", amountMetric: "1", amountUs: "1" }
    ],
    steps: [
      "Layer quinoa with spinach and avocado.",
      "Add your {protein} and drizzle with {acid}.",
      "Top with {crunch} before serving."
    ],
    tags: ["bowl", "protein"]
  },
  {
    id: "avo-hummus",
    title: "Avocado Hummus",
    time: 15,
    diet: "Vegan",
    baseIngredients: [
      { name: "chickpeas", amountMetric: "200 g", amountUs: "1 cup", role: "Protein" },
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "tahini", amountMetric: "20 g", amountUs: "1 tbsp", role: "Creamy/Fat" }
    ],
    roleSlots: ["Acid", "Heat"],
    optionalIngredients: [
      { name: "garlic", amountMetric: "1 clove", amountUs: "1 clove" }
    ],
    steps: [
      "Blend chickpeas, avocado, and {creamy} until smooth.",
      "Add {acid}, {heat}, and salt.",
      "Serve with veggie sticks or bread."
    ],
    tags: ["dip", "protein"]
  },
  {
    id: "avo-pesto",
    title: "Avocado Herb Pesto",
    time: 15,
    diet: "Vegan",
    baseIngredients: [
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "nuts", amountMetric: "40 g", amountUs: "1/3 cup", role: "Crunch" },
      { name: "olive oil", amountMetric: "20 ml", amountUs: "1.5 tbsp", role: "Creamy/Fat" }
    ],
    roleSlots: ["Herbs/Freshness", "Acid"],
    optionalIngredients: [
      { name: "garlic", amountMetric: "1 clove", amountUs: "1 clove" }
    ],
    steps: [
      "Blend avocado with {herbs} and {creamy}.",
      "Add {acid} and pulse in nuts for texture.",
      "Toss with pasta or spread on toast."
    ],
    tags: ["sauce", "quick"]
  },
  {
    id: "avo-noodle-salad",
    title: "Avocado Noodle Salad",
    time: 20,
    diet: "Vegan",
    baseIngredients: [
      { name: "noodles", amountMetric: "180 g", amountUs: "6 oz", role: "Base/Carb" },
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "carrot", amountMetric: "1", amountUs: "1" }
    ],
    roleSlots: ["Acid", "Heat", "Herbs/Freshness"],
    optionalIngredients: [
      { name: "cucumber", amountMetric: "1/2", amountUs: "1/2" }
    ],
    steps: [
      "Toss cooked noodles with {acid} and a splash of oil.",
      "Fold in avocado and vegetables.",
      "Finish with {herbs} and {heat}."
    ],
    tags: ["salad", "noodles"]
  },
  {
    id: "avo-protein-wrap",
    title: "Avocado Protein Wrap",
    time: 15,
    diet: "Any",
    baseIngredients: [
      { name: "wrap", amountMetric: "2", amountUs: "2", role: "Base/Carb" },
      { name: "avocado", amountMetric: "1", amountUs: "1" }
    ],
    roleSlots: ["Protein", "Acid", "Herbs/Freshness"],
    optionalIngredients: [
      { name: "spinach", amountMetric: "30 g", amountUs: "1 cup" }
    ],
    steps: [
      "Spread mashed avocado on the wrap.",
      "Add {protein} and a splash of {acid}.",
      "Roll with {herbs} and greens."
    ],
    tags: ["wrap", "quick"]
  },
  {
    id: "avo-tomato-pasta",
    title: "Avocado Tomato Pasta Salad",
    time: 20,
    diet: "Vegan",
    baseIngredients: [
      { name: "pasta", amountMetric: "200 g", amountUs: "7 oz", role: "Base/Carb" },
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "tomato", amountMetric: "1", amountUs: "1" }
    ],
    roleSlots: ["Acid", "Herbs/Freshness", "Crunch"],
    optionalIngredients: [
      { name: "olive oil", amountMetric: "10 ml", amountUs: "2 tsp" }
    ],
    steps: [
      "Toss cooked pasta with avocado and tomato.",
      "Add {acid} and {herbs} for brightness.",
      "Finish with {crunch}."
    ],
    tags: ["pasta", "salad"]
  },
  {
    id: "avo-lentil-bowl",
    title: "Avocado Lentil Bowl",
    time: 25,
    diet: "Vegan",
    baseIngredients: [
      { name: "lentils", amountMetric: "180 g", amountUs: "1 cup", role: "Protein" },
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "spinach", amountMetric: "40 g", amountUs: "1.5 cups" }
    ],
    roleSlots: ["Acid", "Herbs/Freshness"],
    optionalIngredients: [
      { name: "tomato", amountMetric: "1", amountUs: "1" }
    ],
    steps: [
      "Layer warm lentils with spinach and avocado.",
      "Drizzle with {acid} and season.",
      "Top with {herbs} before serving."
    ],
    tags: ["bowl", "hearty"]
  },
  {
    id: "avo-mango-salsa",
    title: "Avocado Mango Salsa",
    time: 15,
    diet: "Vegan",
    baseIngredients: [
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "mango", amountMetric: "1", amountUs: "1" },
      { name: "onion", amountMetric: "1/4", amountUs: "1/4" }
    ],
    roleSlots: ["Acid", "Heat", "Herbs/Freshness"],
    optionalIngredients: [
      { name: "tomato", amountMetric: "1", amountUs: "1" }
    ],
    steps: [
      "Dice mango, avocado, and onion.",
      "Stir in {acid} and {heat}.",
      "Finish with {herbs} and serve as a topper."
    ],
    tags: ["salsa", "fresh"]
  },
  {
    id: "avo-kale-caesar",
    title: "Avocado Kale Caesar",
    time: 20,
    diet: "Vegetarian",
    baseIngredients: [
      { name: "kale", amountMetric: "80 g", amountUs: "3 cups" },
      { name: "avocado", amountMetric: "1", amountUs: "1" },
      { name: "bread", amountMetric: "1 slice", amountUs: "1 slice", role: "Crunch" }
    ],
    roleSlots: ["Acid", "Creamy/Fat"],
    optionalIngredients: [
      { name: "parmesan", amountMetric: "20 g", amountUs: "3/4 oz" }
    ],
    steps: [
      "Blend avocado with {acid} and {creamy} for dressing.",
      "Massage kale with dressing.",
      "Top with crunchy bread and parmesan."
    ],
    tags: ["salad", "green"]
  }
];
