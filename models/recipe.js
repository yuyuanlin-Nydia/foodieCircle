class Recipe {
  constructor(
    id,
    categoryIds,
    title,
    author,
    calories,
    affordability,
    complexity,
    imageUrl,
    duration,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree,
    uploadDate
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.author = author;
    this.calories = calories;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.steps = steps;
    this.duration = duration;
    this.complexity = complexity;
    this.affordability = affordability;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
    this.isLactoseFree = isLactoseFree;
    this.uploadDate = uploadDate;
  }
}

export default Recipe;
