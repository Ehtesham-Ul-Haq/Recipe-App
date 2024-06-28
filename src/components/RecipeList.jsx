import React, { useEffect, useState } from 'react';
import { getAllRecipes } from '../api/api';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';


function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20; // Number of recipes per page

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await getAllRecipes(currentPage, limit);
        setRecipes(response.data.recipes);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <FaSpinner className="animate-spin text-4xl" />
        </div>
      ) : (
        <div>
          <div className="recipe-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
            {recipes.map((recipe) => (
              <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
                <RecipeCard key={recipe._id} recipe={recipe} />
              </Link>
            ))}
          </div>
          {/* Pagination */}
          <div className="pagination flex justify-center mt-8 space-x-2 mb-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
                data-tooltip-id="my-tooltip" data-tooltip-content={`Go to page ${index + 1}`} // Add tooltip text
                className={`px-2 py-0 rounded-full shadow-lg text-lg font-semibold transition-all duration-300 ease-in-out transform ${currentPage === index + 1
                  ? 'bg-pink-600 text-white cursor-not-allowed scale-110'
                  : 'bg-white text-gray-700 hover:bg-purple-500 hover:text-white hover:scale-105'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
