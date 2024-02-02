import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ total, limit, offset, setSearchParams, pgLimit }) => {
  console.log("total: ", total);
  const [currPg, setPages] = useState(1);
  const [calOff, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams({ l: limit, off: calOff, page: currPg });
    navigate(`/history?page=${currPg}&l=${limit}&off=${calOff}`);
  }, [currPg, limit, calOff]);

  const onPageChange = (title = "") => {
    console.log("title: ", title);
    console.log("currPg: ", currPg);

    if (title === "previous") {
      if (currPg > 1) {
        setPages(currPg - 1);
        setOffset(Math.abs(Number(limit) - Number(offset)));
      }
    } else {
      if (currPg < pgLimit) {
        setPages(currPg + 1);
        setOffset(Number(limit) + Number(offset));
      }
    }
  };

  return (
    <>
      {/* pagination */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3">
        <p className="mb-4 text-xs lg:mb-0 ">Showing 1 to 10 of 13 entries</p>
        <nav aria-label="page-navigation ">
          <ul className="flex mb-4 list-style-none lg:mb-0">
            <li
              className={`page-item ${
                currPg === 1
                  ? "disabled relative block px-3 py-1 text-xs text-gray-700 transition-all duration-300 rounded-md"
                  : "relative block px-3 py-1 text-xs text-white transition-all duration-300 rounded-md  hover:bg-blue-100 hover:text-black cursor-pointer bg-blue-600"
              }`}
              onClick={() => onPageChange("previous")}
            >
              Previous
            </li>
            <li className="page-item">
              <button
                className={
                  "relative block px-3 mx-1 py-1 mr-1 text-xs text-gray-100 transition-all duration-300 bg-blue-600 rounded-md hover:text-blue-700 hover:bg-blue-200 gray-400"
                }
              >
                {currPg}
              </button>
            </li>

            <li
              className={`page-item ${
                currPg < pgLimit
                  ? "relative block px-3 py-1 text-xs text-white transition-all duration-300 rounded-md  hover:bg-blue-100 hover:text-black bg-blue-600"
                  : "disabled relative block px-3 py-1 text-xs text-gray-700 transition-all duration-300 rounded-md"
              }`}
              onClick={() => onPageChange("next")}
            >
              <button className="">Next </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
