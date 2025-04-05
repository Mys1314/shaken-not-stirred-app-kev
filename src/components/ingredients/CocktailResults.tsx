
import React from 'react';
import { Cocktail } from '@/services/cocktailApi';
import CocktailCard from '@/components/CocktailCard';
import { GlassWater } from 'lucide-react';

interface CocktailResultsProps {
  selectedIngredients: string[];
  cocktails: Cocktail[];
  isLoading: boolean;
}

const CocktailResults: React.FC<CocktailResultsProps> = ({
  selectedIngredients,
  cocktails,
  isLoading
}) => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          {selectedIngredients.length === 0 
            ? "Select ingredients to see cocktails" 
            : `Cocktails with ${selectedIngredients.join(', ')}`}
        </h2>
        <p className="text-muted-foreground">
          {selectedIngredients.length > 0 && `${cocktails.length} cocktails found`}
        </p>
      </div>
      
      {selectedIngredients.length === 0 ? (
        <div className="bg-muted/30 rounded-lg flex flex-col items-center justify-center p-10 text-center">
          <GlassWater size={48} className="text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Select ingredients to get started</h3>
          <p className="text-muted-foreground max-w-md">
            Choose ingredients from the left to see cocktails you can make with them
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="cocktail-card animate-pulse">
              <div className="bg-muted aspect-video w-full" />
              <div className="p-4">
                <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : cocktails.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cocktails.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 rounded-lg flex flex-col items-center justify-center p-10 text-center">
          <GlassWater size={48} className="text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No cocktails found</h3>
          <p className="text-muted-foreground max-w-md">
            Try selecting different ingredients or fewer ingredients to find matches
          </p>
        </div>
      )}
    </>
  );
};

export default CocktailResults;
