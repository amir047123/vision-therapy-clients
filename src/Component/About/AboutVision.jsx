import Lottie from "lottie-react";
import doctor from "../../Assets/animation/hero1Doctor.json";

const AboutVision = () => {
  return (
    <section className="py-24">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <img className="rounded-md w-full" src="" alt="" />
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-5 mt-16">
          <div>
            <Lottie animationData={doctor} />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Expect from Vision Therapy
            </h2>
            <p className="mt-6 text-base text-gray-600">
              The weaker eye receives fewer visual signals. Eventually, the
              eyes' ability to work together decreases, and the brain suppresses
              or ignores input from the weaker eye. Anything that blurs a
              child's vision or causes the eyes to cross or turn out can result
              in lazy eye.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
