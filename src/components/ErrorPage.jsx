import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">Oops! Page not found</h2>
        <p className="text-lg mb-6">
          The page you are looking for might have been removed or temporarily unavailable.
        </p>
        <Link to="/" className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-md shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out">
          <FaHome className="mr-2" />
          Go Back Home
        </Link>
      </div>
      <div className="absolute bottom-0 w-full text-center pb-4">
        <p>&copy; 2024 Recipe Radiance. All rights reserved.</p>
      </div>
    </div>
  );
}

export default ErrorPage;
