import { Outlet, useLocation } from "react-router";
import { NavBar, Footer, Loader, SettingSlide } from "./components";
import { Toaster } from "react-hot-toast";
import api from "./utils/api";
import { useAuth, useSetting } from "./stores";
import { useEffect, useState } from "react";

function Layout() {
    const location = useLocation();
    const { login, isLoggedIn,connectSocket,setUserData } = useAuth();
    const settingVisible = useSetting((state) => state.visible);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/user/verify-token")
            .then((res) => {
                if (res.data.success && res.data.isAuthenticated) {
                    console.log("user data invalidated");
                    setUserData();
                    login();
                    setLoading(false);
                }
            })
            .catch((_) => {
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, [location]);
    useEffect(() => {
        if (isLoggedIn) {
            connectSocket();
        }
    }, [isLoggedIn]);

    if (loading) return <Loader />;
    else {
        return (
            <>
                {settingVisible && <SettingSlide />}
                <Toaster />
                <NavBar />
                <Outlet />
                <Footer />
            </>
        );
    }
}

export default Layout;
