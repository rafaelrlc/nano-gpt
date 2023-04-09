import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Selectors from "../components/Selectors";
import Footer from "../components/Footer";
import TextFields from "../components/TextFields";
const Home = () => {
  return (
    <div>
      <Sidebar></Sidebar>
      <div className="flex items-center justify-center h-full">
        <div className="md:ml-72 px-5 max-w-[1440px] w-full">
          <div className="p-5 flex justify-between flex-col gap-7">
            <Navbar />
            <Selectors />
            <TextFields />

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
