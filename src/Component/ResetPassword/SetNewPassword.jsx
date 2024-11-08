import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForgetImg from "../../Assets/reset.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { server_url } from "../../Config/API";
import UpdateHooks from "../../Hooks/UpdateHooks";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const loginEmail = localStorage.getItem("genzam-login-email");
  const [user, setUser] = useState({});
  const email = JSON.parse(loginEmail);
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/user/by-email?email=${email}`,{
      headers: {
        authorization: `Bearer ${localStorage.getItem("careSeeAccessToken")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [email]);
  // const [user, setUser] = useState(null);
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleResetPassword = (data) => {
    const updatedPassword = {
      password: data.password,
    };
    const BASE_URL = `${server_url}/user/reset-password/${user?.data._id}`;
    UpdateHooks(BASE_URL, updatedPassword, true, "Password Changed");
    navigate("/login");
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 bg-[#e4f6fa]">
      {/* Reset page image */}
      <div className="w-full flex justify-center items-center">
        <img className="w-[50%]" src={CommonForgetImg} alt="reset img" />
      </div>
      {/* login form */}
      <div className="w-[100%] bg-gradient-to-tr from-primary via-lightPrimary to-secondLightPrimary md:rounded-l-3xl">
        <div className="w-[75%] lg:w-[65%] mx-auto my-36">
          <h2 className="text-2xl font-medium text-white">Set new password</h2>
          {/*form start */}
          <form onSubmit={handleSubmit(handleResetPassword)} className="py-10">
            {/* input password */}
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-white">
                Password
              </span>
              <input
                {...register("password", { required: true })}
                type="password"
                className="mt-2 px-3 py-3 border-2 shadow-sm focus:outline-none border-white bg-transparent placeholder-slate-300  block w-full rounded-md sm:text-sm"
                placeholder="new password"
              />
            </label>

            <button
              type="submit"
              className="py-3 text-center w-full bg-gradient-to-tr from-primary via-lightPrimary to-secondLightPrimary  mt-6 border-2 border-whiteSmoke rounded-md text-white font-medium cursor-pointer mb-10 block"
            >
              Reset password
            </button>

            <small className="text-white">
              <span className="pr-2 text-lg">←</span> Back to{" "}
              <Link to="/login" className="font-medium hover:underline">
                SignIn
              </Link>
            </small>
          </form>
          {/*form end */}
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
