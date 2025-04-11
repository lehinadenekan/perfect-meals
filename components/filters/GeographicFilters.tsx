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

const continentEmoji: Record<string, string> = {
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

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4">Filter by Region</h3>
      <Accordion type="multiple" className="w-full">
        {Object.keys(CONTINENT_REGIONS).map((continent) => (
          <AccordionItem key={continent} value={continent}>
            <AccordionTrigger className="text-left">
              <span className="flex items-center gap-2">
                {continentEmoji[continent]} {continent}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-6 space-y-4">
                {getRegionsByContinent(continent).map((region) => {
                  const selectedCount = getSelectedCount(region);
                  const totalCountries = getCountriesByRegion(continent, region).length;
                  
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
                        {getCountriesByRegion(continent, region).map((country) => (
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
        ))}
      </Accordion>

      {selectedRegions.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Selected Regions:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedRegions.map((region, index) => (
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