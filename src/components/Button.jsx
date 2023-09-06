import React from "react";
import { BiPlus, BiTrash } from "react-icons/bi";
const Button = (props) => {
  return (
    <li className="pt-4">
      <a
        onClick={props.onClick}
        className="flex items-center justify-center p-2 rounded text-white bg-[#AEAEB2] dark:bg-[#3b3b3b] hover:bg-[#a2a2a5] dark:hover:bg-[#2a2a2a]"
      >
        {props.icon}
        <span className="mr-2 text-sm hover:cursor-pointer">New Chat</span>
      </a>
    </li>
  );
};

export default Button;
