import { useContext, useState } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import { UserContext } from "../contexts/UserContext";

const EditInfo = () => {
  const { user } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [location, setLocation] = useState(profile.location);
  const [occupation, setOccupation] = useState(profile.occupation);
  const [gender, setGender] = useState(profile.gender);
  const [error, setError] = useState(null);

  // Set birthday
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  const birthdate = new Date(profile.birthday);
  const birthdayYear = birthdate.getUTCFullYear();
  const birthdayMonth = months[birthdate.getUTCMonth()];
  let birthdayDay: string | number = birthdate.getUTCDate();
  birthdayDay = birthdayDay < 10 ? "0" + birthdayDay : birthdayDay;
  const [birthday, setBirthday] = useState(
    birthdayYear + "-" + birthdayMonth + "-" + birthdayDay
  );

  const createProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/profiles/info/${user.id}`, {
      method: "PATCH",
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
        birthday: new Date(birthday)
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
    <div className="flex justify-center">
      <form
        onSubmit={createProfile}
        className="flex flex-col p-10 w-full h-1/3">
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
          Update Profile Information
        </button>
        {error && (
          <div className="bg-pink-200 border-solid border-4 border-pink-300 mx-auto mt-5 p-2 w-3/5 text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditInfo;
