import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = ({
  limit,
  rows,
  setDate,
  handleGo,
  offset,
  setSearchParams,
  page,
}) => {
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.userReducer).id;

  const setLimit = (val) => {
    setSearchParams({ l: limit, off: offset, page: page });
    navigate(`/history?user=${user_id}&page=${page}&l=${val}&off=${offset}`);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center pl-3">
          <p className="text-xs text-gray-400">Show</p>
          <div className="px-2 py-2 text-xs text-gray-500 ">
            <select
              className="block text-base bg-gray-100 cursor-pointer w-11 "
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            >
              {rows.map((item, i) => {
                return (
                  <option value={item} key={i}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="text-xs text-gray-400">entries</p>
        </div>
        <div className="flex px-4 py-2 mb-4 border border-gray-300 rounded-md md:mb-0">
          <input
            type="date"
            className="w-full pr-4 text-sm text-gray-700 bg-white   placeholder-text-100"
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            className="flex items-center text-gray-700  blue-300 hover:text-blue-600"
            onClick={() => handleGo()}
          >
            <span className="mr-2 text-xs ">Go</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
