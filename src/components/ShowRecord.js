import React, { useEffect, useState } from "react";

const ShowRecord = (props) => {
  //passing function throug props
  const editData = props.editData;

  const deleteData = props.deleteData;

  const records = props.records;

  return (
    <>
      <table className="w-full">
        <thead className="border border-20 rounded-sm border-black bg-black text-white">
          <td>id</td>
          <td>date</td>
          <td>task</td>
          <td>Edit btn</td>
          <td>Delete btn</td>
        </thead>
        <tbody className="border border-1 rounded-sm border-black">
          {records.map((item, id) => {
            return (
              <tr key={id} className="border border-black">
                <td>{id}</td>
                <td>{item?.date}</td>
                <td>{item?.task}</td>
                <td>
                  <button
                    onClick={() => editData(item)}
                    className="rounded-sm p-1 m-1 bg-black text-white px-3"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteData(item?.id)}
                    className="rounded-sm p-1 m-1 bg-black text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ShowRecord;
