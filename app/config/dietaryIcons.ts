import { 
  Sprout,
  Wheat,
  Milk,
  Sandwich,
  Nut,
  Fish,
  Leaf,
} from 'lucide-react';
import FermentedIcon from '../components/icons/FermentedIcon';
import { DietType } from '@/types/diet';

/**
 * Configuration for dietary preference icons
 * This file serves as a central repository for all dietary icons used in the application
 */
export const DIETARY_ICONS: Record<DietType, {
  icon: React.ComponentType<any>;
  description: string;
  source: string;
}> = {
  'fermented': {
    icon: FermentedIcon,
    description: 'Custom jar with bubbles icon representing fermented foods',
    source: 'custom/FermentedIcon'
  },
  'gluten-free': {
    icon: Wheat,
    description: 'Wheat icon from Lucide representing gluten-free diet',
    source: 'lucide-react/Wheat'
  },
  'lactose-free': {
    icon: Milk,
    description: 'Milk icon from Lucide representing lactose-free diet',
    source: 'lucide-react/Milk'
  },
  'low-FODMAP': {
    icon: Sandwich,
    description: 'Sandwich icon from Lucide representing low-FODMAP diet',
    source: 'lucide-react/Sandwich'
  },
  'nut-free': {
    icon: Nut,
    description: 'Nut icon from Lucide representing nut-free diet',
    source: 'lucide-react/Nut'
  },
  'pescatarian': {
    icon: Fish,
    description: 'Fish icon from Lucide representing pescatarian diet',
    source: 'lucide-react/Fish'
  },
  'vegan': {
    icon: Sprout,
    description: 'Sprout icon from Lucide representing vegan diet',
    source: 'lucide-react/Sprout'
  },
  'vegetarian': {
    icon: Leaf,
    description: 'Leaf icon from Lucide representing vegetarian diet',
    source: 'lucide-react/Leaf'
  }
};

/**
 * Helper function to get just the icon components
 * This maintains backward compatibility with the current implementation
 */
export const DIET_ICONS: Record<DietType, React.ComponentType<any>> = Object.entries(DIETARY_ICONS).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: value.icon
  }), 
  {} as Record<DietType, React.ComponentType<any>>
); 