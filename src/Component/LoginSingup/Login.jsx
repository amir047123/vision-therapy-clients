import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import AuthUser from "../../Hooks/authUser";
import Loading from "../../Shared/Loading";

const Login = () => {
  const { http, setToken } = AuthUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const issueDate = moment().format("YYYY-MM-DD");

  // Function to check if the user has an active package
  const getPackage = async (user, id) => {
    setLoading(true);
    console.log(id);
    await fetch(
      `http://localhost:3001/api/v1/package/specific?fieldName=${"userId"}&&fieldValue=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.data?.length) {
          const isExpire = data?.data?.[0]?.expireDate
            ? moment(issueDate).isAfter(data?.data?.[0]?.expireDate)
            : true;

          // If the package is not expired, redirect the user to their dashboard
          if (!isExpire) {
            navigate(`/${user?.role}Dashboard`);
            window.location.reload();
          } else {
            toast.error("You don't have any active package! :(");
            navigate(`/`);
            window.location.reload();
          }
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching package:", error);
        setLoading(false);
      });
  };

  // Handle form submission
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state while processing

    const email = e.target.email.value;
    const password = e.target.password.value;

    await http
      .post("/user/login", { email, password })
      .then((res) => {
        if (res?.data?.status === "success") {
          // Store access token in localStorage
          localStorage.setItem("visionAccessToken", res?.data?.token);
          toast.success("Login Successfully");

          // Save token and user information
          setToken(
            res.data.data.user.email,
            res.data.data.token,
            res.data.data.user.role,
            res.data.data.user,
            res.data.data.userIp
          );

          // Redirect based on user role
          if (res.data?.data?.data?.role === "user") {
            const d = res?.data?.data?.data;
            getPackage(d, d?._id);
          } else {
            navigate(`/${res.data?.data?.data?.role}Dashboard`);
            window.location.reload();
          }
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error", err.response?.data?.message || "Login failed");
        swal(
          "Error",
          `${err.response?.data?.message || "Login failed"}`,
          "error"
        );
        setLoading(false);
      });
  };

  // If loading, show the Loading component
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <form
        onSubmit={handelSubmit}
        className="lg:grid lg:grid-cols-1 gap-2 text-center mx-10 max-w-md min-w-[400px] bg-gray-50 p-10"
      >
        <p className="text-center text-xs mt-1 opacity-50">
          Login to use our special features
        </p>

        <div className="">
          <label
            htmlFor="email"
            className="block text-left text-sm font-bold text-gray-700"
          >
            E-mail
          </label>
          <input
            name="email"
            placeholder="Enter your E-mail"
            className="py-2 p-3 rounded-md shadow-md mt-2 w-full"
            type="email"
            required
          />
        </div>

        <div className="mt-2">
          <label
            htmlFor="password"
            className="block font-bold text-left text-sm text-gray-700"
          >
            Password
          </label>
          <input
            name="password"
            placeholder="Enter your Password"
            className="py-2 p-3 rounded-md shadow-md mt-2 w-full"
            type="password"
            required
          />
        </div>

        <Link
          className="text-left text-sm text-secondary underline"
          to="/resetPassword"
        >
          Forgot password?
        </Link>

        <div className="mt-2">
          <div className="justify-start items-center flex gap-2">
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 mt-3 rounded-md font-semibold hover:scale-105 duration-300"
            >
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
