import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import "./index.css";
import Layout from "./Layout.jsx";
import { Home, LoginPage, SignupPage } from "./pages/index.js";

createRoot(document.getElementById("root")).render(
    //  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="home" element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>,
    // </StrictMode>,
);
