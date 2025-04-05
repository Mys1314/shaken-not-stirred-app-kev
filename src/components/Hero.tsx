
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-cocktail-dark to-cocktail-dark/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover Your Perfect Cocktail
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Find amazing cocktail recipes, track your ingredients, and become your own mixologist.
          </p>
          
          <form 
            onSubmit={handleSubmit}
            className="max-w-md mx-auto relative animate-fade-in"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by cocktail name or ingredient..."
              className="pl-10 py-6 text-lg bg-white/95 text-black"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
