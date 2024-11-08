import React, { useState } from "react";
import Lottie from "lottie-react";
import updateAnimation from "../../../Assets/animation/change.json";
import { toast } from "react-toastify";
import AuthUser from "../../../Hooks/authUser";
import UpdateHooks from "../../../Hooks/UpdateHooks";
import { server_url } from "../../../Config/API";

const ChangePassword = () => {
  const { userInfo } = AuthUser();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== retypeNewPassword) {
      toast.error("New passwords do not match.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (!userInfo || !userInfo._id) {
      toast.error("User Not Found", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const BASE_URL = `${server_url}/user/change-password/${userInfo._id}`;
    await UpdateHooks(
      BASE_URL,
      {
        email: userInfo.email,
        newPassword,
        oldPassword,
      },
      true,
      "Password Changed"
    );

    e.target.reset();
  };

  return (
    <div className="bg-white my-10 p-5 rounded-lg shadow md:grid grid-cols-12 items-center gap-10">
      <div className="col-span-5 p-5">
        <Lottie animationData={updateAnimation} />
      </div>
      <form className="col-span-7 lg:px-10" onSubmit={handleChangePassword}>
        <div className="w-fit mb-5">
          <h2 className="text-secondary font-semibold mb-1 text-lg">
            Change Password
          </h2>
          <div className="h-1 bg-secondary w-[65%] rounded-full"></div>
        </div>
        {/* Extract each input field to its own component for better readability if required */}
        <PasswordField
          label="Previous Password"
          value={oldPassword}
          setValue={setOldPassword}
        />
        <PasswordField
          label="New Password"
          value={newPassword}
          setValue={setNewPassword}
          mtclassName="mt-3"
        />
        <PasswordField
          label="Re-type New Password"
          value={retypeNewPassword}
          setValue={setRetypeNewPassword}
          mtclassName="mt-3"
        />

        <button
          className="bg-secondary rounded-md hover:scale-105 text-white px-3 py-1.5 cursor-pointer duration-300 mt-5"
          type="submit"
        >
          CHANGE!
        </button>
      </form>
    </div>
  );
};

const PasswordField = ({ label, value, setValue, mtClass = "" }) => (
  <div className={mtClass}>
    <label className="font-medium text-black">{label}</label>
    <input
      className="w-full border-black border py-1.5 rounded-md px-3 mt-1 text-black"
      type="password"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
    />
  </div>
);

export default ChangePassword;
