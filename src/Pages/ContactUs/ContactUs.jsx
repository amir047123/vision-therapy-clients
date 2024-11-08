import { Icon } from "@iconify/react";
import axios from "axios";
import Lottie from "lottie-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import contact from "../../Assets/animation/contact.json";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    email: "",
    choosecity: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        " http://localhost:5000/api/v1/contacts",
        formData
      );
      if (response.status === 200) {
        toast.success(" Your Data sent successfully!");
        setFormData({
          name: "",
          phonenumber: "",
          email: "",
          choosecity: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Error sending data. Please try again later.");
    }
  };
  return (
    <div className="bg-white">
      <div className=" py-10 lg:w-10/12 w-11/12  mx-auto">
        <h1 className=" lg:text-3xl text-xl font-bold">
          Feel Free to contact us here.
        </h1>

        {/* //form start */}
        <form onSubmit={handleSubmit}>
          <div className=" lg:grid lg:grid-cols-2 justify-center items-center">
            <div className="  ">
              <div className="flex gap-5  justify-start items-start">
                <div>
                  <label
                    htmlFor="input-6"
                    className="block text-sm font-medium text-black"
                  >
                    Name
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                      className="block w-full h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"
                      placeholder="Enter Your Name"
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
                      <Icon icon="carbon:user-profile"></Icon>
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="input-6"
                    className="block text-sm font-medium text-black"
                  >
                    Phone Number
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="number"
                      name="phonenumber"
                      onChange={handleChange}
                      value={formData.phonenumber}
                      className="block w-full h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"
                      placeholder="Enter Your Phone Number"
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
                      <Icon icon="tabler:phone-x"></Icon>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex mt-5 gap-5  justify-start items-start">
                <div>
                  <label
                    htmlFor="input-6"
                    className="block text-sm font-medium text-black"
                  >
                    E-mail
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      className="block w-full h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"
                      placeholder="user@xyz.com"
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
                      <Icon icon="mdi-light:email-open"></Icon>
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="input-6"
                    className="block text-sm font-medium text-black"
                  >
                    City
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      name="city"
                      onChange={handleChange}
                      value={formData.city}
                      className="block w-full h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"
                      placeholder="user@xyz.com"
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
                      <Icon icon="fluent:city-24-regular"></Icon>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 lg:w-[453px]  ">
                <label
                  htmlFor="input-6"
                  className="block text-sm font-medium mb-2 text-black"
                >
                  Message
                </label>
                <textarea
                  className=" w-full p-2 border rounded-md shadow"
                  type="text"
                  name="message"
                  onChange={handleChange}
                  value={formData.message}
                ></textarea>
              </div>
              <div className=" mt-5">
                <button
                  type="submit"
                  className="bg-secondary  text-white px-3 py-1 rounded-md  hover:bg-primary "
                >
                  Submit Now
                </button>
              </div>
            </div>

            <div>
              <Lottie animationData={contact} />
            </div>
          </div>
        </form>
        {/* form end  */}
      </div>
    </div>
  );
};

export default ContactUs;
