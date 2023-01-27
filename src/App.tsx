import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import OnboardingInfo from "./pages/OnboardingInfo";
import Signup from "./pages/Signup";
import "./styles/index.css";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} /> // Intro, redirect to Home if
        loggedin
        <Route path="/login" element={<Login />} /> // Login, redirect to Home
        if loggedin
        <Route
          path="/signup"
          element={!user.token ? <Signup /> : <OnboardingInfo />}
        />
        <Route path="/onboarding/info" element={<OnboardingInfo />} /> //
        OnboardingInfo, redirect to Signup if not signed up yet
        <Route path="/home" /> // Home, redirect to Intro if loggedin
      </Routes>
    </BrowserRouter>
  );
};

export default App;
