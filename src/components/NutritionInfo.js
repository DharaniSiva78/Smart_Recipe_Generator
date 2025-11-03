import React from 'react';
import { Activity, Zap, Droplets } from 'lucide-react';

const NutritionInfo = ({ recipe }) => {
  return (
    <div className="nutrition-info">
      <h4>Nutritional Information (per serving)</h4>
      <div className="nutrition-grid">
        <div className="nutrition-item">
          <Zap size={20} className="calories" />
          <div>
            <strong>{recipe.calories}</strong>
            <span>Calories</span>
          </div>
        </div>
        <div className="nutrition-item">
          <Activity size={20} className="protein" />
          <div>
            <strong>{recipe.protein}g</strong>
            <span>Protein</span>
          </div>
        </div>
        <div className="nutrition-item">
          <Droplets size={20} className="carbs" />
          <div>
            <strong>{recipe.carbs}g</strong>
            <span>Carbs</span>
          </div>
        </div>
        <div className="nutrition-item">
          <Droplets size={20} className="fat" />
          <div>
            <strong>{recipe.fat}g</strong>
            <span>Fat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionInfo;