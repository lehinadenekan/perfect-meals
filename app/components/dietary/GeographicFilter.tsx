import React from 'react';

interface GeographicFilterProps {
  selectedRegions: string[];
  onRegionsChange: (regions: string[]) => void;
}

const REGIONS = [
  'Africa',
  'Asia',
  'Caribbean',
  'Central America',
  'Europe',
  'North America',
  'Oceania',
  'South America'
];

const GeographicFilter: React.FC<GeographicFilterProps> = ({
  selectedRegions,
  onRegionsChange,
}) => {
  const handleRegionClick = (region: string) => {
    onRegionsChange(
      selectedRegions.includes(region)
        ? selectedRegions.filter(r => r !== region)
        : [...selectedRegions, region]
    );
  };

  return (
    <div className="w-full mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => handleRegionClick(region)}
            className={`relative flex items-center justify-center p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 bg-white ${
              selectedRegions.includes(region)
                ? 'border-yellow-400 text-yellow-500 shadow-lg'
                : 'border-transparent hover:border-yellow-200 text-gray-600 hover:shadow-lg'
            }`}
          >
            <span className="font-medium">{region}</span>
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-gray-600">
        Select regions to filter recipes by their origin
      </p>
    </div>
  );
};

export default GeographicFilter; 