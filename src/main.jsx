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
    Settings,
} from "./pages/index.js";
import { Protected } from "./components";

createRoot(document.getElementById("root")).render(
    //  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={
                        <Protected>
                            {" "}
                            <Dashboard />{" "}
                        </Protected>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <Protected>
                            <Notifications />
                        </Protected>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Protected>
                            <Profile />
                        </Protected>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <Protected>
                            <Settings />
                        </Protected>
                    }
                />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<Logout />} />
            </Route>
        </Routes>
    </BrowserRouter>,
    // </StrictMode>,
);
