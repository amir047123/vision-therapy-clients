import React from "react";
import developer from "../../Assets/developers.png";
import { Icon } from "@iconify/react";

const DeveloperTeam = () => {
  return (
    <section className="py-24 bg-white">
      <div className=" mx-auto w-11/12 md:w-10/12">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-24">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Our Experienced Developer Team
            </h2>
            <p className="mt-6 text-base text-gray-600">
              The Care See project stands as a testament to our dedication to
              revolutionizing eye care. Designed to assist eye specialists in
              monitoring and diagnosing their patients more efficiently, this
              project brings a unique blend of technology and healthcare
              together.
            </p>
            <h2 className="text-xl mt-3">Linkedin </h2>
            <a
              href="https://www.linkedin.com/in/amir-faysal/"
              className=" underline flex justify-start items-center gap-2 text-secondary"
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon="skill-icons:linkedin"></Icon> Amir Faysal
            </a>
            <a
              className=" flex justify-start items-center gap-2 underline text-secondary"
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/ashikul-islam-ifty"
            >
              <Icon icon="skill-icons:linkedin"></Icon> Ashikul Islam Ify
            </a>
            <a
              className="flex justify-start items-center gap-2 underline text-secondary"
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/amir-faysal/"
            >
              <Icon icon="skill-icons:linkedin"></Icon> Hadiuzzaman Leon
            </a>

            <a
              href="https://www.thinkystorm.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-secondary rounded-md mt-9 hover:bg-secondary/90"
              role="button"
            >
              {" "}
              Contact Us
            </a>
          </div>
          <div>
            <img draggable={false} src={developer} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperTeam;
