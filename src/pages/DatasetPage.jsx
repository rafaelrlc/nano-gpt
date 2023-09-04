import React from "react";
import Sidebar from "../components/Layout/Sidebar";
import Dataset from "../components/Dataset";

const DatasetPage = () => {
  return (
    <div>
      <Sidebar></Sidebar>

      <div className="flex items-center justify-center h-[100vh]">
        <div className="md:ml-72 px-5 max-w-[1440px] w-full">
          <div className="p-5 flex justify-between flex-col gap-7">
            <h1 className="text-2xl text-center text-gray-600">
              Upload Your Data
            </h1>

            <Dataset></Dataset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetPage;
