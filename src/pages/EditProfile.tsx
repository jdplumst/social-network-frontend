import Navbar from "../components/Navbar";

const EditProfile = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="grid grid-cols-3 h-5/6">
        <div className="bg-slate-400 col-span-1 p-10"> The menu</div>
        <div className="bg-slate-300 col-span-2 p-10">The content</div>
      </div>
    </div>
  );
};

export default EditProfile;
