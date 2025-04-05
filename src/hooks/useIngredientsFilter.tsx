
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllIngredients, getCocktailsByIngredients } from '@/services/cocktailApi';

export function useIngredientsFilter() {
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
  const filteredIngredients = useMemo(() => {
    return ingredients.filter(ingredient => 
      ingredient.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [ingredients, searchQuery]);

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

  return {
    selectedIngredients,
    searchQuery,
    setSearchQuery,
    filteredIngredients,
    cocktails,
    toggleIngredient,
    ingredientsLoading,
    cocktailsLoading
  };
}
