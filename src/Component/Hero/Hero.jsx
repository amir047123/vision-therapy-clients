import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import doctor from "../../Assets/animation/heroDoctor.json";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../Shared/Loading";

const Hero = () => {
  const [heroData, setHeroData] = useState([]);
  const [loading, setLoading] = useState(false);
  //   load data
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/hero/getHero`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setHeroData(data?.data[0]);
        }
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-white  py-10">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-y-14 lg:w-10/12 w-11/12  mx-auto items-center">
        <div className="">
          <div className="  md:text-4xl lg:text-6xl text-4xl font-bold ">
            <h1 className="text-secondary ">{heroData?.title}</h1>
          </div>

          <div className=" mt-10 lg:w-9/12 md:w-10/12 w-11/12">
            
            <div dangerouslySetInnerHTML={{ __html:heroData?.content }}></div>

            <Link
              to="/contactUs"
              className=" mt-5 block w-fit rounded-md bg-secondary text-white px-5 py-3 font-medium hover:scale-105 duration-300"
            >
              Contact Us !
            </Link>
          </div>
        </div>
        <div className="">
          {/* <img src={heroimg} alt="" /> */}
          <Lottie animationData={doctor} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
