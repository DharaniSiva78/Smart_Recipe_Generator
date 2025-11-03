import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Favorites from './pages/Favorites';
import recipeData from './data/recipes.json';
import './styles/App.css';

// Navigation Component
const Navigation = ({ favoritesCount }) => {
  const location = useLocation();
  
  return (
    <nav className="main-nav">
      <Link 
        to="/" 
        className={location.pathname === '/' ? 'active' : ''}
      >
        Find Recipes
      </Link>
      <Link 
        to="/recipes" 
        className={location.pathname === '/recipes' ? 'active' : ''}
      >
        All Recipes
      </Link>
      <Link 
        to="/favorites" 
        className={location.pathname === '/favorites' ? 'active' : ''}
      >
        Favorites ({favoritesCount})
      </Link>
    </nav>
  );
};

function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load recipes from JSON file
    setRecipes(recipeData.recipes);
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('recipeFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (recipeId) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
    
    setFavorites(newFavorites);
    localStorage.setItem('recipeFavorites', JSON.stringify(newFavorites));
  };

  return (
    <Router>
      <div className="App">
        <Header onSearch={setSearchTerm} />
        <Navigation favoritesCount={favorites.length} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                recipes={recipes}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                searchTerm={searchTerm}
              />
            } 
          />
          <Route 
            path="/recipes" 
            element={
              <Recipes 
                recipes={recipes}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <Favorites 
                recipes={recipes}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;