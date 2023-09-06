import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { BsPerson } from "react-icons/bs";
import { AiOutlineRobot } from "react-icons/ai";

const ChatBot = ({ dialogue }) => {
  return (
    <div className="">
      {dialogue.map((item) => (
        <li className="flex flex-col gap-5 rounded-xl " key={item._id}>
          <div className="bg-[#f2f2f2] dark:bg-[#606060] dark:text-gray-100 p-2 rounded-lg flex items-center gap-3 break-all">
            <BsPerson className="text-gray-700 dark:text-gray-100  " />
            <p>{item.question}</p>
          </div>
          <div className="bg-[#e9e9e9] dark:bg-[#606060] dark:text-gray-100 p-2 rounded-lg flex items-center gap-3 mb-[1.25rem] break-all">
            <AiOutlineRobot className="text-gray-700 dark:text-gray-100 text-xl" />
            <div className="text-base">
              {item.response.length > 0 ? (
                item.response
              ) : (
                <ThreeDots
                  height="30"
                  width="30"
                  radius="9"
                  color="#c5c5c5"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              )}
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default ChatBot;
