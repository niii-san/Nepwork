import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./Layout.jsx";
import { Dashboard, Login, Kycs, Home, Profile } from "./pages";
import { Protected } from "./components";

createRoot(document.getElementById("root")).render(
    //  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    path=""
                    element={
                        <Protected>
                            <Home />
                        </Protected>
                    }
                />
                <Route
                    path="dashboard"
                    element={
                        <Protected>
                            <Dashboard />
                        </Protected>
                    }
                />
                <Route
                    path="kycs"
                    element={
                        <Protected>
                            <Kycs />
                        </Protected>
                    }
                />
                <Route
                    path="profile"
                    element={
                        <Protected>
                            <Profile />
                        </Protected>
                    }
                />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    </BrowserRouter>,
    // </StrictMode>,
);
