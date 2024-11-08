import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import DeleteHook from "../../Hooks/DeleteHook";
import { singleImageUpload } from "../../Hooks/ImageUpload";
import UpdateHooks from "../../Hooks/UpdateHooks";

function SuperAdminTeamForm() {
  const [teams, setTeams] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(" http://localhost:5000/api/v1/teams");
        const data = await response.json();
        setTeams(data.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    }
    fetchData();
  }, [refetch]);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  const [teamData, setTeamData] = useState({
    Name: "",
    description: "",
  });
  const fileInputRef = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (teamData?._id) {
        await UpdateHooks(
          ` http://localhost:5000/api/v1/teams/${teamData?._id}`,
          { ...teamData, imageUrl: imageUrl ? imageUrl : teamData?.imageUrl }
        );
        toast?.success(`Grow section Updated !`);
      } else {
        const response = await fetch(" http://localhost:5000/api/v1/teams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...teamData, imageUrl }),
        });

        const result = await response.json();
        setRefetch(!refetch);
        if (result) {
          console.log("Team member added:", result);
          toast.success("Team member added");
          setTeamData({
            Name: "",
            description: "",
          });
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Error adding team member:", error);
    }
  };

  const handleChangeUploadImage = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    singleImageUpload(formData, setImageUrl);
  };

  return (
    <div className="bg-white">
      <div className="w-fit  text-xl font-semibold mb-5">
        <h1>Add Your Team Member</h1>
        <div className="h-1 mt-1 bg-secondary w-[40%]"></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded shadow-xl w-11/12 md:w-8/12 lg:w-6/12 mx-auto"
      >
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="teamImage"
          >
            Team Image
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              id="teamImage"
              name="teamImage"
              onChange={handleChangeUploadImage}
              ref={fileInputRef}
              className="w-full px-3 py-2 border rounded-md"
            />
            <img className="w-16" src={imageUrl} alt="img"></img>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="Name"
            onChange={handleChange}
            value={teamData.Name}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={teamData.description}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90"
          >
            Update Team Member
          </button>
        </div>
      </form>
      <div className="w-fit  text-xl font-semibold my-5">
        <h1>All Team Member</h1>
        <div className="h-1 mt-1 bg-secondary w-[40%]"></div>
      </div>

      <div className=" my-10">
        <table
          className="w-full text-left rounded w-overflow-x-auto "
          cellSpacing="0"
        >
          <thead>
            <tr className="text-center">
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Name
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Description
              </th>
              <th className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teams?.map((team) => (
              <tr className="border-b text-center" key={team?._id}>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {team?.Name}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {team?.description}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  <div className="flex justify-center gap-3">
                    <button
                      className=" border border-red-500 bg-red-100 text-white px-1 py-1 rounded  text-2xl"
                      onClick={() =>
                        DeleteHook({
                          setRefetch,
                          refetch,
                          url: ` http://localhost:5000/api/v1/teams/${team?._id}`,
                        })
                      }
                    >
                      <Icon icon="material-symbols:delete-outline" />
                    </button>
                    <button
                      onClick={async () => {
                        setTeamData(team);
                        setImageUrl(team?.imageUrl);
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
}

export default SuperAdminTeamForm;
