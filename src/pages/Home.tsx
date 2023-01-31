import { useEffect } from "react";
import FriendsList from "../components/FriendsList";
import Navbar from "../components/Navbar";
import useGetProfiles from "../hooks/useGetProfiles";

const Home = () => {
  const { getProfiles } = useGetProfiles();

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="grid grid-cols-4 gap-5 h-4/5 mx-5 mt-5">
        <FriendsList />
        <div className="col-span-2 border-2">Posts!</div>
        <div className="col-span-1 border-2">Suggestions!</div>
      </div>
    </div>
  );
};

export default Home;
