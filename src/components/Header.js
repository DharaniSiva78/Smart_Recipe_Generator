import React from 'react';
import { ChefHat, Search, Sparkles } from 'lucide-react';

const Header = ({ onSearch }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon-wrapper">
            <ChefHat size={32} className="logo-icon" />
            <Sparkles size={16} className="sparkle" />
          </div>
          <div>
            <h1>Smart Recipe Generator</h1>
            <p className="tagline">Discover Indian culinary delights</p>
          </div>
        </div>
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search recipes..." 
            onChange={(e) => onSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;