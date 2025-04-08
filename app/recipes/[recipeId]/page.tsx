import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { getRecipeById, RecipeDetailData } from '@/app/lib/data'; // Import the server data fetcher
import RecipeDisplay from '@/app/components/recipes/RecipeDisplay'; // Import the shared display component

type Props = {
  params: { recipeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Function to generate metadata (title, description) for SEO
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.recipeId;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    // Return default metadata or handle as needed if recipe not found during metadata generation
    return {
      title: 'Recipe Not Found',
    };
  }

  // Optionally merge with parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${recipe.title} | Recipe Ideas`, // Customize title format
    description: recipe.description || 'View this delicious recipe.', // Fallback description
    openGraph: {
      title: recipe.title,
      description: recipe.description || '',
      images: recipe.imageUrl ? [recipe.imageUrl] : [], // Add image for Open Graph
      url: `${process.env.NEXTAUTH_URL || ''}/recipes/${id}`, // Use env variable for base URL
      type: 'article', // Indicate it's a recipe article
    },
  };
}

// The Page component itself (Server Component)
export default async function RecipePage({ params }: Props) {
  const recipeId = params.recipeId;
  let recipe: RecipeDetailData | null = null;

  try {
    recipe = await getRecipeById(recipeId);
  } catch (error) {
    console.error(`[Page] Failed to fetch recipe ${recipeId}:`, error);
    // Let the notFound() handle the error display
  }

  // If recipe fetch failed or returned null, show Next.js 404 page
  if (!recipe) {
    notFound();
  }

  // Render the shared display component within a basic page layout
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Add breadcrumbs or other page elements here if needed */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden"> {/* Optional container styling */}
         <RecipeDisplay recipe={recipe} />
      </div>
    </main>
  );
} 