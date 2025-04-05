
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cocktail, getAllCocktails, searchCocktails } from '@/services/cocktailApi';
import CocktailCard from '@/components/CocktailCard';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';

const HomePage = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      try {
        let results;
        if (searchQuery) {
          results = await searchCocktails(searchQuery);
        } else {
          results = await getAllCocktails();
        }
        setCocktails(results);
      } catch (error) {
        console.error('Failed to fetch cocktails:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCocktails();
  }, [searchQuery]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation 
        searchQuery={searchQuery} 
        onSearchChange={handleSearch}
        showSearch={false}
      />
      
      <Hero onSearch={handleSearch} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {searchQuery ? 'Search Results' : 'Featured Cocktails'}
            </h2>
            {searchQuery && (
              <span className="text-sm text-muted-foreground">
                {cocktails.length} results for "{searchQuery}"
              </span>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.id} cocktail={cocktail} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No cocktails found</h3>
              <p className="text-muted-foreground mb-4">
                Try searching for a different cocktail or ingredient
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-cocktail-amber hover:underline"
              >
                Clear search and see all cocktails
              </button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-cocktail-dark text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Cocktail Tracker. Drink responsibly!</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
