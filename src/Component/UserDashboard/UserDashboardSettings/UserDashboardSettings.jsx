import React, { useState } from "react";
import AuthUser from "../../../Hooks/authUser";
import Loading from "../../../Shared/Loading";
import { useEffect } from "react";
import { getUserHook } from "../../../Hooks/getUserHook";
import UpdateHooks from "../../../Hooks/UpdateHooks";
import { server_url } from "../../../Config/API";

const UserDashboardSettings = () => {
  const { userInfo } = AuthUser();
  const [user, setUser] = useState([]);
  const [blue, setBlue] = useState(100);
  const [red, setRed] = useState(100);

  useEffect(() => {
    getUserHook(userInfo?._id, setUser);
  }, []);

  useEffect(() => {
    setRed(user?.redOpacity);
    setBlue(user?.blueOpacity);
  }, [user]);
  console.log(user);
  const handelChange = (e) => {
    e.preventDefault();
    UpdateHooks(
      `${server_url}/user/${userInfo?._id}`,
      {
        redOpacity: red,
        blueOpacity: blue,
      },
      true,
      "Color Updated !"
    );
  };

  return (
    <form
      onSubmit={handelChange}
      className="bg-black my-10 p-5 rounded-lg shadow-lg py-20"
    >
      <div className="flex justify-center gap-10 ">
        {/* red ball */}
        <div>
          <div
            style={{ opacity: `${red}%` }}
            className={`w-44 h-44 rounded-full bg-[#FF0000]`}
          ></div>
          <div>
            <input
              onChange={(e) => setRed(e.target.value)}
              value={red}
              className="h-1 w-44"
              type="range"
              name=""
              id=""
            />
          </div>
        </div>
        {/* blue ball */}
        <div>
          <div
            style={{ opacity: `${blue}%` }}
            className={`w-44 h-44 rounded-full bg-[#001AFF]`}
          ></div>
          <div>
            <input
              onChange={(e) => setBlue(e.target.value)}
              className="h-1 w-44"
              type="range"
              value={blue}
              name=""
              id=""
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary rounded-md py-1 px-5 text-white hover:scale-105 duration-500 block mx-auto mt-10"
      >
        UPDATE !
      </button>
    </form>
  );
};

export default UserDashboardSettings;
