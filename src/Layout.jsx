import { Outlet } from "react-router";
import { NavBar, Footer } from "./components";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./stores/Auth";
import api from "./utils/api";

function Layout() {
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const login = useAuth((state) => state.login);
    if (!isLoggedIn) {
        api.get("/user/verify-token")
            .then((res) => {
                if (res.data.success) {
                    login();
                }
            })
            .catch((_) => { });
    }
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
