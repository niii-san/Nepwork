import { Outlet, useLocation } from "react-router";
import { NavBar, Loader } from "./components";
import { Toaster } from "react-hot-toast";
import { api } from "./utils";
import { useAuth, useUser } from "./stores";
import { useEffect, useState } from "react";

function Layout() {
    const location = useLocation();
    const login = useAuth((state) => state.login);
    const setUserData = useUser((state) => state.setUserData);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/admin/verify-token")
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

    if (loading) return <Loader />;
    else {
        return (
            <>
                <Toaster />
                <div className="tablet:hidden fixed top-0 left-0 bg-primary h-full w-full flex justify-center items-center">
                    <p className="text-xl text-center">
                        <strong>
                        Admin portal doesnot supports small screen sizes, Please
                        use bigger one
                        </strong>
                    </p>
                </div>
                <div className="hidden tablet:block">
                    <NavBar />
                    <Outlet />
                </div>
            </>
        );
    }
}

export default Layout;
