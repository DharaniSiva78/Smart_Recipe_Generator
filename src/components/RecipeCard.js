import React, { useState } from 'react';
import { Clock, Users, Star, ChefHat, Utensils, Heart, Timer, Flame } from 'lucide-react';
import NutritionInfo from './NutritionInfo';

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite }) => {
  const [showNutrition, setShowNutrition] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [imageError, setImageError] = useState(false);

  const matchPercentage = recipe.matchPercentage || 0;
  const rating = recipe.rating || 4.0;

  // Handle image loading with fallback
  const getImageSrc = () => {
    if (imageError) {
      // Fallback to a default food image
      return '/images/default-food.jpg';
    }
    return recipe.image;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="currentColor" className="star-filled" />);
    }

    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="star-empty" />);
    }

    return stars;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e';
      case 'Medium': return '#eab308';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <img 
          src={getImageSrc()} 
          alt={recipe.name}
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={() => onToggleFavorite(recipe.id)}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        {matchPercentage > 0 && (
          <div className="match-badge">
            {matchPercentage}% Match
          </div>
        )}
        <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(recipe.difficulty) }}>
          {recipe.difficulty}
        </div>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-header">
          <h3>{recipe.name}</h3>
          <div className="recipe-rating">
            <div className="rating-stars">
              {renderStars(rating)}
            </div>
            <span className="rating-value">{rating}</span>
          </div>
        </div>
        
        <div className="recipe-meta-grid">
          <div className="meta-item">
            <Timer size={16} />
            <div>
              <span className="meta-value">{recipe.cookingTime} min</span>
              <span className="meta-label">Cook Time</span>
            </div>
          </div>
          <div className="meta-item">
            <Users size={16} />
            <div>
              <span className="meta-value">{recipe.servings}</span>
              <span className="meta-label">Servings</span>
            </div>
          </div>
          <div className="meta-item">
            <Flame size={16} />
            <div>
              <span className="meta-value">{recipe.calories}</span>
              <span className="meta-label">Calories</span>
            </div>
          </div>
        </div>
        
        <div className="dietary-tags">
          {recipe.dietary && recipe.dietary.map((tag, index) => (
            <span key={index} className={`dietary-tag ${tag.toLowerCase().replace('-', '')}`}>
              {tag}
            </span>
          ))}
        </div>
        
        <div className="recipe-actions">
          <button 
            className="action-btn primary"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            <Utensils size={16} />
            {showInstructions ? 'Hide Instructions' : 'View Recipe'}
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => setShowNutrition(!showNutrition)}
          >
            {showNutrition ? 'Hide Nutrition' : 'Nutrition Info'}
          </button>
        </div>
        
        {showInstructions && (
          <div className="instructions-section">
            <h4>Cooking Instructions</h4>
            <div className="instructions-list">
              {recipe.instructions.map((step, index) => (
                <div key={index} className="instruction-step">
                  <span className="step-number">{index + 1}</span>
                  <p className="step-text">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {showNutrition && <NutritionInfo recipe={recipe} />}
        
        <div className="ingredients-section">
          <h4>Ingredients</h4>
          <div className="ingredients-grid">
            {recipe.ingredients.map((ingredient, index) => (
              <span key={index} className="ingredient-item">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
