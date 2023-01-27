import React, { createContext, useEffect, useState } from "react";

interface IUser {
  email: String;
  token: String;
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
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user !== "null") {
      setUser(user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
