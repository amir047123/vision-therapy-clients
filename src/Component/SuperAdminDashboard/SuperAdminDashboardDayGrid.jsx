import React from "react";

const SuperAdminDashboardDayGrid = ({ day, allGameData, setDate, date }) => {
  const filteredArray = allGameData.filter((object) => {
    return object.date === day;
  });

  const time = filteredArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.remainingTime;
  }, 0);

  const playingTime = filteredArray?.length * 300 - time;

  // console.log(filteredArray, "plaing", playingTime);

  const minutes = Math.floor(playingTime / 60);
  const remainingSeconds = playingTime % 60;

  const present = Math.ceil((playingTime / 3600) * 100, 2);
  // console.log(present);
  return (
    <>
      {playingTime ? (
        <span
          className="relative overflow-hidden cursor-pointer group hover:overflow-visible focus-visible:outline-none"
          aria-describedby="tooltip-01"
        >
          <div
            className={
              day === date
                ? "lg:min-h-[18px] md:min-h-[14px] min-h-[10px] bg-green-500"
                : "lg:min-h-[18px] md:min-h-[14px] min-h-[10px]"
            }
          >
            <div
              onClick={() => setDate(day)}
              style={{ opacity: `${present + 10}%` }}
              className={
                day === date
                  ? "lg:min-h-[18px] md:min-h-[14px] min-h-[10px] bg-green-500 group-hover:border-2 border-primary"
                  : "lg:min-h-[18px] md:min-h-[14px] min-h-[10px] bg-secondary group-hover:border-2 border-primary"
              }
            />
          </div>

          <span
            role="tooltip"
            id="tooltip-01"
            className="invisible absolute bottom-full left-1/2 z-10 mb-2  -translate-x-1/2 rounded bg-primary p-4 text-sm text-white opacity-0 transition-all before:invisible before:absolute before:left-1/2 before:top-full before:z-10 before:mb-2 before:-ml-2 before:border-x-8 before:border-t-8 before:border-x-transparent before:border-t-blue-400 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100 "
          >
            <p className="whitespace-nowrap">
              {day} | Exercise Time: {`${minutes}:${remainingSeconds}`} Minutes
            </p>
          </span>
        </span>
      ) : (
        <span
          className="relative overflow-hidden cursor-pointer group hover:overflow-visible focus-visible:outline-none"
          aria-describedby="tooltip-01"
        >
          <div
            onClick={() => setDate(day)}
            className={
              day === date
                ? "lg:min-h-[18px] md:min-h-[14px] min-h-[10px] bg-green-500 group-hover:border-2 border-primary"
                : "lg:min-h-[18px] md:min-h-[14px] min-h-[10px] bg-gray-100 group-hover:border-2 border-primary"
            }
          />

          <span
            role="tooltip"
            id="tooltip-01"
            className="invisible absolute bottom-full left-1/2 z-10 mb-2  -translate-x-1/2 rounded bg-primary p-4 text-sm text-white opacity-0 transition-all before:invisible before:absolute before:left-1/2 before:top-full before:z-10 before:mb-2 before:-ml-2 before:border-x-8 before:border-t-8 before:border-x-transparent before:border-t-blue-400 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100 "
          >
            <p className="whitespace-nowrap">
              {day} | Exercise Time: {`${minutes}:${remainingSeconds}`} Minutes
            </p>
          </span>
        </span>
      )}
    </>
  );
};

export default SuperAdminDashboardDayGrid;
