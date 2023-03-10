import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import { UserContext } from "../contexts/UserContext";
import useLogout from "../hooks/useLogout";
import Loading from "./Loading";

const OnboardingInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { setProfile } = useContext(ProfileContext);
  const { logout } = useLogout();

  useEffect(() => {
    setLoading(false);
  }, []);

  const createProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        location: location,
        occupation: occupation,
        gender: gender,
        birthday: birthday
      })
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
    <>
      {loading ? (
        <Loading />
      ) : (
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
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
              <div>
                <label className="font-bold">Last Name:</label>
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
              <div>
                <label className="font-bold">Location:</label>
                <input
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
              <div>
                <label className="font-bold">Occupation:</label>
                <input
                  type="text"
                  onChange={(e) => setOccupation(e.target.value)}
                  value={occupation}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
              <div>
                <label className="font-bold">Gender:</label>
                <input
                  type="text"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
              <div>
                <label className="font-bold">Birthday:</label>
                <input
                  type="date"
                  onChange={(e) => setBirthday(e.target.value)}
                  value={birthday}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
            </div>
            <button className="bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold w-1/4 mx-auto mt-10">
              Next
            </button>
            {error && (
              <div className="bg-pink-200 border-solid border-4 border-pink-300 mx-auto mt-5 p-2 w-3/5 text-center">
                {error}
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default OnboardingInfo;
