import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

function Login({ onLogin, showAlert }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      onLogin(user);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      showAlert('error', 'Login Failed');
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-4">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-800">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-800">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </form>
          <p className="text-gray-800 text-center mt-4">
            Don't have an account? <Link to="/signup" className="text-purple-600 hover:underline">Signup</Link>
          </p>        
        </div>
      </div>
    </div>
  );
}

export default Login;