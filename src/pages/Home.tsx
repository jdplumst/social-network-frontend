import { useEffect } from "react";
import Navbar from "../components/Navbar";
import useGetProfiles from "../hooks/useGetProfiles";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const { getProfiles } = useGetProfiles();

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
