import React, { useState, useEffect, useCallback } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

// Define the structure of a fetched Region from the new API
// A Region can be a Continent, SubRegion, or Country, and can have children.
interface ApiRegion {
  id: string;
  name: string;
  type: 'CONTINENT' | 'SUB_REGION' | 'COUNTRY';
  continent: string | null; // Still useful for context, though hierarchy is primary
  parentSubRegionId: string | null; // Present on countries if they have a parent sub-region
  childCountries: ApiRegion[]; // For Continents, these are SubRegions. For SubRegions, these are Countries. For Countries, this is empty.
}

// Frontend structure will largely map to ApiRegion, but we can make it more explicit
// if needed, or use ApiRegion directly in the state.
// For simplicity, we'll use a slightly more structured approach for the state,
// but the fetched data will be ApiRegion[].

interface CountryNode {
  id: string;
  name: string;
  type: 'COUNTRY';
}

interface SubRegionNode {
  id: string;
  name: string;
  type: 'SUB_REGION';
  countries: CountryNode[];
}

interface ContinentNode {
  id: string;
  name: string;
  type: 'CONTINENT';
  subRegions: SubRegionNode[];
  // We might also have countries directly under a continent if our data model allows
  // For now, assuming countries are always under sub-regions if sub-regions exist for that continent.
  // The API query fetches sub-regions under childCountries of a continent.
}

interface GeographicFiltersProps {
  selectedRegions: string[];
  onRegionChange: (regions: string[]) => void;
}

const GeographicFilters: React.FC<GeographicFiltersProps> = ({ selectedRegions, onRegionChange }) => {
  // State will now store the hierarchical data directly from the API
  const [structuredGeographies, setStructuredGeographies] = useState<ContinentNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/regions'); // API now returns hierarchical data
        if (!response.ok) {
          throw new Error('Failed to fetch regions');
        }
        const data: ApiRegion[] = await response.json(); // These are top-level continents with nested children

        // Transform fetched ApiRegion[] (continents) into ContinentNode[]
        const transformedData = data.map((continent): ContinentNode => ({
          id: continent.id,
          name: continent.name,
          type: 'CONTINENT',
          subRegions: continent.childCountries // These are sub-regions from the API
            .filter(subRegion => subRegion.type === 'SUB_REGION') // Ensure they are sub-regions
            .map((subRegion): SubRegionNode => ({
              id: subRegion.id,
              name: subRegion.name,
              type: 'SUB_REGION',
              countries: subRegion.childCountries // These are countries from the API
                .filter(country => country.type === 'COUNTRY') // Ensure they are countries
                .map((country): CountryNode => ({
                  id: country.id,
                  name: country.name,
                  type: 'COUNTRY',
                })).sort((a,b) => a.name.localeCompare(b.name)),
            })).sort((a,b) => a.name.localeCompare(b.name)),
        }));
        
        setStructuredGeographies(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error("Error fetching regions:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRegions();
  }, []);

  // Helper to get all country names within a sub-region
  const getRegionNamesInSubRegion = useCallback((subRegionId: string): string[] => {
    for (const continent of structuredGeographies) {
      const subRegion = continent.subRegions.find(sr => sr.id === subRegionId);
      if (subRegion) {
        return subRegion.countries.map(c => c.name);
      }
    }
    return [];
  }, [structuredGeographies]);

  // Helper to get all country names within a continent (including sub-regions' countries)
  const getRegionNamesInContinent = useCallback((continentId: string): string[] => {
    const continent = structuredGeographies.find(c => c.id === continentId);
    if (!continent) return [];
    let names: string[] = [];
    continent.subRegions.forEach(sr => {
      names = [...names, ...sr.countries.map(c => c.name)];
    });
    // If you have direct countries under a continent (not in current model from API query), add them here.
    // e.g., names = [...names, ...continent.directCountries.map(c => c.name)];
    return Array.from(new Set(names));
  }, [structuredGeographies]);

  const handleSubRegionToggle = useCallback((subRegionId: string) => {
    const regionNamesInSubRegion = getRegionNamesInSubRegion(subRegionId);
    if (regionNamesInSubRegion.length === 0) return;

    const allInSubRegionSelected = regionNamesInSubRegion.every(name => selectedRegions.includes(name));
    let newSelectedRegions = [...selectedRegions];

    if (allInSubRegionSelected) {
      newSelectedRegions = newSelectedRegions.filter(name => !regionNamesInSubRegion.includes(name));
    } else {
      regionNamesInSubRegion.forEach(name => {
        if (!newSelectedRegions.includes(name)) newSelectedRegions.push(name);
      });
    }
    onRegionChange(newSelectedRegions);
  }, [selectedRegions, onRegionChange, getRegionNamesInSubRegion]);

  const isSubRegionSelected = useCallback((subRegionId: string): boolean => {
    const regionNamesInSubRegion = getRegionNamesInSubRegion(subRegionId);
    if (regionNamesInSubRegion.length === 0) return false;
    return regionNamesInSubRegion.every(name => selectedRegions.includes(name));
  }, [selectedRegions, getRegionNamesInSubRegion]);

  const handleMainContinentToggle = useCallback((continentId: string) => {
    const regionNamesInContinent = getRegionNamesInContinent(continentId);
    if (regionNamesInContinent.length === 0) return;
    const allInContinentSelected = regionNamesInContinent.every(name => selectedRegions.includes(name));
    let newSelectedRegions = [...selectedRegions];

    if (allInContinentSelected) {
      newSelectedRegions = newSelectedRegions.filter(name => !regionNamesInContinent.includes(name));
    } else {
      regionNamesInContinent.forEach(name => {
        if (!newSelectedRegions.includes(name)) newSelectedRegions.push(name);
      });
    }
    onRegionChange(newSelectedRegions);
  }, [selectedRegions, onRegionChange, getRegionNamesInContinent]);

  const isMainContinentSelected = useCallback((continentId: string): boolean => {
    const regionNamesInContinent = getRegionNamesInContinent(continentId);
    if (regionNamesInContinent.length === 0) return false;
    return regionNamesInContinent.every(name => selectedRegions.includes(name));
  }, [selectedRegions, getRegionNamesInContinent]);

  // Individual region (country) toggle remains the same
  const handleRegionToggle = useCallback((regionName: string) => {
    const newSelected = selectedRegions.includes(regionName)
      ? selectedRegions.filter(r => r !== regionName)
      : [...selectedRegions, regionName];
    onRegionChange(newSelected);
  }, [selectedRegions, onRegionChange]);

  // --- Rendering Logic (Needs complete overhaul based on structuredGeographies) --- 

  if (isLoading) return <p className="text-sm text-gray-500 py-4">Loading regions...</p>;
  if (error) return <p className="text-red-500 py-4">Error loading regions: {error}</p>;
  if (structuredGeographies.length === 0 && !isLoading) return <p className="text-sm text-gray-500 py-4">No regions available.</p>;

  return (
    <div className="w-full">
      <Accordion type="multiple" className="w-full">
        {structuredGeographies.map((continent) => (
          <AccordionItem key={continent.id} value={continent.name}>
            <AccordionTrigger className="text-left flex justify-between items-center w-full py-3 hover:no-underline">
              <div className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleMainContinentToggle(continent.id); }}>
                <Checkbox
                  id={`continent-${continent.id}-checkbox`}
                  checked={isMainContinentSelected(continent.id)}
                  onCheckedChange={() => {}} // Parent div click handles it
                  aria-label={`Select all in ${continent.name}`}
                />
                <span className="font-medium text-sm">{continent.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-4 py-2 space-y-2">
                {/* Nested Accordion for Sub-Regions */}
                {continent.subRegions.length > 0 && (
                  <Accordion type="multiple" className="w-full space-y-1" /* Consider dynamic defaultValue or remove */ >
                    {continent.subRegions.map((subRegion) => (
                      <AccordionItem key={subRegion.id} value={subRegion.name} className="border-none">
                        <AccordionTrigger className="text-left flex justify-between items-center w-full py-2 hover:no-underline pl-2 pr-1 rounded hover:bg-gray-50">
                          <div className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSubRegionToggle(subRegion.id); }}>
                            <Checkbox
                              id={`subregion-${subRegion.id}-checkbox`}
                              checked={isSubRegionSelected(subRegion.id)}
                              onCheckedChange={() => {}} // Parent div click handles it
                              aria-label={`Select all in ${subRegion.name}`}
                            />
                            <span className="font-normal text-sm">{subRegion.name} <span className="text-xs text-gray-400">(SUB-REGION)</span></span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-8 space-y-1.5 py-1">
                            {subRegion.countries.map((country) => (
                              <div key={country.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`region-${country.id}-checkbox`}
                                  checked={selectedRegions.includes(country.name)}
                                  onCheckedChange={() => handleRegionToggle(country.name)}
                                  aria-labelledby={`region-${country.id}-label`}
                                />
                                <label
                                  htmlFor={`region-${country.id}-checkbox`}
                                  id={`region-${country.id}-label`}
                                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  {country.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
                {/* Direct Countries for the Continent - Removed as current API doesn't populate this for now */}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {selectedRegions.length > 0 && (
        <div className="mt-4 pt-3 border-t">
          <h4 className="text-xs font-semibold mb-2 text-gray-600">Selected:</h4>
          <div className="flex flex-wrap gap-1.5">
            {[...selectedRegions].sort().map((regionName) => (
              <span
                key={regionName}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
              >
                {regionName}
                <button
                  type="button"
                  onClick={() => handleRegionToggle(regionName)}
                  className="ml-1 flex-shrink-0 text-blue-500 hover:text-blue-700 focus:outline-none"
                  aria-label={`Remove ${regionName}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeographicFilters; 