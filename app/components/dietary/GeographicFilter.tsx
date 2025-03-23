import React from 'react';

interface GeographicFilterProps {
  selectedRegions: string[];
  onRegionsChange: (regions: string[]) => void;
}

const REGIONS = [
  'Mediterranean',
  'Asian',
  'Latin American',
  'Middle Eastern',
  'European',
  'African',
  'Indian',
  'American',
];

const GeographicFilter: React.FC<GeographicFilterProps> = ({
  selectedRegions,
  onRegionsChange,
}) => {
  const handleRegionClick = (region: string) => {
    if (selectedRegions.includes(region)) {
      onRegionsChange(selectedRegions.filter(r => r !== region));
    } else {
      onRegionsChange([...selectedRegions, region]);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Regional Preferences</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => handleRegionClick(region)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedRegions.includes(region)
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            aria-pressed={selectedRegions.includes(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GeographicFilter; 