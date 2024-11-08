
import { Icon } from "@iconify/react";
import  { useEffect, useState } from "react";
import { useParams } from "react-router";
import moment from "moment";

const SuperAdminPatientEditProfile = () => {
  const { id } = useParams(); // Get the patientId from the URL
  const [patient, setPatient] = useState([]);
  const [packages, setPackages] = useState([]);

  const startDate = moment("2023-09-17");
  const endDate = moment("2023-09-10");

  const diffInDays = startDate.diff(endDate, "days");
  console.log(diffInDays);

  const [selectedDiv, setSelectedDiv] = useState(0); // Default to 0 for 'General'

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/user/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("careSeeAccessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPatient(data?.data));
  }, [id]);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/package/specific?fieldName=${"userId"}&&fieldValue=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length) {
          setPackages(data?.data?.[0]);
        }
      });
  }, [id]);

  return (
    <div className="bg-white p-5 mt-5">
      <div className="flex justify-start items-center">
        <button
          onClick={() => setSelectedDiv(2)} // Changed to 2 for 'License'
          className={
            selectedDiv !== 2 // Changed to 2
              ? " px-4 py-2 flex items-center justify-center font-semibold text-black bg-[#D3EEF9] duration-500"
              : " px-4 py-2 flex items-center justify-center font-semibold bg-secondary text-white duration-500"
          }
        >
          <Icon icon="icon-park-outline:general-branch" />{" "}
          {/* Change to the appropriate icon */}
          <h1 className="ml-2">License</h1>
        </button>
      </div>

    </div>
  );
};

export default SuperAdminPatientEditProfile;
