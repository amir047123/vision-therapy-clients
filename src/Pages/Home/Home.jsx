
import Hero from "../../Component/Hero/Hero";
import State from "../../Component/Hero/State";
import WhyMedmyne from "../../Component/Hero/WhyMedmyne";
import Team from "../../Component/Hero/Team";
import DoctorReviews from "../../Component/Hero/DoctorReviews";
import HowDoesItWork from "../../Component/HowDoesItWork/HowDoesItWork";
import AboutMedmine from "../../Component/AboutMedmine/AboutMedmine";
import HomeFaq from "../../Component/HomeFaq/HomeFaq";
import Stats from "../../Component/Stats/Stats";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Stats />
      <HomeFaq />
      <WhyMedmyne />
      <State />
      <AboutMedmine />
      <Team color={"bg-white"} />
      <DoctorReviews />
      <HowDoesItWork />
      {/* <DeveloperTeam /> */}
    </div>
  );
};

export default Home;
