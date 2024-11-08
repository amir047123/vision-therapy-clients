import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Shared/Loading";

const WhyVisionTherapy = () => {
  const [whyMedmyneData, setwhyMedmyneData] = useState([]);
  const [loading, setLoading] = useState(false);
  //   load data
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/whyMedmyne/getwhyMedmyne`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setwhyMedmyneData(data?.data[0]);
        }
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white">
      <section className="bg-white text-black">
        <div className=" max-w-screen-xl  py-8 sm:py-12  lg:py-16  lg:w-10/12 w-11/12  mx-auto">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {whyMedmyneData?.sectionName}
            </h2>

            <p className="mt-4 text-black">
              {whyMedmyneData?.sectionDescription}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl  p-8 shadow-xl transition  hover:shadow-primary/20"
              href="/services/digital-campaigns"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-xl font-bold text-secondary">
                {whyMedmyneData?.firstCardTitle}
              </h2>

              <p className="mt-1 text-sm text-black">
                {whyMedmyneData?.firstCardDes}
              </p>
            </a>

            <a
              className="block rounded-xl  p-8 shadow-xl transition  hover:shadow-primary/20"
              href="/services/digital-campaigns"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-xl font-bold text-secondary">
                {whyMedmyneData?.secondCardTitle}
              </h2>

              <p className="mt-1 text-sm text-black">
                {whyMedmyneData?.secondCardDes}
              </p>
            </a>

            <a
              className="block rounded-xl  p-8 shadow-xl transition  hover:shadow-primary/20"
              href="/services/digital-campaigns"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-xl font-bold text-secondary">
                {whyMedmyneData?.thirdCardTitle}
              </h2>

              <p className="mt-1 text-sm text-black">
                {whyMedmyneData?.thirdCardDes}
              </p>
            </a>

            <a
              className="block rounded-xl  p-8 shadow-xl transition  hover:shadow-primary/20"
              href="/services/digital-campaigns"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-xl font-bold text-secondary">
                {whyMedmyneData?.fourthCardTitle}
              </h2>

              <p className="mt-1 text-sm text-black">
                {whyMedmyneData?.fourthCardDes}
              </p>
            </a>

            <a
              className="block rounded-xl  p-8 shadow-xl transition  hover:shadow-primary/20"
              href="/services/digital-campaigns"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-xl font-bold text-secondary">
                {whyMedmyneData?.fifthCardTitle}
              </h2>

              <p className="mt-1 text-sm text-black">
                {whyMedmyneData?.fifthCardDes}
              </p>
            </a>

            <a
              className="block rounded-xl  p-8 shadow-xl transition  hover:shadow-primary/20"
              href="/services/digital-campaigns"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-xl font-bold text-secondary">
                {whyMedmyneData?.sixthCardTitle}
              </h2>

              <p className="mt-1 text-sm text-black">
                {whyMedmyneData?.sixthCardDes}
              </p>
            </a>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/aboutUs"
              className="inline-block rounded bg-secondary px-12 py-3 text-sm font-medium text-white transition hover:bg-secondary/90 "
            >
              More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyVisionTherapy;
