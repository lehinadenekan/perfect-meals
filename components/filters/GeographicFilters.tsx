// components/filters/GeographicFilters.tsx
import React from 'react';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'; // <-- Import commented out
import { Checkbox } from '@/components/ui/checkbox'; // Assuming checkbox still exists
import {
  CONTINENT_REGIONS,
  Continent,
  Region,
} from '@/lib/constants/geographic-filters'; // Assuming this path is correct

interface GeographicFiltersProps {
  selectedRegions: string[];
  onRegionChange: (region: string, isSelected: boolean) => void;
}

const GeographicFilters: React.FC<GeographicFiltersProps> = ({
  selectedRegions,
  onRegionChange,
}) => {
  return (
    <div className="space-y-2"> {/* Replaced Accordion with a div */}
      {Object.entries(CONTINENT_REGIONS).map(([continent, regions]) => (
        // --- Replaced AccordionItem with a div ---
        <div key={continent} className="border rounded-md p-2 mb-2">
          {/* --- Replaced AccordionTrigger with a simple h4 --- */}
          <h4 className="font-medium mb-2">{continent}</h4>
          {/* --- Replaced AccordionContent with a div --- */}
          <div className="space-y-2 pl-4">
            {(regions as Region[]).map((region) => (
              <div key={region.name} className="flex items-center space-x-2">
                <Checkbox
                  id={`${continent}-${region.name}`}
                  checked={selectedRegions.includes(region.name)}
                  onCheckedChange={(checked) =>
                    onRegionChange(region.name, !!checked)
                  }
                />
                <label
                  htmlFor={`${continent}-${region.name}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {region.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeographicFilters;