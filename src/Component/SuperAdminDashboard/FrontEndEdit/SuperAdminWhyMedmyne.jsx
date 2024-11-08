import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostHooks from "../../../Hooks/PostHooks";
import UpdateHooks from "../../../Hooks/UpdateHooks";

const SuperAdminWhyMedmyne = () => {
  const [formData, setFormData] = useState({
    sectionName: "",
    sectionDescription: "",
    firstCardTitle: "",
    firstCardDes: "",
    secondCardTitle: "",
    secondCardDes: "",
    thirdCardTitle: "",
    thirdCardDes: "",
    fourthCardTitle: "",
    fourthCardDes: "",
    fifthCardTitle: "",
    fifthCardDes: "",
    sixthCardTitle: "",
    sixthCardDes: "",
  });

  //   load data
  useEffect(() => {
    fetch(` http://localhost:5000/api/v1/whyMedmyne/getWhyMedmyne`)
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
          ` http://localhost:5000/api/v1/whyMedmyne/updateWhyMedmyne/${formData?._id}`,
          formData
        );
        toast?.success(`Hero section Updated !`);
      } else {
        await PostHooks(
          ` http://localhost:5000/api/v1/whyMedmyne/addWhyMedmyne`,
          formData,
          `whyMedmyne data posted`
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
        <h1>Update Why Medmyne Section</h1>
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
              name="sectionName"
              required
              onChange={handleChange}
              value={formData.sectionName}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Section Description
            </label>
            <textarea
              name="sectionDescription"
              required
              onChange={handleChange}
              value={formData.sectionDescription}
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
              First Card Title
            </label>
            <input
              type="text"
              name="firstCardTitle"
              required
              onChange={handleChange}
              value={formData.firstCardTitle}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              First Card Description
            </label>
            <textarea
              name="firstCardDes"
              required
              onChange={handleChange}
              value={formData.firstCardDes}
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
              Second Card Title
            </label>
            <input
              type="text"
              name="secondCardTitle"
              required
              onChange={handleChange}
              value={formData.secondCardTitle}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Second Card Description
            </label>
            <textarea
              name="secondCardDes"
              required
              onChange={handleChange}
              value={formData.secondCardDes}
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
              Third Card Title
            </label>
            <input
              type="text"
              name="thirdCardTitle"
              required
              onChange={handleChange}
              value={formData.thirdCardTitle}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Third Card Description
            </label>
            <textarea
              name="thirdCardDes"
              required
              onChange={handleChange}
              value={formData.thirdCardDes}
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
              Fourth Card Title
            </label>
            <input
              type="text"
              name="fourthCardTitle"
              required
              onChange={handleChange}
              value={formData.fourthCardTitle}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Fourth Card Description
            </label>
            <textarea
              name="fourthCardDes"
              required
              onChange={handleChange}
              value={formData.fourthCardDes}
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
              Fifth Card Title
            </label>
            <input
              type="text"
              name="fifthCardTitle"
              required
              onChange={handleChange}
              value={formData.fifthCardTitle}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Fifth Card Description
            </label>
            <textarea
              name="fifthCardDes"
              required
              onChange={handleChange}
              value={formData.fifthCardDes}
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
              Sixth Card Title
            </label>
            <input
              type="text"
              name="sixthCardTitle"
              required
              onChange={handleChange}
              value={formData.sixthCardTitle}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Sixth Card Description
            </label>
            <textarea
              name="sixthCardDes"
              required
              onChange={handleChange}
              value={formData.sixthCardDes}
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

export default SuperAdminWhyMedmyne;
