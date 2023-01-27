import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      setError(null);
      setUser(data);
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center pt-10">
      <form
        onSubmit={handleSignup}
        className="flex flex-col p-10 bg-white w-1/2 h-1/3">
        <h3 className="text-2xl text-center pb-5 font-bold">Sign Up</h3>
        <label className="font-bold">Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="p-2 mb-5 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
        />
        <label className="font-bold">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="p-2 mb-5 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
        />
        <button className="bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold w-1/4 mx-auto">
          Sign Up
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

export default Signup;
