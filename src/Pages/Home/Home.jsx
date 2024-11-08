import AboutVision from "../../Component/About/AboutVision";
import DoctorReviews from "../../Component/Hero/DoctorReviews";
import Hero from "../../Component/Hero/Hero";
import State from "../../Component/Hero/State";
import Team from "../../Component/Hero/Team";
import WhyVisionTherapy from "../../Component/Hero/WhyVisionTherapy";
import HowDoesItWork from "../../Component/HowDoesItWork/HowDoesItWork";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <State />
      <WhyVisionTherapy />

      <AboutVision />
      <Team color={"bg-white"} />
      <DoctorReviews />
      <HowDoesItWork />
    </div>
  );
};

export default Home;
