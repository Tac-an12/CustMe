import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaTasks, FaSignOutAlt, FaBars, FaTimes, FaComments, FaShoppingCart, FaPencilRuler } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('https://via.placeholder.com/40');

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

  const updateProfilePictureUrl = (user: any) => {
    if (user && user.personal_information && user.personal_information.profilepicture) {
      const imageUrl = `http://127.0.0.1:8000/${user.personal_information.profilepicture}?user_id=${user.id}&personal_info_id=${user.personal_information.id}`;
      setProfilePictureUrl(imageUrl);
      console.log('Profile Picture URL:', imageUrl); 
    } else {
      setProfilePictureUrl('https://via.placeholder.com/40');
    }
  };

  useEffect(() => {
    updateProfilePictureUrl(user);
  }, [user]);

  return (
    <div className="flex h-screen">
      <div className={`${isOpen ? 'w-64' : 'w-20'} bg-blue-600 flex flex-col items-center py-4 transition-all duration-300`}>
        <button onClick={toggleSidebar} className="text-white mb-4">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {isOpen && (
          <div className="cursor-pointer mb-4">
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-12 h-12 rounded-full mb-4" // Increased size for a bigger circle
            />
            {user && (
              <NavLink to={`/users/${user.id}/profile`} className="text-white text-sm hover:underline">
                {user.username}
              </NavLink>
            )}
          </div>
        )}
        <div className="flex flex-col space-y-4 w-full px-4 mt-4"> {/* Added margin-top to move links down */}
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
            <FaPlus className="mr-2" />
            {isOpen && <span>Add post</span>}
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
