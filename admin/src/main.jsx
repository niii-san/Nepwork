import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./Layout.jsx";
import { Dashboard, Login, Kycs, Home } from "./pages";

createRoot(document.getElementById("root")).render(
    //  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="kycs" element={<Kycs />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    </BrowserRouter>,
    // </StrictMode>,
);
