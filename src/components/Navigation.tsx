
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchCocktails } from '@/services/cocktailApi';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Home, 
  X, 
  Cocktail as CocktailIcon, 
  Menu,
  Check,
  ListChecks,
  List
} from 'lucide-react';

interface NavigationProps {
  showSearch?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ showSearch = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => searchCocktails(searchQuery),
    enabled: searchQuery.length > 0 && isSearchOpen,
  });

  const handleSearchSelect = (cocktailId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/cocktail/${cocktailId}`);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <CocktailIcon className="h-6 w-6" />
            <span className="font-bold">Cocktail Tracker</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant="ghost" className="text-sm">
                <Home className="mr-1 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/my-bar">
              <Button variant="ghost" className="text-sm">
                <ListChecks className="mr-1 h-4 w-4" />
                My Bar
              </Button>
            </Link>
            <Link to="/ingredients">
              <Button variant="ghost" className="text-sm">
                <List className="mr-1 h-4 w-4" />
                Ingredients
              </Button>
            </Link>
          </div>
        </div>
        
        {showSearch && (
          <div className="hidden md:flex items-center ml-auto">
            <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="w-9 px-0">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search cocktails</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="bottom" align="end" alignOffset={0} sideOffset={8}>
                <Command className="rounded-lg">
                  <div className="flex items-center border-b px-3">
                    <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <CommandInput 
                      placeholder="Search for cocktails..." 
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                      className="flex h-11 flex-1 bg-transparent px-3 py-3 outline-none"
                    />
                    {searchQuery && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0" 
                        onClick={() => setSearchQuery('')}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
                      </Button>
                    )}
                  </div>
                  <CommandList>
                    {searchQuery.length > 0 && (
                      <>
                        <CommandEmpty>No cocktails found.</CommandEmpty>
                        <CommandGroup heading="Cocktails">
                          {isLoading ? (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                              Searching...
                            </div>
                          ) : (
                            searchResults?.map((cocktail) => (
                              <CommandItem 
                                key={cocktail.id} 
                                onSelect={() => handleSearchSelect(cocktail.id)}
                                className="cursor-pointer"
                              >
                                <CocktailIcon className="mr-2 h-4 w-4" />
                                <span>{cocktail.name}</span>
                              </CommandItem>
                            ))
                          )}
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}

        <div className="md:hidden ml-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 grid md:hidden">
            <div className="fixed inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="fixed right-0 top-0 h-full w-3/4 bg-background p-6 shadow-lg">
              <div className="flex flex-col space-y-4">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
                <Link to="/my-bar" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <ListChecks className="mr-2 h-4 w-4" />
                    My Bar
                  </Button>
                </Link>
                <Link to="/ingredients" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <List className="mr-2 h-4 w-4" />
                    Ingredients
                  </Button>
                </Link>
              </div>
              
              {showSearch && (
                <div className="mt-6 pt-6 border-t">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="search" 
                      placeholder="Search cocktails..."
                      className="w-full pl-8 bg-background border border-input rounded-md h-9 px-3 py-2 text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => {
                        setIsSearchOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <CommandDialog open={isSearchOpen && searchQuery.length > 0} onOpenChange={setIsSearchOpen}>
        <div className="flex items-center border-b px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <CommandInput 
            placeholder="Search for cocktails..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
        </div>
        <CommandList>
          <CommandEmpty>No cocktails found.</CommandEmpty>
          <CommandGroup heading="Cocktails">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Searching...
              </div>
            ) : (
              searchResults?.map((cocktail) => (
                <CommandItem 
                  key={cocktail.id} 
                  onSelect={() => handleSearchSelect(cocktail.id)}
                  className="cursor-pointer"
                >
                  <CocktailIcon className="mr-2 h-4 w-4" />
                  <span>{cocktail.name}</span>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </nav>
  );
};

export default Navigation;
