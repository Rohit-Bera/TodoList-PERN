import React from "react";

const Pagination = ({}) => {
  return (
    <>
      {/* pagination */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3">
        <p className="mb-4 text-xs lg:mb-0 ">Showing 1 to 10 of 13 entries</p>
        <nav aria-label="page-navigation ">
          <ul className="flex mb-4 list-style-none lg:mb-0">
            <li className="page-item disabled ">
              <a
                href="#"
                className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md pointer-events-none  hover:text-gray-100 hover:bg-blue-600"
              >
                Previous
              </a>
            </li>
            <li className="page-item ">
              <a
                href="#"
                className="relative block px-3 py-1 mr-1 text-xs text-gray-100 transition-all duration-300 bg-blue-600 rounded-md hover:text-blue-700 hover:bg-blue-200 gray-400"
              >
                1
              </a>
            </li>
            <li className="page-item ">
              <a
                href="#"
                className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md  hover:bg-blue-100 "
              >
                2
              </a>
            </li>
            <li className="page-item ">
              <a
                href="#"
                className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md  hover:bg-blue-100 "
              >
                3
              </a>
            </li>
            <li className="page-item ">
              <a
                href="#"
                className="relative block px-3 py-1 text-xs text-gray-700 transition-all duration-300 rounded-md  hover:bg-blue-100 "
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;