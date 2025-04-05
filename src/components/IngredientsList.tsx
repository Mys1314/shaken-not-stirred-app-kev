
import React, { useState } from 'react';
import { Ingredient } from '@/services/cocktailApi';
import { CheckSquare, Square, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
  const [expandedIngredients, setExpandedIngredients] = useState<string[]>([]);

  const handleToggle = (ingredient: string) => {
    if (onToggleIngredient) {
      onToggleIngredient(ingredient);
    }
  };

  const toggleIngredientDetails = (name: string) => {
    setExpandedIngredients(prev => 
      prev.includes(name) 
        ? prev.filter(i => i !== name) 
        : [...prev, name]
    );
  };

  return (
    <ul className="space-y-4">
      {ingredients.map((ingredient, index) => {
        const isInStock = userIngredients.includes(ingredient.name);
        const isExpanded = expandedIngredients.includes(ingredient.name);
        const hasAdditionalInfo = ingredient.flavorProfile || ingredient.origin || ingredient.role;
        
        return (
          <li 
            key={`${ingredient.name}-${index}`}
            className="border border-gray-200 rounded-md overflow-hidden"
          >
            <div 
              className={`flex items-start gap-2 p-3 ${interactive ? 'cursor-pointer' : ''}`}
            >
              {interactive ? (
                <div
                  onClick={() => handleToggle(ingredient.name)}
                  className="flex-shrink-0 pt-0.5"
                >
                  {isInStock ? (
                    <CheckSquare className="h-5 w-5 text-cocktail-amber" />
                  ) : (
                    <Square className="h-5 w-5" />
                  )}
                </div>
              ) : null}
              <div className={`flex-grow ${interactive && isInStock ? 'text-cocktail-amber font-medium' : ''}`}>
                <div className="flex justify-between">
                  <div>
                    <span className="font-medium">{ingredient.name}</span>
                    {ingredient.measure && (
                      <span className="text-sm text-muted-foreground ml-1">
                        ({ingredient.measure})
                      </span>
                    )}
                  </div>
                  {hasAdditionalInfo && (
                    <button 
                      onClick={() => toggleIngredientDetails(ingredient.name)}
                      className="text-gray-500 hover:text-gray-700 flex items-center ml-2"
                      aria-label={isExpanded ? "Collapse details" : "Show details"}
                    >
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {isExpanded && hasAdditionalInfo && (
              <div className="px-3 pb-3 pt-0 text-sm bg-muted/30">
                {ingredient.flavorProfile && (
                  <div className="mb-2">
                    <span className="font-semibold">Flavor Profile: </span>
                    {ingredient.flavorProfile}
                  </div>
                )}
                {ingredient.origin && (
                  <div className="mb-2">
                    <span className="font-semibold">Origin: </span>
                    {ingredient.origin}
                  </div>
                )}
                {ingredient.role && (
                  <div>
                    <span className="font-semibold">Role in cocktail: </span>
                    {ingredient.role}
                  </div>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default IngredientsList;
