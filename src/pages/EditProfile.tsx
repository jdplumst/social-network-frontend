import { useState } from "react";
import EditInfo from "../components/EditInfo";
import EditPicture from "../components/EditPicture";
import Navbar from "../components/Navbar";

enum Menu {
  Info = "info",
  Picture = "picture"
}

const EditProfile = () => {
  const [menu, setMenu] = useState<Menu>(Menu.Info);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="grid grid-cols-3 h-5/6">
        <div className="flex flex-col items-end  gap-10 text-right bg-slate-400 col-span-1 p-10">
          <button
            onClick={() => setMenu(Menu.Info)}
            className={`${
              menu === Menu.Info ? "bg-purple-500" : ""
            } w-1/2 p-4 hover:cursor-pointer rounded-lg font-bold`}>
            Profile Information
          </button>
          <button
            onClick={() => setMenu(Menu.Picture)}
            className={`${
              menu === Menu.Picture ? "bg-purple-500" : ""
            } w-1/2 p-4 hover:cursor-pointer rounded-lg font-bold`}>
            Profile Picture
          </button>
        </div>
        <div className="bg-slate-300 col-span-2">
          {menu === Menu.Info ? <EditInfo /> : <EditPicture />}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
