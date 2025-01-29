import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { GoHome } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Button } from "../components";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import nepwork_logo from "../assets/nepwork_logo.svg";
import { useAuth, useSetting, useUser } from "../stores";

function NavBar() {
    const [rotation, setRotation] = useState(0);
    const openSetting = useSetting((state) => state.open);
    const navigate = useNavigate();
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const userData = useUser((state) => state.data);

    const activeNavItemStyle = "text-primary font-semibold";
    const inactiveNavItemStyle = "text-secondaryText hover:text-primary";
    const navItemStyle = "flex items-center gap-2 relative p-2 sm:px-3 group";

    if (isLoggedIn) {
        return (
            <nav className="bg-tertiary shadow-sm sticky w-full top-0 z-50 border-b border-secondary">
                <div className=" mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <img
                            src={nepwork_logo}
                            alt="logo"
                            className="h-8 sm:h-10 cursor-pointer transform transition-transform hover:scale-105"
                            onClick={() => navigate("/")}
                        />
                    </div>

                    {/* Main Navigation - Center */}
                    <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 mx-2">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <GoHome
                                        className={`text-xl ${isActive ? "fill-primary" : "fill-secondaryText"} transition-colors`}
                                    />
                                    <span className="hidden md:inline-block text-sm sm:text-base">
                                        Home
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 ${isActive ? "bg-primary" : "bg-transparent"} transition-all duration-300`}
                                    ></span>
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
                                        className={`text-xl ${isActive ? "fill-primary" : "fill-secondaryText"} transition-colors`}
                                    />
                                    <span className="hidden md:inline-block text-sm sm:text-base">
                                        Dashboard
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 ${isActive ? "bg-primary" : "bg-transparent"} transition-all duration-300`}
                                    ></span>
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
                                        className={`text-xl ${isActive ? "stroke-primary" : "stroke-secondaryText"} transition-colors`}
                                    />
                                    <span className="hidden md:inline-block text-sm sm:text-base">
                                        Profile
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 ${isActive ? "bg-primary" : "bg-transparent"} transition-all duration-300`}
                                    ></span>
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
                                        className={`text-xl ${isActive ? "stroke-primary" : "stroke-secondaryText"} transition-colors`}
                                    />
                                    <span className="hidden md:inline-block text-sm sm:text-base">
                                        Inbox
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 ${isActive ? "bg-primary" : "bg-transparent"} transition-all duration-300`}
                                    ></span>
                                </>
                            )}
                        </NavLink>
                    </div>

                    {/* Right-aligned Icons */}
                    <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                        <NavLink
                            to="/notifications"
                            className="p-1.5 sm:p-2 rounded-full hover:bg-secondary transition-colors duration-200 relative"
                        >
                            <IoMdNotificationsOutline className="text-2xl text-secondaryText hover:text-primary" />
                            <span className="absolute top-0 right-0">
                                <span className="relative flex h-3 w-3 sm:h-4 sm:w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-danger text-tertiary text-[8px] sm:text-xs items-center justify-center">
                                        3
                                    </span>
                                </span>
                            </span>
                        </NavLink>

                        <button
                            onClick={openSetting}
                            onMouseEnter={() =>
                                setRotation((prev) => prev + 90)
                            }
                            className="p-1.5 sm:p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                        >
                            <IoSettingsOutline
                                className="text-2xl text-secondaryText hover:text-primary"
                                style={{
                                    transform: `rotate(${rotation}deg)`,
                                    transition: "transform 300ms",
                                }}
                            />
                        </button>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="bg-tertiary shadow-sm sticky w-full top-0 z-50 border-b border-secondary">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
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
                                `px-3 py-1.5 rounded-full text-sm sm:text-base ${
                                    isActive
                                        ? "text-primary font-semibold bg-secondary"
                                        : "text-secondaryText hover:text-primary hover:bg-secondary"
                                } transition-colors duration-200`
                            }
                        >
                            Home
                        </NavLink>

                        <div className="flex gap-2 sm:gap-3">
                            <Button
                                variant="filled"
                                onClick={() => navigate("/signup")}
                                className="px-3 sm:px-5 py-1.5 text-xs sm:text-sm rounded-full bg-primary hover:bg-primary/90 transition-colors shadow-md"
                            >
                                Join Now
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/login")}
                                className="px-3 sm:px-5 py-1.5 text-xs sm:text-sm rounded-full border-2 border-primary text-primary hover:bg-secondary transition-colors"
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
