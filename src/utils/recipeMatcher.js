export const findMatchingRecipes = (availableIngredients, recipes, filters = {}) => {
  if (!availableIngredients || !availableIngredients.length || !recipes) return [];
  
  return recipes.filter(recipe => {
    if (!recipe.ingredients) return false;
    
    // Calculate match score based on ingredients
    const matchingIngredients = recipe.ingredients.filter(ingredient => 
      availableIngredients.some(available => {
        const ingLower = ingredient.toLowerCase();
        const availLower = available.toLowerCase();
        return ingLower.includes(availLower) || availLower.includes(ingLower);
      })
    );
    
    const matchScore = matchingIngredients.length / recipe.ingredients.length;
    
    // Apply filters
    const matchesDietary = !filters.dietary || 
      (recipe.dietary && recipe.dietary.includes(filters.dietary));
    
    const matchesCookingTime = !filters.maxCookingTime || 
      recipe.cookingTime <= parseInt(filters.maxCookingTime);
    
    const matchesDifficulty = !filters.difficulty || 
      recipe.difficulty === filters.difficulty;
    
    const matchesCuisine = !filters.cuisine || 
      recipe.cuisine === filters.cuisine;

    // Return recipes with at least 20% ingredient match and matching filters
    return matchScore >= 0.2 && matchesDietary && matchesCookingTime && matchesDifficulty && matchesCuisine;
  }).map(recipe => {
    // Calculate match percentage for each recipe
    const matchingIngredients = recipe.ingredients.filter(ingredient => 
      availableIngredients.some(available => {
        const ingLower = ingredient.toLowerCase();
        const availLower = available.toLowerCase();
        return ingLower.includes(availLower) || availLower.includes(ingLower);
      })
    );
    
    const matchPercentage = Math.round((matchingIngredients.length / recipe.ingredients.length) * 100);
    
    return {
      ...recipe,
      matchPercentage: matchPercentage,
      matchedIngredients: matchingIngredients.length,
      totalIngredients: recipe.ingredients.length
    };
  }).sort((a, b) => {
    // Sort by match percentage (descending)
    return b.matchPercentage - a.matchPercentage;
  });
};

export const getIngredientSuggestions = (ingredients, recipes) => {
  if (!ingredients || !ingredients.length || !recipes) return [];
  
  const allIngredients = new Set();
  
  recipes.forEach(recipe => {
    if (recipe.ingredients) {
      recipe.ingredients.forEach(ingredient => {
        // Split compound ingredients and add individual ones
        const individualIngredients = ingredient.split(/[,\s]+/).filter(ing => ing.length > 2);
        individualIngredients.forEach(ing => allIngredients.add(ing.toLowerCase()));
      });
    }
  });
  
  return Array.from(allIngredients).filter(ingredient =>
    !ingredients.some(available => 
      available.toLowerCase().includes(ingredient) || 
      ingredient.includes(available.toLowerCase())
    )
  ).slice(0, 8);
};