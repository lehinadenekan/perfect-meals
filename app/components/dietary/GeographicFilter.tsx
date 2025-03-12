import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Country {
  id: string;
  name: string;
  selected: boolean;
}

interface SubRegion {
  id: string;
  name: string;
  countries: Country[];
  selected: boolean;
  expanded?: boolean;
}

interface Region {
  id: string;
  name: string;
  subRegions: SubRegion[];
  selected: boolean;
  expanded?: boolean;
}

interface GeographicFilterProps {
  onChange: (selectedRegions: string[]) => void;
  className?: string;
}

const REGIONS: Region[] = [
  {
    id: 'africa',
    name: 'Africa',
    selected: false,
    expanded: false,
    subRegions: [
      {
        id: 'east_africa',
        name: 'East Africa',
        selected: false,
        expanded: false,
        countries: [
          { id: 'ethiopia', name: 'Ethiopia', selected: false },
          { id: 'kenya', name: 'Kenya', selected: false },
          { id: 'tanzania', name: 'Tanzania', selected: false },
          { id: 'uganda', name: 'Uganda', selected: false },
        ],
      },
      {
        id: 'north_africa',
        name: 'North Africa',
        selected: false,
        countries: [
          { id: 'algeria', name: 'Algeria', selected: false },
          { id: 'egypt', name: 'Egypt', selected: false },
          { id: 'morocco', name: 'Morocco', selected: false },
          { id: 'tunisia', name: 'Tunisia', selected: false },
        ],
      },
      {
        id: 'southern_africa',
        name: 'Southern Africa',
        selected: false,
        countries: [
          { id: 'mozambique', name: 'Mozambique', selected: false },
          { id: 'namibia', name: 'Namibia', selected: false },
          { id: 'south_africa', name: 'South Africa', selected: false },
          { id: 'zimbabwe', name: 'Zimbabwe', selected: false },
        ],
      },
      {
        id: 'west_africa',
        name: 'West Africa',
        selected: false,
        expanded: true,
        countries: [
          { id: 'benin', name: 'Benin', selected: false },
          { id: 'burkina_faso', name: 'Burkina Faso', selected: false },
          { id: 'cameroon', name: 'Cameroon', selected: false },
          { id: 'ghana', name: 'Ghana', selected: false },
          { id: 'guinea', name: 'Guinea', selected: false },
          { id: 'ivory_coast', name: 'Ivory Coast', selected: false },
          { id: 'liberia', name: 'Liberia', selected: false },
          { id: 'mali', name: 'Mali', selected: false },
          { id: 'nigeria', name: 'Nigeria', selected: false },
          { id: 'senegal', name: 'Senegal', selected: false },
          { id: 'sierra_leone', name: 'Sierra Leone', selected: false },
          { id: 'togo', name: 'Togo', selected: false }
        ],
      },
    ],
  },
  {
    id: 'americas',
    name: 'Americas',
    selected: false,
    expanded: false,
    subRegions: [
      {
        id: 'caribbean',
        name: 'Caribbean',
        selected: false,
        expanded: false,
        countries: [
          { id: 'cuba', name: 'Cuba', selected: false },
          { id: 'dominican_republic', name: 'Dominican Republic', selected: false },
          { id: 'jamaica', name: 'Jamaica', selected: false },
          { id: 'puerto_rico', name: 'Puerto Rico', selected: false },
        ],
      },
      {
        id: 'central_america',
        name: 'Central America',
        selected: false,
        countries: [
          { id: 'costa_rica', name: 'Costa Rica', selected: false },
          { id: 'el_salvador', name: 'El Salvador', selected: false },
          { id: 'guatemala', name: 'Guatemala', selected: false },
          { id: 'panama', name: 'Panama', selected: false },
        ],
      },
      {
        id: 'north_america',
        name: 'North America',
        selected: false,
        countries: [
          { id: 'canada', name: 'Canada', selected: false },
          { id: 'mexico', name: 'Mexico', selected: false },
          { id: 'usa', name: 'United States', selected: false },
        ],
      },
      {
        id: 'south_america',
        name: 'South America',
        selected: false,
        countries: [
          { id: 'argentina', name: 'Argentina', selected: false },
          { id: 'brazil', name: 'Brazil', selected: false },
          { id: 'colombia', name: 'Colombia', selected: false },
          { id: 'peru', name: 'Peru', selected: false },
          { id: 'venezuela', name: 'Venezuela', selected: false },
        ],
      },
    ],
  },
  {
    id: 'asia',
    name: 'Asia',
    selected: false,
    expanded: false,
    subRegions: [
      {
        id: 'east_asia',
        name: 'East Asia',
        selected: false,
        expanded: false,
        countries: [
          { id: 'china', name: 'China', selected: false },
          { id: 'japan', name: 'Japan', selected: false },
          { id: 'korea', name: 'Korea', selected: false },
          { id: 'taiwan', name: 'Taiwan', selected: false },
        ],
      },
      {
        id: 'south_asia',
        name: 'South Asia',
        selected: false,
        countries: [
          { id: 'bangladesh', name: 'Bangladesh', selected: false },
          { id: 'india', name: 'India', selected: false },
          { id: 'pakistan', name: 'Pakistan', selected: false },
          { id: 'sri_lanka', name: 'Sri Lanka', selected: false },
        ],
      },
      {
        id: 'southeast_asia',
        name: 'Southeast Asia',
        selected: false,
        countries: [
          { id: 'indonesia', name: 'Indonesia', selected: false },
          { id: 'malaysia', name: 'Malaysia', selected: false },
          { id: 'philippines', name: 'Philippines', selected: false },
          { id: 'thailand', name: 'Thailand', selected: false },
          { id: 'vietnam', name: 'Vietnam', selected: false },
        ],
      },
    ],
  },
  {
    id: 'europe',
    name: 'Europe',
    selected: false,
    expanded: false,
    subRegions: [
      {
        id: 'eastern_europe',
        name: 'Eastern Europe',
        selected: false,
        expanded: false,
        countries: [
          { id: 'poland', name: 'Poland', selected: false },
          { id: 'romania', name: 'Romania', selected: false },
          { id: 'russia', name: 'Russia', selected: false },
          { id: 'ukraine', name: 'Ukraine', selected: false },
        ],
      },
      {
        id: 'mediterranean',
        name: 'Mediterranean',
        selected: false,
        countries: [
          { id: 'greece', name: 'Greece', selected: false },
          { id: 'lebanon', name: 'Lebanon', selected: false },
          { id: 'morocco', name: 'Morocco', selected: false },
          { id: 'turkey', name: 'Turkey', selected: false },
        ],
      },
      {
        id: 'western_europe',
        name: 'Western Europe',
        selected: false,
        countries: [
          { id: 'france', name: 'France', selected: false },
          { id: 'germany', name: 'Germany', selected: false },
          { id: 'italy', name: 'Italy', selected: false },
          { id: 'spain', name: 'Spain', selected: false },
        ],
      },
    ],
  },
  {
    id: 'oceania',
    name: 'Oceania',
    selected: false,
    expanded: false,
    subRegions: [
      {
        id: 'australasia',
        name: 'Australasia',
        selected: false,
        expanded: false,
        countries: [
          { id: 'australia', name: 'Australia', selected: false },
          { id: 'new_zealand', name: 'New Zealand', selected: false },
        ],
      },
      {
        id: 'melanesia',
        name: 'Melanesia',
        selected: false,
        countries: [
          { id: 'papua_new_guinea', name: 'Papua New Guinea', selected: false },
          { id: 'solomon_islands', name: 'Solomon Islands', selected: false },
          { id: 'vanuatu', name: 'Vanuatu', selected: false },
        ],
      },
      {
        id: 'polynesia',
        name: 'Polynesia',
        selected: false,
        countries: [
          { id: 'fiji', name: 'Fiji', selected: false },
          { id: 'hawaii', name: 'Hawaii', selected: false },
          { id: 'samoa', name: 'Samoa', selected: false },
          { id: 'tonga', name: 'Tonga', selected: false },
        ],
      },
    ],
  },
];

const GeographicFilter: React.FC<GeographicFilterProps> = ({ onChange, className = '' }) => {
  const [regions, setRegions] = useState<Region[]>(REGIONS);

  const handleRegionToggle = (regionId: string) => {
    setRegions(prevRegions => {
      const newRegions = prevRegions.map(region => {
        if (region.id === regionId) {
          const newSelected = !region.selected;
          return {
            ...region,
            selected: newSelected,
            subRegions: region.subRegions.map(subRegion => ({
              ...subRegion,
              selected: newSelected,
              countries: subRegion.countries.map(country => ({
                ...country,
                selected: newSelected,
              })),
            })),
          };
        }
        return region;
      });
      
      const selectedRegions = getSelectedRegions(newRegions);
      onChange(selectedRegions);
      
      return newRegions;
    });
  };

  const handleRegionExpand = (regionId: string) => {
    setRegions(prevRegions => {
      return prevRegions.map(region => {
        if (region.id === regionId) {
          return {
            ...region,
            expanded: !region.expanded,
          };
        }
        return region;
      });
    });
  };

  const handleSubRegionExpand = (regionId: string, subRegionId: string) => {
    setRegions(prevRegions => {
      return prevRegions.map(region => {
        if (region.id === regionId) {
          return {
            ...region,
            subRegions: region.subRegions.map(subRegion => {
              if (subRegion.id === subRegionId) {
                return {
                  ...subRegion,
                  expanded: !subRegion.expanded,
                };
              }
              return subRegion;
            }),
          };
        }
        return region;
      });
    });
  };

  const handleSubRegionToggle = (regionId: string, subRegionId: string) => {
    setRegions(prevRegions => {
      const newRegions = prevRegions.map(region => {
        if (region.id === regionId) {
          const newSubRegions = region.subRegions.map(subRegion => {
            if (subRegion.id === subRegionId) {
              const newSelected = !subRegion.selected;
              return {
                ...subRegion,
                selected: newSelected,
                countries: subRegion.countries.map(country => ({
                  ...country,
                  selected: newSelected,
                })),
              };
            }
            return subRegion;
          });

          return {
            ...region,
            selected: newSubRegions.every(sr => sr.selected),
            subRegions: newSubRegions,
          };
        }
        return region;
      });

      const selectedRegions = getSelectedRegions(newRegions);
      onChange(selectedRegions);

      return newRegions;
    });
  };

  const handleCountryToggle = (regionId: string, subRegionId: string, countryId: string) => {
    setRegions(prevRegions => {
      const newRegions = prevRegions.map(region => {
        if (region.id === regionId) {
          const newSubRegions = region.subRegions.map(subRegion => {
            if (subRegion.id === subRegionId) {
              const newCountries = subRegion.countries.map(country => {
                if (country.id === countryId) {
                  return { ...country, selected: !country.selected };
                }
                return country;
              });

              return {
                ...subRegion,
                selected: newCountries.every(c => c.selected),
                countries: newCountries,
              };
            }
            return subRegion;
          });

          return {
            ...region,
            selected: newSubRegions.every(sr => sr.selected),
            subRegions: newSubRegions,
          };
        }
        return region;
      });

      const selectedRegions = getSelectedRegions(newRegions);
      onChange(selectedRegions);

      return newRegions;
    });
  };

  const getSelectedRegions = (regions: Region[]): string[] => {
    const selected: string[] = [];
    regions.forEach(region => {
      region.subRegions.forEach(subRegion => {
        subRegion.countries.forEach(country => {
          if (country.selected) {
            selected.push(country.id);
          }
        });
      });
    });
    return selected;
  };

  return (
    <div className={className}>
      {/* Horizontal continent layout */}
      <div className="flex flex-wrap gap-8 justify-center mb-4">
        {regions.map(region => (
          <div key={region.id} className="flex flex-col">
            {/* Region header */}
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => handleRegionExpand(region.id)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-expanded={region.expanded}
                aria-label={`Toggle ${region.name} region`}
              >
                {region.expanded ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </button>
              <input
                type="checkbox"
                id={region.id}
                checked={region.selected}
                onChange={() => handleRegionToggle(region.id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={region.id} className="font-medium text-gray-900">
                {region.name}
              </label>
            </div>

            {/* Collapsible sub-regions */}
            {region.expanded && (
              <div className="ml-6">
                {region.subRegions.map(subRegion => (
                  <div key={subRegion.id} className="mb-2">
                    {/* Sub-region header */}
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        onClick={() => handleSubRegionExpand(region.id, subRegion.id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        aria-expanded={subRegion.expanded}
                        aria-label={`Toggle ${subRegion.name} sub-region`}
                      >
                        {subRegion.expanded ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4" />
                        )}
                      </button>
                      <input
                        type="checkbox"
                        id={subRegion.id}
                        checked={subRegion.selected}
                        onChange={() => handleSubRegionToggle(region.id, subRegion.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={subRegion.id} className="text-gray-700">
                        {subRegion.name}
                      </label>
                    </div>

                    {/* Collapsible countries */}
                    {subRegion.expanded && (
                      <div className="ml-6 space-y-1">
                        {subRegion.countries.map(country => (
                          <div key={country.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={country.id}
                              checked={country.selected}
                              onChange={() => handleCountryToggle(region.id, subRegion.id, country.id)}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={country.id} className="text-sm text-gray-600">
                              {country.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeographicFilter; 