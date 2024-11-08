import React from "react";

const UserDashboardProgressTable = ({ game }) => {
  const time = 300 - game?.remainingTime;
  const present = Math.ceil((time / 300) * 100, 2);

  // ..
  return (
    <tr className="border-b border-slate-200">
      <td className="h-16 px-6  transition duration-300 border-slate-200 stroke-black text-black ">
        {game?.gameName}
      </td>
      <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 whitespace-nowrap">
        {game?.date} , {game?.time}
      </td>
      <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
        <div className="h-2 w-full bg-neutral-200  rounded-full">
          <div
            className="h-2 bg-secondary rounded-full"
            style={{ width: `${present}%` }}
          ></div>
        </div>
      </td>
    </tr>
  );
};

export default UserDashboardProgressTable;
