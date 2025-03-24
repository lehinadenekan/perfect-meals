import { DietaryAnalysis } from '@/app/utils/dietary-classification';
import { Recipe } from '@/app/types/recipe';

interface DietaryInfoProps {
  analysis: DietaryAnalysis;
  recipe: Recipe;
}

declare const DietaryInfo: React.FC<DietaryInfoProps>;
export default DietaryInfo; 