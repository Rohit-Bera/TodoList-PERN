import React from "react";

const HistoryRecords = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item, i) => {
          return (
            <tr className="border-b border-gray-200 " key={i}>
              <td className="flex items-center px-6 py-3 text-sm font-medium">
                <p className="">{i + 1}</p>
              </td>
              <td className="px-6 text-sm font-medium ">{item.date}</td>
              <td className="px-6 text-sm font-medium ">{item.task}</td>
              <td className="px-6 text-sm">
                <span className="inline-block px-2 py-1 text-green-700 bg-green-100 rounded-md  ">
                  done
                </span>
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default HistoryRecords;
