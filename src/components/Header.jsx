import React from 'react';
import Navbar from './Navbar';

function Header({ isLoggedIn, onLogout, showAlert }) {
  return (
    <header>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} showAlert={showAlert} />
    </header>
  );
}

export default Header;
