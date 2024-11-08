import React, { useEffect } from "react";
import { useState } from "react";
import QuestionCard from "./QuestionCard";

const UserDashboardFaq = () => {
  const [search, setSearch] = useState("");
  const [userFaq, setUserFaq] = useState([]);

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
  }, []);

  const filter = userFaq?.filter((faq) =>
    faq?.question?.toLowerCase()?.includes(search?.toLowerCase())
  );
  return (
    <div className=" my-10">
      <div className="bg-white p-5 rounded-md">
        <label className="font-medium">Have any Question?</label>
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full block focus:outline-none border border-secondary text-sm py-1.5 px-3 mt-2 rounded-md"
          placeholder="Search Question"
        />
      </div>

      <div>
        {filter?.map((faq) => (
          <QuestionCard key={faq?._id} faq={faq} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboardFaq;
