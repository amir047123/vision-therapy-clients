import React from "react";
import { toast } from "react-toastify";
import PostHooks from "../../../Hooks/PostHooks";
import UpdateHooks from "../../../Hooks/UpdateHooks";
import { useEffect } from "react";
import { useState } from "react";

const SuperAdminSteps = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    firstStepsTitle: "",
    firstStepsDes: "",
    secondStepsTitle: "",
    secondStepsDes: "",
    thirdStepsTitle: "",
    thirdStepsDes: "",
  });

  //   load data
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/steps/getSteps`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setFormData(data?.data[0]);
        }
      });
  }, []);

  // update and post data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData?._id) {
        await UpdateHooks(
          `http://localhost:5000/api/v1/steps/updateSteps/${formData?._id}`,
          formData
        );
        toast?.success(`steps section Updated !`);
      } else {
        await PostHooks(
          `http://localhost:5000/api/v1/steps/addSteps`,
          formData,
          `steps data posted`
        );
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
        <h1>Update Steps Section</h1>
        <div className="h-1 mt-1 bg-secondary w-[40%]"></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded shadow-md w-full mx-auto"
      >
        <div className="mb-4"></div>
        <div className="bg-secondary/10 p-5 rounded-lg mb-4">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="name"
            >
              Section Name
            </label>
            <input
              type="text"
              name="title"
              required
              onChange={handleChange}
              value={formData.title}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Section Description
            </label>
            <textarea
              name="description"
              required
              onChange={handleChange}
              value={formData.description}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div className="bg-secondary/10 p-5 rounded-lg mb-4">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="name"
            >
              First Steps Title
            </label>
            <input
              type="text"
              name="firstStepsTitle"
              required
              onChange={handleChange}
              value={formData.firstStepsTitle}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              First Steps Description
            </label>
            <textarea
              name="firstStepsDes"
              required
              onChange={handleChange}
              value={formData.firstStepsDes}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div className="bg-secondary/10 p-5 rounded-lg mb-4">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="name"
            >
              Second Steps Title
            </label>
            <input
              type="text"
              name="secondStepsTitle"
              required
              onChange={handleChange}
              value={formData.secondStepsTitle}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Second Steps Description
            </label>
            <textarea
              name="secondStepsDes"
              required
              onChange={handleChange}
              value={formData.secondStepsDes}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div className="bg-secondary/10 p-5 rounded-lg mb-4">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="name"
            >
              Third Steps Title
            </label>
            <input
              type="text"
              name="thirdStepsTitle"
              required
              onChange={handleChange}
              value={formData.thirdStepsTitle}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Third Steps Description
            </label>
            <textarea
              name="thirdStepsDes"
              required
              onChange={handleChange}
              value={formData.thirdStepsDes}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            ></textarea>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 hover:scale-105 duration-300"
          >
            Update Why Medmyne !
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminSteps;
