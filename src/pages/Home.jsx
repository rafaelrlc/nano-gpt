import React from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import TextFields from "../components/TextFields";
import { useState, useEffect } from "react";

const Home = ({ newPage }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div>
      <Sidebar handleThemeSwitch={handleThemeSwitch}></Sidebar>
      <div className="flex items-center justify-center">
        <div className="md:ml-72 px-5 w-full bg-gray-100 dark:bg-[#333333]">
          <TextFields newPage={newPage} />
        </div>
      </div>
    </div>
  );
};

export default Home;
