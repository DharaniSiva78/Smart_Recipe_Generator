import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Search, Filter, ChefHat } from 'lucide-react';

const Recipes = ({ recipes, favorites, onToggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filters, setFilters] = useState({
    cuisine: '',
    difficulty: '',
    dietary: '',
    maxCookingTime: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let results = recipes;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        (recipe.cuisine && recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply other filters
    if (filters.cuisine) {
      results = results.filter(recipe => recipe.cuisine === filters.cuisine);
    }

    if (filters.difficulty) {
      results = results.filter(recipe => recipe.difficulty === filters.difficulty);
    }

    if (filters.dietary) {
      results = results.filter(recipe => 
        recipe.dietary && recipe.dietary.includes(filters.dietary)
      );
    }

    if (filters.maxCookingTime) {
      results = results.filter(recipe => 
        recipe.cookingTime <= parseInt(filters.maxCookingTime)
      );
    }

    setFilteredRecipes(results);
  }, [searchTerm, filters, recipes]);

  const clearFilters = () => {
    setFilters({
      cuisine: '',
      difficulty: '',
      dietary: '',
      maxCookingTime: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || filters.cuisine || filters.difficulty || filters.dietary || filters.maxCookingTime;

  const getCuisineOptions = () => {
    const cuisines = [...new Set(recipes.map(recipe => recipe.cuisine).filter(Boolean))];
    return cuisines.sort();
  };

  const getDietaryOptions = () => {
    const allDietary = recipes.flatMap(recipe => recipe.dietary || []);
    return [...new Set(allDietary)].sort();
  };

  return (
    <div className="recipes-page">
      <div className="container">
        <div className="page-header">
          <ChefHat size={32} className="chef-icon" />
          <div>
            <h1>All Recipes</h1>
            <p>Browse our complete collection of delicious Indian recipes</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search recipes by name, ingredients, or cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filters
            {hasActiveFilters && (
              <span className="filter-indicator"></span>
            )}
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="expanded-filters">
            <div className="filters-grid">
              <div className="filter-group">
                <label>Cuisine</label>
                <select
                  value={filters.cuisine}
                  onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
                >
                  <option value="">All Cuisines</option>
                  {getCuisineOptions().map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Difficulty</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                >
                  <option value="">Any Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Dietary</label>
                <select
                  value={filters.dietary}
                  onChange={(e) => setFilters({...filters, dietary: e.target.value})}
                >
                  <option value="">Any Dietary</option>
                  {getDietaryOptions().map(dietary => (
                    <option key={dietary} value={dietary}>{dietary}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Max Cooking Time</label>
                <select
                  value={filters.maxCookingTime}
                  onChange={(e) => setFilters({...filters, maxCookingTime: e.target.value})}
                >
                  <option value="">Any Time</option>
                  <option value="15">15 minutes or less</option>
                  <option value="30">30 minutes or less</option>
                  <option value="45">45 minutes or less</option>
                  <option value="60">60 minutes or less</option>
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="results-summary">
          <h3>
            {filteredRecipes.length === recipes.length && !hasActiveFilters
              ? `All Recipes (${recipes.length})`
              : `Found ${filteredRecipes.length} of ${recipes.length} recipes`
            }
            {hasActiveFilters && (
              <button className="clear-search-btn" onClick={clearFilters}>
                Clear
              </button>
            )}
          </h3>
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="recipes-grid">
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <ChefHat size={64} />
            <h3>No recipes found</h3>
            <p>Try adjusting your search or filters to find more recipes.</p>
            {hasActiveFilters && (
              <button className="clear-search-btn large" onClick={clearFilters}>
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;