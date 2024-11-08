import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import doctor from "../../Assets/animation/heroDoctor.json";

const Hero = () => {
  return (
    <div className="bg-white  py-10">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-y-14 lg:w-10/12 w-11/12  mx-auto items-center">
        <div className="">
          <div className="  md:text-xl lg:text-6xl text-4xl font-bold ">
            <p1>Eye tracking exercises</p1>
          </div>

          <div className=" mt-10 lg:w-9/12 md:w-10/12 w-11/12">
            <div>
              These help improve your ability to follow moving objects smoothly
              with your eyes, enhancing coordination and focus.
            </div>

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
