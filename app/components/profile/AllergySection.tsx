'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface UserAllergyWithIngredient {
  id: string;
  userEmail: string;
  ingredientId: string;
  severity: string; // Or use 'mild' | 'moderate' | 'severe' if defined
  ingredient: StandardIngredient;
}

interface StandardIngredient {
  id: string;
  name: string;
  category: string;
}

const COMMON_ALLERGENS = [
  'Peanuts',
  'Tree Nuts',
  'Milk',
  'Eggs',
  'Soy',
  'Wheat',
  'Fish',
  'Shellfish',
  'Sesame',
];

interface AllergySectionProps {
  initialAllergies: UserAllergyWithIngredient[];
}

const AllergySection: React.FC<AllergySectionProps> = ({ initialAllergies }) => {
  const { data: session } = useSession();
  const [allergies, setAllergies] = useState<UserAllergyWithIngredient[]>(initialAllergies);
  const [newAllergy, setNewAllergy] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'mild' | 'moderate' | 'severe'>('moderate');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        const response = await fetch('/api/allergies');
        if (!response.ok) throw new Error('Failed to fetch allergies');
        
        const data = await response.json();
        if (data) {
          setAllergies(
            data.map((allergy: UserAllergyWithIngredient) => ({
              severity: allergy.severity,
              id: allergy.id || `temp-${Date.now()}`,
              userEmail: allergy.userEmail || '',
              ingredientId: allergy.ingredient.id || `temp-ing-${allergy.ingredient.name}`,
              ingredient: {
                id: allergy.ingredient.id || `temp-ing-${allergy.ingredient.name}`,
                name: allergy.ingredient.name,
                category: allergy.ingredient.category || 'other'
              }
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching allergies:', error);
        setMessage({ type: 'error', text: 'Failed to load allergies' });
      }
    };

    if (session?.user?.email) {
      fetchAllergies();
    }
  }, [session?.user?.email]);

  const handleAddAllergy = () => {
    if (newAllergy.trim() === '') return;
    
    if (allergies.some(a => a.ingredient.name.toLowerCase() === newAllergy.trim().toLowerCase())) {
      console.warn("Allergy already added");
      setNewAllergy('');
      return;
    }

    const tempAllergy: UserAllergyWithIngredient = {
      id: `temp-${Date.now()}`,
      userEmail: '',
      ingredientId: `temp-ing-${newAllergy.trim().toLowerCase()}`,
      severity: selectedSeverity,
      ingredient: {
        id: `temp-ing-${newAllergy.trim().toLowerCase()}`,
        name: newAllergy.trim(),
        category: 'other'
      }
    };

    setAllergies([...allergies, tempAllergy]);
    setNewAllergy('');
  };

  const handleRemoveAllergy = (ingredient: string) => {
    setAllergies(allergies.filter(a => a.ingredient.name !== ingredient));
  };

  const handleSeverityChange = (ingredient: string, severity: 'mild' | 'moderate' | 'severe') => {
    setAllergies(allergies.map(a => 
      a.ingredient.name === ingredient ? { ...a, severity } : a
    ));
  };

  const handleCommonAllergenClick = (allergen: string) => {
    if (!allergies.some(a => a.ingredient.name.toLowerCase() === allergen.toLowerCase())) {
      setAllergies([...allergies, {
        id: `temp-${Date.now()}`,
        userEmail: '',
        ingredientId: `temp-ing-${allergen.toLowerCase()}`,
        severity: 'moderate',
        ingredient: {
          id: `temp-ing-${allergen.toLowerCase()}`,
          name: allergen,
          category: 'other'
        }
      }]);
    }
  };

  const handleSaveAllergies = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const payload = {
        allergies: allergies.map((a: UserAllergyWithIngredient) => ({ 
          ingredient: a.ingredient.name,
          severity: a.severity,
        })),
      };
      const response = await fetch('/api/allergies', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save allergies');

      setMessage({ type: 'success', text: 'Allergies saved successfully!' });
    } catch (error) {
      console.error('Error saving allergies:', error);
      setMessage({ type: 'error', text: 'Failed to save allergies' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Food Allergies</h3>
        <p className="mt-1 text-sm text-gray-500">
          Add any food allergies or intolerances
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            placeholder="Enter an allergen"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value as 'mild' | 'moderate' | 'severe')}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
          <button
            type="button"
            onClick={handleAddAllergy}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Add
          </button>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Common Allergens:</p>
          <div className="flex flex-wrap gap-2">
            {COMMON_ALLERGENS.map((allergen) => (
              <button
                key={allergen}
                onClick={() => handleCommonAllergenClick(allergen)}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                {allergen}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {allergies.map((allergy) => (
            <div
              key={allergy.ingredient.name}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium">{allergy.ingredient.name}</span>
                <select
                  value={allergy.severity}
                  onChange={(e) => handleSeverityChange(allergy.ingredient.name, e.target.value as 'mild' | 'moderate' | 'severe')}
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveAllergy(allergy.ingredient.name)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={handleSaveAllergies}
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Saving...' : 'Save Allergies'}
        </button>
      </div>
    </div>
  );
};

export default AllergySection; 