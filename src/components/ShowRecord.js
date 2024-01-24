import React, { useEffect, useState } from "react";

const ShowRecord = (props) => {
  //passing function throug props
  const editData = props.editData;

  const deleteData = props.deleteData;

  const records = props.records;

  return (
    <>
      <table border="1">
        <thead>
          <td>id</td>
          <td>date</td>
          <td>task</td>
          <td>Edit btn</td>
          <td>Delete btn</td>
        </thead>
        <tbody>
          {records.map((item, id) => {
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{item?.date}</td>
                <td>{item?.task}</td>
                <td>
                  <button onClick={() => editData(item)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteData(item?.id)}>Delete</button>
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
