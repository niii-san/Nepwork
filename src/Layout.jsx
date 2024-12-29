import { Outlet, useLocation } from "react-router";
import { NavBar, Footer, Loader } from "./components";
import toast, { Toaster } from "react-hot-toast";
import api from "./utils/api";
import { useAuth } from "./stores";
import { useEffect, useState } from "react";

function Layout() {
    const location = useLocation();
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const login = useAuth((state) => state.login);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("layout runned");
        api.get("/user/verify-token")
            .then((res) => {
                if (res.data.success && res.data.isAuthenticated) {
                    login();
                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, [location]);

    if (loading) return <Loader />;
    else {
        return (
            <>
                <Toaster />
                <NavBar />
                <Outlet />
                <Footer />
            </>
        );
    }
}

export default Layout;
