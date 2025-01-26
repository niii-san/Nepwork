import React from "react";
import { useAuth, useUser } from "../stores";
import { ClientHomepage, FreelancerHomePage, Loader } from "../components";

function Home() {
    const userData = useUser((state) => state.data);
    const isLoggedIn = useAuth((state) => state.isLoggedIn);

    if (isLoggedIn && !userData) {
        return <Loader />;
    }

    if (!isLoggedIn || userData?.role === "client") {
        return <ClientHomepage />;
    }

    if (isLoggedIn && userData?.role === "freelancer") {
        return <FreelancerHomePage userData={userData} />;
    }

    return <div>Something went wrong!</div>;
}

export default Home;
