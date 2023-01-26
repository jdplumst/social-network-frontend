import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/login" />
        <Route path="/signup" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
