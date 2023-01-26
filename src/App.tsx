import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles/index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} /> // Intro, redirect to Home if
        loggedin
        <Route path="/login" element={<Login />} /> // Login, redirect to Home
        if loggedin
        <Route path="/signup" element={<Signup />} /> // Signup, redirect to
        Home if loggedin
        <Route path="/home" /> // Home, redirect to Intro if loggedin
      </Routes>
    </BrowserRouter>
  );
};

export default App;
