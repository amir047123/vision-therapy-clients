import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import SuperAdminAllPatient from "./SuperAdminAllPatient";
import SuperAdminUserModal from "./SuperAdminModal/SuperAdminUserModal";

const SuperAdminDashboardIndex = () => {
  const [modalIsOpenAddUser, setModalIsOpenAddUser] = useState(false);
  const [user, setUser] = useState([]);
  const [totalAccount, setTotalAccount] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/user", {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              "visionAccessToken"
            )}`,
          },
        });
        const data = await response.json();
        const userData = data.data.filter((user) => user.role === "user");
        setTotalAccount(data?.data);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const openModalAddUser = () => {
    setModalIsOpenAddUser(true);
  };

  const closeModalAddUser = () => {
    setModalIsOpenAddUser(false);
  };

  return (
    <div className="">
      <div className=" lg:grid lg:grid-cols-3 gap-5  md:grid md:grid-cols-3 font-bold mb-4">
        <div className=" flex justify-center items-center  bg-[#E3156F] shadow text-white h-40 mb-2  max-w-xs  rounded-md gap-2 text-xl">
          <Icon icon="subway:admin-1"></Icon>
          <p>Total User: </p>
          <p>{totalAccount?.length}</p>
        </div>
        <div className=" flex justify-center items-center bg-[#DC3545] text-white shadow h-40 mb-2 max-w-xs rounded-md gap-2 text-xl">
          <Icon icon="subway:admin-1"></Icon>
          <p>Total Doctor:</p>
          <p>30</p>
        </div>
        <div className=" justify-center flex items-center bg-[#CF4514] text-white shadow h-40 mb-2 max-w-xs rounded-md gap-2 text-xl">
          <Icon icon="subway:admin-1"></Icon>
          <p>Total Patient: </p>
          <p>{user?.length}</p>
        </div>
      </div>
      <div className="bg-gray-200 h-[1px] w-full "></div>

      <div className=" flex justify-start items-center gap-5 mt-5">
        <div
          onClick={openModalAddUser}
          className="transform hover:scale-110 duration-300 flex justify-center p-3 items-center gap-2 bg-secondary shadow-md rounded-md w-36 text-white max-auto  cursor-pointer"
        >
          <Icon icon="gala:add"></Icon>
          <h1>Add user</h1>
        </div>

        <SuperAdminUserModal
          isOpen={modalIsOpenAddUser}
          closeModal={closeModalAddUser}
        ></SuperAdminUserModal>
      </div>
      <div className="bg-gray-200 h-[1px] w-full mt-5 "></div>

      <SuperAdminAllPatient />
    </div>
  );
};

export default SuperAdminDashboardIndex;
