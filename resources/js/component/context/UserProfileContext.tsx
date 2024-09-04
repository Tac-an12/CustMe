import React, { createContext, useContext, useState, useCallback } from 'react';
import apiService from '../services/apiService';
import { useAuth } from './AuthContext'; // Import AuthContext

// Define Personal Information interface
interface PersonalInformation {
  firstname: string;
  lastname: string;
  profilepicture: string | null;
  coverphoto: string | null;
  zipcode: string;
}

// Define UserProfile interface
interface UserProfile {
  id: number;
  username: string;
  email: string;
  verified: boolean;
  personalInformation: PersonalInformation | null;
}

// Define UserProfileContextProps interface
interface UserProfileContextProps {
  userProfile: UserProfile | null;
  fetchUserProfile: () => Promise<void>;
}

// Create UserProfileContext
const UserProfileContext = createContext<UserProfileContextProps | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { user } = useAuth(); // Use the Auth context to get the current user

  const fetchUserProfile = useCallback(async () => {
    if (!user) return; // Check if user is authenticated

    try {
      const response = await apiService.get(`/users/${user.id}/profile`);
      const fetchedData = response.data;

      // Debugging: Log the fetched data
      console.log('Fetched UserProfile Data:', fetchedData);

      // Ensure the data is correctly structured
      if (fetchedData && fetchedData.user && fetchedData.user.personal_information) {
        const profileData: UserProfile = {
          id: fetchedData.user.id,
          username: fetchedData.user.username,
          email: fetchedData.user.email,
          verified: fetchedData.user.verified === 1,
          personalInformation: {
            firstname: fetchedData.user.personal_information.firstname,
            lastname: fetchedData.user.personal_information.lastname,
            profilepicture: fetchedData.user.personal_information.profilepicture || null,
            coverphoto: fetchedData.user.personal_information.coverphoto || null,
            zipcode: fetchedData.user.personal_information.zipcode,
          },
        };

        setUserProfile(profileData);
      } else {
        console.warn('No personal information available for user profile');
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUserProfile(null);
    }
  }, [user]);

  return (
    <UserProfileContext.Provider value={{ userProfile, fetchUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Custom hook to use the UserProfileContext
export const useUserProfile = (): UserProfileContextProps => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
