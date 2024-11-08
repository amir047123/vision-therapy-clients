
import Hero from "../../Component/Hero/Hero";
import State from "../../Component/Hero/State";
import WhyMedmyne from "../../Component/Hero/WhyMedmyne";
import Team from "../../Component/Hero/Team";
import DoctorReviews from "../../Component/Hero/DoctorReviews";
import HowDoesItWork from "../../Component/HowDoesItWork/HowDoesItWork";
import AboutMedmine from "../../Component/AboutMedmine/AboutMedmine";

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
      {/* <DeveloperTeam /> */}
    </div>
  );
};

export default Home;
