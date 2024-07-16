const isVegetarian = (food) => food.isVegetarian;

const sortByName = (a, b) => a.name.localeCompare(b.name);

const formatName = (food) => ({ ...food, name: food.name.toUpperCase() });

const compose =
  (...functions) =>
  (input) =>
    functions.reduceRight((acc, fn) => fn(acc), input);

// Sample data: List of Japanese food items
const japaneseFoods = [
  { name: "Sushi", isVegetarian: false },
  { name: "Tempura", isVegetarian: true },
  { name: "Tofu", isVegetarian: true },
  { name: "Ramen", isVegetarian: false },
  { name: "Edamame", isVegetarian: true },
];

// Step 1: Filter Vegetarian Items
const filterVegetarian = (foods) => foods.filter(isVegetarian);

// Step 2: Sort by Name
const sortFoods = (foods) => foods.sort(sortByName);

// Step 3: Format Names to Uppercase
const formatNames = (foods) => foods.map(formatName);

// Compose the functions
const processFoods = compose(formatNames, sortFoods, filterVegetarian);

// Process the list of Japanese foods
const result = processFoods(japaneseFoods);

console.log(result);
