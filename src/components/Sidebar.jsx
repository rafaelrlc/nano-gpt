import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { theme } from "../utils/themes";
import { ThemeProvider } from "@emotion/react";
import { BiPlus } from "react-icons/bi";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { MdHelp } from "react-icons/md";
import { BsSun, BsSunFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { BiTrash, BiConversation } from "react-icons/bi";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { chats } from "../utils/prompts";
import { useSettings } from "./context/Settings/SettingsContextProvider";
import { debounce } from "lodash";
const SidebarNav = () => {
  const promptSettings = useSettings();

  const [showNav, setShowNav] = useState(true);
  const [checked, setChecked] = React.useState(true);

  const [apiInput, setApiInput] = useState(promptSettings.apiKey);

  const handleApiChange = debounce((event) => {
    promptSettings.setApiKey(event.target.value);
  }, 500);

  const handleInput = (event) => {
    handleApiChange(event);
    setApiInput(event.target.value);
  };

  const handleApiInputClear = () => {
    promptSettings.setApiKey("");
    setApiInput("");
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
          <h1 className="flex-1 text-center text-base font-base">
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
              <div className="flex flex-col gap-3 order-1">
                <li className="pt-4">
                  <Link
                    to="/chat/new"
                    className="flex items-center justify-center p-2 rounded text-white bg-[#AEAEB2] hover:bg-[#a2a2a5]"
                  >
                    <BiPlus size={20}></BiPlus>
                    <span className="mr-2 text-sm">New Chat</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dataset"
                    className="flex items-center justify-center p-2 rounded text-white bg-[#AEAEB2] hover:bg-[#a2a2a5]"
                  >
                    <span className="text-sm">Visualize Dataset</span>
                  </Link>
                </li>
                <Divider
                  light
                  sx={{
                    height: "1.75px",
                    bgcolor: "#919191",
                    marginTop: "0.5rem",
                  }}
                />
                <p className="text-white mt-3 text-base">
                  Previous Conversations
                </p>
                <div className="flex flex-col gap-2 bg-[#949498] p-4 overflow-y-auto h-[10rem] w-full">
                  {" "}
                  {chats.map((chat) => {
                    return (
                      <li key={chat.id} className="">
                        <Link
                          to={`/chat/${chat.chatLink}`}
                          className="flex items-center justify-center p-2 rounded text-white bg-[#AEAEB2] hover:bg-[#a2a2a5] gap-3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            stroke-strokeLinejoin="round"
                          >
                            <path d="M8 9h8"></path>
                            <path d="M8 13h6"></path>
                            <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
                          </svg>
                          <span className="mr-2 text-sm">{chat.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-0 order-2">
                <li>
                  <h3 className="flex items-center p-2 rounded text-white text-lg mb-2 ">
                    <span className="flex-1 whitespace-nowrap"></span>
                  </h3>
                </li>
                <div className="bg-[#929296] rounded-lg p-7 mb-3">
                  <li className="flex flex-col items-center justify-center">
                    <h3 className="flex items-center  rounded text-white text-[0.9rem]">
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
                    <h3 className="flex items-center  rounded text-white text-[0.9rem]">
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
                    <div className="flex items-center justify-center p-2 rounded text-white flex-col ">
                      <span className="flex-1 whitespace-nowrap"></span>
                      <div className="flex items-center justify-center gap-3">
                        <input
                          value={apiInput}
                          onChange={handleInput}
                          className="w-[80%] text-gray-500 py-2  text-xs rounded text-center bg-[#d1d1d1] focus:outline-none "
                          placeholder="API KEY"
                        ></input>{" "}
                        <button
                          onClick={handleApiInputClear}
                          className="transform text-gray-600 hover:text-gray-600 bg-[#d1d1d1] p-2 rounded-lg focus:outline-none"
                        >
                          <BiTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                </div>
                <Divider
                  light
                  sx={{
                    height: "1.75px",
                    bgcolor: "#919191",
                    marginTop: "0.65rem",
                  }}
                />
                <li className="flex flex-start">
                  <a
                    href="#"
                    onClick={() => console.log(promptSettings.apiKey)}
                    className="flex items-center justify-start p-2 rounded text-white  hover:bg-[#a2a2a5] mt-3 w-full"
                  >
                    <BiTrash size={20} className="text-gray-100 mr-2" />

                    <span className="mr-2 text-sm ">Clear Conversations</span>
                  </a>
                </li>
                <li
                  className="pt-4  flex flex-start"
                  onClick={() => setChecked(!checked)}
                >
                  <a
                    href="#"
                    className="flex items-center justify-start p-2 rounded text-white  hover:bg-[#a2a2a5] w-full "
                  >
                    {!checked ? (
                      <BsSunFill size={20} className="text-gray-600 mr-2" />
                    ) : (
                      <BsSun size={20} className="text-gray-200 mr-2" />
                    )}
                    <span className="mr-4 text-sm">Dark Mode</span>
                  </a>
                </li>
                <li className="pt-4  flex flex-start">
                  <a
                    href="#"
                    className="flex items-center justify-start p-2 rounded text-white  hover:bg-[#a2a2a5] w-full"
                  >
                    <FiLogOut size={20} className="text-gray-100 mr-2" />

                    <span className="mr-2 text-sm">Log Out</span>
                  </a>
                </li>{" "}
                <li className="pt-4  flex flex-start">
                  <a
                    href="#"
                    className="flex items-center justify-start p-2 rounded text-white B2] hover:bg-[#a2a2a5] mb-2 w-full"
                  >
                    <MdHelp size={20} className="text-gray-100 mr-2" />

                    <span className="text-sm">Help</span>
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
