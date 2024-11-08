import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

import DeleteHook from "../../Hooks/DeleteHook";
import ResellerEditProfileModal from "./SuperAdminModal/ResellerEditProfileModal";
const SuperAdminAllPatient = () => {
  const [reseller, setReseller] = useState([]);
  const [filteredResellers, setFilteredResellers] = useState([]);
  const [selectedResellerData, setSelectedResellerData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [modalIsOpenResellerEditProfile, setModalIsOpenResellerEditProfile] =
    useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          ` http://localhost:5000/api/v1/user/specific?fieldName=${"role"}&&fieldValue=${"user"}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem(
                "visionAccessToken"
              )}`,
            },
          }
        );
        const data = await response.json();

        setReseller(data?.data);
        setFilteredResellers(data?.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [refetch]);

  const handleSearch = () => {
    const results = reseller.filter((resellerData) => {
      return (
        resellerData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resellerData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof resellerData.phone === "string" &&
          resellerData.phone.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredResellers(results);
  };

  const openModalResellerEditProfile = (reseller) => {
    setSelectedResellerData(reseller);
    setModalIsOpenResellerEditProfile(true);
  };

  const closeModalResellerEditProfile = () => {
    setModalIsOpenResellerEditProfile(false);
  };

  // Current date formatting
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][date.getMonth()];
  const formattedDate = `${day} ${monthName} ${year}`;

  return (
    <div className=" mt-3">
      <div className="  lg:flex lg:justify-between">
        <div>
          <h1 className=" text-xl">Total Patient Account</h1>
          <p className=" font-thin">{formattedDate}</p>
        </div>
        <div className="  w-full lg:max-w-xs flex justify-center items-center gap-2  text-xl  rounded-md p-2">
          <p>Total Patient:</p>
          <p className="font-bold">{reseller.length}</p>
        </div>
      </div>

      <div className="flex relative rounded-md w-full mt-3">
        <input
          type="text"
          placeholder="Enter Reseller Name, Email, or Phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-md border border-r-white rounded-r-none border-gray-300 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="inline-flex items-center gap-2 bg-secondary text-white text-lg font-semibold py-3 px-6 rounded-r-md hover:bg-secondary/90"
        >
          <span>search</span>
          <span className="hidden md:block">
            <Icon icon="material-symbols:search"></Icon>
          </span>
        </button>
      </div>

      <div className="w-full overflow-x-auto mt-10">
        <table
          className="w-full text-left rounded w-overflow-x-auto "
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Name
              </th>
              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Email
              </th>
              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Phone
              </th>

              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Role
              </th>
              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Status
              </th>
              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Action
              </th>
            </tr>
            {[...filteredResellers]?.reverse()?.map((resellerData) => (
              <tr key={resellerData.id} className="shadow">
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {resellerData.name}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {resellerData.email}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {resellerData.phone}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {resellerData.role}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {resellerData.status}
                </td>
                <td className="h-16 px-6  transition duration-300 border-slate-200  text-secondary text-lg flex gap-2 items-center cursor-pointer">
                  <div
                    onClick={() => openModalResellerEditProfile(resellerData)}
                    className="border border-secondary py-2 px-3 rounded-md hover:bg-secondary/10 duration-300"
                  >
                    <Icon icon="basil:edit-outline" />
                  </div>

                  <button
                    aria-label="Open delete confirmation"
                    onClick={(e) => {
                      DeleteHook({
                        refetch,
                        setRefetch,
                        url: ` http://localhost:5000/api/v1/user/${resellerData?._id}`,
                      });
                    }}
                    className="border border-secondary py-2 px-3 rounded-md hover:bg-secondary/10 duration-300"
                  >
                    <Icon icon="material-symbols:delete-outline" />
                  </button>
                </td>

                <ResellerEditProfileModal
                  resellerData={selectedResellerData}
                  isOpen={modalIsOpenResellerEditProfile}
                  closeModal={closeModalResellerEditProfile}
                ></ResellerEditProfileModal>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminAllPatient;
