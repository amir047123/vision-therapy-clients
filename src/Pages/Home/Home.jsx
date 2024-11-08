import AboutVision from "../../Component/About/AboutVision";
import DoctorReviews from "../../Component/Hero/DoctorReviews";
import Hero from "../../Component/Hero/Hero";
import State from "../../Component/Hero/State";
import Team from "../../Component/Hero/Team";
import HowDoesItWork from "../../Component/HowDoesItWork/HowDoesItWork";
import HomeFaq from "../../Component/HomeFaq/HomeFaq";
import Stats from "../../Component/Stats/Stats";
import WhyVisionTherapy from "../../Component/Hero/WhyVisionTherapy";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Stats />
      <WhyVisionTherapy />
      <State />
      <HomeFaq />
      <AboutVision />
      <Team color={"bg-white"} />
      <DoctorReviews />
      <HowDoesItWork />
    </div>
  );
};

export default Home;
