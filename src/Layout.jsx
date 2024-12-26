import { Outlet } from "react-router";
import { NavBar, Footer, Loader } from "./components";
import { Toaster } from "react-hot-toast";
import api from "./utils/api";
import { useAuth, useLoading } from "./stores";
import { useEffect } from "react";

function Layout() {
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const login = useAuth((state) => state.login);

    const loading = useLoading((state) => state.loading);
    const enableLoading = useLoading((state) => state.enableLoading);
    const disableLoading = useLoading((state) => state.disableLoading);

    useEffect(() => {
        enableLoading();
        if (!isLoggedIn) {
            api.get("/user/verify-token")
                .then((res) => {
                    if (res.data.success) {
                        login();
                        disableLoading();
                    }
                })
                .catch((_) => {
                    disableLoading();
                })
                .finally(disableLoading());
        } else {
            disableLoading();
        }
    }, []);

    if (loading) {
        return <Loader />;
    } else {
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
