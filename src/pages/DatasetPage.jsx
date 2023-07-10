import React from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Navbar";
import Dataset from "../components/Dataset";

const DatasetPage = () => {
  return (
    <div>
      <Sidebar></Sidebar>
      <div className="flex items-center justify-center h-full">
        <div className="md:ml-72 px-5 max-w-[1440px] w-full">
          <div className="p-5 flex justify-between flex-col gap-7">
            <Navbar />
            <Dataset></Dataset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetPage;
