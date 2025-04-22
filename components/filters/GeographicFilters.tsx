import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import {
  CONTINENT_REGIONS,
  getRegionsByContinent,
  getCountriesByRegion,
} from '@/app/services/geographic/config/geographicMappings';

interface GeographicFiltersProps {
  selectedRegions: string[];
  onRegionChange: (regions: string[]) => void;
}

const _continentEmoji: Record<string, string> = {
  'Asia': '🌏',
  'Europe': '🌍',
  'Africa': '🌍',
  'Americas': '🌎',
  'Oceania': '🌏',
};

const GeographicFilters: React.FC<GeographicFiltersProps> = ({ selectedRegions, onRegionChange }) => {
  const handleRegionChange = (region: string) => {
    let newRegions = [...selectedRegions];
    if (newRegions.includes(region)) {
      newRegions = newRegions.filter(r => r !== region);
    } else {
      newRegions.push(region);
    }
    onRegionChange(newRegions);
  };

  const isRegionSelected = (region: string): boolean => {
    return selectedRegions.includes(region);
  };

  const getSelectedCount = (region: string): number => {
    return selectedRegions.filter(r => r === region).length;
  };

  // --- Helper to get all regions/countries for a continent ---
  const getAllLocationsForContinent = (continent: string): string[] => {
    const regions = getRegionsByContinent(continent);
    let allLocations: string[] = [];
    regions.forEach(region => {
      allLocations.push(region); // Include the region itself
      allLocations = [...allLocations, ...getCountriesByRegion(continent, region)];
    });
    // --- Use Array.from for compatibility --- 
    return Array.from(new Set(allLocations)); 
  };

  // --- Helper to check if a continent is fully selected ---
  const isContinentSelected = (continent: string): boolean => {
    const allLocations = getAllLocationsForContinent(continent);
    if (allLocations.length === 0) return false; // Nothing to select
    // Check if every location in this continent is present in selectedRegions
    return allLocations.every(location => selectedRegions.includes(location));
  };

  // --- Handler for toggling a whole continent ---
  const handleContinentToggle = (continent: string) => {
    const allLocations = getAllLocationsForContinent(continent);
    const currentlySelected = isContinentSelected(continent);
    let newRegions = [...selectedRegions];

    if (currentlySelected) {
      // Deselect all: remove all locations of this continent
      newRegions = newRegions.filter(r => !allLocations.includes(r));
    } else {
      // Select all: add all locations of this continent (avoiding duplicates)
      allLocations.forEach(location => {
        if (!newRegions.includes(location)) {
          newRegions.push(location);
        }
      });
    }
    onRegionChange(newRegions);
  };

  // --- Get sorted continent keys --- 
  const sortedContinentKeys = Object.keys(CONTINENT_REGIONS).sort((a, b) => a.localeCompare(b));

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4">Filter by Region</h3>
      <Accordion type="multiple" className="w-full">
        {/* --- Map over sorted continents --- */}
        {sortedContinentKeys.map((continent) => {
          // --- Get and sort regions for this continent --- 
          const sortedRegions = getRegionsByContinent(continent).sort((a, b) => a.localeCompare(b));
          
          return (
            <AccordionItem key={continent} value={continent}>
              <AccordionTrigger 
                className="text-left flex justify-between items-center w-full py-3"
                // Prevent accordion toggle when clicking the checkbox area if needed
                // onClick={(e) => { /* Maybe stop propagation */ }}
              >
                 {/* --- Checkbox for Continent --- */}
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}> {/* Stop propagation for this div */}
                  <Checkbox
                    id={`continent-${continent}-checkbox`}
                    checked={isContinentSelected(continent)}
                    onCheckedChange={() => handleContinentToggle(continent)}
                    aria-label={`Select all regions in ${continent}`}
                  />
                  <span className="font-medium"> {/* Removed emoji span */}
                    {continent}
                  </span>
                </div>
                 {/* Chevron icon is still part of AccordionTrigger and pushed right by justify-between */}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-6 space-y-4">
                  {/* --- Map over sorted regions --- */}
                  {sortedRegions.map((region) => {
                    const selectedCount = getSelectedCount(region);
                    // --- Get and sort countries for this region --- 
                    const sortedCountries = getCountriesByRegion(continent, region).sort((a, b) => a.localeCompare(b));
                    const totalCountries = sortedCountries.length;
                    
                    return (
                      <div key={region} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${continent}-${region}-checkbox`}
                            checked={isRegionSelected(region)}
                            onCheckedChange={(/* checked */) => // Commented out unused param
                              handleRegionChange(region)
                            }
                          />
                          <label
                            htmlFor={`${continent}-${region}-checkbox`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {region}
                            {selectedCount > 0 && (
                              <span className="ml-2 text-xs text-gray-500">
                                ({selectedCount}/{totalCountries})
                              </span>
                            )}
                          </label>
                        </div>
                        
                        <div className="ml-6 grid grid-cols-2 gap-2">
                          {/* --- Map over sorted countries --- */}
                          {sortedCountries.map((country) => (
                            <div key={country} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${continent}-${region}-${country}-checkbox`}
                                checked={selectedRegions.includes(country)}
                                onCheckedChange={(/* checked */) => // Commented out unused param
                                  handleRegionChange(country)
                                }
                              />
                              <label
                                htmlFor={`${continent}-${region}-${country}-checkbox`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {country}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* --- Sort selected regions display alphabetically --- */}
      {selectedRegions.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Selected Regions:</h4>
          <div className="flex flex-wrap gap-2">
            {[...selectedRegions].sort((a, b) => a.localeCompare(b)).map((region, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
              >
                {region}
                <button
                  onClick={() => handleRegionChange(region)}
                  className="ml-1 hover:text-blue-900"
                >
                  ×
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