import React from "react";
import { useParams } from "react-router";
import { useAuth, useUser } from "../stores";
import { Loader } from "../components";

function Profile() {
    const { userId } = useParams();
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const currentUserData = useUser((state) => state.data);

    if (isLoggedIn && !currentUserData) return <Loader />;

    return (
        <div className="bg-secondary min-h-[800px]">
            Viewing profile of {userId}
            <br />
            isOwnProfile : {userId === currentUserData._id ? "Yes" : "No"}
        </div>
    );
}

export default Profile;
