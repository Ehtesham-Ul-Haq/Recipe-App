import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Footer() {

  const { t } = useTranslation();


  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h5 className="text-2xl font-bold">{t('translation.appTitle')}</h5>
          <p className="text-gray-400">{t('translation.footerapptagline')}</p>
        </div>
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook text-xl hover:text-blue-500"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter text-xl hover:text-blue-400"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram text-xl hover:text-pink-500"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin text-xl hover:text-blue-600"></i>
          </a>
          <a href="mailto:info@yourcompany.com">
            <i className="fas fa-envelope text-xl hover:text-yellow-500"></i>
          </a>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <ul className="flex space-x-6">
              <li><Link to="/about" className="hover:text-yellow-300">{t('translation.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-300">{t('translation.contact')}</Link></li>
              <li><Link to="/help" className="hover:text-yellow-300">{t('translation.help')}</Link></li>
              <li><Link to="/privacy" className="hover:text-yellow-300">{t('translation.privacyPolicy')}</Link></li>
            </ul>
          </div>
          <div className="text-gray-400">&copy; 2024 Recipe Radiance. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
