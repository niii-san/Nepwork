import { Outlet } from "react-router";
import { NavBar, Loader } from "./components";
import { Toaster } from "react-hot-toast";

function Layout() {
        return (
            <>
                <Toaster />
                <NavBar />
                <Outlet />
            </>
        );
}

export default Layout;
