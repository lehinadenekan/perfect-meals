import { DietaryAnalysis } from '@/lib/utils/dietary-classification';
import { Recipe } from '@/lib/types/recipe';

interface DietaryInfoProps {
  analysis: DietaryAnalysis;
  recipe: Recipe;
}

declare const DietaryInfo: React.FC<DietaryInfoProps>;
export default DietaryInfo; 