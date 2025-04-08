import React from 'react';

interface RecipePageProps {
  params: {
    recipeId: string;
  };
}

const RecipePage: React.FC<RecipePageProps> = ({ params }) => {
  const { recipeId } = params;

  // TODO: Fetch recipe data based on recipeId

  return (
    <div>
      <h1>Recipe Details</h1>
      <p>Recipe ID: {recipeId}</p>
      {/* TODO: Display recipe content here */}
    </div>
  );
};

export default RecipePage; 