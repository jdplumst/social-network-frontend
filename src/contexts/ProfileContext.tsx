import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

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
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getProfiles = async () => {
      const response = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await response.json();
      setProfiles(data);
    };

    if (user.token) {
      getProfiles();
      console.log("Fetched all profiles!");
    }
  }, [user, profile]);

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(`/api/profile/${user.id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await response.json();
      setProfile(data);
    };

    if (user.token) {
      getProfile();
      console.log("Fetched user profile!");
      console.log(user.id);
    }
  }, [user]);

  return (
    <ProfileContext.Provider
      value={{ profiles, setProfiles, profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
