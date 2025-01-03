import React from "react";
import { Outlet, useNavigate } from "react-router";
import { useUser } from "./stores";
import { Loader } from "./components";

function AdminLayout() {
    const navigate = useNavigate();
    const userData = useUser((state) => state.data);

    if (!userData) return <Loader />;

    if (userData.role !== "admin") {
        navigate("/settings");
        return
    }

    return <Outlet />;
}

export default AdminLayout;
