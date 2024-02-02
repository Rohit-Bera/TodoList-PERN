// react paginate implementtaion
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { useSelector } from "react-redux";
import HistoryRecords from "../components/HistoryRecords";
import { getHistory } from "../services/task.service";
import { useSearchParams } from "react-router-dom";

const History = () => {
  const rows = [2, 4, 8, 10, 15, 20, 30];
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("l");
  const offset = searchParams.get("off");
  const page = searchParams.get("page");
  const [pgLimit, setPgLimit] = useState(0);

  useEffect(() => {
    getRecords();
    setPgLimit(Math.ceil(total / limit));
  }, [limit, offset, page, total]);

  // const records = useSelector((state) => state.tasksReducer).tasks;

  const getRecords = async () => {
    console.log("limit: ", limit);
    const user_id = 1;

    const { rows } = await getHistory({ user_id, limit, offset, date });

    setRecords(rows.records);
    setTotal(rows.rowCount);
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
                setDate={setDate}
                handleGo={getRecords}
                limit={limit}
                offset={offset}
                page={page}
                setSearchParams={setSearchParams}
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

              <Pagination
                total={total}
                limit={limit}
                offset={offset}
                page={page}
                setSearchParams={setSearchParams}
                pgLimit={pgLimit}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default History;
