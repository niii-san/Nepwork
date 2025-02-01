import { useNavigate } from "react-router";
import Button from "./Button";
import default_avatar from "../assets/default_avatar.svg";

function ConnectionUserList({ listData, isLoggedIn, loggedInUserData }) {
    const navigate = useNavigate();

    const isCurrentLoggedUserFollowing = loggedInUserData?.following.some(
        (item) => item?.userId === listData?._id,
    );

    const handleToogleFollowUnfollow = async (targetId) => {
        console.log(targetId);
        //TODO:
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4">
                <img
                    src={listData?.avatar ?? default_avatar}
                    alt={`${listData?.name?.firstName} avatar`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 hover:border-blue-200 transition-colors duration-200"
                />
                <div>
                    <h3 className="font-semibold text-gray-800">
                        {listData?.name?.firstName} {listData?.name?.lastName}
                    </h3>
                    {listData?.bio && (
                        <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                            {listData.bio}
                        </p>
                    )}
                </div>
            </div>

            {isLoggedIn && loggedInUserData ? (
                <Button
                    variant={
                        isCurrentLoggedUserFollowing ? "outline" : "filled"
                    }
                    onClick={() => handleToogleFollowUnfollow(listData?._id)}
                    className="px-6 py-2 rounded-full text-sm transition-all duration-200"
                >
                    {isCurrentLoggedUserFollowing ? "Unfollow" : "Follow"}
                </Button>
            ) : (
                <Button
                    variant="filled"
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 rounded-full text-sm"
                >
                    Follow
                </Button>
            )}
        </div>
    );
}

export default ConnectionUserList;
