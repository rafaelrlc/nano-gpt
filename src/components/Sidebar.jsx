import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { theme } from "../utils/themes";
import { ThemeProvider } from "@emotion/react";
import Switch from "@mui/material/Switch";
import { BiPlus } from "react-icons/bi";
import { AiOutlineUpload, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { MdDarkMode, MdOutlineDarkMode, MdHelp } from "react-icons/md";
import { BsSun, BsSunFill } from "react-icons/bs";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const label = { inputProps: { "aria-label": "Switch demo" } };
const SidebarNav = () => {
  const [showNav, setShowNav] = useState(true);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <nav className="sticky top-0 z-10 flex items-center bg-[#97979c] pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
          <button
            onClick={() => setShowNav(!showNav)}
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <h1 class="flex-1 text-center text-base font-base">
            {showNav ? "Nano GPT" : ""}
          </h1>

          <button
            onClick={() => setShowNav(!showNav)}
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            {!showNav ? (
              <AiOutlineClose size={25} />
            ) : (
              <AiOutlinePlus size={25} />
            )}
          </button>
        </nav>

        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-72 h-screen transition-transform duration-300 ${
            showNav && "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="h-full py-2 overflow-y-auto bg-[#97979c]  w-[100%]">
            <ul className="space-y-2 font-medium text-center px-4 flex flex-col items-stretch h-full justify-between ">
              <div className="flex flex-col gap-4 order-1">
                <li className="pt-4">
                  <a
                    href="#"
                    className="flex items-center justify-center p-2 rounded text-white bg-[#AEAEB2] hover:bg-[#a2a2a5]"
                  >
                    <BiPlus size={20}></BiPlus>
                    <span className="mr-2">New Chat</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center p-2 rounded text-white bg-[#AEAEB2] hover:bg-[#a2a2a5]"
                  >
                    <span className="mr-3">Visualize Dataset</span>
                  </a>
                </li>
              </div>
              <div className="flex flex-col gap-4 order-2">
                <li>
                  <h3 className="flex items-center p-2 rounded text-white text-lg mb-2 ">
                    <span className="flex-1 whitespace-nowrap"></span>
                  </h3>
                </li>
                <li className="flex flex-col items-center justify-center">
                  <h3 className="flex items-center p-2 rounded text-white text-base">
                    <span className="flex-1 whitespace-nowrap">
                      Temperature
                    </span>
                  </h3>
                  <div className="w-[80%]">
                    {" "}
                    <ThemeProvider theme={theme}>
                      {" "}
                      <Slider
                        aria-label="Temperature"
                        defaultValue={30}
                        valueLabelDisplay="auto"
                        step={5}
                        marks
                        min={10}
                        max={110}
                        color="primary"
                      />
                    </ThemeProvider>
                  </div>
                </li>
                <li className="flex flex-col items-center justify-center">
                  <h3 className="flex items-center p-2 rounded text-white text-base">
                    <span className="flex-1 whitespace-nowrap">Tokens</span>
                  </h3>
                  <div className="w-[80%]">
                    {" "}
                    <Slider
                      aria-label="Tokens"
                      defaultValue={0}
                      valueLabelDisplay="auto"
                      min={10}
                      max={110}
                      color="primary"
                    />
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded text-white flex-col gap-3">
                    <span className="flex-1 whitespace-nowrap"></span>
                    <input
                      className="w-[70%] text-gray-500 py-2  text-xs rounded text-center bg-[#d1d1d1] focus:outline-none"
                      placeholder="API KEY"
                    ></input>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-center mt-7 gap-5">
                    {" "}
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={checked}
                            onChange={handleChange}
                            color="primary"
                          />
                        }
                        className="text-white"
                      />
                    </FormGroup>{" "}
                    <div className="ml-4">
                      {checked ? (
                        <BsSunFill size={25} className="text-gray-600" />
                      ) : (
                        <BsSun size={25} className="text-gray-600" />
                      )}
                    </div>
                  </div>
                </li>
                <li>
                  <a className="flex items-center justify-center gap-3 hover:cursor-pointer mt-2 mb-3">
                    <MdHelp size={25} className="text-gray-600"></MdHelp>
                    <span className="mr-3 text-gray-600">Help</span>
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </aside>
      </ThemeProvider>
    </div>
  );
};

export default SidebarNav;
