import React from 'react';
import { FaBell } from 'react-icons/fa';
import NotificationsDropdown from '../components/NotificationsDropDown'; // Make sure the import path is correct

const header: React.FC = () => {
  return (
    <div className="bg-blue-600 py-4 px-8 flex justify-between items-center border-b">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <div className="flex space-x-4">
        <NotificationsDropdown />
      </div>
    </div>
  );
};

export default header;
