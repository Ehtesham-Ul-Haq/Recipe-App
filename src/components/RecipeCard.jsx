import React from 'react';

function RecipeCard({ recipe }) {
    return (
        <div className="max-w-sm w-full sm:w-64 md:w-80 lg:w-96 h-72 sm:h-80 md:h-72 bg-white shadow-lg rounded-lg overflow-hidden my-4 transition-transform transform hover:scale-105">
            {/* Recipe Details */}
            <div className="px-6 py-4 h-full overflow-hidden">
                <h2 className="text-3xl font-extrabold mb-2 text-gray-900 border-b-2 border-gray-200 pb-2 text-center">{recipe.name}</h2>
                <p className="text-gray-600 mb-6 italic">{recipe.description}</p>
                <p className="text-purple-600 mb-6 italic"><i className="fa-solid fa-at mr-1"></i>{recipe.user.name}</p>
            </div>
        </div>
    );
}

export default RecipeCard;
