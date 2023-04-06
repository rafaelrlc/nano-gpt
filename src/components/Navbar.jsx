import React from "react";

const Navbar = () => {
  return (
    <div className="p-5 flex items-center justify-between">
      <img
        src="https://cdn.discordapp.com/attachments/714891795129171983/1093398090117029898/1200px-Fugro_logo.svg.png"
        className="w-[180px]"
      />
      <h1 className="pb-10 text-4xl">NanoGPT</h1>
    </div>
  );
};

export default Navbar;
