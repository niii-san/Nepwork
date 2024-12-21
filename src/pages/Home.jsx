import React from "react";
import { useAuth } from "../stores/Auth";

function Home() {
    const isLoggedIn = useAuth((state) => state.isLoggedIn);

    if (isLoggedIn) {
        return (
            <>
                <div>You're Logged in </div>
            </>
        );
    } else {
        return (
            <>
                <div>You're not Logged in</div>
            </>
        );
    }
}

export default Home;
