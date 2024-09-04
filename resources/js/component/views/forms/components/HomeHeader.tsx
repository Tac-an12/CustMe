import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-yellow-500">
          <span className="text-blue-600">Cust</span>Me
        </h1>
        <div className="flex items-center space-x-4">
          <nav className="flex space-x-4">
            <NavLink to="/" className="text-black hover:text-yellow-500">Home</NavLink>
            <NavLink to="/about" className="text-black hover:text-yellow-500">About</NavLink>
            <NavLink to="/services" className="text-black hover:text-yellow-500">Services</NavLink>
          </nav>
          <NavLink to="/login" className="bg-yellow-500 text-white px-4 py-2 rounded">Sign in</NavLink>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
