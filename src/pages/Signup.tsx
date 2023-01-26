const Signup = () => {
  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center pt-10">
      <form className="flex flex-col p-10 bg-white w-1/2 h-1/3">
        <h3 className="text-2xl text-center pb-5 font-bold">Sign Up</h3>
        <label className="font-bold">Email:</label>
        <input
          type="email"
          className="p-2 mb-5 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
        />
        <label className="font-bold">Password:</label>
        <input
          type="password"
          className="p-2 mb-5 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
        />
        <button className="bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold w-1/4 mx-auto">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
