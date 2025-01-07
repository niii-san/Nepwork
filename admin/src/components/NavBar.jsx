import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../stores/Auth";
import { Button } from "./index";
import { GoHome } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";

function NavBar() {
    const isLoggedIn = useAuth((state) => state.isLoggedIn);

    const activeNavItemStyle = "text-primary";
    const inactiveNavItemStyle = "";
    const navItemStyle = "flex justify-center items-center gap-1";

    if (isLoggedIn) {
        return (
            <>
                <div className="bg-tertiray  h-[60px] flex justify-between">
                    <div
                        id="logo"
                        className="w-1/4 flex items-center justify-center"
                    ></div>
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
                            Home
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
                            to="/profile"
                            className={({ isActive }) =>
                                `${navItemStyle} ${isActive ? activeNavItemStyle : inactiveNavItemStyle}`
                            }
                        >
                            <LuUserRound className="text-xl" />
                            <p className="hidden tablet:inline-block">
                                Profile
                            </p>
                        </NavLink>

                        <NavLink to="/logout" className="">
                        <Button style="filled" >

                            Logout
                        </Button>
                        </NavLink>
                    </div>
                </div>
            </>
        );
    } else {
        return <></>;
    }
}

export default NavBar;
