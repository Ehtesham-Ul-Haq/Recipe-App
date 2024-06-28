import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { getUserById, getRecentlyViewedRecipes, getSavedFavorites, getUserRecipes } from '../api/api';
import { Link as ScrollLink, Element } from 'react-scroll';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [recentlyViewedRecipes, setRecentlyViewedRecipes] = useState([]);
  const [savedFavorites, setSavedFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;
        fetchUser(userId);
        fetchUserRecipes(userId);
        fetchRecentlyViewedRecipes(userId);
        fetchSavedFavorites(userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await getUserById(userId);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchUserRecipes = async (userId) => {
    try {
      const response = await getUserRecipes(userId);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching user recipes:', error);
    }
  };

  const fetchRecentlyViewedRecipes = async (userId) => {
    try {
      const response = await getRecentlyViewedRecipes(userId);
      if (Array.isArray(response.data)) {
        setRecentlyViewedRecipes(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setRecentlyViewedRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching recently viewed recipes:', error);
      setRecentlyViewedRecipes([]);
    }
  };

  const fetchSavedFavorites = async (userId) => {
    try {
      const response = await getSavedFavorites(userId);
      if (Array.isArray(response.data)) {
        setSavedFavorites(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setSavedFavorites([]);
      }
    } catch (error) {
      console.error('Error fetching saved favorites:', error);
      setSavedFavorites([]);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 h-screen sticky top-0 shadow-lg">
        <nav className="space-y-4">
          <ScrollLink to="profile" smooth={true} duration={500} className="block hover:text-yellow-400 cursor-pointer">
            User Profile
          </ScrollLink>
          <ScrollLink to="recipes" smooth={true} duration={500} className="block hover:text-yellow-400 cursor-pointer">
            User Recipes
          </ScrollLink>
          <ScrollLink to="history" smooth={true} duration={500} className="block hover:text-yellow-400 cursor-pointer">
            Recently Viewed
          </ScrollLink>
          <ScrollLink to="favorites" smooth={true} duration={500} className="block hover:text-yellow-400 cursor-pointer">
            Saved Favorites
          </ScrollLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 transition-transform transform">
        <div className="px-6 py-8">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">
            Welcome, {user.name}!
          </h2>

          {/* User Profile */}
          <Element name="profile" className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">User Profile</h3>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-700">Name: {user.name}</p>
              <p className="text-lg text-gray-700">Email: {user.email}</p>
              <Link to="/updateprofile" role='button' className="text-blue-600 hover:underline mt-4 block">Edit Profile</Link>
            </div>
          </Element>

          {/* User Recipes */}
          <Element name="recipes" className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Your Recipes</h3>
            {recipes.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {recipes.map((recipe) => (
                  <div key={recipe._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <Link to={`/recipe/${recipe._id}`} className="text-xl text-blue-600 hover:underline">
                      {recipe.name}
                    </Link>
                    <p className="text-gray-600 mt-2">{recipe.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No published recipes.</p>
            )}
          </Element>

          {/* Recently Viewed Recipes */}
          <Element name="history" className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Recently Viewed Recipes</h3>
            {recentlyViewedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {recentlyViewedRecipes.map((recipe) => (
                  <div key={recipe._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <Link to={`/recipe/${recipe._id}`} className="text-xl text-blue-600 hover:underline">
                      {recipe.name}
                    </Link>
                    <p className="text-gray-600 mt-2">{recipe.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No recently viewed recipes.</p>
            )}
          </Element>

          {/* Saved Favorites */}
          <Element name="favorites" className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Saved Favorites</h3>
            {savedFavorites.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {savedFavorites.map((recipe) => (
                  <div key={recipe._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <Link to={`/recipe/${recipe._id}`} className="text-xl text-blue-600 hover:underline">
                      {recipe.name}
                    </Link>
                    <p className="text-gray-600 mt-2">{recipe.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No saved favorite recipes.</p>
            )}
          </Element>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
