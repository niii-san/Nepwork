import React from "react";
import { useAuth } from "../stores/Auth";

function Home() {
    const isLoggedIn = useAuth((state) => state.isLoggedIn);

    if (isLoggedIn) {
        return (
            <>
                <div className="mt-52 text-center min-h-[600px]">
                    You're Logged in{" "}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="mt-52 text-center min-h-[600px]">
                    You're not Logged in
                </div>
            </>
        );
    }
}

export default Home;
