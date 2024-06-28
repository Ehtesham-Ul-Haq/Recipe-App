import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">About Our Recipe Site</h1>
      <p className="text-gray-700 text-lg mb-6">
        Welcome to our Recipe site! Our platform is dedicated to bringing you the best culinary experiences by providing a vast collection of recipes from around the world. Whether you're a novice cook or an experienced chef, you'll find something to inspire your next meal.
      </p>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Importance</h2>
          <p className="text-gray-600">
            We believe in the power of cooking to bring people together. Our recipes are carefully curated to ensure you have the best experience in the kitchen. Each recipe is tested and approved by our team of culinary experts to guarantee delicious results every time.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Wide variety of recipes from different cuisines</li>
            <li>Step-by-step cooking instructions</li>
            <li>User-friendly interface</li>
            <li>Search functionality to easily find recipes</li>
            <li>Personalized recipe recommendations</li>
            <li>Ability to save your favorite recipes</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Utilities</h2>
          <p className="text-gray-600">
            Our site is equipped with numerous utilities to enhance your cooking experience. From ingredient substitutions to cooking tips and tricks, we've got you covered. Our community section allows you to share your own recipes and connect with other food enthusiasts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
