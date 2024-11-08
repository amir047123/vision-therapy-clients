import React from "react";

const RandomObstacle = () => {
  return (
    <div className="w-full h-screen inset-0 fixed bg-[#f7f7f7] ">
      <div className="w-full h-screen relative overflow-hidden">
        <div
          id="ground"
          className="w-full h-3 bg-black absolute bottom-0"
        ></div>
      </div>
    </div>
  );
};

export default RandomObstacle;
