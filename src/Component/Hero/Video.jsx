import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

const Video = () => {
  const [lectures, setLectures] = useState([]);
  //   load data
  useEffect(() => {
    fetch(` http://localhost:5000/api/v1/lecture/getlecture`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setLectures(data?.data);
        }
      });
  }, []);
  return (
    <div className="bg-bgColor py-5 pb-10">
      <div className=" lg:w-10/12 w-11/12 py-10 mx-auto min-h-screen ">
        <div>
          <h1 className="  text-secondary text-3xl font-bold text-center">
            Lectures
          </h1>
        </div>

        <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10 ">
          {lectures?.reverse()?.map((lecture) => (
            <VideoCard key={lecture?.key} lecture={lecture} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
