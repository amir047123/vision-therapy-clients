import Marquee from "react-fast-marquee";
import TeamCard from "./TeamCard";

const Team = ({ color }) => {
  return (
    <div id="students" className={`${color} pb-10`}>
      <h3 className="lg:text-5xl md:text-4xl text-2xl font-bold text-center pt-16">
        Our Experienced Doctor's
      </h3>
      <p className="md:text-lg mt-2  font-semibold text-center lg:mt-5 md:mt-3">
        This is our experienced Doctor team
      </p>

      <div className="w-11/12 mx-auto overflow-hidden mt-10">
        <Marquee pauseOnHover={true} autoFill={true} speed={30} gradient={true}>
          <div className="flex">
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
          </div>
        </Marquee>
        <Marquee
          className="mt-5"
          pauseOnHover={true}
          autoFill={true}
          speed={30}
          gradient={true}
          direction={"right"}
        >
          <div className="flex">
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Team;
