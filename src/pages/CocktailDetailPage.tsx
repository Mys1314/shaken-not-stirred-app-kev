
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Cocktail, getCocktailById } from '@/services/cocktailApi';
import Navigation from '@/components/Navigation';
import IngredientsList from '@/components/IngredientsList';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useMyBar } from '@/hooks/useMyBar';

const CocktailDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userIngredients, toggleIngredient } = useMyBar();
  
  useEffect(() => {
    const fetchCocktail = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const result = await getCocktailById(id);
        if (result) {
          setCocktail(result);
        } else {
          // Cocktail not found
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to fetch cocktail:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCocktail();
  }, [id, navigate]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Calculate if user has all ingredients for this cocktail
  const hasAllIngredients = cocktail?.ingredients.every(ing => 
    userIngredients.includes(ing.name)
  );
  
  // Calculate how many ingredients the user has
  const ingredientsCount = cocktail?.ingredients.length || 0;
  const userIngredientsCount = cocktail?.ingredients.filter(ing => 
    userIngredients.includes(ing.name)
  ).length || 0;
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation showSearch={false} />
        <div className="container mx-auto px-4 py-8 animate-pulse">
          <div className="h-6 bg-muted rounded w-32 mb-8"></div>
          <div className="aspect-video max-w-3xl mx-auto bg-muted rounded-lg mb-8"></div>
          <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-muted rounded w-32 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="h-6 bg-muted rounded w-32 mb-4"></div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-4 bg-muted rounded w-full mb-3"></div>
              ))}
            </div>
            <div>
              <div className="h-6 bg-muted rounded w-32 mb-4"></div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-4 bg-muted rounded w-full mb-3"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!cocktail) return null;
  
  return (
    <div className="min-h-screen">
      <Navigation showSearch={false} />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="mb-8 flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={cocktail.image} 
              alt={cocktail.name} 
              className="w-full max-h-[400px] object-cover"
            />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{cocktail.name}</h1>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              {cocktail.category && (
                <span className="bg-secondary px-3 py-1 rounded-full">
                  {cocktail.category}
                </span>
              )}
              {cocktail.alcoholic && (
                <span className="bg-secondary px-3 py-1 rounded-full">
                  {cocktail.alcoholic}
                </span>
              )}
              {cocktail.glass && (
                <span className="bg-secondary px-3 py-1 rounded-full">
                  {cocktail.glass}
                </span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                <p className="text-sm mb-2">
                  {userIngredientsCount === 0 ? (
                    'You don\'t have any ingredients for this cocktail yet.'
                  ) : hasAllIngredients ? (
                    <span className="text-green-600 font-semibold">
                      You have all ingredients! 🎉
                    </span>
                  ) : (
                    <span>
                      You have {userIngredientsCount} of {ingredientsCount} ingredients.
                    </span>
                  )}
                </p>
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${hasAllIngredients ? 'bg-green-500' : 'bg-cocktail-amber'}`}
                    style={{width: `${(userIngredientsCount / ingredientsCount) * 100}%`}}
                  />
                </div>
              </div>
              <IngredientsList 
                ingredients={cocktail.ingredients}
                interactive={true}
                userIngredients={userIngredients}
                onToggleIngredient={toggleIngredient}
              />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <p className="leading-relaxed whitespace-pre-line">
                {cocktail.instructions}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CocktailDetailPage;
