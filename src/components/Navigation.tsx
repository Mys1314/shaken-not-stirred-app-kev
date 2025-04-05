
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavigationProps {
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  showSearch?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  onSearchChange, 
  searchQuery = '', 
  showSearch = true 
}) => {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <NavLink to="/" className="text-2xl font-bold text-cocktail-amber">
              🍸 Cocktail Tracker
            </NavLink>
          </div>
          
          {showSearch && (
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cocktails or ingredients..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          )}
          
          <nav className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/my-bar"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`
              }
            >
              My Bar
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
