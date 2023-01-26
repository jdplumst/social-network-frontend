import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="flex flex-col justify-evenly items-center min-h-screen bg-slate-300">
      <h1 className="text-8xl">Social Network</h1>
      <div className="flex">
        <Link to="/login">
          <button className="text-4xl mr-32 bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold">
            Log In
          </button>
        </Link>
        <Link to="/signup">
          <button className="text-4xl bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;
