export type Continent = 'Asia' | 'Europe' | 'Africa' | 'Americas' | 'Oceania';

export interface GeographicFilter {
  continent: string;
  region?: string;
  country?: string;
}

export interface GeographicOrigin {
  continent: Continent;
  region: string;
  country: string;
  subRegions?: string[];
}

export type ConfidenceScore = number; // 0-1

export interface APIConfidenceScores {
  edamam: ConfidenceScore;
  mealDB: ConfidenceScore;
  fatSecret: ConfidenceScore;
  aggregate: ConfidenceScore;
}

export interface ValidationMetadata {
  primarySource: 'edamam' | 'mealDB' | 'fatSecret';
  crossReferences: string[];
  lastVerified: Date;
}

export interface CulinaryAttributes {
  traditional: boolean;
  fusion: boolean;
  modern: boolean;
  regionalVariants: string[];
}

export interface CuisineGeographicMapping {
  id: string;
  name: string;
  geographic: GeographicOrigin;
  confidence: APIConfidenceScores;
  validation: ValidationMetadata;
  attributes: CulinaryAttributes;
  keywords: string[];
  commonIngredients: string[];
}

export interface GeographicDataResponse {
  origin: GeographicOrigin;
  confidence: ConfidenceScore;
  metadata: {
    source: string;
    identifiers: Record<string, string>;
    tags: string[];
  };
} 