import { useState } from "react";
import useLogout from "../hooks/useLogout";

const OnboardingPicture = () => {
  const [profilePicture, setProfilePicture] = useState("earth");
  const { logout } = useLogout();

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center pt-10">
      <button
        onClick={logout}
        className="absolute top-10 left-10 bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold">
        Logout
      </button>
      <div className="flex flex-col p-10 bg-white w-3/4 h-1/3">
        <h3 className="text-2xl text-center pb-5 font-bold">
          Select a Profile Picture
        </h3>
        <div className="grid grid-cols-3 gap-10 justify-items-center ">
          <img
            className={`${
              profilePicture === "earth"
                ? "border-red-500 border-solid border-8"
                : ""
            } w-full h-full`}
            onClick={() => {
              setProfilePicture("earth");
            }}
            src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            alt="earth"
          />
          <img
            className={`${
              profilePicture === "tree"
                ? "border-red-500 border-solid border-8"
                : ""
            } w-full h-full`}
            onClick={() => {
              setProfilePicture("tree");
            }}
            src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="tree"
          />
          <img
            className={`${
              profilePicture === "mario"
                ? "border-red-500 border-solid border-8"
                : ""
            } w-full h-full`}
            onClick={() => {
              setProfilePicture("mario");
            }}
            src="https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt="mario"
          />
          <img
            className={`${
              profilePicture === "dog"
                ? "border-red-500 border-solid border-8"
                : ""
            } w-full h-full`}
            onClick={() => {
              setProfilePicture("dog");
            }}
            src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="dog"
          />
          <img
            className={`${
              profilePicture === "ball"
                ? "border-red-500 border-solid border-8"
                : ""
            } w-full h-full`}
            onClick={() => {
              setProfilePicture("ball");
            }}
            src="https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80"
            alt="ball"
          />
          <img
            className={`${
              profilePicture === "car"
                ? "border-red-500 border-solid border-8"
                : ""
            } w-full h-full`}
            onClick={() => {
              setProfilePicture("car");
            }}
            src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="car"
          />
        </div>
        <button className="bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold w-1/4 mx-auto mt-10">
          Finish Signup
        </button>
      </div>
    </div>
  );
};

export default OnboardingPicture;

// https://unsplash.com/photos/vhSz50AaFAs earth
// https://unsplash.com/photos/S297j2CsdlM tree
// https://unsplash.com/photos/HUyICL8qbEE mario
// https://unsplash.com/photos/N04FIfHhv_k dog
// https://unsplash.com/photos/F3M8FmvWQo4 ball
// https://unsplash.com/photos/GRV4ypBKgxE car
