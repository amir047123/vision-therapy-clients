import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";
import Loading from "../../Shared/Loading";

const SuperAdminDoctorViewAllPatient = () => {
  const { id } = useParams();

  const [patients, setPatients] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selected, setSelected] = useState("");
  const [filterData, setFilterData] = useState([]);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDoctor, setSelectedDoctor] = useState(null); // Changed from isOpen to selectedDoctor

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function closeModal() {
    setSelectedDoctor(null); // Close modal by setting selectedDoctor to null
  }

  function openModal(doctor) {
    setSelectedDoctor(doctor); // Open modal by setting selectedDoctor to the clicked doctor
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/user/${id}`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem("careSeeAccessToken")}`,
        }
      })
      .then((response) => {
        // Adjust the setUserData call to consider the response structure
        setUserData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/user/specific?fieldName=${"referralId"}&&fieldValue=${id}`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem("careSeeAccessToken")}`,
        }
      }
    ).then((res) =>
      res.json().then((data) => {
        setPatients(data?.data);
        setFilterData(data?.data);
      })
    );
  }, [id]);

  const filter = patients?.filter((user) => {
    const activity = user?.isActive ? "active" : "inActive";
    return (
      (searchInput &&
        user?.name?.toLowerCase()?.includes(searchInput?.toLowerCase())) ||
      (selected && activity === selected) ||
      (selected === "all" && (activity === "active" || "inActive"))
    );
  });
  useEffect(() => {
    setFilterData(filter);
  }, [searchInput, selected]);

  if (loading) {
    return <Loading></Loading>;
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-10">
      <div className="p-5 bg-white rounded-lg">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl">{userData.name} 's Patients</h2>
          </div>
          <div className="flex gap-5 justify-end text-sm md:text-base relative">
            <select
              onChange={(e) => setSelected(e.target.value)}
              className="border border-secondary px-3 rounded-lg"
              name="patientType"
            >
              <option value="all">All Practitioner</option>
              <option value="active">Active Practitioner</option>
              <option value="inActive">Inactive Practitioner</option>
            </select>
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              className="border border-secondary rounded-lg px-3  py-2 focus:outline-none"
              type="search"
              name="search"
              placeholder="search "
            />
          </div>
        </div>

        {/* all patients */}
        <div className="w-full overflow-x-auto mt-10">
          <table
            className="w-full text-left rounded w-overflow-x-auto "
            cellspacing="0"
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
                  Status
                </th>

                <th
                  scope="col"
                  className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
                >
                  Action
                </th>
              </tr>
              {[...filterData]?.reverse()?.map((patient) => (
                <tr key={patient?._id} className="shadow">
                  <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                    {capitalizeFirstLetter(patient.name)}
                  </td>
                  <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                    {patient.email}
                  </td>
                  <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                    {patient.phone}
                  </td>
                  <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                    {patient.status}
                  </td>
                  <td className="h-16 px-6  transition duration-300 border-slate-200  text-secondary text-lg flex gap-2 items-center">
                    <Link
                      to={`/superAdminDashboard/superadmin-doctor-patient-report/${patient._id}`}
                      className="border border-secondary py-2 px-3 rounded-md hover:bg-secondary/10 duration-300"
                    >
                      <Icon icon="ic:outline-auto-graph" />
                    </Link>

                    <Link
                      to={`/superAdminDashboard/superadmin-patient-edit-profile/${patient._id}`}
                    >
                      <button
                        //   onClick={() => openModal(patient)}

                        className="border border-secondary py-2 px-3 rounded-md hover:bg-secondary/10 duration-300"
                      >
                        <Icon icon="basil:edit-outline" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDoctorViewAllPatient;
