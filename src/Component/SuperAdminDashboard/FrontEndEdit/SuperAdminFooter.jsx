import React, { useEffect } from "react";
import { useState } from "react";
import UpdateHooks from "../../../Hooks/UpdateHooks";
import { toast } from "react-toastify";
import PostHooks from "../../../Hooks/PostHooks";

const SuperAdminFooter = () => {
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  });

  //   load data
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/footer/getFooter`)
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
          `http://localhost:5000/api/v1/footer/updateFooter/${formData?._id}`,
          formData
        );
        toast?.success(`Footer section Updated !`);
      } else {
        await PostHooks(
          `http://localhost:5000/api/v1/footer/addFooter`,
          formData,
          `Footer data posted`
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
        <h1>Update Footer Section</h1>
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
            Phone (including +880)
          </label>
          <input
            type="text"
            name="phone"
            required
            onChange={handleChange}
            value={formData.phone}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
            value={formData.email}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Facebook
          </label>
          <input
            type="text"
            name="facebook"
            required
            onChange={handleChange}
            value={formData.facebook}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Instagram
          </label>
          <input
            type="text"
            name="instagram"
            required
            onChange={handleChange}
            value={formData.instagram}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Linkedin
          </label>
          <input
            type="text"
            name="linkedin"
            required
            onChange={handleChange}
            value={formData.linkedin}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            required
            onChange={handleChange}
            value={formData.description}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Location: (added location with comma)
          </label>
          <textarea
            name="location"
            required
            onChange={handleChange}
            value={formData.location}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 hover:scale-105 duration-300"
          >
            Update Footer !
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminFooter;
