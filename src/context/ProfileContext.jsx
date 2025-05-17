import React, { createContext, useContext } from "react";
import { useProfile as useProfileHook } from "../hooks/useProfile";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const profile = useProfileHook(); // panggil hanya sekali di sini
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook biar pemanggilan gampang
export const useProfile = () => {
  return useContext(ProfileContext);
};
