import { useContext } from "react";
import { UserContext, IUser } from "../contexts/UserContext";

const useLogout = () => {
  const { setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("user");
    setUser({} as IUser);
  };

  return { logout };
};

export default useLogout;
