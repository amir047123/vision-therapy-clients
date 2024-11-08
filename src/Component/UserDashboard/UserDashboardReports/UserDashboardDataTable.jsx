import React from "react";

const UserDashboardDataTable = ({ game }) => {
  const present = Math.ceil((game?.score / game?.possibleScore) * 100, 2);
  return (
    <tr className="border-b border-slate-200">
      <td className="h-16 px-6  transition duration-300 border-slate-200 stroke-black text-black ">
        {game?.gameName}
      </td>
      <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 whitespace-nowrap">
        {game?.date} , {game?.time}
      </td>
      <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
        {present}%
      </td>
    </tr>
  );
};

export default UserDashboardDataTable;
