import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import { useUserProfile } from '../../../context/UserProfileContext';

const UserProfileForm: React.FC = () => {
  const { userProfile, fetchUserProfile } = useUserProfile();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Start loading when fetching data
    setLoading(true);
    fetchUserProfile()
      .then(() => {
        // Stop loading after data is fetched
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors and stop loading
        console.error('Error fetching user profile:', error);
        setLoading(false);
      });
  }, [fetchUserProfile]);

  // Extract personal information if available
  const personalInformation = userProfile?.personalInformation;

  // Construct image URLs
  const coverPhotoUrl = personalInformation?.coverphoto
    ? `http://127.0.0.1:8000/${personalInformation.coverphoto}`
    : null;
  const profilePictureUrl = personalInformation?.profilepicture
    ? `http://127.0.0.1:8000/${personalInformation.profilepicture}`
    : null;

  // Log the image URLs for debugging
  console.log('Cover Photo URL:', coverPhotoUrl);
  console.log('Profile Picture URL:', profilePictureUrl);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="p-4 overflow-auto">
          {/* Display loading indicator if data is still loading */}
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-dots loading-xs"></span>
            </div>
          ) : (
            <div className="relative bg-white shadow-md rounded-lg">
              {/* Render Cover Photo */}
              {coverPhotoUrl ? (
                <img
                  src={coverPhotoUrl}
                  alt="Cover Photo"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
                  <span>No Cover Photo Available</span>
                </div>
              )}
              <div className="absolute bottom-0 left-4 flex items-center">
                {/* Render Profile Picture */}
                {profilePictureUrl ? (
                  <img
                    src={profilePictureUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white -mb-12 shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white -mb-12 bg-gray-200 flex items-center justify-center shadow-lg">
                    <span>No Profile Picture Available</span>
                  </div>
                )}
                <h2 className="text-2xl font-bold text-black ml-4">
                  {personalInformation?.firstname} {personalInformation?.lastname}
                </h2>
              </div>
            </div>
          )}
          {/* Additional Profile Information */}

        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
