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

  const activeNavItemStyle =
    "text-primary gap-1 flex justify-center items-center";

  // Styling for inactive nav items

  const inActiveNavItemStyle =
    "text-black gap-1 flex justify-center items-center";

  //Styling for desktop

  const desktopStyle =
    "sticky top-0 justify-between lg:px-10 lg:bg-white w-[80%] rounded-b-xl";

  if (isLoggedIn) {
    return (
      <>
        <div className="lg:bg-secondary flex sticky top-0 justify-center items-center">
          <div
            className={`sticky top-0 w-[90%] h-[60px] bg-white flex items-center justify-evenly ${desktopStyle}`}
          >
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? activeNavItemStyle : inActiveNavItemStyle
              }
            >
              <GoHome className="text-xl" />
              Home
            </NavLink>

            <NavLink
              to={"/dashboard"}
              className={`flex gap-1 justify-center items-center ${({
                isActive,
              }) => (isActive ? activeNavItemStyle : inActiveNavItemStyle)}`}
            >
              <MdOutlineSpaceDashboard className="text-xl" />
              Dashboard
            </NavLink>

            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                isActive ? activeNavItemStyle : inActiveNavItemStyle
              }
            >
              <LuUserRound className="text-xl" />
              Profile
            </NavLink>

            <NavLink
              to={"/notifications"}
              className={({ isActive }) =>
                isActive ? activeNavItemStyle : inActiveNavItemStyle
              }
            >
              <IoMdNotificationsOutline className="text-xl" />
              Notification
            </NavLink>

            <NavLink
              to={"/settings"}
              className={({ isActive }) =>
                isActive ? activeNavItemStyle : inActiveNavItemStyle
              }
            >
              <IoSettingsOutline className="text-xl" />
              Settings
            </NavLink>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sticky top-0 w-full h-[60px] bg-white flex items-center justify-evenly">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? `${activeNavItemStyle}` : inActiveNavItemStyle
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
