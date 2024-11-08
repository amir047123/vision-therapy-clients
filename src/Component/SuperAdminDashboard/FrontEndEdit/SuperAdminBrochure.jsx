import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import PostHooks from "../../../Hooks/PostHooks";
import DeleteHook from "../../../Hooks/DeleteHook";
import { Icon } from "@iconify/react";
import UpdateHooks from "../../../Hooks/UpdateHooks";
import JoditEditor from "jodit-react";

const SuperAdminBrochure = () => {
  const [refetch, setRefetch] = useState(false);
  const [brochurees, setBrochurees] = useState([]);
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    brochureTitle: "",
    brochure: "",
    writerName: "",
    importantUrl: "",
  });

  //   load data
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/brochure/getbrochure`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setBrochurees(data?.data);
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
          `http://localhost:5000/api/v1/brochure/updateBrochure/${formData?._id}`,
          formData
        );
        toast?.success(`Brochure section Updated !`);
      } else {
        await PostHooks(
          `http://localhost:5000/api/v1/brochure/addBrochure`,
          formData,
          `Brochure posted`
        );
        e.target.reset();

        setTimeout(() => {
          setRefetch(!refetch);
        }, 1000);
        setFormData({
          brochureTitle: "",
          brochure: "",
          writerName: "",
          importantUrl: "",
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
        <h1>Update Brochure Section</h1>
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
            Brochureers Name
          </label>
          <input
            type="text"
            name="writerName"
            onChange={handleChange}
            value={formData.writerName}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Brochure Title
          </label>
          <input
            type="text"
            name="brochureTitle"
            onChange={handleChange}
            value={formData.brochureTitle}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Brochure
          </label>
          <JoditEditor
            ref={editor}
            value={formData?.brochure}
            onChange={(newContent) => {
              setFormData({
                ...formData,
                brochure: newContent,
              });
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Important Link (Optional)
          </label>
          <textarea
            name="importantUrl"
            onChange={handleChange}
            value={formData.importantUrl}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 hover:scale-105 duration-300"
          >
            Update brochure !
          </button>
        </div>
      </form>

      <div className="w-fit  text-xl font-semibold my-5">
        <h1>All brochure</h1>
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
                Brochureers Name
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Brochure Title
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Brochure
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {brochurees.map((brochure) => (
              <tr className="border-b text-center" key={brochure._id}>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {brochure.writerName}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {brochure.brochureTitle}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {/* {brochure.brochure?.slice(0, 50)} */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: brochure?.brochure?.slice(0, 50),
                    }}
                  ></div>
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  <div className="flex justify-center gap-3">
                    <button
                      className=" border border-red-500 bg-red-100 text-white px-1 py-1 rounded  text-2xl"
                      onClick={() =>
                        DeleteHook({
                          setRefetch,
                          refetch,
                          url: `http://localhost:5000/api/v1/brochure/deleteBrochure/${brochure?._id}`,
                        })
                      }
                    >
                      <Icon icon="material-symbols:delete-outline" />
                    </button>
                    <button
                      onClick={() => {
                        setFormData(brochure);
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

export default SuperAdminBrochure;
