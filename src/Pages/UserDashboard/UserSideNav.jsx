import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { Sidenav, initTE } from "tw-elements";

const UserSideNav = () => {
  useEffect(() => {
    initTE({ Sidenav });
  }, []);
  return (
    <div>
      <nav
        id="sidenav-1"
        className="absolute left-0 top-0 z-[1035] h-full w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
        data-te-sidenav-init
        data-te-sidenav-hidden="false"
        data-te-sidenav-position="absolute"
      >
        <ul
          className="relative m-0 list-none px-2 space-y-2"
          data-te-sidenav-menu-ref
        >
          <li>
            <Link to="/">
              <img className="w-[40%] mx-auto my-5" src={logo} alt="logo" />
            </Link>
          </li>
          <li>
            <NavLink
              className="flex gap-2 items-center py-2 px-4 rounded-md active:text-white w-full active:bg-secondary bg-bgColor text-black"
              to="/userDashboard"
            >
              {" "}
              <Icon icon="uil:setting" /> <span>Settings</span>{" "}
            </NavLink>
          </li>
          <li>
            <Link
              className="flex gap-2 items-center py-2 px-4 rounded-md text-white w-full bg-secondary"
              to="settings"
            >
              {" "}
              <Icon icon="uil:setting" /> <span>Settings</span>{" "}
            </Link>
          </li>
        </ul>
      </nav>
      {/* <!-- Sidenav -->

<!-- Toggler --> */}
      <button
        className=" inline-block rounded bg-secondary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        data-te-sidenav-toggle-ref
        data-te-target="#sidenav-1"
        aria-controls="#sidenav-1"
        aria-haspopup="true"
      >
        <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default UserSideNav;
