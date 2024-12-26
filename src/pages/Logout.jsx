import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../stores/Auth";

function Logout() {
    const logout = useAuth((state) => state.logout);
    const navigate = useNavigate();
    useEffect(() => {
        //clear cookies from local storage
        localStorage.clear();
        toast("Logged Out");
        logout();
        navigate("/login");
    }, []);

    return <div>Logging out</div>;
}

export default Logout;
