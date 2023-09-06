import React from "react";

const Options = (props) => {
  return (
    <li className="flex flex-start">
      <a
        onClick={props.onClick}
        className="flex items-center justify-start p-2 rounded text-white hover:cursor-pointer hover:bg-[#a2a2a5] mt-3 w-full dark:hover:bg-[#2a2a2a]"
      >
        {props.logo}
        <span className="mr-2 text-sm ">{props.label}</span>
      </a>
    </li>
  );
};

export default Options;
