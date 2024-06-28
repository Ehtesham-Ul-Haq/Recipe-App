import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="mb-8">
          <p className="text-lg mb-4">
            Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, <a href="/" className="text-blue-600 hover:underline">Recipe Radiance</a>, and other sites we own and operate.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">1. Information we collect</h2>
          <p className="text-lg mb-4">
            We only collect information about you if we have a reason to do so – for example, to provide our Services, to communicate with you, or to make our Services better.
          </p>
          <p className="text-lg mb-4">
            We collect information in three ways: if and when you provide information to us, automatically through operating our services, and from outside sources. Let’s go over the information that we collect.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">2. How we use information</h2>
          <p className="text-lg mb-4">
            We use information about you as mentioned above and for the purposes listed below:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li className="text-lg mb-2">To provide our Services – for example, to set up and maintain your account, or charge you for any of our paid Services;</li>
            <li className="text-lg mb-2">To further develop and improve our Services – for example by adding new features that we think our users will enjoy or will help them to create and manage their accounts more efficiently;</li>
            <li className="text-lg mb-2">To monitor and analyze trends and better understand how users interact with our Services, which helps us improve our Services and make them easier to use;</li>
            <li className="text-lg mb-2">To monitor and protect the security of our Services, detect and prevent fraudulent transactions and other illegal activities, fight spam, and protect the rights and property of Recipe App and others;</li>
            <li className="text-lg mb-2">To communicate with you – for example through an email, about offers and promotions offered by Recipe App and others we think will be of interest to you, solicit your feedback, or keep you up to date on Recipe App and our products; and</li>
            <li className="text-lg mb-2">To personalize your experience using our Services, provide content recommendations and serve relevant advertisements.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">3. Sharing Information</h2>
          <p className="text-lg mb-4">
            We do not share, sell, rent, or trade User Personal Information with third parties for commercial purposes.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">4. Data Security</h2>
          <p className="text-lg mb-4">
            We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">5. Contact Us</h2>
          <p className="text-lg mb-4">
            If you have any questions about our privacy practices or the way we handle your personal information, please contact us at <a href="mailto:info@yourcompany.com" className="text-blue-600 hover:underline">info@yourcompany.com</a>.
          </p>
          <p className="text-lg mb-4">
            This policy is effective as of 15 June 2024.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
