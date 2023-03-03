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
          <p>The id is {id}</p>
        </div>
      )}
    </>
  );
};

export default Profile;
