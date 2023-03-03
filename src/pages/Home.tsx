import { useEffect, useState } from "react";
import FriendsList from "../components/FriendsList";
import Navbar from "../components/Navbar";
import PostsList from "../components/PostsList";
import useGetProfiles from "../hooks/useGetProfiles";
import Loading from "./Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { getProfiles } = useGetProfiles();

  useEffect(() => {
    getProfiles();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-screen bg-slate-300">
          <Navbar />
          <div className="grid grid-cols-3 gap-5 h-4/5 mx-5 mt-3">
            <FriendsList />
            <PostsList />
            {/* <div className="col-span-1 bg-white rounded-lg">Suggestions!</div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
