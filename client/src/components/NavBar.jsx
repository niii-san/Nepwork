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

    const activeNavItemStyle = "text-primary font-bold";
    const inactiveNavItemStyle = "";
    const navItemStyle = "flex justify-center items-center gap-1";

    if (isLoggedIn) {
        return (
            <>
                <div className="bg-tertiray h-[60px] flex justify-between">
                    <div
                        id="logo"
                        className="w-1/4 flex items-center justify-center"
                    >
                        <img
                            src={nepwork_logo}
                            alt="logo"
                            className="p-2 h-full cursor-pointer"
                            onClick={() => navigate("/")}
                        />
                    </div>
                    <div
                        id="navItems"
                        className="flex justify-evenly items-center w-3/4"
                    >
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            <GoHome className="text-xl" />
                            <p className="hidden tablet:inline-block">Home</p>
                        </NavLink>

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            <MdOutlineSpaceDashboard className="text-xl" />
                            <p className="hidden tablet:inline-block">
                                Dashboard
                            </p>
                        </NavLink>

                        <NavLink
                            to={`/profile/${userData?._id}`}
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            <LuUserRound className="text-xl" />
                            <p className="hidden tablet:inline-block">
                                Profile
                            </p>
                        </NavLink>
                        <NavLink
                            to="/inbox"
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            <HiOutlineChatAlt2 className="text-xl" />
                            <p className="hidden tablet:inline-block">Inbox</p>
                        </NavLink>

                        <NavLink
                            to="/notifications"
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle} `
                            }
                        >
                            <span className="relative">
                                <IoMdNotificationsOutline className="text-xl" />
                                <p className="absolute top-0 animate-blink translate-x-4 font-extrabold text-xl text-red-500 w-3 h-4 flex items-center justify-center">
                                    !
                                </p>
                            </span>
                        </NavLink>

                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            <IoSettingsOutline className="text-xl" />
                        </NavLink>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="bg-tertiray h-[60px] flex justify-between">
                    <div
                        id="logo"
                        className="w-1/4 flex items-center justify-center"
                    >
                        <img
                            src="src/assets/logo.svg"
                            alt="logo"
                            className="p-2 h-full cursor-pointer"
                            onClick={() => navigate("/")}
                        />
                    </div>

                    <div
                        id="navItems"
                        className="flex justify-evenly items-center w-3/4"
                    >
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `w-1/4 ${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            <GoHome className="text-xl" />
                            <p className="">Home</p>
                        </NavLink>

                        <div className="flex w-3/4 justify-evenly gap-1">
                            <Button
                                variant="filled"
                                onClick={() => navigate("/signup")}
                            >
                                Join
                            </Button>
                            <Button onClick={() => navigate("/login")}>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default NavBar;
