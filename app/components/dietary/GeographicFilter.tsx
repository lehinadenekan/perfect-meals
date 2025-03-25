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
    <div className="w-full mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Preferences</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => handleRegionClick(region)}
            className={`relative flex flex-col items-center justify-center p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 bg-white ${
              selectedRegions.includes(region)
                ? 'border-yellow-400 text-gray-900'
                : 'border-transparent hover:border-yellow-200 text-gray-700'
            }`}
          >
            <span className="font-medium">{region}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GeographicFilter; 