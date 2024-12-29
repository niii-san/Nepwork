import React from "react";
import { NavLink } from "react-router";
import { useAuth } from "../stores/Auth";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

function NavBar() {
    const isLoggedIn = useAuth((state) => state.isLoggedIn);

    // Styling for active nav item
    const activeNavItemStyle = "text-greentext";

    // Styling for inactive nav items
    const inActiveNavItemStyle = "text-blacktext";

    if (isLoggedIn) {
        return (
            <>
                <div className="h-[60px]  bg-light_background flex items-center justify-evenly">
                    <NavLink
                        to={"/"}
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
                        <IoNotifications />
                    </NavLink>

                    <NavLink
                        to={"/settings"}
                        className={({ isActive }) =>
                            isActive ? activeNavItemStyle : inActiveNavItemStyle
                        }
                    >
                        <IoSettingsSharp />
                    </NavLink>

                    <NavLink
                        to={"/logout"}
                        className="cursor-pointer hover:underline"
                    >
                        <RiLogoutBoxRLine className="" />
                    </NavLink>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="font-semibold shadow-custom_shadow border border-nav_border_color fixed top-0 left-0 w-full h-[60px] bg-light_background shadow-3xl flex items-center justify-evenly z-50">
                <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                        isActive
                            ? `${activeNavItemStyle}`
                            : inActiveNavItemStyle
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
