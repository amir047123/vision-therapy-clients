import React, { useEffect, useState } from "react";
// import glide from "@glidejs/glide";
import DoctorReviewCard from "./DoctorReviewCard";
import Loading from "../../Shared/Loading";

const DoctorReviews = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  //   load data
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/doctorReview/getdoctorReview`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setDoctors(data?.data);
        }
      });
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   if (doctors?.length) {
  //     const slider = new glide(".glide-04", {
  //       type: "slider",
  //       focusAt: "center",
  //       perView: 2,
  //       autoplay: 2000,
  //       animationDuration: 700,
  //       gap: 10,
  //       breakpoints: {
  //         // On screens smaller than 800px, display 2 slides per view.
  //         900: {
  //           perView: 2,
  //         },
  //         // On screens smaller than 500px, display 1 slide per view.
  //         500: {
  //           perView: 1,
  //         },
  //       },
  //       classes: {
  //         nav: {
  //           active: "[&>*]:bg-wuiSlate-700",
  //         },
  //       },
  //     }).mount();

  //     return () => {
  //       slider?.destroy();
  //     };
  //   }
  // }, [doctors]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="my-10 w-full bg-bgColor pt-5">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-center mb-3 ">
        Doctor's Review
      </h1>
      <div className=" flex justify-center items-center text-white ">
        <div className="  lg:w-10/12 w-11/12  mx-auto grid md:grid-cols-4 grid-cols-3  rounded-md py-5">
          <div className=" col-span-3  p-5  ">
            <div className="relative w-full glide-04">
              {/*    <!-- Slides --> */}
              <div className="overflow-hidden" data-glide-el="track">
                <div className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0 ">
                  {doctors?.map((doctor) => (
                    <DoctorReviewCard key={doctor?._id} doctor={doctor} />
                  ))}
                </div>
              </div>
              {/*    <!-- Controls --> */}
              <div
                className="flex items-center justify-center w-full gap-4 p-4"
                data-glide-el="controls"
              >
                <button
                  className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-success bg-success/10 hover:bg-success hover:text-white text-success hover:border-success  focus-visible:outline-none lg:h-12 lg:w-12"
                  data-glide-dir="<"
                  aria-label="prev slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <title>prev slide</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>
                </button>
                <button
                  className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-success bg-success/10 hover:bg-success hover:text-white text-success hover:border-success  focus-visible:outline-none lg:h-12 lg:w-12"
                  data-glide-dir=">"
                  aria-label="next slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <title>next slide</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className=" p-5  rounded-md  bg-secondary md:col-span-1 col-span-3">
            <h1>"Doctor's Review"</h1>
            <br />
            <p className=" mb-2">Do you know?</p>

            <p>
              At CareSee, I've witnessed a profound commitment to enhancing
              vision. Their blend of research, technology, and personalized care
              sets a new standard in vision therapy. They approach each case
              with precision and compassion, transforming lives and broadening
              horizons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorReviews;
