
import React from 'react';
import { Ingredient } from '@/services/cocktailApi';
import { CheckSquare, Square } from 'lucide-react';

interface IngredientsListProps {
  ingredients: Ingredient[];
  interactive?: boolean;
  userIngredients?: string[];
  onToggleIngredient?: (ingredient: string) => void;
}

const IngredientsList: React.FC<IngredientsListProps> = ({ 
  ingredients, 
  interactive = false,
  userIngredients = [],
  onToggleIngredient
}) => {
  const handleToggle = (ingredient: string) => {
    if (onToggleIngredient) {
      onToggleIngredient(ingredient);
    }
  };

  return (
    <ul className="space-y-2">
      {ingredients.map((ingredient, index) => {
        const isInStock = userIngredients.includes(ingredient.name);
        
        return (
          <li 
            key={`${ingredient.name}-${index}`}
            className={`flex items-start gap-2 ${interactive ? 'cursor-pointer' : ''}`}
            onClick={interactive ? () => handleToggle(ingredient.name) : undefined}
          >
            {interactive ? (
              isInStock ? (
                <CheckSquare className="h-5 w-5 flex-shrink-0 text-cocktail-amber" />
              ) : (
                <Square className="h-5 w-5 flex-shrink-0" />
              )
            ) : null}
            <div className={interactive && isInStock ? 'text-cocktail-amber font-medium' : ''}>
              <span className="font-medium">{ingredient.name}</span>
              {ingredient.measure && (
                <span className="text-sm text-muted-foreground ml-1">
                  ({ingredient.measure})
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default IngredientsList;
