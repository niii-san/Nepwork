import React from "react";
import { NavLink } from "react-router";
import { useAuth } from "../stores/Auth";

function NavBar() {
    const isLoggedIn = useAuth((state) => state.isLoggedIn);

    // Styling for active nav item
    const activeNavItemStyle = "text-green-700";

    // Styling for inactive nav items
    const inActiveNavItemStyle = "text-black";

    if (isLoggedIn) {
        return (
            <>
                <div className="h-[60px] bg-gray-300 flex items-center justify-evenly">
                    <NavLink
                        to={"/home"}
                        className={({ isActive }) =>
                            isActive ? activeNavItemStyle : inActiveNavItemStyle
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to={"/dashboard"}
                        className={({ isActive }) =>
                            isActive ? activeNavItemStyle : inActiveNavItemStyle
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to={"/profile"}
                        className={({ isActive }) =>
                            isActive ? activeNavItemStyle : inActiveNavItemStyle
                        }
                    >
                        Profile
                    </NavLink>

                    <NavLink
                        to={"/notifications"}
                        className={({ isActive }) =>
                            isActive ? activeNavItemStyle : inActiveNavItemStyle
                        }
                    >
                        Notifications
                    </NavLink>

                    <NavLink
                        to={"/logout"}
                        className="cursor-pointer hover:underline"
                    >
                        Logout
                    </NavLink>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="h-[60px] bg-gray-300 flex items-center justify-evenly">
                <NavLink
                    to={"/home"}
                    className={({ isActive }) =>
                        isActive ? activeNavItemStyle : inActiveNavItemStyle
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to={"/signup"}
                    className={({ isActive }) =>
                        isActive ? activeNavItemStyle : inActiveNavItemStyle
                    }
                >
                    Join
                </NavLink>
            </div>
        </>
    );
}

export default NavBar;
