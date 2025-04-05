
// Types for our cocktail data
export interface Ingredient {
  name: string;
  measure?: string;
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
      { name: 'White rum', measure: '2 oz' },
      { name: 'Sugar', measure: '2 tsp' },
      { name: 'Lime juice', measure: '1 oz' },
      { name: 'Mint', measure: '6 leaves' },
      { name: 'Soda water', measure: 'To fill' },
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
      { name: 'Bourbon', measure: '2 oz' },
      { name: 'Angostura bitters', measure: '2 dashes' },
      { name: 'Sugar cube', measure: '1' },
      { name: 'Water', measure: 'dash' },
      { name: 'Orange', measure: '1 slice' },
      { name: 'Maraschino cherry', measure: '1' },
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

// Find cocktails that can be made with the provided ingredients
export const getCocktailsByIngredients = async (ingredients: string[]): Promise<Cocktail[]> => {
  if (!ingredients.length) return getAllCocktails();
  
  const cocktails = await getAllCocktails();
  const normalizedIngredients = ingredients.map(ing => ing.toLowerCase());
  
  // Check which cocktails can be made with the provided ingredients
  return cocktails.filter(cocktail => {
    const requiredIngredients = cocktail.ingredients.map(ing => ing.name.toLowerCase());
    // Check if all required ingredients are in the provided list
    return requiredIngredients.every(req => normalizedIngredients.includes(req));
  });
};
