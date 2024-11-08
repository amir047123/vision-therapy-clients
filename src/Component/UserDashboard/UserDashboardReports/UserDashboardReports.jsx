import moment from "moment/moment";
import React from "react";
import "./UserDashboardReports.css";
import UserDashboardProgressTable from "./UserDashboardProgressTable";
import UserDashboardDataTable from "./UserDashboardDataTable";
import UserDashboardDayGrid from "./UserDashboardDayGrid";
import { useState } from "react";
import AuthUser from "../../../Hooks/authUser";
import { useEffect } from "react";
import { server_url } from "../../../Config/API";
import Loading from "../../../Shared/Loading";

const UserDashboardReports = () => {
  const [date, setDate] = useState(moment().format("YYYY-MM-D"));
  const [loading, setLoading] = useState(false);
  // const [allGameData, setAllGameData] = useState([]);
  // state
  const [smoothData, setSmoothData] = useState([]);
  const [rapidData, setRapidData] = useState([]);
  const [PingPongData, setPingPongData] = useState([]);
  const [rainDropData, setRainDropData] = useState([]);
  const [matchGaborData, setMatchGaborData] = useState([]);
  const [randomObstacleData, setRandomObstacleData] = useState([]);
  const [searchQuestData, setSearchQuestData] = useState([]);
  const [rockChartData, setRockChartData] = useState([]);
  const [theShooterData, setTheShooterData] = useState([]);
  const [colorTrapData, setColorTrapData] = useState([]);

  const { userInfo } = AuthUser();
  const [packages, setPackages] = useState([]);

  // load package data
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/v1/package/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length) {
          setPackages(data?.data[0]);
          setLoading(false);
        }
        setLoading(false);
      });
  }, []);

  const allGameData = [
    ...smoothData,
    ...rapidData,
    ...PingPongData,
    ...rainDropData,
    ...colorTrapData,
    ...theShooterData,
    ...rockChartData,
    ...searchQuestData,
    ...randomObstacleData,
    ...matchGaborData,
  ];
  // state

  const fetchFunction = async (url, setData) => {
    // setLoading(true);
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data?.data);
        if (data?.data.length) {
          setData(data?.data);
          // setAllGameData([...allGameData, data?.data]);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFunction(
      `${server_url}/smoothMovement/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`,
      setSmoothData
    );

    fetchFunction(
      `${server_url}/rapidMovement/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`,
      setRapidData
    );
    fetchFunction(
      `${server_url}/pingPong/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`,
      setPingPongData
    );
    fetchFunction(
      `${server_url}/rainDrop/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`,
      setRainDropData
    );
    fetchFunction(
      `${server_url}/matchGabor/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`,
      setMatchGaborData
    );
    fetchFunction(
      `${server_url}/randomObstacle/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`,
      setRandomObstacleData
    );
    fetchFunction(
      `${server_url}/searchQuest/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`,
      setSearchQuestData
    );
    fetchFunction(
      `${server_url}/rockChart/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`,
      setRockChartData
    );
    fetchFunction(
      `${server_url}/theShooter/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`,
      setTheShooterData
    );
    fetchFunction(
      `${server_url}/colorTrap/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }`,
      setColorTrapData
    );
  }, []);

  let days = [];
  for (let i = 0; i < 365; i++) {
    let dayGridDate = moment().subtract(i, "days").format("YYYY-MM-D");
    days.push(dayGridDate);
  }

  if (loading) {
    return <Loading />;
  }

  const filterSelected = allGameData.filter((object) => {
    return object.date === date;
  });

  return (
    <div>
      <div className="bg-white mt-10 pt-5">
        <h2 className="text-xl font-semibold text-center text-red-500">
          Your Plan Will Expire In: {packages?.expireDate}
        </h2>
        <div className="  p-5 rounded-lg flex items-center h-fit">
          <div className="h-full lg:space-y-10 md:space-y-6 space-y-5 mt-5  font-medium text-xs md:text-base mr-2">
            <p>M</p>
            <p>W</p>
            <p>F</p>
          </div>
          <div className="w-full">
            <div className="flex justify-between mb-3 font-medium text-xs md:text-base">
              <p>Jan</p>
              <p>Feb</p>
              <p>Mar</p>
              <p>Apr</p>
              <p>May</p>
              <p>Jun</p>
              <p>Jul</p>
              <p>Aug</p>
              <p>Sep</p>
              <p>Nov</p>
              <p>Dec</p>
            </div>
            <div className="days gap-[1px] md:gap-[2px]">
              {[...days]?.reverse()?.map((day, i) => (
                <UserDashboardDayGrid
                  setDate={setDate}
                  date={date}
                  allGameData={allGameData}
                  day={day}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* report Data */}
      <div className="w-full overflow-x-auto">
        <table
          className="w-full text-left border-collapse rounded w-overflow-x-auto bg-white mt-10 "
          cellspacing="0"
        >
          <tbody>
            <tr className="border-b border-slate-300">
              <th
                scope="col"
                className="h-16 px-6  font-medium stroke-slate-700 text-slate-700 "
              >
                Exercise
              </th>
              <th
                scope="col"
                className="h-16 px-6  font-medium stroke-slate-700 text-slate-700 "
              >
                Date
              </th>
              <th
                scope="col"
                className="h-16 px-6  font-medium stroke-slate-700 text-slate-700 "
              >
                Score
              </th>
            </tr>
            {filterSelected?.map((game) => (
              <UserDashboardDataTable game={game} />
            ))}
          </tbody>
        </table>
      </div>
      {/* report progress */}
      <div className="w-full overflow-x-auto">
        <table
          className="w-full text-left border-collapse rounded w-overflow-x-auto bg-white mt-10 "
          cellspacing="0"
        >
          <tbody>
            <tr className="border-b border-slate-300">
              <th
                scope="col"
                className="h-16 px-6  font-medium stroke-slate-700 text-slate-700 "
              >
                Exercise
              </th>
              <th
                scope="col"
                className="h-16 px-6  font-medium stroke-slate-700 text-slate-700 "
              >
                Date
              </th>
              <th
                scope="col"
                className="h-16 px-6  font-medium stroke-slate-700 text-slate-700 "
              >
                Progress
              </th>
            </tr>
            {filterSelected?.map((game) => (
              <UserDashboardProgressTable game={game} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboardReports;
