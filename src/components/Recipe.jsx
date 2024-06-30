import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, deleteRecipe, saveFavoriteRecipe, updateRecentlyViewedRecipe } from '../api/api';
import RecipeReview from './RecipeReview';
import { FaSpinner } from 'react-icons/fa';


function Recipe({ isLoggedIn, currentUser, showAlert }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async (id) => {
      try {
        const response = await getRecipeById(id);
        setRecipe(response.data);

         // Update recently viewed recipe
         if (currentUser) {
          await updateRecentlyViewedRecipe(currentUser.id, id);
        }

      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipe(id);
  }, [id, currentUser]);

  if (!recipe) return <div><FaSpinner className="animate-spin text-4xl" /></div>;

  const handleDelete = async () => {
    try {
      await deleteRecipe(id);
      navigate('/recipelist'); // Redirect to the recipe list after deletion
      showAlert('success', 'Recipe deleted Successfully');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      showAlert('error', 'Recipe failed to be deleted');
    }
  };

  const handleUpdate = () => {
    navigate(`/update-recipe/${id}`);
  };



  const handleSaveFavorite = async () => {
    if (!currentUser) {
      console.error('User not loaded');
      return;
    }
    try {
      await saveFavoriteRecipe(currentUser.id, id);
      // Optionally, you can provide some feedback to the user, like a success message
      showAlert('success', 'Recipe saved as favorite');
    } catch (error) {
      console.error('Error saving favorite recipe:', error);
      showAlert('error', 'Failed to saved Recipe as favorite');
    }
  };


  const isCreator = recipe.user && currentUser && recipe.user._id === currentUser.id;

  // Share to Social Media function
  const shareToSocialMedia = (platform) => {
    // Define your sharing logic here (open a new window with the share link)
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(recipe.name)}`, '_blank');
        break;
      case 'pinterest':
        window.open(`https://www.pinterest.com/pin/create/button/?url=${window.location.href}&description=${encodeURIComponent(recipe.name)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?url=${window.location.href}&title=${encodeURIComponent(recipe.name)}`, '_blank');
        break;
      default:
        break;
    }
  };



  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 transition-transform transform">
      <div className="px-6 py-4">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900 border-b-2 border-gray-200 pb-2 text-center">{recipe.name}</h2>
        <p className="text-gray-600 mb-6 italic">{recipe.description}</p>
        <div className="flex justify-between">
          <div className="mb-6 w-1/2">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6 w-1/2">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Instructions</h3>
            <ol className="list-decimal list-inside space-y-1">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">{instruction}</li>
              ))}
            </ol>
          </div>
        </div>


{isLoggedIn && (
          <div className="flex justify-end space-x-4 mt-4">
            {isCreator && (
              <>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </>
            )}
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
              onClick={handleSaveFavorite}
            >
              Save as Favorite
            </button>
          </div>
        )}

        <div className="flex justify-center items-center mt-6">
          <span className="text-gray-700 mr-4">Share:</span>
          <i
            className="fab fa-facebook text-2xl text-blue-700 cursor-pointer hover:text-blue-500 mr-2"
            onClick={() => shareToSocialMedia('facebook')}
          />
          <i
            className="fab fa-twitter text-2xl text-blue-400 cursor-pointer hover:text-blue-300 mr-2"
            onClick={() => shareToSocialMedia('twitter')}
          />
          <i
            className="fab fa-pinterest text-2xl text-red-500 cursor-pointer hover:text-red-400 mr-2"
            onClick={() => shareToSocialMedia('pinterest')}
          />
          <i
            className="fab fa-linkedin text-2xl text-blue-700 cursor-pointer hover:text-blue-500"
            onClick={() => shareToSocialMedia('linkedin')}
          />
        </div>
      </div>

      <div className="px-6 py-4">
        <RecipeReview recipeId={id} currentUser={currentUser} showAlert={showAlert} />
      </div>
    </div>
  );
}

export default Recipe;
