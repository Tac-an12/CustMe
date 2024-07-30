import React, { useState } from 'react';
import { FaHome, FaPlus, FaTasks, FaClock, FaQuestionCircle, FaSignOutAlt, FaBars, FaTimes, FaComments, FaShoppingCart, FaPencilRuler } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      <div className={`${isOpen ? 'w-64' : 'w-20'} bg-blue-600 flex flex-col items-center py-4 transition-all duration-300`}>
        <button onClick={toggleSidebar} className="text-white mb-4">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {isOpen && (
          <div className="cursor-pointer mb-4">
            <img
              src={  'https://via.placeholder.com/40'}
              alt="Profile"
              className="w-10 h-10 rounded-full mb-4"
            />
            {user && <span className="text-white text-sm">{user.username}</span>}
          </div>
        )}
        <div className="flex flex-col space-y-4 w-full px-4">
          <NavLink to="/dashboard" className="bg-blue-500 p-2 rounded text-white flex items-center">
            <FaHome className="mr-2" />
            {isOpen && <span>Dashboard</span>}
          </NavLink>
          <NavLink to="/chats" className="bg-blue-500 p-2 rounded text-white flex items-center">
            <FaComments className="mr-2" />
            {isOpen && <span>Chats</span>}
          </NavLink>
          <NavLink to="/purchases" className="bg-blue-500 p-2 rounded text-white flex items-center">
            <FaShoppingCart className="mr-2" />
            {isOpen && <span>My Purchases</span>}
          </NavLink>
          <NavLink to="/allposts" className="bg-blue-500 p-2 rounded text-white flex items-center">
            <FaPencilRuler className="mr-2" />
            {isOpen && <span>Designer</span>}
          </NavLink>
          <NavLink to="/users" className="bg-blue-500 p-2 rounded text-white flex items-center">
            <FaTasks className="mr-2" />
            {isOpen && <span>Users</span>}
          </NavLink>
          <NavLink to="/posts" className="bg-blue-500 p-2 rounded text-white flex items-center">
            <FaPlus className="mr-2" /> {/* Replacing FaQuestionCircle with FaPlus */}
            {isOpen && <span>Add post</span>} {/* Displaying "Add post" when isOpen is true */}
          </NavLink>
          <button className="bg-blue-500 p-2 rounded text-white flex items-center" onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
      <div className="flex-1">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
