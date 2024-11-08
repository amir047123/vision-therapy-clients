import React from "react";
import logo from "../../Assets/logo.png";
import { Icon } from "@iconify/react";
import img from "../../Assets/Login/Rectangle 45.png";
import { Link } from "react-router-dom";
const AuthHome = () => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-700 ">
      <div className=" lg:grid lg:grid-cols-2 m-10  bg-bgColor rounded-2xl ">
        <div className=" ">
          <div className="flex items-center justify-between mr-5">
            <img className=" m-5" src={logo} alt="" />
            <Icon
              className=" text-4xl  text-secondary "
              icon="carbon:close-filled"
            ></Icon>
          </div>

          <div className="  mt-24 ">
            <div className=" flex justify-center gap-8 items-center">
              <div className="rounded-full  bg-secondary p-16 w-32 h-32 flex items-center justify-center">
                <p className="text-white font-bold text-xl">Account</p>
              </div>
            </div>

            <div className=" justify-center mt-5    gap-14 items-center flex">
              <div className=" grid grid-cols-1">
                <Link
                  to="/login/doctor"
                  className=" mb-3 rounded-sm text-secondary font-bold border  border-secondary px-7 py-1"
                >
                  Log in
                </Link>
                <Link
                  to="/login/doctor"
                  className=" mb-3  rounded-sm font-bold   bg-secondary  text-white py-1 px-7 "
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="  ">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthHome;
