import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProfileContext } from "../contexts/ProfileContext";

const useGetProfiles = () => {
  const { user } = useContext(UserContext);
  const { setProfiles } = useContext(ProfileContext);

  const getProfiles = async () => {
    const response = await fetch("/api/profiles", {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    const data = await response.json();
    setProfiles(data);
    console.log("fetched all profiles!");
  };

  return { getProfiles };
};

export default useGetProfiles;
