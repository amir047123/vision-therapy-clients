import AboutMedmine from "../../Component/AboutMedmine/AboutMedmine";
import DoctorReviews from "../../Component/Hero/DoctorReviews";
import Hero from "../../Component/Hero/Hero";
import State from "../../Component/Hero/State";
import Team from "../../Component/Hero/Team";
import WhyMedmyne from "../../Component/Hero/WhyMedmyne";
import HowDoesItWork from "../../Component/HowDoesItWork/HowDoesItWork";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <State />
      <WhyMedmyne />
      <AboutMedmine />
      <Team color={"bg-white"} />
      <DoctorReviews />
      <HowDoesItWork />
    </div>
  );
};

export default Home;
