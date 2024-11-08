import React, { useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import countryCodes from "../../../CountryCode/CountryCode.json";
import AuthUser from "../../../Hooks/authUser";

const SuperAdminUserModal = ({ isOpen, closeModal }) => {
  const { userInfo } = AuthUser();
  //   console.log(userInfo);
  const [phone, setPhone] = useState("");

  const [countryCode, setCountryCode] = useState(
    countryCodes[0]?.dial_code || ""
  );

  const createUser = async (user) => {
    try {
      const response = await fetch(" http://localhost:5000/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to create User.");
      }

      toast.success("User created successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred.");
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phoneWithCountryCode = `${countryCode}${phone}`;
    const password = e.target.password.value;

    const user = {
      name,
      email,
      password,
      phone: phoneWithCountryCode,
      confirmPassword: password,
      role: "user",
    };
    // console.log(user);

    try {
      await createUser(user);
      console.log(user);

      e.target.reset(); // Reset the form
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="fixed z-50 inset-0 overflow-y-auto"
      aria-hidden="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              data-behavior="cancel"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={closeModal}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handelSubmit} className="grid grid-cols-1 gap-3 mt-5">
            <div className=" ">
              <h1>Add User</h1>
            </div>
            <input
              className="border border-secondary/50 w-full py-2 px-3 rounded-md focus:outline-none"
              type="text"
              name="name"
              required
              placeholder="Name"
            />
            <input
              className="border border-secondary/50 w-full py-2 px-3 rounded-md focus:outline-none"
              type="email"
              name="email"
              required
              placeholder="Email"
            />

            <div className="">
              <div className=" flex">
                <select
                  className="border border-secondary/50 w-44 py-2 px-3 focus:outline-none mb-2"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.dial_code}>
                      {country.name} ({country.dial_code})
                    </option>
                  ))}
                </select>
                <input
                  className="border border-secondary/50 w-full py-2 px-3 focus:outline-none mb-2"
                  type="number"
                  name="phone"
                  required
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <input
              className="border border-secondary/50 w-full py-2 px-3 rounded-md focus:outline-none"
              type="text"
              name="password"
              required
              placeholder="Password"
            />
            <input
              className=" bg-secondary text-white py-2 px-3 rounded-md w-fit cursor-pointer mt-5 hover:scale-105 duration-300"
              type="submit"
              value="+ Add New User"
            />
          </form>
        </div>

        {/* div Desing */}
      </div>
    </ReactModal>
  );
};

export default SuperAdminUserModal;
