import { Icon } from "@iconify/react";
import React from "react";
import { NavLink } from "react-router-dom";

const UserDashboardNav = () => {
  let activeClass = {
    backgroundColor: "#291D89",
    color: "white",
  };
  return (
    <div className="bg-white px-10 py-5 rounded-md flex  gap-5">
      <NavLink
        className="flex gap-2 items-center border border-secondary hover:bg-secondary hover:text-white py-1 md:px-4 px-2 rounded-md w-fit hover:scale-105 duration-500  shadow-lg shadow-secondary/50 text-xs md:text-base"
        style={({ isActive }) => (isActive ? activeClass : undefined)}
        to="overview"
      >
        {" "}
        <Icon icon="material-symbols:team-dashboard" /> <span>Dashboard</span>{" "}
      </NavLink>
      <NavLink
        className="flex gap-2 items-center border border-secondary hover:bg-secondary hover:text-white py-1 md:px-4 px-2 rounded-md  w-fit hover:scale-105 duration-500  shadow-lg shadow-secondary/50 text-xs md:text-base"
        style={({ isActive }) => (isActive ? activeClass : undefined)}
        to="reports"
      >
        {" "}
        <Icon icon="mdi:report-finance" /> <span>Reports</span>{" "}
      </NavLink>
      <NavLink
        className="flex gap-2 items-center border border-secondary hover:bg-secondary hover:text-white py-1 md:px-4 px-2 rounded-md  w-fit hover:scale-105 duration-500  shadow-lg shadow-secondary/50 text-xs md:text-base"
        style={({ isActive }) => (isActive ? activeClass : undefined)}
        to="settings"
      >
        {" "}
        <Icon icon="uil:setting" /> <span>Settings</span>{" "}
      </NavLink>

      <NavLink
        className="flex gap-2 items-center border border-secondary hover:bg-secondary hover:text-white py-1 md:px-4 px-2 rounded-md  w-fit hover:scale-105 duration-500  shadow-lg shadow-secondary/50 text-xs md:text-base"
        style={({ isActive }) => (isActive ? activeClass : undefined)}
        to="faq"
      >
        {" "}
        <Icon icon="streamline:interface-help-question-circle-circle-faq-frame-help-info-mark-more-query-question" />{" "}
        <span>FAQ</span>{" "}
      </NavLink>
    </div>
  );
};

export default UserDashboardNav;
