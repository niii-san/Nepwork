import React from "react";
import { NavLink } from "react-router";

function NavBar() {
    return (
        <>
            <div className="h-[60px] bg-gray-300 flex items-center justify-evenly">
                <NavLink
                    to={"/home"}
                    className={({ isActive }) =>
                        isActive ? "text-green-500" : "text-black"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to={"/signup"}
                    className={({ isActive }) =>
                        isActive ? "text-green-500" : "text-black"
                    }
                >
                    Signup
                </NavLink>
                <NavLink
                    to={"/login"}
                    className={({ isActive }) =>
                        isActive ? "text-yellow-500" : "text-black"
                    }
                >
                    Login
                </NavLink>
            </div>
        </>
    );
}

export default NavBar;
