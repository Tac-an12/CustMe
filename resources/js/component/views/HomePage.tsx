import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from './forms/components/HomeHeader';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register?role=2');
  };

  const handleJoin = () => {
    navigate('/join');
  };

  return (
    <div className="bg-white min-h-screen">
      <HomeHeader />
      <section className="flex flex-col items-center justify-center py-20 bg-white text-black">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="text-center md:text-center md:w-1/2 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Personalize Your World with<br />CustMe</h1>
            <p className="text-lg mb-8">Connect designer and printing providers</p>
            <div className="flex space-x-4 justify-center">
              <button onClick={handleSignUp} className="bg-yellow-500 text-white px-4 py-2 rounded">Sign up</button>
              <button onClick={handleJoin} className="bg-gray-300 text-black px-4 py-2 rounded">Join</button>
            </div>
          </div>
          <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
            <img src="/storage/images/CustMe_Image.png" alt="Hero" className="w-full h-auto md:w-96" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
