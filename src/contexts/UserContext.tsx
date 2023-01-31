import React, { createContext, useEffect, useState } from "react";

export interface IUser {
  id: number;
  email: string;
  token: string;
}

interface IUserContextProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext({
  user: {} as IUser,
  setUser: (value: IUser) => {}
});

export const UserContextProvider = ({
  children
}: IUserContextProviderProps) => {
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storageUser);
    console.log("got user from local storage!");
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
