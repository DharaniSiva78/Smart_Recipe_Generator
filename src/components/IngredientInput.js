import React, { useState } from 'react';
import { Plus, X, Search } from 'lucide-react';

const popularIngredients = [
  "chicken", "rice", "onion", "tomato", "garlic", "ginger", 
  "potato", "paneer", "spinach", "lentils", "yogurt", "cream",
  "butter", "flour", "spices", "chili", "coconut", "lemon"
];

const IngredientInput = ({ ingredients, setIngredients, suggestions }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addIngredient = (ingredient = null) => {
    const ingToAdd = ingredient || inputValue.trim().toLowerCase();
    if (ingToAdd && !ingredients.includes(ingToAdd)) {
      setIngredients([...ingredients, ingToAdd]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  const filteredPopular = popularIngredients.filter(ing =>
    !ingredients.includes(ing) &&
    ing.includes(inputValue.toLowerCase())
  );

  return (
    <div className="ingredient-input">
      <div className="section-header">
        <h3>Available Ingredients</h3>
        <span className="ingredient-count">{ingredients.length} added</span>
      </div>
      
      <div className="input-group">
        <div className="input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type ingredients like chicken, rice, spices..."
            className="ingredient-search"
            onFocus={() => setShowSuggestions(true)}
          />
        </div>
        <button onClick={() => addIngredient()} className="add-btn" disabled={!inputValue.trim()}>
          <Plus size={20} />
          Add
        </button>
      </div>

      {/* Popular Ingredients */}
      {showSuggestions && filteredPopular.length > 0 && (
        <div className="suggestions-popup">
          <div className="suggestions-header">
            <span>Popular Ingredients</span>
            <button onClick={() => setShowSuggestions(false)} className="close-suggestions">
              <X size={16} />
            </button>
          </div>
          <div className="popular-ingredients">
            {filteredPopular.slice(0, 6).map((ingredient, index) => (
              <button
                key={index}
                onClick={() => addIngredient(ingredient)}
                className="popular-ingredient"
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Added Ingredients */}
      <div className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <span key={index} className="ingredient-tag">
            <span className="ingredient-text">{ingredient}</span>
            <button onClick={() => removeIngredient(index)} className="remove-btn">
              <X size={14} />
            </button>
          </span>
        ))}
        {ingredients.length === 0 && (
          <div className="empty-ingredients">
            <Search size={32} />
            <p>Add ingredients to find matching recipes</p>
          </div>
        )}
      </div>
      
      {/* Ingredient Suggestions */}
      {suggestions.length > 0 && (
        <div className="ingredient-suggestions">
          <h4>Suggested additions:</h4>
          <div className="suggestion-tags">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => addIngredient(suggestion)}
                className="suggestion-tag"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;