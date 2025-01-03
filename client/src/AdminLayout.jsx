import React from "react";
import { AdminNavBar } from "./components";
import { Outlet } from "react-router";

function AdminLayout() {
    return (
        <>
            <AdminNavBar />
            <Outlet />;
        </>
    );
}

export default AdminLayout;
