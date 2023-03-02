import { useState } from "react";
import Navbar from "../components/Navbar";

enum Menu {
  Info = 0,
  Picture = 1
}

const EditProfile = () => {
  const [menu, setMenu] = useState<Menu>(0);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="grid grid-cols-3 h-5/6">
        <div className="flex flex-col items-end  gap-10 text-right bg-slate-400 col-span-1 p-10">
          <button
            onClick={() => setMenu(0)}
            className={`${
              menu === 0 ? "bg-purple-500" : ""
            } w-1/2 p-4 hover:cursor-pointer rounded-lg font-bold`}>
            Profile Information
          </button>
          <button
            onClick={() => setMenu(1)}
            className={`${
              menu === 1 ? "bg-purple-500" : ""
            } w-1/2 p-4 hover:cursor-pointer rounded-lg font-bold`}>
            Profile Picture
          </button>
        </div>
        <div className="bg-slate-300 col-span-2 p-10">
          {menu === 0 ? <div>Hi</div> : <div>Bye</div>}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
