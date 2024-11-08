import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

import AboutVision from "../../Component/About/AboutVision";
import DoctorReviews from "../../Component/Hero/DoctorReviews";
import State from "../../Component/Hero/State";
import ContactUs from "../ContactUs/ContactUs";

const AboutUs = () => {
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
      <div>
        <div>
          <AboutVision />

          <div className=" my-10 ">
            <State></State>
          </div>

          <ContactUs />

          <div>
            <DoctorReviews></DoctorReviews>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
