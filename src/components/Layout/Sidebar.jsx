import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import { BiPlus, BiTrash } from "react-icons/bi";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { MdHelp } from "react-icons/md";
import { BsSun, BsChatLeftDots } from "react-icons/bs";
import { ThemeProvider } from "@emotion/react";
import AxiosApi from "../../services/api";
import { useSettings } from "../../context/Settings/SettingsContextProvider";
import { debounce } from "lodash";
import { theme } from "../../utils/themes";
import Options from "../Options";
import Button from "../Button";
const Sidebar = (props) => {
  const promptSettings = useSettings();
  const { api } = AxiosApi();
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(true);
  const [apiInput, setApiInput] = useState(promptSettings.apiKey);
  const [tokenAmount, setTokenAmount] = useState(promptSettings.tokens);
  const [temperatureAmount, setTemperatureAmount] = useState(
    promptSettings.temperature
  );
  const [previousChats, setPreviousChats] = useState([]);

  const fetchConvo = async () => {
    try {
      const response = await api.get("/id/getAll");
      setPreviousChats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearConvo = async () => {
    try {
      await api.delete("/deleteAllConversation");
      setPreviousChats([]);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleTemperatureChange = (event) => {
    setTemperatureAmount(event.target.value);
    promptSettings.setTemperature(event.target.value);
  };

  const handleTokenChange = (event) => {
    setTokenAmount(event.target.value);
    promptSettings.setTokens(event.target.value);
  };

  const newChat = async () => {
    try {
      const response = await api.post("/conversation/new");
      console.log(response);
      navigate(`/chat/${response.data.conversationId}`);
      fetchConvo();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConvo();
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* Navigation header */}
        <nav className="sticky top-0 z-10 bg-gray-200 dark:bg-[#2a2a2a] flex items-center pl-1 pt-1 text-gray-500 dark:text-gray-200 sm:pl-3 md:hidden">
          <h1 className="flex-1 text-center text-base font-base">
            {showNav ? "Nano GPT" : ""}
          </h1>
          {/* Toggle navigation button */}
          <button
            onClick={() => setShowNav(!showNav)}
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-300 outline-none"
          >
            {showNav ? (
              <AiOutlinePlus size={25} />
            ) : (
              <AiOutlineClose size={25} />
            )}
          </button>
        </nav>
        {/* Sidebar content */}
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-72 h-screen transition-transform duration-300 ${
            showNav && "-translate-x-full"
          } md:translate-x-0`}
        >
          {/* Sidebar navigation */}
          <div className="h-full py-2 overflow-y-auto bg-[#97979c] dark:bg-[#484848]  w-[100%]">
            <ul className="space-y-2 font-medium text-center px-4 flex flex-col items-stretch h-full justify-between">
              <div className="flex flex-col gap-3 order-1">
                <Button
                  onClick={newChat}
                  icon={<BiPlus size={20} label="New Chat" />}
                />
                <li>
                  <Link
                    to="/dataset"
                    className="flex items-center justify-center p-2 rounded text-white bg-[#AEAEB2] dark:bg-[#3b3b3b] hover:bg-[#a2a2a5] dark:hover:bg-[#2a2a2a]"
                  >
                    <span className="text-sm">Visualize Dataset</span>
                  </Link>
                </li>

                {/* Previous Chats section */}
                {previousChats.length >= 1 && (
                  <div>
                    <p className="text-white my-3 text-base">Previous Chats</p>
                    <ul className="flex flex-col gap-2 bg-[#949498] dark:bg-[#3b3b3b] p-4 overflow-y-auto no-scrollbar max-h-[300px] w-full rounded-lg">
                      {previousChats.map((chat) => (
                        <li key={chat.id}>
                          <Link
                            to={`/chat/${chat._id}`}
                            className="flex items-center justify-center  p-2 rounded text-white bg-[#AEAEB2] dark:bg-[#323232] hover:bg-[#a2a2a5] dark:hover:bg-[#2a2a2a] gap-3"
                          >
                            <BsChatLeftDots />
                            <span className="mr-2 text-sm">
                              {chat.chatName}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Settings section */}
              <div className="flex flex-col gap-0 order-2">
                <li>
                  <h3 className="flex items-center p-2 rounded text-white text-lg mb-2 ">
                    <span className="flex-1 whitespace-nowrap"></span>
                  </h3>
                </li>
                {/* Temperature slider */}
                <div className="bg-[#929296] dark:bg-[#3b3b3b] rounded-lg p-7 mb-3">
                  <li className="flex flex-col items-center justify-center">
                    <h3 className="flex items-center  rounded text-white text-[0.9rem]">
                      <span className="flex-1 whitespace-nowrap">
                        Temperature
                      </span>
                    </h3>
                    <div className="w-[80%]">
                      <ThemeProvider theme={theme}>
                        <Slider
                          aria-label="Temperature"
                          defaultValue={0.7}
                          valueLabelDisplay="auto"
                          step={0.05}
                          marks
                          min={0}
                          max={1}
                          color="primary"
                          value={temperatureAmount}
                          onChange={handleTemperatureChange}
                        />
                      </ThemeProvider>
                    </div>
                  </li>
                  {/* Tokens slider */}
                  <li className="flex flex-col items-center justify-center">
                    <h3 className="flex items-center  rounded text-white text-[0.9rem]">
                      <span className="flex-1 whitespace-nowrap">Tokens</span>
                    </h3>
                    <div className="w-[80%]">
                      <Slider
                        aria-label="Tokens"
                        valueLabelDisplay="auto"
                        defaultValue={850}
                        step={100}
                        min={100}
                        max={4096}
                        color="primary"
                        value={tokenAmount}
                        onChange={handleTokenChange}
                      />
                    </div>
                  </li>
                  {/* API Key input */}
                  <li>
                    <div className="flex items-center justify-center p-2 rounded text-white flex-col">
                      <span className="flex-1 whitespace-nowrap"></span>
                      <div className="flex items-center justify-center gap-3">
                        <input
                          value={apiInput}
                          onChange={handleInput}
                          className="w-[80%] text-gray-500 dark:text-gray-200 dark:placeholder-gray-300 py-2  text-xs rounded text-center bg-[#d1d1d1] dark:bg-[#494949] focus:outline-none "
                          placeholder="API KEY"
                        ></input>
                        <button
                          onClick={handleApiInputClear}
                          className="transform text-gray-600 dark:text-gray-300 hover:text-gray-600 bg-[#d1d1d1] dark:bg-[#404040] p-2 rounded-lg focus:outline-none"
                        >
                          <BiTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                </div>
                {/* Clear Chats button */}
                <Divider
                  light
                  sx={{
                    height: "1.75px",
                    bgcolor: "#919191",
                    marginTop: "0.65rem",
                  }}
                />
                <div>
                  <Options
                    onClick={clearConvo}
                    label="Clear Chats"
                    logo={<BiTrash size={20} className="text-gray-100 mr-2" />}
                  />
                  <Options
                    onClick={props.handleThemeSwitch}
                    label="Dark Mode"
                    logo={<BsSun size={20} className="text-gray-200 mr-2" />}
                  />
                  <Options
                    onClick={() => {}}
                    label="Help"
                    logo={<MdHelp size={20} className="text-gray-100 mr-2" />}
                  />
                </div>
              </div>
            </ul>
          </div>
        </aside>
      </ThemeProvider>
    </div>
  );
};

export default Sidebar;
