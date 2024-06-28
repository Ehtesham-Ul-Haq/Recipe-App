import React, { useState } from 'react';
import { addRecipe } from '../api/api';

function RecipeForm({ onRecipeAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      name,
      description,
      ingredients: ingredients.split(',').map((item) => item.trim()),
      instructions: instructions.split('.').map((item) => item.trim()),
    };
    try {
      const response = await addRecipe(newRecipe);
      onRecipeAdded(response.data);
      setName('');
      setDescription('');
      setIngredients('');
      setInstructions('');
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md overflow-hidden mt-4">
      <h2 className="text-xl font-bold mb-4">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ingredients (comma separated)</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Instructions (separated by periods)</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
