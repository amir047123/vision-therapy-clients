import Happypatient from "../../Assets/hero/happy Patient/friends.gif";
import cities from "../../Assets/hero/happy Patient/gps.gif";
import award from "../../Assets/hero/happy Patient/medal-.gif";
import Associated from "../../Assets/hero/happy Patient/stethoscope.gif";

const State = () => {
  return (
    <div className=" lg:h-[421px] bg-bgColor text-white flex justify-center items-center w-full py-10">
      <div className=" lg:w-10/12 w-11/12  mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-10 gap-5">
        <div className=" h-[236px] bg-white text-black p-14 rounded-md flex flex-col justify-center items-center text-center ">
          <img
            className="w-44"
            src={Happypatient}
            alt=""
            style={{
              animation: "rotate 5s linear infinite",
            }}
          />
          <h1 className="mt-2 text-secondary ">HappyPatient</h1>
          <p className="mt-1">102+</p>
        </div>

        <div className="h-[236px] bg-white text-black p-14 rounded-md flex flex-col mt-5 mb-5 justify-center items-center text-center ">
          <div className=" p-5 ">
            <img src={Associated} alt="" />
            <h1 className=" w-full text-secondary ">Associated Doctors</h1>
            <p className=" mt-1">25+</p>
          </div>
        </div>

        <div className="h-[236px] bg-white text-black p-14 rounded-md flex flex-col justify-center mb-5 items-center text-center">
          <div className="p-5">
            <img className=" " src={cities} alt="" />

            <h1 className="mt-2 text-secondary">Cities</h1>
            <p className="mt-1">13+</p>
          </div>
        </div>

        <div className=" h-[236px] bg-white text-black p-14 rounded-md flex flex-col justify-center items-center text-center lg:mt-5">
          <div className=" ">
            <img className=" p-5" src={award} alt="" />

            <h1 className=" mt-2 text-secondary">Awards</h1>
            <p className=" mt-1">7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default State;
