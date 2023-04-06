import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#b8b8ba",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const Sidebar = () => {
  const [showNav, setShowNav] = useState(true);
  return (
    <div>
      <button
        onClick={() => setShowNav(!showNav)}
        type="button"
        className={`inline-flex items-center p-2 mt-2 ml-3 fixed ${
          showNav && "hidden"
        } text-sm text-gray-500 rounded-lg  hover:bg-[#bebebe] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600`}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      {showNav && (
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0`}
        >
          <div className="h-full py-4 overflow-y-auto bg-[#8E8E93] w-[100%] shadow-2xl">
            <ul className="space-y-2 font-medium text-center px-10 py-4 flex flex-col items-stretch h-full justify-between">
              <div className="flex flex-col gap-4 order-1">
                <li>
                  <a
                    onClick={() => setShowNav(!showNav)}
                    href="#"
                    className="flex items-center p-2 rounded text-[#F2F2F7] bg-[#AEAEB2] hover:bg-[#7c7c81]"
                  >
                    <span className="flex-1 whitespace-nowrap">Menu</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 rounded text-[#F2F2F7] bg-[#AEAEB2] hover:bg-[#7c7c81]"
                  >
                    <span className="flex-1 whitespace-nowrap">+ New Chat</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 rounded text-[#F2F2F7] bg-[#AEAEB2] hover:bg-[#7c7c81]"
                  >
                    <span className="flex-1 whitespace-nowrap">Dataset</span>
                  </a>
                </li>
              </div>
              <div className="flex flex-col gap-4 order-2">
                <li>
                  <h3 className="flex items-center p-2 rounded text-[#cfcfd1] text-xl">
                    <span className="flex-1 whitespace-nowrap">
                      Select Parameters
                    </span>
                  </h3>
                </li>
                <li className="flex flex-col items-center justify-center">
                  <h3 className="flex items-center p-2 rounded text-[#F2F2F7]">
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
                        step={10}
                        marks
                        min={10}
                        max={110}
                        color="primary"
                      />
                    </ThemeProvider>
                  </div>
                </li>
                <li className="flex flex-col items-center justify-center">
                  <h3 className="flex items-center p-2 rounded text-[#F2F2F7]">
                    <span className="flex-1 whitespace-nowrap">Tokens</span>
                  </h3>
                  <div className="w-[80%]">
                    {" "}
                    <ThemeProvider theme={theme}>
                      {" "}
                      <Slider
                        aria-label="Tokens"
                        defaultValue={0}
                        valueLabelDisplay="auto"
                        min={10}
                        max={110}
                        color="primary"
                      />
                    </ThemeProvider>
                  </div>
                </li>
                <li>
                  <h3 className="flex items-center p-2 rounded text-[#F2F2F7] flex-col gap-3">
                    <span className="flex-1 whitespace-nowrap">
                      Enter your API key
                    </span>
                    <input
                      className="w-[70%] text-gray-500 py-2  text-xs rounded text-center"
                      placeholder="Key"
                    ></input>
                  </h3>
                </li>
              </div>
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
