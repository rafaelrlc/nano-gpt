import React from "react";

const Selectors = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full">
      <div>
        <label className="flex items-center ml-1 justify-start mb-1 text-gray-600">
          Enter Category
        </label>
        <select
          id="countries"
          class="bg-[#efeff2] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full md:px-28 px-20 overflow-y-auto"
        >
          <option selected></option>
          <option value="US">Type of failures</option>
          <option value="CA">Levels of criticality</option>
          <option value="FR">Days of downtime</option>
          <option value="DE">Verssels affected</option>
        </select>
      </div>

      <div>
        <label className="flex items-center justify-start ml-1 mt-5 lg:mt-0 mb-1 text-gray-600">
          Select your prompt
        </label>
        <select
          id="countries"
          class="bg-[#efeff2] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full md:px-28 px-20 overflow-y-auto"
        >
          <option selected></option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
    </div>
  );
};

export default Selectors;
