import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteHook from "../../../Hooks/DeleteHook";
import { singleImageUpload } from "../../../Hooks/ImageUpload";
import PostHooks from "../../../Hooks/PostHooks";
import UpdateHooks from "../../../Hooks/UpdateHooks";

const SuperAdminDoctorReview = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorName: "",
    doctorReview: "",
    specialist: "",
  });

  //   load data
  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/doctorReview/getdoctorReview`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setDoctors(data?.data);
        }
      });
  }, [refetch]);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  // update and post data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData?._id) {
        await UpdateHooks(
          `http://localhost:3001/api/v1/doctorReview/updateDoctorReview/${formData?._id}`,
          { ...formData, doctorImg: imageUrl }
        );
        toast?.success(`Doctor section Updated !`);
      } else {
        await PostHooks(
          `http://localhost:3001/api/v1/doctorReview/adddoctorReview`,
          { ...formData, doctorImg: imageUrl },
          `Doctor Review posted`
        );
        setFormData({
          doctorName: "",
          doctorReview: "",
          specialist: "",
        });
        e.target.reset();
        setImageUrl("");
        setTimeout(() => {
          setRefetch(!refetch);
        }, 1000);
      }
    } catch (error) {
      toast?.success(error);
    }
  };

  // set data in state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeUploadImage = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    singleImageUpload(formData, setImageUrl);
  };
  return (
    <div className="bg-white">
      <div className="w-fit  text-xl font-semibold mb-5">
        <h1>Update Doctor Review Section</h1>
        <div className="h-1 mt-1 bg-secondary w-[40%]"></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded shadow-md w-full mx-auto"
      >
        <div className="mb-4"></div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="doctorImg"
          >
            Doctor Image
          </label>
          <input
            type="file"
            name="doctorImg"
            onChange={handleChangeUploadImage}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Doctor Name
          </label>
          <input
            type="text"
            name="doctorName"
            onChange={handleChange}
            value={formData.doctorName}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Specialist
          </label>
          <input
            type="text"
            name="specialist"
            onChange={handleChange}
            value={formData.specialist}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Doctor Review
          </label>
          <textarea
            name="doctorReview"
            onChange={handleChange}
            value={formData.doctorReview}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 hover:scale-105 duration-300"
          >
            Update Doctor Review !
          </button>
        </div>
      </form>

      <div className="w-fit  text-xl font-semibold my-5">
        <h1>All Doctors Reviews</h1>
        <div className="h-1 mt-1 bg-secondary w-[40%]"></div>
      </div>

      <div className=" my-10">
        <table
          className="w-full text-left rounded w-overflow-x-auto "
          cellSpacing="0"
        >
          <thead>
            <tr className="text-center">
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Name
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Specialist
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Review
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr className="border-b text-center" key={doctor._id}>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                  <div className="w-fit mx-auto flex items-center gap-2">
                    <img
                      className="w-7 rounded-full border border-secondary"
                      src={doctor?.doctorImg}
                      alt=""
                    />{" "}
                    {doctor.doctorName}
                  </div>
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {doctor.specialist}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {doctor.doctorReview?.slice(0, 40)}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  <div className="flex justify-center gap-3">
                    <button
                      className=" border border-red-500 bg-red-100 text-white px-1 py-1 rounded  text-2xl"
                      onClick={() => {
                        DeleteHook({
                          setRefetch,
                          refetch,
                          url: `http://localhost:3001/api/v1/doctorReview/deleteDoctorReview/${doctor?._id}`,
                        });
                      }}
                    >
                      <Icon icon="material-symbols:delete-outline" />
                    </button>
                    <button
                      onClick={() => {
                        setFormData(doctor);
                        setImageUrl(doctor?.doctorImg);
                        scrollToTop();
                      }}
                      className="border border-secondary py-1 px-1 rounded-md hover:bg-secondary/10 duration-300 text-xl "
                    >
                      <Icon icon="basil:edit-outline" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminDoctorReview;
