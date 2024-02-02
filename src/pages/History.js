// react paginate implementtaion
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { useSelector } from "react-redux";
import HistoryRecords from "../components/HistoryRecords";
import { getHistory } from "../services/task.service";

const History = () => {
  const rows = [2, 4, 8, 10, 15, 20, 30];
  const [limit, setLimit] = useState(8);
  const [date, setDate] = useState("");
  const [offset, setOffset] = useState(0);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRecords();
  }, [limit]);

  // const records = useSelector((state) => state.tasksReducer).tasks;

  const getRecords = async () => {
    console.log("limit: ", limit);
    const user_id = 1;

    const response = await getHistory({ user_id, limit, offset, date });
    console.log("response: ", response);

    setRecords(response.rows);
  };

  return (
    <>
      <section
        className={`items-center lg:flex h-screen w-[90vw] font-poppins ${
          limit >= 15 ? "mt-16" : ""
        } `}
      >
        <div className="justify-center w-[80vw] items-center px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="overflow-x-auto bg-white rounded shadow ">
            <div className="">
              <h2 className="px-6 py-4 pb-4 text-xl font-medium border-b border-gray-300">
                History
              </h2>

              <Search
                rows={rows}
                setLimit={setLimit}
                setDate={setDate}
                handleGo={getRecords}
                limit={limit}
              />

              <table className="w-full table-auto">
                <thead className="bg-gray-100 ">
                  <tr className="text-xs text-left text-gray-500 border-b border-gray-200">
                    <th className="flex items-center py-3 pl-6 font-medium">
                      <span>No.</span>
                    </th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Task</th>
                    <th className="px-6 py-3 font-medium">status</th>
                  </tr>
                </thead>
                <tbody>
                  <HistoryRecords currentItems={records} />
                </tbody>
              </table>
              {/* pagination */}
              <Pagination itemsPerPage={limit} items={records} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default History;
