import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUserById, updateUser } from '../api/api';

function UserProfile({ showAlert }) {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.user.id;
      fetchUser(userId);
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await getUserById(userId);
      setUser(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };


  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setFormData({
      name: user.name,
      email: user.email,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user._id, formData);
      setEditMode(false);
      setUser((prevUser) => ({
        ...prevUser,
        name: formData.name,
        email: formData.email,
      }));
      showAlert('success', 'User details updated successfully')
    } catch (error) {
      console.error('Error updating user:', error);
      showAlert('success', 'Failed to update user details')
    }
  };



  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 transition-transform transform">
      <div className="px-6 py-4">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900 border-b-2 border-gray-200 pb-2 text-center">
          {user.name}'s Profile
        </h2>
        {!editMode ? (
          <div>
            <p className="text-gray-600 mb-4">Name: {user.name}</p>
            <p className="text-gray-600 mb-4">Email: {user.email}</p>
            <button
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-800">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-800">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Save Changes</button>
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={handleCancelEdit}>Cancel</button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}

export default UserProfile;
