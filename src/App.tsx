import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileContext } from "./contexts/ProfileContext";
import { UserContext } from "./contexts/UserContext";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import OnboardingInfo from "./pages/OnboardingInfo";
import Signup from "./pages/Signup";
import "./styles/index.css";

const App = () => {
  const { user } = useContext(UserContext);
  const { profiles, profile } = useContext(ProfileContext);
  console.log(user);
  console.log(profiles);
  console.log(profile);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!user.token ? <Intro /> : <Navigate to="/home" />}
        />
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
