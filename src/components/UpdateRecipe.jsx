import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../api/api'; // Adjust the path to your API functions

function UpdateRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: [],
    instructions: []
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipeById(id);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value
    });
  };

  const handleArrayChange = (e, index, arrayName) => {
    const newArray = [...recipe[arrayName]];
    newArray[index] = e.target.value;
    setRecipe({
      ...recipe,
      [arrayName]: newArray
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecipe(id, recipe);
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const addArrayElement = (arrayName) => {
    setRecipe({
      ...recipe,
      [arrayName]: [...recipe[arrayName], '']
    });
  };

  const removeArrayElement = (index, arrayName) => {
    const newArray = recipe[arrayName].filter((_, i) => i !== index);
    setRecipe({
      ...recipe,
      [arrayName]: newArray
    });
  };

  return (
    <div className="max-w-4xl mx-auto shadow-2xl rounded-3xl overflow-hidden my-8 p-6">
        <h2 className="text-4xl font-extrabold mb-10 text-gray-800 text-center">Update Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={recipe.name}
                onChange={handleChange}
                className="mt-2 p-4 border border-gray-300 rounded-lg shadow-lg focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition duration-200"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={recipe.description}
                onChange={handleChange}
                className="mt-2 p-4 border border-gray-300 rounded-lg shadow-lg focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition duration-200 h-32"
              />
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-4">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange(e, index, 'ingredients')}
                  className="flex-grow mt-2 p-4 border border-gray-300 rounded-lg shadow-lg focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition duration-200"
                />
                <button
                  type="button"
                  onClick={() => removeArrayElement(index, 'ingredients')}
                  className="ml-4 text-red-600 hover:text-red-800 transition duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayElement('ingredients')}
              className="text-blue-600 hover:text-blue-800 transition duration-200"
            >
              Add Ingredient
            </button>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-4">Instructions</label>
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) => handleArrayChange(e, index, 'instructions')}
                  className="flex-grow mt-2 p-4 border border-gray-300 rounded-lg shadow-lg focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition duration-200"
                />
                <button
                  type="button"
                  onClick={() => removeArrayElement(index, 'instructions')}
                  className="ml-4 text-red-600 hover:text-red-800 transition duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayElement('instructions')}
              className="text-blue-600 hover:text-blue-800 transition duration-200"
            >
              Add Instruction
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white py-4 px-6 rounded-lg  transition duration-300 transform hover:scale-105"
          >
            Update Recipe
          </button>
        </form>
      </div>
  );
}

export default UpdateRecipe;
