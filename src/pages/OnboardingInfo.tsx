import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import useLogout from "../hooks/useLogout";

const OnboardingInfo = () => {
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const { logout } = useLogout();

  const createProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        first_name: " ",
        last_name: " ",
        location: " ",
        occupation: " ",
        gender: " ",
        birthday: new Date()
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      setError(null);
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center pt-10">
      <button
        onClick={logout}
        className="absolute top-10 left-10 bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold">
        Logout
      </button>
      <form
        onSubmit={createProfile}
        className="flex flex-col p-10 bg-white w-1/2 h-1/3">
        <h3 className="text-2xl text-center pb-5 font-bold">
          Profile Information
        </h3>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="font-bold">First Name:</label>
            <input
              type="text"
              className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
            />
          </div>
          <div>
            <label className="font-bold">Last Name:</label>
            <input
              type="text"
              className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
            />
          </div>
          <div>
            <label className="font-bold">Location:</label>
            <input
              type="text"
              className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
            />
          </div>
          <div>
            <label className="font-bold">Occupation:</label>
            <input
              type="text"
              className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
            />
          </div>
          <div>
            <label className="font-bold">Gender:</label>
            <input
              type="text"
              className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
            />
          </div>
          <div>
            <label className="font-bold">Birthday:</label>
            <input
              type="date"
              className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
            />
          </div>
        </div>
        <button className="bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold w-1/4 mx-auto mt-10">
          Next
        </button>
      </form>
    </div>
  );
};

export default OnboardingInfo;
