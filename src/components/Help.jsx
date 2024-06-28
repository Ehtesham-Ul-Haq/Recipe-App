import React, { useState } from 'react';

function Help() {
  const [faqList, setFaqList] = useState([
    { question: 'How do I add a recipe?', answer: 'To add a recipe, navigate to the Recipe Form and fill in the required details.' },
    { question: 'Can I edit or delete my recipes?', answer: 'Yes, you can edit or delete your recipes from the recipe list page.' },
    { question: 'How do I search for recipes?', answer: 'Use the search bar located at the top of the page to search for recipes by name or ingredient.' },
    { question: 'Is there a way to save my favorite recipes?', answer: 'Currently, saving favorite recipes is not supported, but it is on our roadmap for future updates.' },
    { question: 'How can I contact support?', answer: 'For support inquiries, please email support@example.com.' },
  ]);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse if clicked again
    } else {
      setExpandedIndex(index); // Expand clicked question
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">Help & Support</h1>
      <div className="space-y-6">
        {faqList.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h2 className="text-2xl font-semibold text-gray-800">{faq.question}</h2>
              <svg
                className={`h-6 w-6 ${expandedIndex === index ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {expandedIndex === index && (
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Help;
