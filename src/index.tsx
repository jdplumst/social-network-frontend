import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProfileContextProvider } from "./contexts/ProfileContext";
import { UserContextProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ProfileContextProvider>
        <App />
      </ProfileContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
