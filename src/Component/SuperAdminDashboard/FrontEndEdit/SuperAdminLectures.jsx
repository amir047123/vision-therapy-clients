import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import PostHooks from "../../../Hooks/PostHooks";
import DeleteHook from "../../../Hooks/DeleteHook";
import { Icon } from "@iconify/react";
import UpdateHooks from "../../../Hooks/UpdateHooks";

const SuperAdminDoctorReview = () => {
  const [refetch, setRefetch] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [formData, setFormData] = useState({
    lecturersName: "",
    videoUrl: "",
    videoTitle: "",
    videoDes: "",
  });

  //   load data
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/lecture/getlecture`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setLectures(data?.data);
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
          `http://localhost:5000/api/v1/lecture/updateLecture/${formData?._id}`,
          formData
        );
        toast?.success(`Lecture section Updated !`);
      } else {
        await PostHooks(
          `http://localhost:5000/api/v1/lecture/addLecture`,
          formData,
          `Lecture posted`
        );
        e.target.reset();

        setTimeout(() => {
          setRefetch(!refetch);
        }, 1000);
        setFormData({
          lecturersName: "",
          videoUrl: "",
          videoTitle: "",
          videoDes: "",
        });
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

  return (
    <div className="bg-white">
      <div className="w-fit  text-xl font-semibold mb-5">
        <h1>Update Lectures Section</h1>
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
            htmlFor="name"
          >
            Lectures Name
          </label>
          <input
            type="text"
            name="lecturersName"
            onChange={handleChange}
            value={formData.lecturersName}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Video Title
          </label>
          <input
            type="text"
            name="videoTitle"
            onChange={handleChange}
            value={formData.videoTitle}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Video Url
          </label>
          <textarea
            name="videoUrl"
            onChange={handleChange}
            value={formData.videoUrl}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Video Description (40 word)
          </label>
          <textarea
            name="videoDes"
            onChange={handleChange}
            value={formData.videoDes}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 hover:scale-105 duration-300"
          >
            Update lecture !
          </button>
        </div>
      </form>

      <div className="w-fit  text-xl font-semibold my-5">
        <h1>All lecture</h1>
        <div className="h-1 mt-1 bg-secondary w-[40%]"></div>
      </div>

      <div className=" my-10">
        <table
          className="w-full text-left rounded w-overflow-x-auto "
          cellspacing="0"
        >
          <thead>
            <tr className="text-center">
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Lecturers Name
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Lecture Title
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Video Description
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lecture) => (
              <tr className="border-b text-center" key={lecture._id}>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {lecture.lecturersName}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {lecture.videoTitle}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {lecture.videoDes?.slice(0, 50)}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  <div className="flex justify-center gap-3">
                    <button
                      className=" border border-red-500 bg-red-100 text-white px-1 py-1 rounded  text-2xl"
                      onClick={() =>
                        DeleteHook({
                          setRefetch,
                          refetch,
                          url: `http://localhost:5000/api/v1/lecture/deleteLecture/${lecture?._id}`,
                        })
                      }
                    >
                      <Icon icon="material-symbols:delete-outline" />
                    </button>
                    <button
                      onClick={() => {
                        setFormData(lecture);
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
