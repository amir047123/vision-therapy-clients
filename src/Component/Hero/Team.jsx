import React from "react";
import Marquee from "react-fast-marquee";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../Shared/Loading";
import TeamCard from "./TeamCard";

const Team = ({ color }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  //   load data
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/teams`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setTeams(data?.data);
        }
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

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
            {teams?.map((team) => (
              <TeamCard key={team?._id} team={team} />
            ))}
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
            {teams?.reverse()?.map((team) => (
              <TeamCard key={team?._id} team={team} />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Team;
