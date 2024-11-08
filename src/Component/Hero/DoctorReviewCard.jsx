const DoctorReviewCard = () => {
  return (
    <div className=" bg-white text-black p-3 mt-5 rounded-md justify-start items-start">
      <p className="">
        daughter's lazy eye improved significantly after using AmblyoPlay Vision
        Therapy.
      </p>
      <div className=" flex mt-5  items-center gap-3">
        <img
          className="w-16 h-16 object-cover rounded-full border border-secondary"
          src="/doctorphoto.png"
          alt="img"
        />
        <div>
          <p className=" font-bold">Amir Faysal</p>
          <p className="text-sm text-black/70"> Surgery</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorReviewCard;
