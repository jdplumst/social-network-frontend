import { profile } from "console";
import { useContext, useState } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import { UserContext } from "../contexts/UserContext";

const EditPicture = () => {
  const { user } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const [profilePicture, setProfilePicture] = useState(profile.profile_picture);
  const [error, setError] = useState(null);

  const finishOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/profiles/picture/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({ profile_picture: profilePicture })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      setError(null);
      setProfile(data);
    }
  };

  return (
    <div className="flex flex-col pt-10">
      <h3 className="text-2xl text-center pb-5 font-bold">
        Select a Profile Picture
      </h3>
      <div className="grid grid-cols-3 gap-10 justify-items-center">
        <div
          className={`${
            profilePicture ===
            "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              ? "border-red-500 border-solid border-8"
              : "border-white border-solid border-8"
          } w-44 h-44`}>
          <img
            className="w-40 h-40"
            onClick={() => {
              setProfilePicture(
                "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              );
            }}
            src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            alt="earth"
          />
        </div>
        <div
          className={`${
            profilePicture ===
            "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              ? "border-red-500 border-solid border-8"
              : "border-white border-solid border-8"
          } w-44 h-44`}>
          <img
            className="w-40 h-40"
            onClick={() => {
              setProfilePicture(
                "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              );
            }}
            src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="tree"
          />
        </div>
        <div
          className={`${
            profilePicture ===
            "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
              ? "border-red-500 border-solid border-8"
              : "border-white border-solid border-8"
          } w-44 h-44`}>
          <img
            className="w-40 h-40"
            onClick={() => {
              setProfilePicture(
                "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
              );
            }}
            src="https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt="mario"
          />
        </div>
        <div
          className={`${
            profilePicture ===
            "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              ? "border-red-500 border-solid border-8"
              : "border-white border-solid border-8"
          } w-44 h-44`}>
          <img
            className="w-40 h-40"
            onClick={() => {
              setProfilePicture(
                "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              );
            }}
            src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="dog"
          />
        </div>
        <div
          className={`${
            profilePicture ===
            "https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80"
              ? "border-red-500 border-solid border-8"
              : "border-white border-solid border-8"
          } w-44 h-44`}>
          <img
            className="w-40 h-40"
            onClick={() => {
              setProfilePicture(
                "https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80"
              );
            }}
            src="https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80"
            alt="ball"
          />
        </div>
        <div
          className={`${
            profilePicture ===
            "https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              ? "border-red-500 border-solid border-8"
              : "border-white border-solid border-8"
          } w-44 h-44`}>
          <img
            className="w-40 h-40"
            onClick={() => {
              setProfilePicture(
                "https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              );
            }}
            src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="car"
          />
        </div>
      </div>
      <button
        onClick={finishOnboarding}
        className="bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold w-1/4 mx-auto mt-10">
        Finish Signup
      </button>
      {error && (
        <div className="bg-pink-200 border-solid border-4 border-pink-300 mx-auto mt-5 p-2 w-3/5 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default EditPicture;
