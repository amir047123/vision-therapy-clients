import React from "react";
import { useNavigate } from "react-router";
import CreateUserHook from "../../Hooks/createUserHook";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const handelSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const dateOfBirth = e.target.dateOfBirth.value;
    const confirmPassword = e.target.confirmPassword.value;
    const user = { name, email, password, confirmPassword, dateOfBirth };
    if (password === confirmPassword) {
      CreateUserHook(user, navigate);
    } else {
      toast.error("Password & confirmPassword are not match !");
    }

    console.log(user);
  };
  return (
    <form onSubmit={handelSubmit}>
      <p className=" text-center text-xs mt-1  opacity-50">
        {" "}
        Sign up to use our special features
      </p>

      <div className="grid grid-cols-2 gap-5 text-center ">
        <div className="">
          <label
            htmlFor="firstName"
            className="block  font-bold text-left text-sm  text-gray-700"
          >
            Name
          </label>
          <input
            name="name"
            placeholder="Enter your Name"
            className="py-2 p-3 rounded-md shadow-md mt-2 w-full"
            type="text"
            required
          />
        </div>

        <div className="w-full">
          <label className="block font-bold text-left text-sm  text-gray-700">
            Date of Birth
          </label>

          <input
            className="py-2 p-3 rounded-md shadow-md mt-2 w-full"
            type="date"
            name="dateOfBirth"
            id="date"
            required
          />
        </div>
        <div className="">
          <label className="block  font-bold text-left text-sm  text-gray-700">
            E-mail
          </label>
          <input
            name="email"
            placeholder="Enter your E-mail"
            className="py-2 p-3 rounded-md shadow-md mt-2 w-full"
            type="text"
            required
          />
        </div>

        <div className="">
          <label className="block  font-bold text-left text-sm  text-gray-700">
            Phone Number
          </label>
          <input
            name="phone"
            placeholder="Enter your Phone Number"
            className="py-2 p-3 rounded-md shadow-md mt-2 w-full"
            type="text"
            required
          />
        </div>
        <div className="">
          <label className="block  font-bold text-left text-sm  text-gray-700">
            Password
          </label>
          <input
            name="password"
            placeholder="Enter your Password"
            className="py-2 p-3 rounded-md shadow-md mt-2 w-full"
            type="text"
            required
          />
        </div>
        <div className="">
          <label className="block  font-bold text-left text-sm  text-gray-700">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            placeholder="Enter your Confirm Password"
            className="py-2 p-3 rounded-md shadow-md mt-2 w-full"
            type="text"
            required
          />
        </div>
      </div>
      <div className="mt-10">
        <div className="  justify-start  items-center flex gap-2">
          <button
            type="submit"
            className=" bg-secondary text-white px-4 py-2 rounded-md  font-semibold hover:scale-105 duration-300"
          >
            Sing Up !
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
