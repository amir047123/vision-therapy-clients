import React from "react";

const TeamCard = ({ team }) => {
  return (
    <div className="w-40 rounded-lg overflow-hidden mr-3">
      <img className="w-40 h-40 object-cover" src={team?.imageUrl} alt="" />
      <div className="w-full bg-secondary/90 pb-1">
        <p className="font-semibold text-white text-[16px] text-center mt-1">
          {team?.Name}
        </p>
        <p className="text-white text-center font-medium -mt-1">
          {team?.description}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
