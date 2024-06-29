import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Replace with your actual backend URL

// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Intercept requests to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication
export const loginUser = (email, password) => api.post('/auth/login', { email, password });
export const registerUser = (name, email, password) => api.post('/auth/register', { name, email, password });

// User profile
export const getUserById = (userId) => api.get(`/auth/${userId}`);
export const updateUser = (userId, userData) => api.put(`/auth/updateUser/${userId}`, userData);




// Saved Favorites
export const saveFavoriteRecipe = (userId, recipeId) => api.post('/auth/favorite', { userId, recipeId });
export const getSavedFavorites = (userId) => api.get(`/recipes/favorites/${userId}`);

// Recently Viewed Recipes
export const updateRecentlyViewedRecipe = (userId, recipeId) => api.post('/auth/recently-viewed', { userId, recipeId });
export const getRecentlyViewedRecipes = (userId) => api.get(`/recipes/recently-viewed/${userId}`);



// Recipes
export const getAllRecipes = (page, limit) => api.get(`/recipes/allrecipes?page=${page}&limit=${limit}`);
export const getUserRecipes = (userId) => api.get(`/recipes/userrecipes/${userId}`);
export const getRecipeById = (id) => api.get(`/recipes/${id}`);
export const addRecipe = (recipe) => api.post('/recipes/addrecipe', recipe);
export const updateRecipe = (id, updatedRecipe) => api.put(`/recipes/${id}`, updatedRecipe);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);

// Search Recipes
export const searchRecipes = (query) => api.get(`/recipes/search?query=${query}`);


// Reviews
export const addReview = (recipeId, review) => api.post(`/recipes/${recipeId}/reviews`, review);
export const updateReview = (recipeId, reviewId, updatedReview) => api.put(`/recipes/${recipeId}/reviews/${reviewId}`, updatedReview);
export const getReviews = (recipeId) => api.get(`/recipes/${recipeId}/reviews`);



export const getUserInfo = (token) => {
  return axios.get('/api/auth/userinfo', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};