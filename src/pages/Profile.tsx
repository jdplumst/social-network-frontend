import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ProfileContext, IProfile } from "../contexts/ProfileContext";

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { profile } = useContext(ProfileContext);
  const [currProfile, setCurrProfile] = useState({} as IProfile);
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
      }
    };
    if (user.token) {
      getProfile();
    }
  }, [id, user]);

  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1>This is the profile page!</h1>
          <p>
            The id is {id} {typeof id}
          </p>
          {parseInt(profile.user_id) === parseInt(id || "-1") && (
            <p>This is your own profile!</p>
          )}
          <p>{currProfile.user_id}</p>
          <p>{currProfile.first_name}</p>
          <p>{currProfile.last_name}</p>
        </div>
      )}
    </>
  );
};

export default Profile;
