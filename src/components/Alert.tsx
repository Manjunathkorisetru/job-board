import React from "react";

function Alert() {
  return (
    <div className="flex justify-center my-64">
      <div
        className=" w-[300px] h-[100px] bg-red-400 
      rounded-lg justify-center flex items-center"
      >
        <p className="text-xl font-semibold">No jobs found</p>
      </div>
    </div>
  );
}
export default Alert;
