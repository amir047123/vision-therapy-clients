import React from "react";

const DoctorReviewCard = ({ doctor }) => {
  return (
    <div className=" bg-white text-black p-3 mt-5 rounded-md justify-start items-start">
      <p className="">{doctor?.doctorReview}</p>
      <div className=" flex mt-5  items-center gap-3">
        <img
          className="w-16 h-16 object-cover rounded-full border border-secondary"
          src={doctor?.doctorImg}
          alt="img"
        />
        <div>
          <p className=" font-bold">{doctor?.doctorName}</p>
          <p className="text-sm text-black/70">{doctor?.specialist}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorReviewCard;
