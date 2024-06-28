import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import Link from React Router DOM
import { searchRecipes } from '../api/api';
import { FaSpinner } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResult() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery().get('q');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await searchRecipes(query);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <FaSpinner className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg shadow-inner p-4">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">{t('translation.searchResults')}</h2>
          {searchResults.length > 0 ? (
            <ul className="divide-y divide-gray-300">
              {searchResults.map((recipe) => (
                <li key={recipe._id} className="py-4">
                  {/* Use Link component to navigate to recipe details */}
                  <Link to={`/recipe/${recipe._id}`}>
                    <div className="flex items-center justify-between cursor-pointer">
                      <div className="text-xl font-semibold text-gray-800">{recipe.name}</div>
                      <div className="text-gray-600">{recipe.description}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">{t('translation.noResults')}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
