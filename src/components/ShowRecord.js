import React from "react";
import Span from "./Span";
import Button from "./Button";

const ShowRecord = (props) => {
  //passing function throug props
  const editData = props.editData;

  const deleteData = props.deleteData;

  const records = props.records;

  return (
    <>
      <div className="w-full rounded-2xl">
        <div className="border border-20 rounded-lg border-black bg-black text-white p-2 flex justify-evenly items-center">
          {/* <td>id</td> */}
          <Span child="date" className=" w-[10vw] p-2 uppercase" />
          <Span child="task" className=" w-[50vw] p-2 uppercase" />
        </div>
        <div className="border border-1 rounded-sm">
          {records &&
            records.map((item, id) => {
              return (
                <section
                  key={id}
                  className="border-black bg-secondary flex justify-evenly items-center mt-3 mb-2 p-2 rounded-lg
                border-r-black border-b-black border-r-8 border-b-8"
                >
                  {/* <td>{id}</td> */}
                  <Span child={item?.date} className="w-[10vw] p-2" />
                  <Span child={item?.task} className="w-[45vw] p-2" />
                  <div className="">
                    <Button
                      title="Edit"
                      clickAction={() => editData(item)}
                      className="rounded-sm p-1 m-1 bg-black text-white px-3"
                    />
                    <Button
                      title="Delete"
                      clickAction={() => deleteData(item?.id)}
                      className="rounded-sm p-1 m-1 bg-black text-white"
                    />
                  </div>
                </section>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ShowRecord;
