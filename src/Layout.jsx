import { Outlet } from "react-router";
import { NavBar, Footer, Loader } from "./components";
import { Toaster } from "react-hot-toast";
import api from "./utils/api";
import { useAuth } from "./stores";
import { useEffect, useState } from "react";

function Layout() {
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const login = useAuth((state) => state.login);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            api.get("/user/verify-token")
                .then((res) => {
                    if (res.data.success) {
                        login();

                        setLoading(false);
                    }
                })
                .catch((_) => {
                    setLoading(false);
                })
                .finally(setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Toaster />
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;
