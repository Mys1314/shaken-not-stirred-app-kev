
import React from 'react';
import { Link } from 'react-router-dom';
import { Cocktail } from '@/services/cocktailApi';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, CocktailIcon } from 'lucide-react';

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
  // Find an interesting ingredient to preview
  const featuredIngredient = cocktail.ingredients.find(i => i.flavorProfile && i.role);
  
  return (
    <Link to={`/cocktail/${cocktail.id}`} className="cocktail-card group relative block overflow-hidden rounded-lg transition-all hover:shadow-md">
      <img 
        src={cocktail.image} 
        alt={cocktail.name} 
        className="w-full h-64 object-cover transition-transform group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
        <h3 className="text-lg font-semibold text-white">{cocktail.name}</h3>
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/80 flex items-center">
            <CocktailIcon size={14} className="mr-1" />
            {cocktail.ingredients.length} ingredients
          </div>
          
          {featuredIngredient && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-white/90 cursor-help flex items-center">
                  <Info size={16} className="ml-1" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="font-medium mb-1">{featuredIngredient.name}</p>
                {featuredIngredient.flavorProfile && (
                  <p className="text-xs mb-1">
                    <span className="font-medium">Flavor:</span> {featuredIngredient.flavorProfile}
                  </p>
                )}
                {featuredIngredient.role && (
                  <p className="text-xs">
                    <span className="font-medium">Role:</span> {featuredIngredient.role}
                  </p>
                )}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CocktailCard;
