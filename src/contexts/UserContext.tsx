import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface UserProfile {
  name: string;
  phone: string;
  age: string;
  pregnancyStatus: 'not_pregnant' | 'pregnant' | 'trying' | 'postpartum' | 'not_sure';
}

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  hasProfile: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultProfile: UserProfile = {
  name: '',
  phone: '',
  age: '',
  pregnancyStatus: 'not_sure',
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('jyothi_user_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    localStorage.setItem('jyothi_user_profile', JSON.stringify(profile));
  };

  const hasProfile = userProfile !== null && userProfile.name !== '';

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, hasProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
