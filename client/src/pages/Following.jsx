import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import api from "../utils/api";
import { useAuth, useUser } from "../stores";
import { ConnectionUserList, Loader } from "../components";

function Following() {
    const { userId } = useParams();
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const currentUserData = useUser((state) => state.data);
    const [followingList, setFollowingList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSetFollowingList = async () => {
        try {
            const response = await api.get(`/user/following/${userId}`);
            setFollowingList(response.data.data);
        } catch (error) {
            toast.error("Failed to load followings");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSetFollowingList();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center p-8">
                <Loader size="lg" />
            </div>
        );

    return (
        <div className="max-w-2xl mx-auto p-4 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Following</h1>
            <div className="space-y-4">
                {followingList.map((item) => (
                    <ConnectionUserList
                        key={item?.userId?._id}
                        listData={item.userId}
                        isLoggedIn={isLoggedIn}
                        loggedInUserData={currentUserData}
                    />
                ))}
            </div>
            {followingList.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                    No followings to display
                </div>
            )}
        </div>
    );
}

export default Following;
