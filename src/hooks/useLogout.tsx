import { useContext } from "react";
import { UserContext, IUser } from "../contexts/UserContext";
import { ProfileContext, IProfile } from "../contexts/ProfileContext";

const useLogout = () => {
  const { setUser } = useContext(UserContext);
  const { setProfile } = useContext(ProfileContext);

  const logout = () => {
    localStorage.removeItem("user");
    setUser({} as IUser);
    setProfile({} as IProfile);
  };

  return { logout };
};

export default useLogout;
