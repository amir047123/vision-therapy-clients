import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-bg h-[400px] grid lg:grid-cols-12 border-t-[3px] lg:border-t-0 border-[#01aeef]">
      <div className="col-span-3 lg:pl-20 p-5 w-fit mx-auto">
        <img className="w-[100%]" src={logo} alt="logo" />

        <p>Vision therapy is a treatment for lazy eye, or amblyopia</p>
      </div>
      <div className="h-full bg-[#01aeef]/60 col-span-9 text-white">
        <div className="border-b-2 border-white">
          <div className="md:flex items-center p-5 w-fit mx-auto lg:gap-x-36 md:gap-x-16 gap-x-5">
            <div className="flex items-center md:gap-4 gap-2">
              <Icon
                className="md:text-4xl text-3xl"
                icon="solar:outgoing-call-linear"
              />
              <p className="text-lg">+01875071998</p>
            </div>
            <div className="flex items-center md:gap-4 gap-2">
              <Icon
                className="md:text-4xl text-3xl"
                icon="clarity:email-line"
              />
              <p className="text-lg">amirfaysal0471@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="px-16 py-5 grid md:grid-cols-4 grid-cols-2 gap-10 text-left">
          <div>
            <h2 className="border-b-[3px] border-white text-lg font-bold w-fit mb-2">
              About Us
            </h2>
            <p>
              Vision therapy is a treatment for lazy eye, or amblyopia, that can
              improve visual acuity, depth perception, and other visual skills.
            </p>
          </div>
          <div>
            <h2 className="border-b-[3px] border-white text-lg font-bold w-fit mb-2">
              Location
            </h2>

            <p>Khulna, Bangladesh</p>
          </div>
          <div>
            <h2 className="border-b-[3px] border-white text-lg font-bold w-fit mb-2">
              Go To
            </h2>
            <Link to="/home">
              <p>Home</p>
            </Link>
            <Link to="/aboutUs">
              {" "}
              <p>About Us</p>
            </Link>

            <Link to="/accessories">
              {" "}
              <p>Accessories</p>
            </Link>

            <Link to="/lectures">
              <p>Lectures</p>
            </Link>
            <Link to="/researches-brochure">
              <p> Research & Brochure</p>
            </Link>
          </div>
          <div>
            <h2 className="border-b-[3px] border-white text-lg font-bold w-fit mb-2">
              Others Link
            </h2>
            <Link to="/faq">
              {" "}
              <p>Faq</p>
            </Link>

            <Link to="/terms-condition">
              {" "}
              <p>Terms & Condition</p>
            </Link>
            <Link to="/privary-policy">
              {" "}
              <p>Privacy & Policy</p>
            </Link>

            <p>Support</p>
            {/* <Link to="/developer-team">
              {" "}
              <p>Developer Team</p>
            </Link> */}
          </div>
        </div>
        {/* social icon */}
        <div className="flex justify-center gap-3">
          <a target="_blank" rel="noreferrer">
            <Icon className="text-3xl" icon="logos:facebook" />
          </a>
          <a target="_blank" rel="noreferrer">
            {" "}
            <Icon className="text-3xl" icon="skill-icons:instagram" />
          </a>
          <a target="_blank" rel="noreferrer">
            <Icon className="text-3xl" icon="skill-icons:linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
