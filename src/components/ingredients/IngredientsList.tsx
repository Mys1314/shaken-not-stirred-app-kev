
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, GlassWater } from 'lucide-react';

interface IngredientsListProps {
  ingredients: string[];
  selectedIngredients: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleIngredient: (ingredient: string) => void;
  isLoading: boolean;
}

const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
  selectedIngredients,
  searchQuery,
  onSearchChange,
  onToggleIngredient,
  isLoading
}) => {
  // Group ingredients alphabetically
  const groupedIngredients = ingredients.reduce<Record<string, string[]>>((groups, ingredient) => {
    const firstLetter = ingredient.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(ingredient);
    return groups;
  }, {});
  
  // Sort the groups alphabetically
  const sortedGroups = Object.keys(groupedIngredients).sort();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Search ingredients..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          {selectedIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-muted-foreground mr-2 mt-1">Selected:</span>
              {selectedIngredients.map(ingredient => (
                <Badge 
                  key={ingredient} 
                  className="cursor-pointer"
                  onClick={() => onToggleIngredient(ingredient)}
                  variant="secondary"
                >
                  {ingredient} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-pulse space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-6 bg-muted rounded w-48"></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-h-[600px] overflow-y-auto pr-2">
            {sortedGroups.length > 0 ? (
              sortedGroups.map(letter => (
                <div key={letter} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{letter}</h3>
                  <div className="space-y-1">
                    {groupedIngredients[letter].map(ingredient => (
                      <div
                        key={ingredient}
                        className={`px-3 py-2 rounded-md cursor-pointer transition-colors flex items-center justify-between ${
                          selectedIngredients.includes(ingredient)
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-secondary'
                        }`}
                        onClick={() => onToggleIngredient(ingredient)}
                      >
                        <span>{ingredient}</span>
                        {selectedIngredients.includes(ingredient) && (
                          <GlassWater size={16} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No ingredients found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IngredientsList;
