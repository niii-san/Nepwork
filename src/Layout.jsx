import { Outlet } from "react-router";
import { NavBar, Footer } from "./components";
import { Toaster } from "react-hot-toast";

function Layout() {
    return (
        <>
            <Toaster />
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;
