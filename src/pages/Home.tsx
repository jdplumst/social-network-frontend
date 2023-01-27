import useLogout from "../hooks/useLogout";

const Home = () => {
  const { logout } = useLogout();

  return (
    <div>
      <h1>This is the Home page!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
