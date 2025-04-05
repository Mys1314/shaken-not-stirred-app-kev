
import React from 'react';
import Navigation from '@/components/Navigation';
import IngredientsList from '@/components/ingredients/IngredientsList';
import CocktailResults from '@/components/ingredients/CocktailResults';
import { useIngredientsFilter } from '@/hooks/useIngredientsFilter';

const IngredientsPage = () => {
  const {
    selectedIngredients,
    searchQuery,
    setSearchQuery,
    filteredIngredients,
    cocktails,
    toggleIngredient,
    ingredientsLoading,
    cocktailsLoading
  } = useIngredientsFilter();

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
            <IngredientsList
              ingredients={filteredIngredients}
              selectedIngredients={selectedIngredients}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onToggleIngredient={toggleIngredient}
              isLoading={ingredientsLoading}
            />
          </div>
          
          {/* Right side - Cocktail results */}
          <div className="lg:col-span-2">
            <CocktailResults
              selectedIngredients={selectedIngredients}
              cocktails={cocktails}
              isLoading={cocktailsLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default IngredientsPage;
