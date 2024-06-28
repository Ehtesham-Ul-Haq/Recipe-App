import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown } from 'react-icons/io'; // Import Arrow Down icon from react-icons

function LanguageSwitcher( { showAlert } ) {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowDropdown(false); // Close dropdown after selecting language
    showAlert('success', `Language Changed to ${lng}`);
  };

  const languageMap = {
    english: 'English',
    french: 'Français',
    urdu: 'اردو',
    turkish: 'Türkçe',
    arabic: 'العربية',
    bangali: 'বাংলা',
    hindi: 'हिन्दी',
    japanese: '日本語',
    german: 'Deutsch',
    chineseS: '中文 (简体)',
    spanish: 'Español',
    russian: 'Русский'
  };
  
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
        >
          {languageMap[i18n.language] || 'Language'}
          <IoIosArrowDown className="-mr-1 ml-2 h-5 w-5" />
        </button>
      </div>

      {showDropdown && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {Object.entries(languageMap).map(([lng, name]) => (
            <button
              key={lng}
              onClick={() => changeLanguage(lng)}
              className="block w-full px-4 py-2 text-left hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white border-b border-black"
              role="menuitem"
            >
              {name}
            </button>
             ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
