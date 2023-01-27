import React, { createContext, useState } from "react";

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
