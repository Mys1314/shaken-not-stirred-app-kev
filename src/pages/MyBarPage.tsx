
import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { getAllIngredients, getCocktailsByIngredients, Cocktail } from '@/services/cocktailApi';
import { useMyBar } from '@/hooks/useMyBar';
import { Check, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CocktailCard from '@/components/CocktailCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyBarPage = () => {
  const { userIngredients, toggleIngredient } = useMyBar();
  const [allIngredients, setAllIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [possibleCocktails, setPossibleCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ingredients = await getAllIngredients();
        setAllIngredients(ingredients);
        
        // Get cocktails that can be made with user ingredients
        const cocktails = await getCocktailsByIngredients(userIngredients);
        setPossibleCocktails(cocktails);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [userIngredients]);
  
  const filteredIngredients = allIngredients.filter(ing => 
    ing.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const userIngredientsList = allIngredients.filter(ing => 
    userIngredients.includes(ing)
  );
  
  const notInStockList = allIngredients.filter(ing => 
    !userIngredients.includes(ing)
  );
  
  return (
    <div className="min-h-screen">
      <Navigation showSearch={false} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">My Bar</h1>
        <p className="text-muted-foreground mb-8">
          Track your ingredients and discover cocktails you can make
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <p className="text-sm text-muted-foreground mb-4">
                You have {userIngredients.length} of {allIngredients.length} ingredients in stock.
              </p>
              
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
              
              <Tabs defaultValue="all">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="inStock" className="flex-1">In Stock ({userIngredientsList.length})</TabsTrigger>
                  <TabsTrigger value="notInStock" className="flex-1">Missing ({notInStockList.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="max-h-[400px] overflow-y-auto scroll-hide">
                  {filteredIngredients.map(ingredient => (
                    <div 
                      key={ingredient}
                      onClick={() => toggleIngredient(ingredient)}
                      className="flex items-center justify-between p-2 hover:bg-secondary rounded cursor-pointer"
                    >
                      <span>{ingredient}</span>
                      {userIngredients.includes(ingredient) ? (
                        <Check className="h-5 w-5 text-cocktail-amber" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="inStock" className="max-h-[400px] overflow-y-auto scroll-hide">
                  {userIngredientsList.map(ingredient => (
                    <div 
                      key={ingredient}
                      onClick={() => toggleIngredient(ingredient)}
                      className="flex items-center justify-between p-2 hover:bg-secondary rounded cursor-pointer"
                    >
                      <span>{ingredient}</span>
                      <Check className="h-5 w-5 text-cocktail-amber" />
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="notInStock" className="max-h-[400px] overflow-y-auto scroll-hide">
                  {notInStockList.map(ingredient => (
                    <div 
                      key={ingredient}
                      onClick={() => toggleIngredient(ingredient)}
                      className="flex items-center justify-between p-2 hover:bg-secondary rounded cursor-pointer"
                    >
                      <span>{ingredient}</span>
                      <X className="h-5 w-5 text-muted-foreground" />
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Cocktails You Can Make</h2>
              <p className="text-muted-foreground">
                Based on your {userIngredients.length} ingredients
              </p>
            </div>
            
            {loading ? (
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
            ) : possibleCocktails.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {possibleCocktails.map((cocktail) => (
                  <CocktailCard key={cocktail.id} cocktail={cocktail} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No cocktails available</h3>
                <p className="text-muted-foreground mb-4">
                  Add more ingredients to your bar to see cocktails you can make
                </p>
                <Button onClick={() => {}} variant="outline">
                  Explore Cocktails
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyBarPage;
