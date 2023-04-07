import React from "react";

const Navbar = () => {
  return (
    <div className="hidden md:block">
      <div className="flex justify-center md:justify-between items-center">
        <img
          src="https://cdn.discordapp.com/attachments/714891795129171983/1093398090117029898/1200px-Fugro_logo.svg.png"
          className="w-[180px]"
        />
        <h1 className="pb-10 text-4xl  invisible md:visible md:f">NanoGPT</h1>
      </div>
    </div>
  );
};

export default Navbar;
