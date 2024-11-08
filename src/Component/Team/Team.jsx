import React from "react";
import DeveloperTeam from "../Hero/DeveloperTeam";
import DoctorTeam from "../../Component/Hero/Team";

const Team = () => {
  return (
    <div>
      <DeveloperTeam />
      <DoctorTeam color={"bg-bgColor"} />
    </div>
  );
};

export default Team;
