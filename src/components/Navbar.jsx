import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeSearch from './RecipeSearch';
import LanguageSwitcher from './LanguageSwitcher'; // Import LanguageSwitcher component
import { IoIosArrowDown } from 'react-icons/io'; // Import Arrow Down icon from react-icons
import { useTranslation } from 'react-i18next';

function Navbar({ isLoggedIn, onLogout, showAlert }) {

  const { t } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">{t('translation.appTitle')}</Link>
        </div>
        <div>
          <RecipeSearch />
        </div>
        <div className="space-x-8 flex items-center">
            <Link to="/" className="text-white hover:text-yellow-300">{t('translation.homeFeed')}</Link>
            <Link to="/addrecipe" className="text-white hover:text-yellow-300">{t('translation.addRecipe')}</Link>

            {isLoggedIn ? (
              <>
            <Link to="/userdashboard" className="text-white hover:text-yellow-300">{t('translation.userDashboard')}</Link>
            <button onClick={onLogout} className="text-white hover:text-yellow-300">{t('translation.logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-yellow-300">{t('translation.login')}</Link>
              <Link to="/signup" className="text-white hover:text-yellow-300">{t('translation.signup')}</Link>
            </>
          )}
        <div className="relative">
          <button
 
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
            onClick={handleDropdownToggle}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            {t('translation.more')}
            <IoIosArrowDown className="-mr-1 ml-2 h-5 w-5" />
          </button>
          {isDropdownOpen && ( 
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <Link to="/about" className="block px-4 py-2 hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white border-b border-black">{t('translation.about')}</Link>
              <Link to="/contact" className="block px-4 py-2 hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white border-b border-black">{t('translation.contact')}</Link>
              <Link to="/help" className="block px-4 py-2 hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white border-b border-black">{t('translation.help')}</Link>
            </div>
          )}
        </div>
          <LanguageSwitcher showAlert={showAlert} />
        </div>
      </div>
    </nav>

  );
}

export default Navbar;
