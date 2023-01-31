import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../contexts/ProfileContext";
import useLogout from "../hooks/useLogout";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const { logout } = useLogout();
  const { profile, profiles } = useContext(ProfileContext);

  const toggleDropdown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("picture") && !dropdown) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  };

  document.addEventListener("click", toggleDropdown);

  return (
    <nav className="relative h-1/6 w-full flex flex-wrap items-center justify-between px-14 py-4 bg-purple-500 shadow-lg navbar navbar-expand-lg navbar-light border-b-2 border-black border-solid">
      <Link to="/">
        <h1 className="text-4xl">Social Network</h1>
      </Link>
      <div className="text-white">
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            className="bg-white"
            options={profiles
              .filter((profile) => profile.profile_completed)
              .map((profile) => profile.first_name + " " + profile.last_name)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search User"
                InputLabelProps={{
                  shrink: false,
                  style: {
                    color: "black"
                  }
                }}
              />
            )}
          />
        </Stack>
      </div>
      <div className="flex items-center gap-10">
        <div className="relative">
          <img
            className="picture w-32 h-24"
            src={profile.profile_picture}
            alt="profilepic"
          />
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } absolute z-10 flex flex-col divide-solid divide-y-2 divide-slate-300 border-2 border-solid border-slate-300 bg-white w-32`}>
            <button className="hover:bg-slate-300">View Profile</button>
            <button className="hover:bg-slate-300">Edit Profile</button>
            <button className="hover:bg-slate-300" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <span>
          {profile.first_name} {profile.last_name}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
