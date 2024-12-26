import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import "./index.css";
import Layout from "./Layout.jsx";
import {
    Dashboard,
    Home,
    LoginPage,
    Logout,
    Notifications,
    Profile,
    SignupPage,
} from "./pages/index.js";

createRoot(document.getElementById("root")).render(
    //  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="logout" element={<Logout />} />
            </Route>
        </Routes>
    </BrowserRouter>,
    // </StrictMode>,
);
