// Types for our cocktail data
export interface Ingredient {
  name: string;
  measure?: string;
  flavorProfile?: string;
  origin?: string;
  role?: string;
}

export interface Cocktail {
  id: string;
  name: string;
  image: string;
  category?: string;
  alcoholic?: string;
  glass?: string;
  instructions: string;
  ingredients: Ingredient[];
}

// Sample data - normally this would come from an API like TheCocktailDB
const cocktailsData: Cocktail[] = [
  {
    id: '1',
    name: 'Mojito',
    image: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg',
    category: 'Cocktail',
    alcoholic: 'Alcoholic',
    glass: 'Highball glass',
    instructions: 'Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish with mint leaves and a lime wedge.',
    ingredients: [
      { 
        name: 'White rum', 
        measure: '2 oz',
        flavorProfile: 'Sweet, mild with vanilla notes',
        origin: 'Distilled from sugarcane molasses or juice, originating in the Caribbean',
        role: 'Base spirit that provides the alcoholic foundation'
      },
      { 
        name: 'Sugar', 
        measure: '2 tsp',
        flavorProfile: 'Sweet',
        origin: 'Refined from sugarcane or sugar beets',
        role: 'Sweetener that balances the acidity of lime juice'
      },
      { 
        name: 'Lime juice', 
        measure: '1 oz',
        flavorProfile: 'Sour, acidic, slightly sweet',
        origin: 'Extracted from lime fruits, native to Southeast Asia',
        role: 'Provides acidity and brightness to balance the sweetness'
      },
      { 
        name: 'Mint', 
        measure: '6 leaves',
        flavorProfile: 'Fresh, cool, slightly sweet',
        origin: 'Aromatic herb originally from the Mediterranean',
        role: 'Aromatic component that gives the mojito its distinctive fresh character'
      },
      { 
        name: 'Soda water', 
        measure: 'To fill',
        flavorProfile: 'Neutral, effervescent',
        origin: 'Carbonated water with added minerals',
        role: 'Dilutes and adds effervescence to the cocktail'
      },
    ],
  },
  {
    id: '2',
    name: 'Old Fashioned',
    image: 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
    category: 'Cocktail',
    alcoholic: 'Alcoholic',
    glass: 'Old-fashioned glass',
    instructions: 'Place sugar cube in old-fashioned glass and saturate with bitters, add a dash of plain water. Muddle until dissolved. Fill the glass with ice cubes and add whiskey. Garnish with orange slice and a cherry.',
    ingredients: [
      { 
        name: 'Bourbon', 
        measure: '2 oz',
        flavorProfile: 'Rich, sweet, with notes of vanilla, oak, and caramel',
        origin: 'American whiskey made primarily from corn, originating in Kentucky',
        role: 'Primary spirit providing body and complex flavors'
      },
      { 
        name: 'Angostura bitters', 
        measure: '2 dashes',
        flavorProfile: 'Spicy, herbal, with notes of clove and cinnamon',
        origin: 'Created in Venezuela as a medicinal tincture in the 19th century',
        role: 'Adds complexity, depth, and balances sweetness'
      },
      { 
        name: 'Sugar cube', 
        measure: '1',
        flavorProfile: 'Sweet',
        origin: 'Refined from sugarcane or sugar beets',
        role: 'Adds sweetness to balance the bitterness and alcohol'
      },
      { 
        name: 'Water', 
        measure: 'dash',
        flavorProfile: 'Neutral',
        origin: 'Natural source',
        role: 'Helps dissolve sugar and dilutes the drink slightly'
      },
      { 
        name: 'Orange', 
        measure: '1 slice',
        flavorProfile: 'Sweet, citrusy',
        origin: 'Citrus fruit originally from Asia',
        role: 'Aromatic garnish that adds subtle citrus notes'
      },
      { 
        name: 'Maraschino cherry', 
        measure: '1',
        flavorProfile: 'Sweet, slightly tart',
        origin: 'Preserved cherries originating from Croatia',
        role: 'Decorative garnish that adds subtle sweetness'
      },
    ],
  },
  {
    id: '3',
    name: 'Negroni',
    image: 'https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg',
    category: 'Cocktail',
    alcoholic: 'Alcoholic',
    glass: 'Old-fashioned glass',
    instructions: 'Stir into glass over ice, garnish and serve.',
    ingredients: [
      { name: 'Gin', measure: '1 oz' },
      { name: 'Campari', measure: '1 oz' },
      { name: 'Sweet Vermouth', measure: '1 oz' },
      { name: 'Orange peel', measure: '1' },
    ],
  },
  {
    id: '4',
    name: 'Daiquiri',
    image: 'https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg',
    category: 'Cocktail',
    alcoholic: 'Alcoholic',
    glass: 'Cocktail glass',
    instructions: 'Shake all ingredients with ice, strain into a chilled cocktail glass, and serve.',
    ingredients: [
      { name: 'White rum', measure: '2 oz' },
      { name: 'Lime juice', measure: '1 oz' },
      { name: 'Simple syrup', measure: '1/2 oz' },
    ],
  },
  {
    id: '5',
    name: 'Margarita',
    image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    category: 'Cocktail',
    alcoholic: 'Alcoholic',
    glass: 'Cocktail glass',
    instructions: 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
    ingredients: [
      { name: 'Tequila', measure: '2 oz' },
      { name: 'Triple sec', measure: '1 oz' },
      { name: 'Lime juice', measure: '1 oz' },
      { name: 'Salt', measure: '1 rim' },
    ],
  },
  {
    id: '6',
    name: 'Whiskey Sour',
    image: 'https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg',
    category: 'Cocktail',
    alcoholic: 'Alcoholic',
    glass: 'Old-fashioned glass',
    instructions: 'Shake with ice. Strain into chilled glass, garnish and serve.',
    ingredients: [
      { name: 'Bourbon', measure: '2 oz' },
      { name: 'Lemon juice', measure: '1 oz' },
      { name: 'Simple syrup', measure: '1/2 oz' },
      { name: 'Egg white', measure: '1/2 oz' },
      { name: 'Lemon slice', measure: '1' },
      { name: 'Maraschino cherry', measure: '1' },
    ],
  },
];

// This simulates an API for now - in a real app, we'd fetch from a real API
export const getAllCocktails = (): Promise<Cocktail[]> => {
  return Promise.resolve(cocktailsData);
};

export const getCocktailById = (id: string): Promise<Cocktail | undefined> => {
  const cocktail = cocktailsData.find(c => c.id === id);
  return Promise.resolve(cocktail);
};

export const searchCocktails = (query: string): Promise<Cocktail[]> => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // If no query, return all cocktails
  if (!normalizedQuery) {
    return getAllCocktails();
  }
  
  // Search by name or ingredients
  const results = cocktailsData.filter(cocktail => 
    cocktail.name.toLowerCase().includes(normalizedQuery) || 
    cocktail.ingredients.some(ing => ing.name.toLowerCase().includes(normalizedQuery))
  );
  
  return Promise.resolve(results);
};

// Get list of all unique ingredients across all cocktails
export const getAllIngredients = async (): Promise<string[]> => {
  const cocktails = await getAllCocktails();
  const ingredientSet = new Set<string>();
  
  cocktails.forEach(cocktail => {
    cocktail.ingredients.forEach(ing => {
      ingredientSet.add(ing.name);
    });
  });
  
  return Array.from(ingredientSet).sort();
};

// Find cocktails that contain ALL of the provided ingredients (AND logic)
export const getCocktailsByIngredients = async (ingredients: string[]): Promise<Cocktail[]> => {
  if (!ingredients.length) return [];
  
  const cocktails = await getAllCocktails();
  const normalizedIngredients = ingredients.map(ing => ing.toLowerCase().trim());
  
  console.log('Searching for ingredients:', normalizedIngredients);
  
  // Check which cocktails contain ALL of the provided ingredients
  const results = cocktails.filter(cocktail => {
    const cocktailIngredients = cocktail.ingredients.map(ing => ing.name.toLowerCase().trim());
    console.log(`Checking ${cocktail.name}:`, cocktailIngredients);
    
    // Check if ALL selected ingredients are present in this cocktail
    const hasAllIngredients = normalizedIngredients.every(selectedIng => 
      cocktailIngredients.some(cocktailIng => 
        cocktailIng.includes(selectedIng) || selectedIng.includes(cocktailIng)
      )
    );
    
    console.log(`${cocktail.name} has all ingredients:`, hasAllIngredients);
    return hasAllIngredients;
  });
  
  console.log('Found cocktails:', results.map(c => c.name));
  return results;
};
