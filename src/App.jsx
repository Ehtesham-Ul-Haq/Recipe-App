import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from './i18n'; // Import i18n instance
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import About from './components/About';
import Contact from './components/Contact';
import Help from './components/Help';
import Login from './components/Login';
import Signup from './components/Signup';
import Recipe from './components/Recipe'; 
import ErrorPage from './components/ErrorPage'; 
import UpdateRecipe from './components/UpdateRecipe';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import UserDashboard from './components/UserDashboard';
import UpdateProfile from './components/UpdateProfile';
import SearchResult from './components/SearchResult';
import Alert from './components/Alert'; // Import the Alert component
import { Tooltip } from 'react-tooltip';

function App() {
  const { i18n } = useTranslation(); // Initialize useTranslation hook
  
  const [recipes, setRecipes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    showAlert('success', 'Successfully logged in!');

  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/login');
    showAlert('info', 'Logged out successfully.');

  };
  
  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
    showAlert('success', 'Recipe added successfully!');

  };

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };



  const showAlert = (type, message) => {
    const id = Date.now();
    setAlerts((alerts) => [...alerts, { id, type, message }]);

    setTimeout(() => {
      setAlerts((alerts) => alerts.filter(alert => alert.id !== id));
    }, 5000); // Alert duration
  };



  return (
    <I18nextProvider i18n={i18n}> {/* Wrap your app with I18nextProvider */}
    <div className="App">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} showAlert={showAlert} />
      <div className="container mx-auto">

      {alerts.map(alert => (
          <Alert key={alert.id} type={alert.type} message={alert.message} duration={5000} />
        ))}
                
        <Routes>
          <Route exact path="/" element={<RecipeList recipes={recipes} />} />
          <Route exact path="/addrecipe" element={<PrivateRoute><RecipeForm onRecipeAdded={addRecipe} showAlert={showAlert} /></PrivateRoute>} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact showAlert={showAlert} />} />
          <Route exact path="/help" element={<Help />} />
          <Route exact path="/login" element={<Login onLogin={handleLogin} showAlert={showAlert} />} />
          <Route exact path="/signup" element={<Signup onLogin={handleLogin} showAlert={showAlert} />} />
          <Route exact path="/recipe/:id" element={<Recipe isLoggedIn={isLoggedIn} currentUser={currentUser} showAlert={showAlert} />} />
          <Route exact path="/update-recipe/:id" element={<PrivateRoute><UpdateRecipe showAlert={showAlert} /></PrivateRoute>} />
          <Route exact path="/privacy" element={<PrivacyPolicy />} />
          <Route exact path="*" element={<ErrorPage />} />
          <Route exact path="/userdashboard" element={<UserDashboard />} />
          <Route exact path="/updateprofile" element={<UpdateProfile showAlert={showAlert} />} />
          <Route exact path="/search" element={<SearchResult />} />

        </Routes>      
      </div>
      <Tooltip id="my-tooltip" /> {/* Render ReactTooltip */}
      <Footer />
    </div>
    </I18nextProvider>
  );
}

export default App;
