import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IProfile, ProfileContext } from "../contexts/ProfileContext";
import useLogout from "../hooks/useLogout";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const { logout } = useLogout();
  const { profile, profiles } = useContext(ProfileContext);

  const handleSearch = (e: any, value: IProfile | null) => {
    if (value) {
      window.location.href = `/profile/${value.user_id}`;
    }
  };

  const toggleDropdown = (e: any) => {
    if ((e.target as HTMLElement).classList.contains("dropdown") && !dropdown) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  };

  return (
    <nav
      onClick={toggleDropdown}
      className="relative h-1/6 w-full flex flex-wrap items-center justify-between px-14 py-4 bg-purple-500 shadow-lg navbar navbar-expand-lg navbar-light border-b-2 border-black border-solid">
      <Link to="/">
        <h1 className="text-4xl">Social Network</h1>
      </Link>
      <div className="text-white">
        <Stack spacing={2} sx={{ width: 300 }}>
          {profiles.length > 0 && (
            <Autocomplete
              id="free-solo-demo"
              // freeSolo
              autoSelect
              className="bg-white"
              options={profiles.filter((p) => p.profile_completed)}
              getOptionLabel={(p) => p.first_name + " " + p.last_name}
              onChange={handleSearch}
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
          )}
        </Stack>
      </div>
      <div className="flex items-center gap-10 hover:cursor-pointer dropdown">
        <div className="relative">
          <img
            className="picture w-32 h-24 dropdown"
            src={profile.profile_picture}
            alt="profilepic"
          />
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } absolute z-10 flex flex-col divide-solid divide-y-2 divide-slate-300 border-2 border-solid border-slate-300 bg-white w-32`}>
            <Link to={`/profile/${profile.user_id}`}>
              <button className="hover:bg-slate-300 w-full">
                View Profile
              </button>
            </Link>
            <Link to="/editprofile">
              <button className="hover:bg-slate-300 w-full">
                Edit Profile
              </button>
            </Link>
            <button className="hover:bg-slate-300" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <span className="dropdown">
          {profile.first_name} {profile.last_name}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
