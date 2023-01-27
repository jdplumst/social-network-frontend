import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import OnboardingInfo from "./pages/OnboardingInfo";
import Signup from "./pages/Signup";
import "./styles/index.css";

const App = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} /> // Intro, redirect to Home if
        loggedin
        <Route
          path="/login"
          element={!user.token ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={
            !user.token ? <Signup /> : <Navigate to="/onboarding/info" />
          }
        />
        <Route
          path="/onboarding/info"
          element={user.token ? <OnboardingInfo /> : <Navigate to="/" />}
        />
        <Route
          path="/home"
          element={user.token ? <Home /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
