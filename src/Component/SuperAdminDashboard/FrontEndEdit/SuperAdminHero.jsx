import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PostHooks from "../../../Hooks/PostHooks";
import UpdateHooks from "../../../Hooks/UpdateHooks";

const SuperAdminHero = () => {
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  //   load data
  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/hero/getHero`)
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
          `http://localhost:3001/api/v1/hero/updateHero/${formData?._id}`,
          formData
        );
        toast?.success(`Hero section Updated !`);
      } else {
        await PostHooks(
          `http://localhost:3001/api/v1/hero/addHero`,
          formData,
          `hero data posted`
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
        <h1>Update Hero Section</h1>
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
            Title:
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
            Content:
          </label>

          <JoditEditor
            ref={editor}
            value={formData?.content}
            onChange={(newContent) => {
              setFormData({
                ...formData,
                content: newContent,
              });
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 hover:scale-105 duration-300"
          >
            Update Hero !
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminHero;
