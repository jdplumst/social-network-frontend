import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser, UserContext } from "./UserContext";

export interface IProfile {
  user_id: string;
  first_name: string;
  last_name: string;
  location: string;
  occupation: string;
  gender: string;
  birthday: Date;
  profile_picture: string;
  profile_completed: boolean;
}

interface IProfileContextProviderProps {
  children: React.ReactNode;
}

export const ProfileContext = createContext({
  profiles: [] as IProfile[],
  setProfiles: (value: IProfile[]) => {},
  profile: {} as IProfile,
  setProfile: (value: IProfile) => {}
});

export const ProfileContextProvider = ({
  children
}: IProfileContextProviderProps) => {
  const [profiles, setProfiles] = useState([] as IProfile[]);
  const [profile, setProfile] = useState({} as IProfile);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(`/api/profile/${user.id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await response.json();
      if (!response.ok) {
        setUser({} as IUser);
        localStorage.removeItem("user");
      } else {
        setProfile(data);
        console.log("fetched profile!");
      }
    };

    if (user.token) {
      getProfile();
    }
  }, [user, setUser]);

  return (
    <ProfileContext.Provider
      value={{ profiles, setProfiles, profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
