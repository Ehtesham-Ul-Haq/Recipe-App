import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function RecipeSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery === '') {
      alert('Please enter a search query.');
      return;
    }
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <div>
    <div className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('translation.placeholder')}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      />
      <button
        onClick={handleSearch}
        className="text-white px-4 py-2 rounded-md flex items-center hover:bg-black focus:outline-none"
      >
        <FaSearch className="mr-2" />
        Search
      </button>
    </div>
  </div>
  );
}

export default RecipeSearch;
