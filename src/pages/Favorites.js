import React from 'react';
import RecipeCard from '../components/RecipeCard';
import { Heart } from 'lucide-react';

const Favorites = ({ recipes, favorites, onToggleFavorite }) => {
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div className="favorites">
      <div className="container">
        <div className="page-header">
          <Heart size={32} className="heart-icon" />
          <h1>Your Favorite Recipes</h1>
        </div>
        
        {favoriteRecipes.length > 0 ? (
          <div className="recipes-grid">
            {favoriteRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id}
                recipe={recipe}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Heart size={64} />
            <h3>No favorites yet</h3>
            <p>Start adding recipes to your favorites to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;