import React, { useState } from 'react';
import emailjs from 'emailjs-com';


function Contact(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    // Clear any previous errors
    setError(null);

    // Prepare the data to be sent
    const templateParams = {
      name,
      from_email: email,
      message,
    };

    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual EmailJS details
    emailjs.send(  import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_USER_ID
    )
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setSubmitted(true);
        props.showAlert('success', 'Message Sent Successfully!');
      })
      .catch((error) => {
        console.error('Failed to send email.', error);
        setError('There was a problem submitting your form. Please try again later.');
      });
    };




  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">Contact Us</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Get in Touch</h2>
          <p className="text-gray-600">
            Have questions, feedback, or suggestions? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        {submitted ? (
        <p className="success-message">Thank you for your message. We will get back to you shortly!</p>
      ) : (

        <form className="space-y-4" onSubmit={handleSubmit}>
              {error && <p className="error-message">{error}</p>}
          <div>
            <label htmlFor="name" className="block text-gray-800">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
                    className="w-full border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-800">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-800">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
                    rows="4"
              className="w-full border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Message
          </button>
        </form>
      )}
      </div>
    </div>
  );
}

export default Contact;


