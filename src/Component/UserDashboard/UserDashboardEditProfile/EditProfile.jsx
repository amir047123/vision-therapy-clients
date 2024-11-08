import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import updateAnimation from "../../../Assets/animation/update.json";
import AuthUser from "../../../Hooks/authUser";

const EditProfile = () => {
  const { userInfo } = AuthUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchUserData();
  }, [userInfo]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/user/${userInfo._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              "visionAccessToken"
            )}`,
          },
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setFormData({
          name: userData.data.name || "",
          email: userData.data.email || "",
          phone: userData.data.phone || "",
        });
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/user/${userInfo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Profile updated successfully!");
        fetchUserData();
      } else {
        console.error("Profile update failed!");
        toast.error("An error occurred.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-white my-10 p-5 rounded-lg shadow md:grid grid-cols-12 items-center gap-10">
      <div className="col-span-5 lg:p-10 p-5">
        <Lottie animationData={updateAnimation} />
      </div>
      <form className="col-span-7 lg:px-10" onSubmit={handleSubmit}>
        <div>
          <label className="font-medium text-secondary">Name</label>
          <input
            className="w-full border border-secondary py-1.5 rounded-md px-3 mt-1"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-medium text-secondary">E-mail</label>
          <input
            className="w-full border border-secondary py-1.5 rounded-md px-3 mt-1"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-medium text-secondary">Phone Number</label>
          <input
            className="w-full border border-secondary py-1.5 rounded-md px-3 mt-1"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        {/* Additional fields for other information */}
        {/* ... */}
        <input
          className="bg-secondary rounded-md hover:scale-105 text-white px-3 py-1.5 cursor-pointer duration-300 mt-5"
          type="submit"
          value="UPDATE!"
        />
      </form>
    </div>
  );
};

export default EditProfile;
