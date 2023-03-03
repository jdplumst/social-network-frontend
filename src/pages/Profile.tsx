import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>This is the profile page!</h1>
      <p>The id is {id}</p>
    </div>
  );
};

export default Profile;
