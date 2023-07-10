import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { BsRobot, BsPerson } from "react-icons/bs";
import { AiOutlineRobot } from "react-icons/ai";

const ChatBot = ({ dialogue }) => {
  return (
    <div>
      {dialogue.map((item) => (
        <li className="flex flex-col gap-5 p-2 py-4 rounded-xl">
          <div className="bg-[#f2f2f2] p-2 rounded-lg flex items-center gap-3">
            <BsPerson className="text-gray-700 " />
            <p>{item[0]}</p>
          </div>
          <div className="bg-[#e9e9e9] p-2 rounded-lg flex items-center gap-3">
            <AiOutlineRobot className="text-gray-700 text-xl" />
            <div className="text-base">
              {item[1].length > 0 ? (
                item[1]
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
