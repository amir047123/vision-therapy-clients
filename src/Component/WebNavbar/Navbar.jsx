import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../Assets/logo.png";

import { Collapse, Dropdown, initTE } from "tw-elements";
import AuthUser from "../../Hooks/authUser";
import moment from "moment";
function Navbar() {
  const { userInfo, logout } = AuthUser();
  const issueDate = moment().format("YYYY-MM-DD");
  const [packages, setPackages] = useState([]);
  const isExpire = packages?.expireDate
    ? moment(issueDate).isAfter(packages?.expireDate)
    : true;

  useEffect(() => {
    initTE({ Collapse, Dropdown });
  }, []);
  // load package data
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/package/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length) {
          setPackages(data?.data?.[0]);
        }
      });
  }, [userInfo?._id]);

  console.log("info", userInfo, isExpire);
  return (
    <nav
      className="relative flex w-full flex-nowrap items-center justify-between  lg:text-black text-white text-[18px]  lg:flex-wrap lg:justify-start lg:shadow-md bg-[#01aeef]  lg:py-0 py-4 "
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between">
        <div className="flex lg:hidden justify-between items-center w-full px-5 ">
          <Link to="/" className="w-20 ">
            <img src={logo} alt="" />
          </Link>
          {/* <!-- Hamburger button for mobile view --> */}
          <button
            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent8"
            aria-controls="navbarSupportedContent8"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <!-- Hamburger icon --> */}
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="h-7 w-7"
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
        <div className="bg-white h-16 py-2 clip-path flex items-center">
          <Link to="/" className="pl-5 hidden lg:block pr-44 w-[90%]">
            <img className="w-64" src={logo} alt="" />
          </Link>
        </div>
        {/* <!-- Collapsible navbar container --> */}
        <div
          className="!visible  hidden flex-grow basis-[100%] items-center justify-center lg:mt-0 lg:!flex lg:basis-auto "
          id="navbarSupportedContent8"
          data-te-collapse-item
        >
          {/* <!-- Left links --> */}
          <ul
            className="list-style-none flex text-left flex-col lg:gap-7 gap-5 pl-0  lg:flex-row  relative  w-full flex-nowrap items-center justify-between  py-2 text-white text-[18px]  lg:flex-wrap lg:justify-end lg:py-4  lg:pr-5"
            data-te-navbar-nav-ref
          >
            <li className="px-2.5  border-b-2 border-[#01aeef] hover:border-white transition-all duration-500">
              <Link to="/home">Home</Link>
            </li>
            <li className="px-2.5  border-b-2 border-[#01aeef] hover:border-white transition-all duration-500">
              <Link to="/pricing">Pricing</Link>
            </li>
            <li className="px-2.5  border-b-2 border-[#01aeef] hover:border-white transition-all duration-500">
              <Link to="/aboutUs">About Us</Link>
            </li>

            {localStorage.getItem("medmyneAccess") ? (
              <>
                {userInfo?.role === "user" && isExpire ? (
                  <li
                    onClick={() => {
                      logout();
                    }}
                    className="px-2.5 cursor-pointer border-b-2 border-[#01aeef] hover:border-white transition-all duration-500"
                  >
                    <p>Log Out</p>
                  </li>
                ) : (
                  <li className="px-2.5  border-b-2 border-[#01aeef] hover:border-white transition-all duration-500">
                    <Link to={`/${userInfo?.role}Dashboard`}>Dashboard</Link>
                  </li>
                )}
              </>
            ) : (
              <li className="px-2.5  border-b-2 border-[#01aeef] hover:border-white transition-all duration-500">
                <Link to="/login">Login</Link>
              </li>
            )}

            {/* <!-- Dropdown link --> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
