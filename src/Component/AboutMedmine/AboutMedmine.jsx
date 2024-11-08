import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import doctor from "../../Assets/animation/hero1Doctor.json";
import Loading from "../../Shared/Loading";

const AboutMedmine = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/grow/getGrow`,)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setData(data?.data[0]);
        }
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="py-24">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <img className="rounded-md w-full" src={data?.img} alt="" />
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-5 mt-16">
          <div>
            <Lottie animationData={doctor} />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              {data?.title}
            </h2>
            <p className="mt-6 text-base text-gray-600">{data?.content}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMedmine;
