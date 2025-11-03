import React, { useState, useEffect } from 'react';
import IngredientInput from '../components/IngredientInput';
import RecipeCard from '../components/RecipeCard';
import { findMatchingRecipes, getIngredientSuggestions } from '../utils/recipeMatcher';

const Home = ({ recipes, favorites, onToggleFavorite, searchTerm }) => {
  const [ingredients, setIngredients] = useState([]);
  const [matchingRecipes, setMatchingRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const matched = findMatchingRecipes(ingredients, recipes, {});
    
    // Apply search term filter if present
    const filteredBySearch = searchTerm 
      ? matched.filter(recipe => 
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (recipe.cuisine && recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : matched;
    
    setMatchingRecipes(filteredBySearch);
    setSuggestions(getIngredientSuggestions(ingredients, recipes));
  }, [ingredients, recipes, searchTerm]);

  const getResultsMessage = () => {
    if (ingredients.length === 0) {
      return 'Add ingredients to find recipes';
    }
    
    if (matchingRecipes.length > 0) {
      return `Found ${matchingRecipes.length} Matching Recipes`;
    }
    
    // Show specific message based on ingredient count
    if (ingredients.length === 1) {
      return 'Add more ingredients to find better matches';
    }
    
    return 'No recipes found with these exact ingredients';
  };

  return (
    <div className="home">
      <div className="container">
        <div className="sidebar">
          <IngredientInput 
            ingredients={ingredients}
            setIngredients={setIngredients}
            suggestions={suggestions}
          />
        </div>
        
        <div className="main-content">
          <div className="results-header">
            <h2>{getResultsMessage()}</h2>
            {ingredients.length > 0 && (
              <button 
                className="clear-btn"
                onClick={() => setIngredients([])}
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="recipes-grid">
            {matchingRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>

          {ingredients.length > 0 && matchingRecipes.length === 0 && (
            <div className="no-recipes-help">
              <h3>Tips to find more recipes:</h3>
              <ul>
                <li>Try adding <strong>common ingredients</strong> like: rice, chicken, tomato, spices</li>
                <li>Check the <strong>ingredient suggestions</strong> above for ideas</li>
                <li>Try <strong>broader terms</strong> - "spices" instead of specific spice names</li>
                <li>Start with 2-3 main ingredients for better matches</li>
              </ul>
              
              {suggestions.length > 0 && (
                <div className="suggested-ingredients">
                  <h4>Popular ingredients to try:</h4>
                  <div className="suggestion-tags">
                    {suggestions.map((suggestion, index) => (
                      <span key={index} className="suggestion-tag">
                        {suggestion}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;