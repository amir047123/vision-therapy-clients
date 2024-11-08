import React, { useEffect, useState } from "react";
import img1 from "../../Assets/FAQ/Asset 1@2x 2.png";
import QuestionCard from "../UserDashboard/UserDashboardFaq/QuestionCard";

const Faq = () => {
  const [userFaq, setUserFaq] = useState([]);

  //   load data
  useEffect(() => {
    fetch(` http://localhost:5000/api/v1/userFaq/getuserFaq`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("visionAccessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setUserFaq(data?.data);
        }
      });
  }, []);
  return (
    <div className=" ml-[50px] mr-[50px] mt-[80px] mb-[80px]">
      <div className=" lg:grid lg:grid-cols-2   justify-center items-center ">
        <div className=" mt-5 ">
          <img className="  " src={img1} alt="" />
        </div>
        <div className=" flex  mt-5 justify-center items-center ">
          <iframe
            width="611"
            height="416"
            src="https://www.youtube.com/embed/Xjt-JXWk0K4?si=MJ15O9z2vCmKoBA7"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div className=" mt-[32px]">
        <h1 className=" text-3xl font-bold  text-center ">FAQ</h1>
      </div>

      <div className=" mt-[8px]">
        {/* <div className=" mt-[50px]">
          <h1 className=" font-bold">
            Q1. Lorem ipsum dolor sit amet consectetur.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Tincidunt mattis placerat
            tempor eget interdum vestibulum sodales posuere. Adipiscing amet
            tincidunt morbi ullamcorper in facilisi mauris blandit. Scelerisque
            nisl nunc donec eu. Sit nullam sed ve l sed nulla. Egestas nulla
            vulputate tincidunt tortor.{" "}
          </p>
        </div> */}

        <div>
          {userFaq?.reverse()?.map((faq) => (
            <QuestionCard key={faq?._id} faq={faq} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
