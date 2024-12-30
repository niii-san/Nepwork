import React from "react";
import { NavLink } from "react-router";
import { useAuth } from "../stores/Auth";
import { GoHome } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

function NavBar() {
    const isLoggedIn = useAuth((state) => state.isLoggedIn);

    // Styling for active nav item
    const activeNavItemStyle = "text-primary flex gap-1 items-center";

    // Styling for inactive nav items
    const inActiveNavItemStyle = "text-black flex gap-1 items-center";

    if (isLoggedIn) {
        return (
            <>
                <div className="h-[60px]  bg-whitetext flex items-center justify-evenly">
                    <NavLink
                        to={"/"}
                        className={({ isActive }) =>
                            isActive ? activeNavItemStyle : inActiveNavItemStyle
                        }
                    >
                        <GoHome />
                        Home
                    </NavLink>

                    <NavLink
                        to={"/dashboard"}
                        className={({ isActive }) =>
                            isActive ? activeNavItemStyle : inActiveNavItemStyle
                        }
                    >
                        <MdOutlineSpaceDashboard />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to={"/profile"}
                        className={({ isActive }) =>
                            isActive ? activeNavItemStyle : inActiveNavItemStyle
                        }
                    >
                        <LuUserRound />
                        Profile
                    </NavLink>

                    <NavLink
                        to={"/notifications"}
                        className={({ isActive }) =>
                            isActive ? activeNavItemStyle : inActiveNavItemStyle
                        }
                    >
                        <IoMdNotificationsOutline />
                        Notification
                    </NavLink>

                    <NavLink
                        to={"/settings"}
                        className={({ isActive }) =>
                            isActive ? activeNavItemStyle : inActiveNavItemStyle
                        }
                    >
                        <IoSettingsOutline />
                        Settings
                    </NavLink>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="sticky top-0  w-full h-[60px] bg-white flex items-center justify-evenly">
                <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                        isActive
                            ? `${activeNavItemStyle}`
                            : inActiveNavItemStyle
                    }
                >
                    <GoHome />
                    Home
                </NavLink>

                <NavLink
                    to={"/signup"}
                    className={({ isActive }) =>
                        isActive ? activeNavItemStyle : inActiveNavItemStyle
                    }
                >
                    SignUp
                </NavLink>

                <NavLink
                    to={"/login"}
                    className={({ isActive }) =>
                        isActive ? activeNavItemStyle : inActiveNavItemStyle
                    }
                >
                    Login
                </NavLink>
            </div>
        </>
    );
}

export default NavBar;
