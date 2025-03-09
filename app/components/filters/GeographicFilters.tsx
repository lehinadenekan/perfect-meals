import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CONTINENT_REGIONS, 
  getRegionsByContinent, 
  getCountriesByRegion,
  getCuisinesByRegion 
} from '@/app/services/geographic/config/geographicMappings';
import { GeographicFilter } from '@/app/types/geographic';

interface GeographicFiltersProps {
  onFilterChange: (filters: GeographicFilter[]) => void;
}

const continentEmoji: Record<string, string> = {
  'Asia': '🌏',
  'Europe': '🌍',
  'Africa': '🌍',
  'Americas': '🌎',
  'Oceania': '🌏',
};

const GeographicFilters: React.FC<GeographicFiltersProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<GeographicFilter[]>([]);
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({});

  const handleFilterChange = (
    continent: string,
    region: string,
    country: string,
    checked: boolean
  ) => {
    let newFilters: GeographicFilter[];
    
    if (checked) {
      newFilters = [...selectedFilters, { continent, region, country }];
    } else {
      newFilters = selectedFilters.filter(
        f => !(f.continent === continent && f.region === region && f.country === country)
      );
    }

    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRegionChange = (continent: string, region: string, checked: boolean) => {
    const countries = getCountriesByRegion(continent, region);
    let newFilters = [...selectedFilters];

    if (checked) {
      // Add all countries in the region
      countries.forEach(country => {
        if (!selectedFilters.some(f => 
          f.continent === continent && 
          f.region === region && 
          f.country === country
        )) {
          newFilters.push({ continent, region, country });
        }
      });
    } else {
      // Remove all countries in the region
      newFilters = newFilters.filter(
        f => !(f.continent === continent && f.region === region)
      );
    }

    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const isRegionSelected = (continent: string, region: string): boolean => {
    const countries = getCountriesByRegion(continent, region);
    return countries.every(country =>
      selectedFilters.some(f =>
        f.continent === continent &&
        f.region === region &&
        f.country === country
      )
    );
  };

  const isCountrySelected = (continent: string, region: string, country: string): boolean => {
    return selectedFilters.some(
      f => f.continent === continent && f.region === region && f.country === country
    );
  };

  const getSelectedCount = (continent: string, region: string): number => {
    return selectedFilters.filter(
      f => f.continent === continent && f.region === region
    ).length;
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
                  const selectedCount = getSelectedCount(continent, region);
                  const totalCountries = getCountriesByRegion(continent, region).length;
                  
                  return (
                    <div key={region} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${continent}-${region}-checkbox`}
                          checked={isRegionSelected(continent, region)}
                          onCheckedChange={(checked) => 
                            handleRegionChange(continent, region, checked as boolean)
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
                              checked={isCountrySelected(continent, region, country)}
                              onCheckedChange={(checked) => 
                                handleFilterChange(
                                  continent,
                                  region,
                                  country,
                                  checked as boolean
                                )
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

      {selectedFilters.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Selected Regions:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
              >
                {filter.country} ({filter.region})
                <button
                  onClick={() => handleFilterChange(filter.continent, filter.region, filter.country, false)}
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