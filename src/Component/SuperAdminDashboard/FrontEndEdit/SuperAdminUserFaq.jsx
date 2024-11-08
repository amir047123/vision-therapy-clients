import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import PostHooks from "../../../Hooks/PostHooks";
import DeleteHook from "../../../Hooks/DeleteHook";
import { Icon } from "@iconify/react";
import UpdateHooks from "../../../Hooks/UpdateHooks";

const SuperAdminUserFaq = () => {
  const [refetch, setRefetch] = useState(false);
  const [userFaq, setUserFaq] = useState([]);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  //   load data
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/userFaq/getuserFaq`,{
      headers: {
        authorization: `Bearer ${localStorage.getItem("visionAccessToken")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setUserFaq(data?.data);
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
          `http://localhost:5000/api/v1/userFaq/updateUserFaq/${formData?._id}`,
          formData
        );
        toast?.success(`UserFaq section Updated !`);
      } else {
        await PostHooks(
          `http://localhost:5000/api/v1/userFaq/addUserFaq`,
          formData,
          `UserFaq posted`
        );
        e.target.reset();

        setTimeout(() => {
          setRefetch(!refetch);
        }, 1000);
        setFormData({
          question: "",
          answer: "",
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
        <h1>Update UserFaq Section</h1>
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
            Question
          </label>
          <input
            type="text"
            name="question"
            onChange={handleChange}
            value={formData.question}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Answer
          </label>
          <textarea
            name="answer"
            onChange={handleChange}
            rows={5}
            value={formData.answer}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 hover:scale-105 duration-300"
          >
            Update userFaq !
          </button>
        </div>
      </form>

      <div className="w-fit  text-xl font-semibold my-5">
        <h1>All User Faq</h1>
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
                Question
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Answer
              </th>

              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userFaq.map((faq) => (
              <tr className="border-b text-center" key={faq._id}>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {faq.question}
                </td>

                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {faq.answer?.slice(0, 50)}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  <div className="flex justify-center gap-3">
                    <button
                      className=" border border-red-500 bg-red-100 text-white px-1 py-1 rounded  text-2xl"
                      onClick={() =>
                        DeleteHook({
                          setRefetch,
                          refetch,
                          url: `http://localhost:5000/api/v1/userFaq/deleteUserFaq/${faq?._id}`,
                        })
                      }
                    >
                      <Icon icon="material-symbols:delete-outline" />
                    </button>
                    <button
                      onClick={() => {
                        setFormData(faq);
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

export default SuperAdminUserFaq;
