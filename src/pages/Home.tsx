import { useEffect } from "react";
import useGetProfiles from "../hooks/useGetProfiles";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const { logout } = useLogout();
  const { getProfiles } = useGetProfiles();

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div>
      <h1>This is the Home page!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
