import { Recipe } from '@/lib/types/recipe';

interface DietaryInfoProps {
  recipe: Recipe;
}

declare const DietaryInfo: React.FC<DietaryInfoProps>;
export default DietaryInfo; 