import React, { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../stores/Auth";
import { GoHome } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { LuUserRound } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiUserSharedLine } from "react-icons/ri";

function NavBar() {
    const isLoggedIn = useAuth((state) => state.isLoggedIn);

    // Styling for active nav item
    const activeNavItemStyle =
        "text-primary gap-1 flex justify-center items-center rounded-xl px-2 py-1 bg-primary text-primaryText transition duration-300 ease-in ";
    // Styling for inactive nav items
    const inActiveNavItemStyle =
        "text-black gap-1 flex justify-center items-center transition duration-300  ease-out";

    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(false);
    const [home, setHome] = useState(false);
    const [dashboard, setDashboard] = useState(false);
    const [profile, setProfile] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [settings, setSettings] = useState(false);

    if (isLoggedIn) {
        return (
            <>
                <div
                    className={`w-[310px] tablet:w-[500px] pc:w-[600px] h-[60px] bg-tertiray border-b rounded-bl-xl rounded-br-xl sticky top-0 left-0 flex items-center justify-evenly mx-auto z-50`}
                >
                    <NavLink
                        to="/"
                        className={({ isActive }) => {
                            if (isActive) {
                                setHome(true);
                                return activeNavItemStyle;
                            } else {
                                setHome(false);
                                return inActiveNavItemStyle;
                            }
                        }}
                    >
                        <GoHome className="text-xl" />
                        {home && "Home"}
                    </NavLink>

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => {
                            if (isActive) {
                                setDashboard(true);
                                return `flex gap-1 justify-center items-center ${activeNavItemStyle}`;
                            } else {
                                setDashboard(false);
                                return `flex gap-1 justify-center items-center ${inActiveNavItemStyle}`;
                            }
                        }}
                    >
                        <MdOutlineSpaceDashboard className="text-xl" />
                        {dashboard && "Dashboard"}
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) => {
                            if (isActive) {
                                setProfile(true);
                                return activeNavItemStyle;
                            } else {
                                setProfile(false);
                                return inActiveNavItemStyle;
                            }
                        }}
                    >
                        <LuUserRound className="text-xl" />
                        {profile && "Profile"}
                    </NavLink>

                    <NavLink
                        to="/notifications"
                        className={({ isActive }) => {
                            if (isActive) {
                                setNotifications(true);
                                return activeNavItemStyle;
                            } else {
                                setNotifications(false);
                                return inActiveNavItemStyle;
                            }
                        }}
                    >
                        <IoMdNotificationsOutline className="text-xl" />
                        {notifications && "Notification"}
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) => {
                            if (isActive) {
                                setSettings(true);
                                return activeNavItemStyle;
                            } else {
                                setSettings(false);
                                return inActiveNavItemStyle;
                            }
                        }}
                    >
                        <IoSettingsOutline className="text-xl" />
                        {settings && "Settings"}
                    </NavLink>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="w-[310px] tablet:w-[500px] pc:w-[600px] h-[60px] bg-tertiray border-b rounded-bl-xl rounded-br-xl sticky top-0 left-0 flex items-center justify-evenly mx-auto z-50">
                    <NavLink
                        to="/"
                        className={({ isActive }) => {
                            if (isActive) {
                                setHome(true);
                                return activeNavItemStyle;
                            } else {
                                setHome(false);
                                return inActiveNavItemStyle;
                            }
                        }}
                    >
                        <GoHome className="text-xl" />
                        {home && "Home"}
                    </NavLink>

                    <NavLink
                        to="/signup"
                        className={({ isActive }) => {
                            if (isActive) {
                                setSignup(true);
                                return activeNavItemStyle;
                            } else {
                                setSignup(false);
                                return inActiveNavItemStyle;
                            }
                        }}
                    >
                        <RiUserSharedLine />
                        {signup && "Signup"}
                    </NavLink>

                    <NavLink
                        to="/login"
                        className={({ isActive }) => {
                            if (isActive) {
                                setLogin(true);
                                return activeNavItemStyle;
                            } else {
                                setLogin(false);
                                return inActiveNavItemStyle;
                            }
                        }}
                    >
                        <IoIosLogIn />

                        {login && "Login"}
                    </NavLink>
                </div>
            </>
        );
    }
}

export default NavBar;
