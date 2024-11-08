import React from "react";
import UserDashboardNav from "./UserDashboardNav";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import UserDashboardHeader from "./UserDashboardHeader";
import AuthUser from "../../Hooks/authUser";
import { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../Shared/Loading";

const UserDashboard = () => {
  const { userInfo, logout } = AuthUser();
  const navigate = useNavigate();
  const issueDate = moment().format("YYYY-MM-DD");
  const [loading, setLoading] = useState(false);

  // load package data
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/v1/package/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length) {
          const isExpire = data?.data?.[0]?.expireDate
            ? moment(issueDate).isAfter(data?.data?.[0]?.expireDate)
            : true;
          if (!isExpire) {
          } else {
            if (!loading) {
              toast.error(
                "You dose't have any package. contact your doctor :("
              );
              navigate("/");
            }
          }
          setLoading(false);
        }
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   if (userInfo?.role === "user") {
  //   } else {
  //     if (userInfo) {
  //       logout();
  //     }
  //     navigate("/login/doctor");
  //   }
  // }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {/* dashboard header */}
      <div className="bg-white ">
        <div className="flex justify-between items-center py-2 lg:w-10/12 w-11/12 mx-auto min-h-[70px]">
          <Link to="/">
            <img className="w-[80%]" src={logo} alt="logo" />
          </Link>
          {/* <UserSideNav /> */}
          <div className="flex items-center gap-2">
            <div>
              <p className="text-lg font-semibold ">{userInfo?.name}</p>
              <p className="text-xs -mt-1 text-primary">Available</p>
            </div>

            <UserDashboardHeader />
          </div>
        </div>
      </div>
      <div className="lg:w-10/12 w-11/12 mx-auto my-8">
        <div className="">
          <UserDashboardNav />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
