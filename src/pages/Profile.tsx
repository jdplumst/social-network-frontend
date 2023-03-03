import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ProfileContext, IProfile } from "../contexts/ProfileContext";
import Navbar from "../components/Navbar";
import useGetProfiles from "../hooks/useGetProfiles";

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { profile } = useContext(ProfileContext);
  const { getProfiles } = useGetProfiles();
  const [currProfile, setCurrProfile] = useState({} as IProfile);
  const [following, setFollowing] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(`/api/profiles/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else if (!data) {
        setError("No such profile");
      } else {
        setError(null);
        setCurrProfile(data);
        console.log("fetched profile!");
      }
    };
    if (user.token) {
      getProfile();
      getProfiles();
    }
  }, [id, user]);

  return (
    <div>
      <Navbar />
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="flex flex-col items-center bg-slate-300 min-h-screen">
          <div className="p-5">
            <img
              src={currProfile.profile_picture}
              alt="pic"
              className="w-52 h-52 inline mx-2"
            />
          </div>
          <div className="bg-white min-w-1/2 border-2 border-black">
            <h3 className="text-3xl font-bold text-center">
              {currProfile.first_name} {currProfile.last_name}
            </h3>
            <div className="grid grid-cols-3 p-5 gap-5">
              <p>
                <strong>Location: </strong>
                {currProfile.location}
              </p>
              <p>
                <strong>Occupation: </strong>
                {currProfile.occupation}
              </p>
              <p>
                <strong>Followers: </strong>0
              </p>
              <p>
                <strong>Gender: </strong>
                {currProfile.gender}
              </p>
              <p>
                <strong>Birthday: </strong>{" "}
                {new Date(currProfile.birthday).toLocaleDateString()}
              </p>
              <p>
                <strong>Following: </strong>0
              </p>
            </div>
            {profile.user_id !== currProfile.user_id && (
              <div className="flex justify-center pb-5">
                <button
                  className={`hover:cursor-pointer ${
                    following
                      ? `bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500 hover:bg-gradient-to-tr hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700`
                      : `bg-purple-500 hover:bg-purple-700`
                  } text-white px-2 py-1 rounded-lg font-bold w-1/5`}>
                  {following ? `Following` : `Follow`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
