import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import AuthUser from "../../Hooks/authUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Pricing = () => {
  const issueDate = moment().format("YYYY-MM-DD");
  const { userInfo } = AuthUser();
  const navigate = useNavigate();
  const [sub, setSub] = useState([]);
  const isExpire = sub?.expireDate
    ? moment(issueDate).isAfter(sub?.expireDate)
    : true;

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/package/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length) {
          setSub(data?.data?.[0]);
        }
      });
  }, [userInfo?._id]);

  const handlePayment = (packagePrice, packageName, day) => {
    const today = moment();
    const issueDate = moment().format("YYYY-MM-DD");
    const expireDate = today.add(day ? day : 1, "days").format("YYYY-MM-DD");
    if (!userInfo) {
      navigate("/login");
      return toast.warning("You must be logged in to purchase packages!");
    } else if (!isExpire) {
      return toast.warning(
        `You already have an package. Expire Date is ${sub?.expireDate}`
      );
    }
    const data = {
      totalDay: day,
      userEmail: userInfo?.email,
      userId: userInfo?._id,
      userName: userInfo?.name,
      issueDate,
      expireDate,
      packagePrice,
      packageName,
    };
    fetch("http://localhost:5000/api/v1/package/addPackage", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("visionAccessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.url) {
          window.location.replace(data?.url);
        } else {
          toast.error(data?.message);
        }
      });
  };
  return (
    <section className="relative py-20 overflow-hidden bg-blue-50">
      <div className="container md:px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-18 text-center">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold bg-blue-700 text-blue-100 rounded-full">
            OUR PLANS
          </span>
          <h1 className="font-heading text-4xl xs:text-4xl md:text-7xl font-bold text-gray-900 mb-10">
            <span>Get your</span>
            <span className="font-serif italic text-primary lg:px-5 px-3">
              PLANS
            </span>
            {/* <span>here</span> */}
          </h1>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 -mx-4">
            <div className="w-full lg:w-full px-4 mb-10 lg:mb-0 bg-red">
              <div className="relative max-w-sm lg:max-w-none mx-auto bg-white rounded-6xl">
                <div className="pt-2 px-2">
                  <div className="relative pt-12 pb-10 px-6 h-52 rounded-6xl bg-purple-50 overflow-hidden">
                    <img
                      className="absolute bottom-0 left-0 w-full"
                      src="saturn-assets/images/pricing/wave-bg1.svg"
                      alt=""
                    />
                    <div className="relative text-center">
                      <span className="inline-block py-1.5 px-5 mb-6 font-semibold text-pink-500 bg-pink-200 rounded-full">
                        1 DAY
                      </span>
                      <span className="block text-5xl font-bold">৳99.00</span>
                    </div>
                  </div>
                </div>
                <div className="h-8 mb-7 relative">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full">
                    <div className="w-full border-b-8 border-dotted border-blue-50"></div>
                  </div>
                  <div className="absolute top-0 left-0 transform -translate-x-1/2 w-8 h-8 bg-blue-50 rounded-full"></div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 w-8 h-8 bg-blue-50 rounded-full"></div>
                </div>
                <div className="px-6 pb-12">
                  <ul className="mb-12">
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/green-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-900">
                        1 days access to the conference
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/green-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-900">
                        Music, launch and snack
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/green-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-900">
                        Meet Event Speaker
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/red-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-400">
                        Live video online access
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/red-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-400">
                        Get a certificate
                      </span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <button
                      onClick={() => handlePayment(99, "one day package", 1)}
                      className="relative group inline-block py-4 px-5 items-center text-blue-50 font-semibold bg-blue-700 rounded-full overflow-hidden"
                    >
                      <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                      <div className="relative flex items-center justify-center">
                        <span className="mr-2">Choose Plan</span>
                        <span>
                          <svg
                            width="16"
                            height="12"
                            viewbox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.71 1.20998C14.617 1.11625 14.5064 1.04186 14.3846 0.991091C14.2627 0.940323 14.132 0.914185 14 0.914185C13.868 0.914185 13.7373 0.940323 13.6154 0.991091C13.4936 1.04186 13.383 1.11625 13.29 1.20998L5.84001 8.66998L2.71001 5.52998C2.61349 5.43674 2.49955 5.36343 2.37469 5.31423C2.24984 5.26502 2.11651 5.24089 1.98233 5.24321C1.84815 5.24553 1.71574 5.27426 1.59266 5.32776C1.46959 5.38125 1.35825 5.45846 1.26501 5.55498C1.17177 5.6515 1.09846 5.76545 1.04925 5.8903C1.00005 6.01516 0.97592 6.14848 0.978241 6.28266C0.980563 6.41684 1.00929 6.54925 1.06278 6.67233C1.11628 6.79541 1.19349 6.90674 1.29001 6.99998L5.13001 10.84C5.22297 10.9337 5.33358 11.0081 5.45543 11.0589C5.57729 11.1096 5.708 11.1358 5.84001 11.1358C5.97202 11.1358 6.10273 11.1096 6.22459 11.0589C6.34645 11.0081 6.45705 10.9337 6.55001 10.84L14.71 2.67998C14.8115 2.58634 14.8925 2.47269 14.9479 2.34619C15.0033 2.21969 15.0319 2.08308 15.0319 1.94498C15.0319 1.80688 15.0033 1.67028 14.9479 1.54378C14.8925 1.41728 14.8115 1.30363 14.71 1.20998Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-full px-4 mb-10 lg:mb-0">
              <div className="relative max-w-sm lg:max-w-none mx-auto bg-blue-500 rounded-6xl">
                <div className="pt-2 px-2">
                  <div className="relative pt-12 pb-10 px-6 h-52 rounded-6xl bg-blue-700 overflow-hidden">
                    <img
                      className="absolute bottom-0 left-0 w-full"
                      src="saturn-assets/images/pricing/wave-bg2.svg"
                      alt=""
                    />
                    <div className="relative text-center">
                      <span className="inline-block py-1.5 px-5 mb-6 font-semibold text-white bg-blue-500 rounded-full">
                        1 MONTH
                      </span>
                      <span className="block text-5xl font-bold text-white">
                        ৳149.00
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-8 mb-7 relative">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full">
                    <div className="w-full border-b-8 border-dotted border-blue-50"></div>
                  </div>
                  <div className="absolute top-0 left-0 transform -translate-x-1/2 w-8 h-8 bg-blue-50 rounded-full"></div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 w-8 h-8 bg-blue-50 rounded-full"></div>
                </div>
                <div className="px-6 pb-12">
                  <ul className="mb-12">
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/blue-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-50">
                        1 days access to the conference
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/blue-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-50">
                        Music, launch and snack
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/blue-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-50">
                        Meet Event Speaker
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/blue-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-50">
                        Live video online access
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/blue-disable.svg"
                        alt=""
                      />
                      <span className="ml-3 text-blue-400">
                        Get a certificate
                      </span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <button
                      onClick={() =>
                        handlePayment(149, "one Month package", 30)
                      }
                      className="relative group inline-block py-4 px-5 items-center text-blue-900 hover:text-blue-50 font-semibold bg-white rounded-full overflow-hidden transition duration-300"
                    >
                      <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                      <div className="relative flex items-center justify-center">
                        <span className="mr-2">Choose Plan</span>
                        <span>
                          <svg
                            width="16"
                            height="12"
                            viewbox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.71 1.20998C14.617 1.11625 14.5064 1.04186 14.3846 0.991091C14.2627 0.940323 14.132 0.914185 14 0.914185C13.868 0.914185 13.7373 0.940323 13.6154 0.991091C13.4936 1.04186 13.383 1.11625 13.29 1.20998L5.84001 8.66998L2.71001 5.52998C2.61349 5.43674 2.49955 5.36343 2.37469 5.31423C2.24984 5.26502 2.11651 5.24089 1.98233 5.24321C1.84815 5.24553 1.71574 5.27426 1.59266 5.32776C1.46959 5.38125 1.35825 5.45846 1.26501 5.55498C1.17177 5.6515 1.09846 5.76545 1.04925 5.8903C1.00005 6.01516 0.97592 6.14848 0.978241 6.28266C0.980563 6.41684 1.00929 6.54925 1.06278 6.67233C1.11628 6.79541 1.19349 6.90674 1.29001 6.99998L5.13001 10.84C5.22297 10.9337 5.33358 11.0081 5.45543 11.0589C5.57729 11.1096 5.708 11.1358 5.84001 11.1358C5.97202 11.1358 6.10273 11.1096 6.22459 11.0589C6.34645 11.0081 6.45705 10.9337 6.55001 10.84L14.71 2.67998C14.8115 2.58634 14.8925 2.47269 14.9479 2.34619C15.0033 2.21969 15.0319 2.08308 15.0319 1.94498C15.0319 1.80688 15.0033 1.67028 14.9479 1.54378C14.8925 1.41728 14.8115 1.30363 14.71 1.20998Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-full px-4">
              <div className="relative max-w-sm lg:max-w-none mx-auto bg-white rounded-6xl">
                <div className="pt-2 px-2">
                  <div className="relative pt-12 pb-10 px-6 h-52 rounded-6xl bg-purple-50 overflow-hidden">
                    <img
                      className="absolute bottom-0 left-0 w-full"
                      src="saturn-assets/images/pricing/wave-bg1.svg"
                      alt=""
                    />
                    <div className="relative text-center">
                      <span className="inline-block py-1.5 px-5 mb-6 font-semibold text-indigo-500 bg-indigo-100 rounded-full">
                        3 MONTHS
                      </span>
                      <span className="block text-5xl font-bold">৳199.00</span>
                    </div>
                  </div>
                </div>
                <div className="h-8 mb-7 relative">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full">
                    <div className="w-full border-b-8 border-dotted border-blue-50"></div>
                  </div>
                  <div className="absolute top-0 left-0 transform -translate-x-1/2 w-8 h-8 bg-blue-50 rounded-full"></div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 w-8 h-8 bg-blue-50 rounded-full"></div>
                </div>
                <div className="px-6 pb-12">
                  <ul className="mb-12">
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/green-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-900">
                        1 days access to the conference
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/green-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-900">
                        Music, launch and snack
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/green-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-900">
                        Meet Event Speaker
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/green-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-900">
                        Live video online access
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/green-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-900">
                        Get a certificate
                      </span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <button
                      onClick={() =>
                        handlePayment(199, "three months package", 90)
                      }
                      className="relative group inline-block py-4 px-5 items-center text-blue-50 font-semibold bg-blue-700 rounded-full overflow-hidden"
                    >
                      <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                      <div className="relative flex items-center justify-center">
                        <span className="mr-2">Choose Plan</span>
                        <span>
                          <svg
                            width="16"
                            height="12"
                            viewbox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.71 1.20998C14.617 1.11625 14.5064 1.04186 14.3846 0.991091C14.2627 0.940323 14.132 0.914185 14 0.914185C13.868 0.914185 13.7373 0.940323 13.6154 0.991091C13.4936 1.04186 13.383 1.11625 13.29 1.20998L5.84001 8.66998L2.71001 5.52998C2.61349 5.43674 2.49955 5.36343 2.37469 5.31423C2.24984 5.26502 2.11651 5.24089 1.98233 5.24321C1.84815 5.24553 1.71574 5.27426 1.59266 5.32776C1.46959 5.38125 1.35825 5.45846 1.26501 5.55498C1.17177 5.6515 1.09846 5.76545 1.04925 5.8903C1.00005 6.01516 0.97592 6.14848 0.978241 6.28266C0.980563 6.41684 1.00929 6.54925 1.06278 6.67233C1.11628 6.79541 1.19349 6.90674 1.29001 6.99998L5.13001 10.84C5.22297 10.9337 5.33358 11.0081 5.45543 11.0589C5.57729 11.1096 5.708 11.1358 5.84001 11.1358C5.97202 11.1358 6.10273 11.1096 6.22459 11.0589C6.34645 11.0081 6.45705 10.9337 6.55001 10.84L14.71 2.67998C14.8115 2.58634 14.8925 2.47269 14.9479 2.34619C15.0033 2.21969 15.0319 2.08308 15.0319 1.94498C15.0319 1.80688 15.0033 1.67028 14.9479 1.54378C14.8925 1.41728 14.8115 1.30363 14.71 1.20998Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-full px-4 mb-10 lg:mb-0">
              <div className="relative max-w-sm lg:max-w-none mx-auto bg-blue-500 rounded-6xl">
                <div className="pt-2 px-2">
                  <div className="relative pt-12 pb-10 px-6 h-52 rounded-6xl bg-blue-700 overflow-hidden">
                    <img
                      className="absolute bottom-0 left-0 w-full"
                      src="saturn-assets/images/pricing/wave-bg2.svg"
                      alt=""
                    />
                    <div className="relative text-center">
                      <span className="inline-block py-1.5 px-5 mb-6 font-semibold text-white bg-blue-500 rounded-full">
                        6 MONTHS
                      </span>
                      <span className="block text-5xl font-bold text-white">
                        ৳230.00
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-8 mb-7 relative">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full">
                    <div className="w-full border-b-8 border-dotted border-blue-50"></div>
                  </div>
                  <div className="absolute top-0 left-0 transform -translate-x-1/2 w-8 h-8 bg-blue-50 rounded-full"></div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 w-8 h-8 bg-blue-50 rounded-full"></div>
                </div>
                <div className="px-6 pb-12">
                  <ul className="mb-12">
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/blue-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-50">
                        1 days access to the conference
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/blue-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-50">
                        Music, launch and snack
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/blue-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-50">
                        Meet Event Speaker
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/blue-check.svg"
                        alt=""
                      />
                      <span className="ml-3 text-gray-50">
                        Live video online access
                      </span>
                    </li>
                    <li className="flex mb-5 items-center">
                      <img
                        src="saturn-assets/images/pricing/blue-disable.svg"
                        alt=""
                      />
                      <span className="ml-3 text-blue-400">
                        Get a certificate
                      </span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <button
                      onClick={() =>
                        handlePayment(230, "six month package", 180)
                      }
                      className="relative group inline-block py-4 px-5 items-center text-blue-900 hover:text-blue-50 font-semibold bg-white rounded-full overflow-hidden transition duration-300"
                    >
                      <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                      <div className="relative flex items-center justify-center">
                        <span className="mr-2">Choose Plan</span>
                        <span>
                          <svg
                            width="16"
                            height="12"
                            viewbox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.71 1.20998C14.617 1.11625 14.5064 1.04186 14.3846 0.991091C14.2627 0.940323 14.132 0.914185 14 0.914185C13.868 0.914185 13.7373 0.940323 13.6154 0.991091C13.4936 1.04186 13.383 1.11625 13.29 1.20998L5.84001 8.66998L2.71001 5.52998C2.61349 5.43674 2.49955 5.36343 2.37469 5.31423C2.24984 5.26502 2.11651 5.24089 1.98233 5.24321C1.84815 5.24553 1.71574 5.27426 1.59266 5.32776C1.46959 5.38125 1.35825 5.45846 1.26501 5.55498C1.17177 5.6515 1.09846 5.76545 1.04925 5.8903C1.00005 6.01516 0.97592 6.14848 0.978241 6.28266C0.980563 6.41684 1.00929 6.54925 1.06278 6.67233C1.11628 6.79541 1.19349 6.90674 1.29001 6.99998L5.13001 10.84C5.22297 10.9337 5.33358 11.0081 5.45543 11.0589C5.57729 11.1096 5.708 11.1358 5.84001 11.1358C5.97202 11.1358 6.10273 11.1096 6.22459 11.0589C6.34645 11.0081 6.45705 10.9337 6.55001 10.84L14.71 2.67998C14.8115 2.58634 14.8925 2.47269 14.9479 2.34619C15.0033 2.21969 15.0319 2.08308 15.0319 1.94498C15.0319 1.80688 15.0033 1.67028 14.9479 1.54378C14.8925 1.41728 14.8115 1.30363 14.71 1.20998Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
