import { GeographicOrigin } from '@/app/types/geographic';

export interface RegionalCuisine {
  origin: GeographicOrigin;
  keywords: string[];
  commonIngredients: string[];
}

// Define continent regions for better organization
export const CONTINENT_REGIONS = {
  Asia: {
    'East Asia': ['China', 'Japan', 'Korea', 'Taiwan', 'Hong Kong'],
    'Southeast Asia': ['Thailand', 'Vietnam', 'Malaysia', 'Indonesia', 'Philippines', 'Singapore'],
    'South Asia': ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal'],
    'Central Asia': ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan'],
    'Middle East': ['Lebanon', 'Iran', 'Turkey', 'Israel', 'Saudi Arabia', 'UAE']
  },
  Europe: {
    'Northern Europe': ['Sweden', 'Norway', 'Denmark', 'Finland', 'Iceland'],
    'Western Europe': ['France', 'Belgium', 'Netherlands', 'Germany', 'Switzerland'],
    'Eastern Europe': ['Russia', 'Ukraine', 'Poland', 'Hungary', 'Romania'],
    'Southern Europe': ['Italy', 'Spain', 'Greece', 'Portugal', 'Croatia'],
    'Mediterranean': ['Cyprus', 'Malta', 'Southern France', 'Southern Italy', 'Southern Spain']
  },
  Africa: {
    'North Africa': ['Morocco', 'Egypt', 'Tunisia', 'Algeria', 'Libya'],
    'West Africa': ['Nigeria', 'Ghana', 'Senegal', 'Ivory Coast', 'Mali'],
    'East Africa': ['Ethiopia', 'Kenya', 'Tanzania', 'Uganda', 'Rwanda'],
    'Southern Africa': ['South Africa', 'Zimbabwe', 'Namibia', 'Botswana', 'Mozambique'],
    'Central Africa': ['Cameroon', 'Congo', 'Angola']
  },
  Americas: {
    'North America': ['United States', 'Canada', 'Mexico'],
    'Central America': ['Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Costa Rica', 'Panama'],
    'Caribbean': ['Cuba', 'Jamaica', 'Puerto Rico', 'Dominican Republic', 'Trinidad and Tobago'],
    'South America': ['Brazil', 'Argentina', 'Peru', 'Colombia', 'Chile', 'Venezuela']
  },
  Oceania: {
    'Australasia': ['Australia', 'New Zealand'],
    'Pacific Islands': ['Fiji', 'Samoa', 'Tonga', 'Hawaii'],
    'Melanesia': ['Papua New Guinea', 'Solomon Islands', 'Vanuatu']
  }
};

export const CUISINE_MAPPINGS: Record<string, RegionalCuisine> = {
  // East Asian Cuisines
  'chinese': {
    origin: {
      continent: 'Asia',
      region: 'East Asia',
      country: 'China',
      subRegions: ['Sichuan', 'Cantonese', 'Hunan', 'Shanghai', 'Beijing']
    },
    keywords: ['chinese', 'szechuan', 'cantonese', 'hunan', 'mandarin'],
    commonIngredients: ['soy sauce', 'ginger', 'garlic', 'rice wine', 'sesame oil']
  },
  'japanese': {
    origin: {
      continent: 'Asia',
      region: 'East Asia',
      country: 'Japan',
      subRegions: ['Kanto', 'Kansai', 'Hokkaido', 'Kyushu', 'Okinawa']
    },
    keywords: ['japanese', 'washoku', 'nihon', 'nippon'],
    commonIngredients: ['dashi', 'miso', 'sake', 'mirin', 'soy sauce']
  },
  'korean': {
    origin: {
      continent: 'Asia',
      region: 'East Asia',
      country: 'Korea',
      subRegions: ['Seoul', 'Busan', 'Jeju']
    },
    keywords: ['korean', 'hanguk', 'kimchi'],
    commonIngredients: ['gochugaru', 'doenjang', 'gochujang', 'sesame oil']
  },

  // Southeast Asian Cuisines
  'thai': {
    origin: {
      continent: 'Asia',
      region: 'Southeast Asia',
      country: 'Thailand',
      subRegions: ['Central', 'Northern', 'Southern', 'Isaan']
    },
    keywords: ['thai', 'siamese', 'isaan'],
    commonIngredients: ['fish sauce', 'coconut milk', 'lemongrass', 'thai basil']
  },
  'vietnamese': {
    origin: {
      continent: 'Asia',
      region: 'Southeast Asia',
      country: 'Vietnam',
      subRegions: ['Hanoi', 'Saigon', 'Hue']
    },
    keywords: ['vietnamese', 'viet'],
    commonIngredients: ['fish sauce', 'rice noodles', 'mint', 'cilantro']
  },

  // South Asian Cuisines
  'indian': {
    origin: {
      continent: 'Asia',
      region: 'South Asia',
      country: 'India',
      subRegions: ['Punjab', 'Kerala', 'Bengal', 'Gujarat', 'Tamil Nadu']
    },
    keywords: ['indian', 'desi', 'punjabi', 'south indian', 'north indian'],
    commonIngredients: ['garam masala', 'turmeric', 'cumin', 'coriander']
  },

  // Mediterranean Cuisines
  'italian': {
    origin: {
      continent: 'Europe',
      region: 'Southern Europe',
      country: 'Italy',
      subRegions: ['Tuscany', 'Sicily', 'Lombardy', 'Campania', 'Emilia-Romagna']
    },
    keywords: ['italian', 'tuscan', 'sicilian', 'roman'],
    commonIngredients: ['olive oil', 'tomatoes', 'basil', 'parmesan']
  },
  'greek': {
    origin: {
      continent: 'Europe',
      region: 'Southern Europe',
      country: 'Greece',
      subRegions: ['Crete', 'Macedonia', 'Peloponnese']
    },
    keywords: ['greek', 'hellenic', 'mediterranean'],
    commonIngredients: ['olive oil', 'feta', 'oregano', 'lemon']
  },

  // Middle Eastern Cuisines
  'lebanese': {
    origin: {
      continent: 'Asia',
      region: 'Middle East',
      country: 'Lebanon'
    },
    keywords: ['lebanese', 'levantine'],
    commonIngredients: ['olive oil', 'tahini', 'chickpeas', 'parsley']
  },
  'turkish': {
    origin: {
      continent: 'Asia',
      region: 'Middle East',
      country: 'Turkey',
      subRegions: ['Anatolia', 'Black Sea', 'Mediterranean']
    },
    keywords: ['turkish', 'ottoman', 'anatolian'],
    commonIngredients: ['lamb', 'eggplant', 'yogurt', 'bulgur']
  },

  // Latin American Cuisines
  'mexican': {
    origin: {
      continent: 'Americas',
      region: 'North America',
      country: 'Mexico',
      subRegions: ['Oaxaca', 'Yucatan', 'Jalisco', 'Puebla']
    },
    keywords: ['mexican', 'tex-mex', 'yucatecan', 'oaxacan'],
    commonIngredients: ['corn', 'beans', 'chili', 'tomatoes']
  },
  'peruvian': {
    origin: {
      continent: 'Americas',
      region: 'South America',
      country: 'Peru',
      subRegions: ['Lima', 'Cusco', 'Arequipa']
    },
    keywords: ['peruvian', 'andean', 'creole'],
    commonIngredients: ['aji peppers', 'corn', 'potatoes', 'quinoa']
  },

  // African Cuisines
  'moroccan': {
    origin: {
      continent: 'Africa',
      region: 'North Africa',
      country: 'Morocco',
      subRegions: ['Marrakech', 'Fez', 'Casablanca']
    },
    keywords: ['moroccan', 'maghrebi'],
    commonIngredients: ['couscous', 'ras el hanout', 'preserved lemon']
  },
  'ethiopian': {
    origin: {
      continent: 'Africa',
      region: 'East Africa',
      country: 'Ethiopia',
      subRegions: ['Addis Ababa', 'Tigray', 'Amhara']
    },
    keywords: ['ethiopian', 'abyssinian'],
    commonIngredients: ['teff', 'berbere', 'niter kibbeh']
  },
  'nigerian': {
    origin: {
      continent: 'Africa',
      region: 'West Africa',
      country: 'Nigeria',
      subRegions: ['Lagos', 'Yoruba', 'Igbo', 'Hausa']
    },
    keywords: ['nigerian', 'yoruba', 'igbo', 'hausa'],
    commonIngredients: ['yam', 'palm oil', 'egusi', 'stockfish']
  },

  // Additional East Asian Cuisines
  'taiwanese': {
    origin: {
      continent: 'Asia',
      region: 'East Asia',
      country: 'Taiwan'
    },
    keywords: ['taiwanese', 'formosan', 'taipei'],
    commonIngredients: ['soy sauce', 'rice wine', 'black vinegar', 'sesame oil', 'five spice powder']
  },
  'hong_kong': {
    origin: {
      continent: 'Asia',
      region: 'East Asia',
      country: 'Hong Kong'
    },
    keywords: ['hong kong', 'cantonese', 'dim sum'],
    commonIngredients: ['oyster sauce', 'soy sauce', 'hoisin sauce', 'rice noodles', 'shrimp paste']
  },

  // Additional Southeast Asian Cuisines
  'malaysian': {
    origin: {
      continent: 'Asia',
      region: 'Southeast Asia',
      country: 'Malaysia',
      subRegions: ['Penang', 'Sarawak', 'Malacca']
    },
    keywords: ['malaysian', 'nyonya', 'peranakan', 'mamak'],
    commonIngredients: ['coconut milk', 'pandan', 'lemongrass', 'shrimp paste', 'curry powder']
  },
  'indonesian': {
    origin: {
      continent: 'Asia',
      region: 'Southeast Asia',
      country: 'Indonesia',
      subRegions: ['Java', 'Sumatra', 'Bali', 'Sulawesi']
    },
    keywords: ['indonesian', 'javanese', 'balinese', 'padang'],
    commonIngredients: ['kecap manis', 'sambal', 'coconut', 'galangal', 'candlenuts']
  },
  'singaporean': {
    origin: {
      continent: 'Asia',
      region: 'Southeast Asia',
      country: 'Singapore'
    },
    keywords: ['singaporean', 'peranakan', 'hawker'],
    commonIngredients: ['kecap manis', 'curry powder', 'coconut milk', 'pandan', 'shrimp paste']
  },

  // Additional European Cuisines
  'spanish': {
    origin: {
      continent: 'Europe',
      region: 'Southern Europe',
      country: 'Spain',
      subRegions: ['Catalonia', 'Basque Country', 'Andalusia', 'Galicia']
    },
    keywords: ['spanish', 'catalan', 'basque', 'andalusian'],
    commonIngredients: ['olive oil', 'saffron', 'paprika', 'tomatoes', 'garlic']
  },
  'french': {
    origin: {
      continent: 'Europe',
      region: 'Western Europe',
      country: 'France',
      subRegions: ['Provence', 'Burgundy', 'Normandy', 'Alsace']
    },
    keywords: ['french', 'provencal', 'burgundian', 'norman'],
    commonIngredients: ['butter', 'cream', 'wine', 'herbs de provence', 'dijon mustard']
  },
  'german': {
    origin: {
      continent: 'Europe',
      region: 'Western Europe',
      country: 'Germany',
      subRegions: ['Bavaria', 'Saxony', 'Baden-Württemberg']
    },
    keywords: ['german', 'bavarian', 'saxon'],
    commonIngredients: ['pork', 'potatoes', 'cabbage', 'mustard', 'rye']
  },

  // Additional Middle Eastern Cuisines
  'persian': {
    origin: {
      continent: 'Asia',
      region: 'Middle East',
      country: 'Iran',
      subRegions: ['Tehran', 'Isfahan', 'Shiraz']
    },
    keywords: ['persian', 'iranian'],
    commonIngredients: ['saffron', 'turmeric', 'dried limes', 'rosewater', 'pomegranate']
  },
  'israeli': {
    origin: {
      continent: 'Asia',
      region: 'Middle East',
      country: 'Israel'
    },
    keywords: ['israeli', 'jewish', 'kosher'],
    commonIngredients: ['tahini', 'za\'atar', 'sumac', 'chickpeas', 'olive oil']
  },

  // Additional Latin American Cuisines
  'brazilian': {
    origin: {
      continent: 'Americas',
      region: 'South America',
      country: 'Brazil',
      subRegions: ['Bahia', 'Minas Gerais', 'Rio de Janeiro']
    },
    keywords: ['brazilian', 'bahian', 'mineiro'],
    commonIngredients: ['manioc', 'coconut milk', 'palm oil', 'black beans', 'cachaca']
  },
  'argentinian': {
    origin: {
      continent: 'Americas',
      region: 'South America',
      country: 'Argentina',
      subRegions: ['Buenos Aires', 'Mendoza', 'Patagonia']
    },
    keywords: ['argentinian', 'gaucho'],
    commonIngredients: ['beef', 'chimichurri', 'dulce de leche', 'yerba mate']
  },
  'caribbean': {
    origin: {
      continent: 'Americas',
      region: 'Caribbean',
      country: 'Jamaica',
      subRegions: ['Kingston', 'Montego Bay']
    },
    keywords: ['jamaican', 'caribbean', 'west indian'],
    commonIngredients: ['scotch bonnet', 'allspice', 'coconut milk', 'rum', 'thyme']
  },

  // Additional African Cuisines
  'south_african': {
    origin: {
      continent: 'Africa',
      region: 'Southern Africa',
      country: 'South Africa',
      subRegions: ['Cape Town', 'Johannesburg', 'Durban']
    },
    keywords: ['south african', 'cape malay', 'boer'],
    commonIngredients: ['peri-peri', 'rooibos', 'bobotie spices', 'biltong']
  },
  'senegalese': {
    origin: {
      continent: 'Africa',
      region: 'West Africa',
      country: 'Senegal'
    },
    keywords: ['senegalese', 'west african'],
    commonIngredients: ['peanuts', 'palm oil', 'fish', 'rice', 'tamarind']
  },

  // Oceanian Cuisines
  'australian': {
    origin: {
      continent: 'Oceania',
      region: 'Australasia',
      country: 'Australia',
      subRegions: ['New South Wales', 'Victoria', 'Queensland']
    },
    keywords: ['australian', 'aussie', 'bush tucker'],
    commonIngredients: ['macadamia', 'wattleseed', 'kangaroo', 'vegemite', 'lemon myrtle']
  },
  'polynesian': {
    origin: {
      continent: 'Oceania',
      region: 'Pacific Islands',
      country: 'Hawaii',
      subRegions: ['Oahu', 'Maui', 'Big Island']
    },
    keywords: ['hawaiian', 'polynesian', 'pacific'],
    commonIngredients: ['taro', 'coconut', 'pineapple', 'macadamia nuts', 'poi']
  },

  // Additional East Asian Cuisines
  'sichuan': {
    origin: {
      continent: 'Asia',
      region: 'East Asia',
      country: 'China',
      subRegions: ['Sichuan', 'Chongqing']
    },
    keywords: ['sichuan', 'szechuan', 'chongqing', 'spicy chinese'],
    commonIngredients: ['sichuan peppercorn', 'chili oil', 'doubanjiang', 'garlic', 'ginger']
  },
  'cantonese': {
    origin: {
      continent: 'Asia',
      region: 'East Asia',
      country: 'China',
      subRegions: ['Guangdong', 'Hong Kong']
    },
    keywords: ['cantonese', 'guangdong', 'yue cuisine'],
    commonIngredients: ['oyster sauce', 'soy sauce', 'shaoxing wine', 'ginger', 'scallion']
  },
  'okinawan': {
    origin: {
      continent: 'Asia',
      region: 'East Asia',
      country: 'Japan',
      subRegions: ['Okinawa']
    },
    keywords: ['okinawan', 'ryukyuan'],
    commonIngredients: ['goya', 'purple sweet potato', 'seaweed', 'pork', 'turmeric']
  },

  // Additional Southeast Asian Cuisines
  'filipino': {
    origin: {
      continent: 'Asia',
      region: 'Southeast Asia',
      country: 'Philippines',
      subRegions: ['Luzon', 'Visayas', 'Mindanao']
    },
    keywords: ['filipino', 'pinoy', 'tagalog'],
    commonIngredients: ['vinegar', 'soy sauce', 'calamansi', 'coconut milk', 'bagoong']
  },
  'burmese': {
    origin: {
      continent: 'Asia',
      region: 'Southeast Asia',
      country: 'Myanmar',
      subRegions: ['Yangon', 'Mandalay', 'Shan State']
    },
    keywords: ['burmese', 'myanmar', 'shan'],
    commonIngredients: ['fish sauce', 'turmeric', 'chickpea flour', 'tea leaves', 'shrimp paste']
  },
  'laotian': {
    origin: {
      continent: 'Asia',
      region: 'Southeast Asia',
      country: 'Laos',
      subRegions: ['Vientiane', 'Luang Prabang']
    },
    keywords: ['laotian', 'lao'],
    commonIngredients: ['sticky rice', 'fish sauce', 'lemongrass', 'galangal', 'kaffir lime']
  },

  // Additional South Asian Cuisines
  'bengali': {
    origin: {
      continent: 'Asia',
      region: 'South Asia',
      country: 'India',
      subRegions: ['West Bengal', 'Bangladesh']
    },
    keywords: ['bengali', 'bangla'],
    commonIngredients: ['mustard oil', 'panch phoron', 'fish', 'rice', 'mustard']
  },
  'goan': {
    origin: {
      continent: 'Asia',
      region: 'South Asia',
      country: 'India',
      subRegions: ['Goa']
    },
    keywords: ['goan', 'konkani'],
    commonIngredients: ['coconut', 'kokum', 'vinegar', 'fish', 'tamarind']
  },
  'sri_lankan': {
    origin: {
      continent: 'Asia',
      region: 'South Asia',
      country: 'Sri Lanka',
      subRegions: ['Colombo', 'Kandy', 'Jaffna']
    },
    keywords: ['sri lankan', 'ceylon', 'tamil'],
    commonIngredients: ['coconut', 'curry leaves', 'pandanus', 'cinnamon', 'black pepper']
  },

  // Additional European Regional Cuisines
  'sicilian': {
    origin: {
      continent: 'Europe',
      region: 'Southern Europe',
      country: 'Italy',
      subRegions: ['Sicily']
    },
    keywords: ['sicilian', 'sicily'],
    commonIngredients: ['pistachios', 'citrus', 'sardines', 'saffron', 'eggplant']
  },
  'basque': {
    origin: {
      continent: 'Europe',
      region: 'Southern Europe',
      country: 'Spain',
      subRegions: ['Basque Country']
    },
    keywords: ['basque', 'euskadi'],
    commonIngredients: ['cod', 'peppers', 'sheep milk cheese', 'txakoli wine']
  },
  'provencal': {
    origin: {
      continent: 'Europe',
      region: 'Western Europe',
      country: 'France',
      subRegions: ['Provence']
    },
    keywords: ['provencal', 'provence'],
    commonIngredients: ['herbs de provence', 'olive oil', 'tomatoes', 'garlic', 'anchovies']
  },

  // Additional Middle Eastern Cuisines
  'yemeni': {
    origin: {
      continent: 'Asia',
      region: 'Middle East',
      country: 'Yemen',
      subRegions: ['Sana\'a', 'Aden']
    },
    keywords: ['yemeni', 'yemenite'],
    commonIngredients: ['hawaij', 'fenugreek', 'lamb', 'coffee', 'zhug']
  },
  'syrian': {
    origin: {
      continent: 'Asia',
      region: 'Middle East',
      country: 'Syria',
      subRegions: ['Damascus', 'Aleppo']
    },
    keywords: ['syrian', 'damascene', 'aleppan'],
    commonIngredients: ['bulgur', 'pomegranate molasses', 'sumac', 'za\'atar', 'pistachios']
  },

  // Additional Latin American Cuisines
  'venezuelan': {
    origin: {
      continent: 'Americas',
      region: 'South America',
      country: 'Venezuela',
      subRegions: ['Caracas', 'Maracaibo']
    },
    keywords: ['venezuelan', 'llanero'],
    commonIngredients: ['corn flour', 'black beans', 'plantains', 'cheese', 'avocado']
  },
  'colombian': {
    origin: {
      continent: 'Americas',
      region: 'South America',
      country: 'Colombia',
      subRegions: ['Bogota', 'Medellin', 'Cali']
    },
    keywords: ['colombian', 'paisa'],
    commonIngredients: ['corn', 'beans', 'plantains', 'arepas', 'hogao']
  },
  'chilean': {
    origin: {
      continent: 'Americas',
      region: 'South America',
      country: 'Chile',
      subRegions: ['Santiago', 'Valparaiso']
    },
    keywords: ['chilean'],
    commonIngredients: ['corn', 'beans', 'seafood', 'merkén', 'wine']
  },

  // Additional African Cuisines
  'tunisian': {
    origin: {
      continent: 'Africa',
      region: 'North Africa',
      country: 'Tunisia',
      subRegions: ['Tunis', 'Sfax']
    },
    keywords: ['tunisian', 'maghrebi'],
    commonIngredients: ['harissa', 'tuna', 'olive oil', 'couscous', 'dates']
  },
  'sudanese': {
    origin: {
      continent: 'Africa',
      region: 'East Africa',
      country: 'Sudan',
      subRegions: ['Khartoum', 'Omdurman']
    },
    keywords: ['sudanese'],
    commonIngredients: ['peanut butter', 'dried okra', 'sorghum', 'hibiscus', 'fava beans']
  },
  'ghanaian': {
    origin: {
      continent: 'Africa',
      region: 'West Africa',
      country: 'Ghana',
      subRegions: ['Accra', 'Kumasi']
    },
    keywords: ['ghanaian', 'akan'],
    commonIngredients: ['palm oil', 'yams', 'plantains', 'groundnuts', 'cassava']
  },

  // Additional Oceanian Cuisines
  'maori': {
    origin: {
      continent: 'Oceania',
      region: 'Australasia',
      country: 'New Zealand',
      subRegions: ['North Island', 'South Island']
    },
    keywords: ['maori', 'kiwi'],
    commonIngredients: ['kumara', 'seafood', 'lamb', 'puha', 'horopito']
  },
  'fijian': {
    origin: {
      continent: 'Oceania',
      region: 'Pacific Islands',
      country: 'Fiji',
      subRegions: ['Viti Levu', 'Vanua Levu']
    },
    keywords: ['fijian', 'pacific islander'],
    commonIngredients: ['taro', 'cassava', 'coconut', 'fish', 'tropical fruits']
  }
};

export function getRegionsByContinent(continent: string): string[] {
  return Object.keys(CONTINENT_REGIONS[continent as keyof typeof CONTINENT_REGIONS] || {});
}

export function getCountriesByRegion(continent: string, region: string): string[] {
  return CONTINENT_REGIONS[continent as keyof typeof CONTINENT_REGIONS]?.[region] || [];
}

export function getCuisineByKeyword(keyword: string): RegionalCuisine | undefined {
  // First try direct match
  if (CUISINE_MAPPINGS[keyword.toLowerCase()]) {
    return CUISINE_MAPPINGS[keyword.toLowerCase()];
  }

  // Then try matching keywords
  for (const [cuisine, mapping] of Object.entries(CUISINE_MAPPINGS)) {
    if (mapping.keywords.some(k => keyword.toLowerCase().includes(k))) {
      return mapping;
    }
  }

  return undefined;
}

export function getCuisinesByRegion(continent: string, region?: string, country?: string): RegionalCuisine[] {
  return Object.values(CUISINE_MAPPINGS).filter(cuisine => {
    const match = cuisine.origin.continent === continent;
    if (!region) return match;
    
    const regionMatch = cuisine.origin.region === region;
    if (!country) return match && regionMatch;
    
    return match && regionMatch && cuisine.origin.country === country;
  });
} 