import React from "react";
import { NavLink, useNavigate } from "react-router";
import { GoHome } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Button } from "../components";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import nepwork_logo from "../assets/nepwork_logo.svg";
import { useAuth, useUser } from "../stores";

function NavBar() {
    const navigate = useNavigate();
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const userData = useUser((state) => state.data);

    const activeNavItemStyle = "text-primary font-semibold before:scale-x-100";
    const inactiveNavItemStyle =
        "text-gray-600 hover:text-primary transition-colors";
    const navItemStyle =
        "flex items-center gap-1 sm:gap-2 relative px-2 sm:px-4 py-2 group";

    if (isLoggedIn) {
        return (
            <nav className="bg-white shadow-md sticky w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
                    <div className="flex items-center flex-shrink-0">
                        <img
                            src={nepwork_logo}
                            alt="logo"
                            className="h-8 sm:h-10 cursor-pointer transform transition-transform hover:scale-105"
                            onClick={() => navigate("/")}
                        />
                    </div>

                    {/* Main Navigation - Center */}
                    <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <GoHome
                                        className={`text-lg sm:text-xl ${isActive ? "fill-primary" : "fill-gray-500"}`}
                                    />
                                    <span className="hidden md:inline-block">
                                        Home
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-bottom transform scale-x-0 group-hover:scale-x-100"></span>
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <MdOutlineSpaceDashboard
                                        className={`text-lg sm:text-xl ${isActive ? "fill-primary" : "fill-gray-500"}`}
                                    />
                                    <span className="hidden md:inline-block">
                                        Dashboard
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-bottom transform scale-x-0 group-hover:scale-x-100"></span>
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to={`/profile/${userData?._id}`}
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <LuUserRound
                                        className={`text-lg sm:text-xl ${isActive ? "stroke-primary" : "stroke-gray-500"}`}
                                    />
                                    <span className="hidden md:inline-block">
                                        Profile
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-bottom transform scale-x-0 group-hover:scale-x-100"></span>
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/inbox"
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <HiOutlineChatAlt2
                                        className={`text-lg sm:text-xl ${isActive ? "stroke-primary" : "stroke-gray-500"}`}
                                    />
                                    <span className="hidden md:inline-block">
                                        Inbox
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-bottom transform scale-x-0 group-hover:scale-x-100"></span>
                                </>
                            )}
                        </NavLink>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 ml-4">
                        <NavLink
                            to="/notifications"
                            className="relative px-2 sm:px-3 py-2 group"
                        >
                            <div className="relative">
                                <IoMdNotificationsOutline className="text-lg sm:text-xl text-gray-500 hover:text-primary transition-colors" />
                                <span className="absolute -top-1 -right-1 sm:-right-2">
                                    <span className="relative flex h-3 w-3 sm:h-4 sm:w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-red-500 text-white text-[8px] sm:text-xs items-center justify-center">
                                            !
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </NavLink>

                        <NavLink to="/settings" className="px-2 sm:px-3 py-2">
                            <IoSettingsOutline className="text-lg sm:text-xl text-gray-500 hover:text-primary transition-colors" />
                        </NavLink>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="bg-white shadow-md fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <img
                            src={nepwork_logo}
                            alt="logo"
                            className="h-8 sm:h-10 cursor-pointer transform transition-transform hover:scale-105"
                            onClick={() => navigate("/")}
                        />
                    </div>

                    {/* Navigation Items */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base ${isActive ? "text-primary font-semibold" : "text-gray-600 hover:text-primary"}`
                            }
                        >
                            Home
                        </NavLink>

                        <div className="flex gap-2 sm:gap-4">
                            <Button
                                variant="filled"
                                onClick={() => navigate("/signup")}
                                className="px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-full bg-gradient-to-r from-primary to-blue-400 hover:from-blue-500 hover:to-primary transition-all transform hover:scale-105 shadow-md"
                            >
                                Join Now
                            </Button>
                            <Button
                                onClick={() => navigate("/login")}
                                className="px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-full border-2 border-primary text-primary hover:bg-primary/10 transition-colors transform hover:scale-105"
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
