import React, { useState } from 'react';
import DietaryPreferenceSelector from './DietaryPreferenceSelector';
import { Meal } from '@/lib/types';
import { type Ingredient } from '@/lib/utils/dietary-filters';
import Image from 'next/image';

const MealGenerator: React.FC = () => {
  // State for filtered ingredients and generated meals
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([]);
  const [generatedMeals, setGeneratedMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle ingredients filtered from DietaryPreferenceSelector
  const handleFilteredIngredients = (ingredients: Ingredient[]) => {
    setFilteredIngredients(ingredients);
    generateMeals(ingredients);
  };

  // Function to generate meals based on filtered ingredients
  const generateMeals = async (ingredients: Ingredient[]) => {
    setLoading(true);
    
    try {
      // In a real implementation, this might call an API or use a more sophisticated algorithm
      // For now, we'll create some sample meals based on the filtered ingredients
      
      // Simple algorithm to group ingredients by category and create meals
      const categorizedIngredients: Record<string, Ingredient[]> = {};
      
      // Group ingredients by category
      ingredients.forEach(ingredient => {
        if (!categorizedIngredients[ingredient.category]) {
          categorizedIngredients[ingredient.category] = [];
        }
        categorizedIngredients[ingredient.category].push(ingredient);
      });
      
      // Create some sample meals based on available ingredient categories
      const meals: Meal[] = [];
      
      // Sample algorithm - this would be much more sophisticated in a real implementation
      // Check for protein options
      const proteins = [
        ...categorizedIngredients['meat'] || [], 
        ...categorizedIngredients['fish'] || [],
        ...categorizedIngredients['legume'] || [],
        ...categorizedIngredients['protein'] || []
      ];
      
      // Check for vegetables
      const vegetables = [
        ...categorizedIngredients['vegetable'] || [],
        ...categorizedIngredients['leafy green'] || [],
        ...categorizedIngredients['root vegetable'] || []
      ];
      
      // Check for grains/starches
      const starches = [
        ...categorizedIngredients['grain'] || [],
        ...categorizedIngredients['root vegetable'] || []
      ];
      
      // Generate a few sample meals based on available ingredients
      if (proteins.length > 0 && vegetables.length > 0) {
        const protein = proteins[Math.floor(Math.random() * proteins.length)];
        const vegetable = vegetables[Math.floor(Math.random() * vegetables.length)];
        const starch = starches.length > 0 ? starches[Math.floor(Math.random() * starches.length)] : null;
        
        // Create a meal with these ingredients
        meals.push({
          id: `meal-${Date.now()}-1`,
          name: `${protein.name} with ${vegetable.name}${starch ? ` and ${starch.name}` : ''}`,
          description: `A delicious meal featuring ${protein.name.toLowerCase()} served with ${vegetable.name.toLowerCase()}${starch ? ` and a side of ${starch.name.toLowerCase()}` : ''}.`,
          ingredients: [
            protein.name,
            vegetable.name,
            ...(starch ? [starch.name] : [])
          ],
          dietaryTags: getDietaryTags(),
        });
      }
      
      // Generate a second meal option if we have enough ingredients
      if (proteins.length > 1 && vegetables.length > 1) {
        // Use different ingredients than the first meal
        const protein = proteins[Math.floor(Math.random() * proteins.length)];
        const vegetable = vegetables[Math.floor(Math.random() * vegetables.length)];
        const starch = starches.length > 0 ? starches[Math.floor(Math.random() * starches.length)] : null;
        
        meals.push({
          id: `meal-${Date.now()}-2`,
          name: `${vegetable.name} and ${protein.name} Bowl`,
          description: `A nutritious bowl with ${vegetable.name.toLowerCase()} and ${protein.name.toLowerCase()}${starch ? `, served over ${starch.name.toLowerCase()}` : ''}.`,
          ingredients: [
            protein.name,
            vegetable.name,
            ...(starch ? [starch.name] : [])
          ],
          dietaryTags: getDietaryTags(),
        });
      }
      
      // If we can make a salad or vegetable-forward dish
      if (vegetables.length > 2) {
        const veg1 = vegetables[Math.floor(Math.random() * vegetables.length)];
        const veg2 = vegetables[Math.floor(Math.random() * vegetables.length)];
        const veg3 = vegetables[Math.floor(Math.random() * vegetables.length)];
        
        meals.push({
          id: `meal-${Date.now()}-3`,
          name: `${veg1.name}, ${veg2.name}, and ${veg3.name} Salad`,
          description: `A refreshing salad featuring ${veg1.name.toLowerCase()}, ${veg2.name.toLowerCase()}, and ${veg3.name.toLowerCase()}.`,
          ingredients: [veg1.name, veg2.name, veg3.name],
          dietaryTags: getDietaryTags(),
        });
      }
      
      // Update state with generated meals
      setGeneratedMeals(meals);
    } catch (error) {
      console.error('Error generating meals:', error);
      setGeneratedMeals([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Helper to determine dietary tags for a meal based on its ingredients
  const getDietaryTags = (): string[] => {
    const tags: string[] = [];
    
    // Removed check for alkaline ingredients as pHInfluence is no longer available
    /*
    const allAlkaline = mealIngredients.every(ing => 
      ['SLIGHTLY_ALKALINE', 'MODERATELY_ALKALINE', 'HIGHLY_ALKALINE'].includes(ing.pHInfluence)
    );
    if (allAlkaline) tags.push('Alkaline');
    */
    
    // Add other dietary tags as needed (Example - could check for vegan/vegetarian based on ingredients)
    // This is simplified - real implementation would be more comprehensive
    
    return tags;
  };
  
  return (
    <div className="meal-generator">
      {/* Pass the handler to the DietaryPreferenceSelector */}
      <DietaryPreferenceSelector onGenerateMeals={handleFilteredIngredients} />
      
      {/* Display loading state */}
      {loading && <div className="loading">Generating your perfect meals...</div>}
      
      {/* Display generated meals */}
      {!loading && generatedMeals.length > 0 && (
        <div className="generated-meals">
          <h2>Your Perfect Meals</h2>
          <div className="meals-grid">
            {generatedMeals.map(meal => (
              <div key={meal.id} className="meal-card">
                {meal.imageUrl && 
                  <Image 
                    src={meal.imageUrl} 
                    alt={meal.name} 
                    width={100}
                    height={100}
                    style={{ maxWidth: '100px', height: 'auto' }}
                  />}
                <h3>{meal.name}</h3>
                <p>{meal.description}</p>
                <p>Tags: {meal.dietaryTags.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* No meals generated state */}
      {!loading && generatedMeals.length === 0 && filteredIngredients.length > 0 && (
        <div className="no-meals">
          <p>
          We couldn&apos;t generate meals with your current preferences.
            Try selecting different dietary preferences or customizing your options.
          </p>
        </div>
      )}
    </div>
  );
};

export default MealGenerator; 