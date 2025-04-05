
import React from 'react';
import { Link } from 'react-router-dom';
import { Cocktail } from '@/services/cocktailApi';

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
  return (
    <Link to={`/cocktail/${cocktail.id}`} className="cocktail-card">
      <img 
        src={cocktail.image} 
        alt={cocktail.name} 
        className="cocktail-card-image"
        loading="lazy"
      />
      <div className="cocktail-card-overlay">
        <h3 className="text-lg font-semibold">{cocktail.name}</h3>
        <div className="text-sm opacity-80">
          {cocktail.ingredients.length} ingredients
        </div>
      </div>
    </Link>
  );
};

export default CocktailCard;
