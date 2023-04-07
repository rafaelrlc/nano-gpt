import React, { useState } from "react";
import { prompts, categories } from "../utils/prompts";

const Selectors = () => {
  const [category, setCategory] = useState("");
  const [promptType, setPromptType] = useState("");

  return (
    <div className="flex lg:flex-row lg:gap-6 flex-col w-full md:justify-start gap-1">
      <div>
        <label className="flex items-center ml-1 justify-start mb-1 text-gray-600">
          Enter Category
        </label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          id="countries"
          className="bg-[#efeff2]  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block lg:w-[300px] w-full  md:px-28 px-20 overflow-y-auto hover:cursor-pointer"
        >
          <option value={category}></option>
          {categories.map((item) => (
            <option key={item.id} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="flex items-center justify-start ml-1 mt-5 lg:mt-0 mb-1 text-gray-600">
          Select your prompt
        </label>
        <select
          onChange={(e) => setPromptType(e.target.value)}
          id="countries"
          className="bg-[#efeff2]  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block  lg:w-[300px] w-full md:px-28 px-20 overflow-y-auto hover:cursor-pointer"
        >
          <option value={promptType}></option>
          {prompts.map((item) => (
            <option key={item.id} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Selectors;
