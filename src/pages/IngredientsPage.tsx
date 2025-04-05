import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllIngredients, getCocktailsByIngredients, Cocktail } from '@/services/cocktailApi';
import Navigation from '@/components/Navigation';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import CocktailCard from '@/components/CocktailCard';
import { GlassWine, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const IngredientsPage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch all ingredients
  const { 
    data: ingredients = [], 
    isLoading: ingredientsLoading 
  } = useQuery({
    queryKey: ['ingredients'],
    queryFn: getAllIngredients
  });
  
  // Fetch cocktails based on selected ingredients
  const { 
    data: cocktails = [], 
    isLoading: cocktailsLoading 
  } = useQuery({
    queryKey: ['cocktailsByIngredients', selectedIngredients],
    queryFn: () => getCocktailsByIngredients(selectedIngredients),
    enabled: selectedIngredients.length > 0
  });
  
  // Filter ingredients based on search query
  const filteredIngredients = ingredients.filter(ingredient => 
    ingredient.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group ingredients alphabetically
  const groupedIngredients = filteredIngredients.reduce<Record<string, string[]>>((groups, ingredient) => {
    const firstLetter = ingredient.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(ingredient);
    return groups;
  }, {});
  
  // Sort the groups alphabetically
  const sortedGroups = Object.keys(groupedIngredients).sort();
  
  // Toggle ingredient selection
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredient)) {
        return prev.filter(i => i !== ingredient);
      } else {
        return [...prev, ingredient];
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation showSearch={false} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Ingredients Browser</h1>
        <p className="text-muted-foreground mb-8">
          Explore cocktails by selecting ingredients
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Ingredients browser */}
          <div className="lg:col-span-1">
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
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {selectedIngredients.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-sm text-muted-foreground mr-2 mt-1">Selected:</span>
                      {selectedIngredients.map(ingredient => (
                        <Badge 
                          key={ingredient} 
                          className="cursor-pointer"
                          onClick={() => toggleIngredient(ingredient)}
                          variant="secondary"
                        >
                          {ingredient} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                {ingredientsLoading ? (
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
                                onClick={() => toggleIngredient(ingredient)}
                              >
                                <span>{ingredient}</span>
                                {selectedIngredients.includes(ingredient) && (
                                  <GlassWine size={16} />
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
          </div>
          
          {/* Right side - Cocktail results */}
          <div className="lg:col-span-2">
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
                <GlassWine size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Select ingredients to get started</h3>
                <p className="text-muted-foreground max-w-md">
                  Choose ingredients from the left to see cocktails you can make with them
                </p>
              </div>
            ) : cocktailsLoading ? (
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
                <GlassWine size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No cocktails found</h3>
                <p className="text-muted-foreground max-w-md">
                  Try selecting different ingredients or fewer ingredients to find matches
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IngredientsPage;
