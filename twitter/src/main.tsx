import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";

import { GlobalStyle } from "./globalReset.ts";

import App from "./components/feed/App.tsx";
import ReadPost from "./components/readPost/ReadPost.tsx";
import UserProfile from "./components/userProfile/UserProfile.tsx";
import Registration from "./components/Registration/Registration.tsx";
import ProtectRoute from "./components/protectedRoutes/ProtectRoutes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Redireciona "/" para "/home" */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route
          path="/home"
          element={
            <ProtectRoute>
              <App />
            </ProtectRoute>
          }
        />

        <Route
          path="/:username/status/:userId/:postId"
          element={
            <ProtectRoute>
              <ReadPost />
            </ProtectRoute>
          }
        />

        <Route
          path="/:username/:userId/profile"
          element={
            <ProtectRoute>
              <UserProfile />
            </ProtectRoute>
          }
        />

        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
    <GlobalStyle />
  </StrictMode>
);
