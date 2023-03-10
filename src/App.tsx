import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileContext } from "./contexts/ProfileContext";
import { UserContext } from "./contexts/UserContext";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import OnboardingInfo from "./pages/OnboardingInfo";
import OnboardingPicture from "./pages/OnboardingPicture";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import "./styles/index.css";

const App = () => {
  let access = "";
  const { user } = useContext(UserContext);
  const { profile } = useContext(ProfileContext);

  if (!user.token) {
    access = "not logged in";
  } else if (profile.user_id === "-1") {
    access = "loading";
  } else if (user.token && (!profile || !profile.first_name)) {
    access = "logged in but not started onboarding";
  } else if (user.token && !profile.profile_completed) {
    access = "logged in but not finished onboarding";
  } else if (user.token && profile.profile_completed) {
    access = "logged in and finished onboarding";
  }

  return (
    <BrowserRouter>
      {access === "loading" ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              access === "not logged in" ? (
                <Intro />
              ) : access === "logged in but not started onboarding" ? (
                <Navigate to="/onboarding/info" />
              ) : access === "logged in but not finished onboarding" ? (
                <Navigate to="/onboarding/picture" />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/login"
            element={
              access === "not logged in" ? (
                <Login />
              ) : access === "logged in but not started onboarding" ? (
                <Navigate to="/onboarding/info" />
              ) : access === "logged in but not finished onboarding" ? (
                <Navigate to="/onboarding/picture" />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              access === "not logged in" ? (
                <Signup />
              ) : access === "logged in but not started onboarding" ? (
                <Navigate to="/onboarding/info" />
              ) : access === "logged in but not finished onboarding" ? (
                <Navigate to="/onboarding/picture" />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/onboarding/info"
            element={
              access === "logged in but not started onboarding" ? (
                <OnboardingInfo />
              ) : access === "not logged in" ? (
                <Navigate to="/" />
              ) : access === "logged in but not finished onboarding" ? (
                <Navigate to="/onboarding/picture" />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/onboarding/picture"
            element={
              access === "logged in but not finished onboarding" ? (
                <OnboardingPicture />
              ) : access === "logged in but not started onboarding" ? (
                <Navigate to="/onboarding/info" />
              ) : access === "not logged in" ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/home"
            element={
              access === "logged in and finished onboarding" ? (
                <Home />
              ) : access === "logged in but not started onboarding" ? (
                <Navigate to="/onboarding/info" />
              ) : access === "logged in but not finished onboarding" ? (
                <Navigate to="/onboarding/picture" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/editprofile"
            element={
              access === "logged in and finished onboarding" ? (
                <EditProfile />
              ) : access === "logged in but not started onboarding" ? (
                <Navigate to="/onboarding/info" />
              ) : access === "logged in but not finished onboarding" ? (
                <Navigate to="/onboarding/picture" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
