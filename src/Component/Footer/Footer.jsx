import React, { useEffect, useState } from "react";
import "./footer.css";
import logo from "../../Assets/logo.png";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/footer/getFooter`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setData(data?.data[0]);
        }
      });
  }, []);

  function splitParagraphIntoArray(paragraph) {
    const words = paragraph?.split(",");
    const filteredWords = words?.filter((word) => word !== "" && word !== " ");
    return filteredWords;
  }
  const location = splitParagraphIntoArray(data?.location);

  return (
    <div className="footer-bg h-[400px] grid lg:grid-cols-12 border-t-[3px] lg:border-t-0 border-[#01aeef]">
      <div className="col-span-3 lg:pl-20 p-5 w-fit mx-auto">
        <img className="w-[100%]" src={logo} alt="logo" />
      </div>
      <div className="h-full bg-[#01aeef]/60 col-span-9 text-white">
        <div className="border-b-2 border-white">
          <div className="md:flex items-center p-5 w-fit mx-auto lg:gap-x-36 md:gap-x-16 gap-x-5">
            <div className="flex items-center md:gap-4 gap-2">
              <Icon
                className="md:text-4xl text-3xl"
                icon="solar:outgoing-call-linear"
              />
              <p className="text-lg">+{data?.phone}</p>
            </div>
            <div className="flex items-center md:gap-4 gap-2">
              <Icon
                className="md:text-4xl text-3xl"
                icon="clarity:email-line"
              />
              <p className="text-lg">{data?.email}</p>
            </div>
          </div>
        </div>

        <div className="px-16 py-5 grid md:grid-cols-4 grid-cols-2 gap-10 text-left">
          <div>
            <h2 className="border-b-[3px] border-white text-lg font-bold w-fit mb-2">
              About Us
            </h2>
            <p>{data?.description}</p>
          </div>
          <div>
            <h2 className="border-b-[3px] border-white text-lg font-bold w-fit mb-2">
              Location
            </h2>

            {location?.map((l) => (
              <p>{l}</p>
            ))}
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
          <a target="_blank" rel="noreferrer" href={data?.facebook}>
            <Icon className="text-3xl" icon="logos:facebook" />
          </a>
          <a target="_blank" rel="noreferrer" href={data?.instagram}>
            {" "}
            <Icon className="text-3xl" icon="skill-icons:instagram" />
          </a>
          <a target="_blank" rel="noreferrer" href={data?.linkedin}>
            <Icon className="text-3xl" icon="skill-icons:linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
