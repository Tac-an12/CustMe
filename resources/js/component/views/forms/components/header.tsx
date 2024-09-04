import React from 'react';
import NotificationsDropdown from '../components/NotificationsDropDown'; 

const Header: React.FC = () => {
  return (
    <div className="bg-white py-4 px-8 flex justify-between items-center border-b">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-yellow-500">
          <span className="text-blue-600">Cust</span>Me
        </h1>
        <h1 className="text-2xl font-bold text-black ml-6">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <NotificationsDropdown />
      </div>
    </div>
  );
};

export default Header;
