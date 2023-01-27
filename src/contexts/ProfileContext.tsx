import React, { createContext, useEffect, useState } from "react";

export interface IProfile {
  user_id: String;
  first_name: String;
  last_name: String;
  location: String;
  occupation: String;
  gender: String;
  birthday: Date;
  profile_completed: Boolean;
}

interface IProfileContextProviderProps {
  children: React.ReactNode;
}

export const ProfileContext = createContext({
  profile: [] as IProfile[],
  setProfile: (value: IProfile[]) => {}
});

export const ProfileContextProvider = ({
  children
}: IProfileContextProviderProps) => {
  const [profile, setProfile] = useState([] as IProfile[]);

  const getProfiles = async () => {
    const response = await fetch("/api/profile");
    const data = await response.json();
    setProfile(data);
  };

  useEffect(() => {
    getProfiles();
    console.log("hi");
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
