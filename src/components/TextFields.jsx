import React, { useState } from "react";
import TypeWriterEffect from "react-typewriter-effect";
import AIWriter from "react-aiwriter";
import toast, { Toaster } from "react-hot-toast";
const responseTest =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer \
took a galley of type and scrambled it to make a type specimen book. It has survived not only five \
centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was \
popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and \
more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const TextFields = () => {
  const [gptResponse, setGptResponse] = useState(responseTest);
  const [charCount, setCharCount] = useState(0);
  const [isEnding, setIsEnding] = useState(false);

  const handleTextareaChange = (event) => {
    setCharCount(event.target.value.length);
  };

  const copyToClipboard = (e) => {
    const textarea = document.createElement("textarea");
    const text = gptResponse;
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-7">
        <div>
          <label
            htmlFor="message"
            className="block mb-2 ml-2 text-xl text-gray-700"
          >
            Enter your prompts:
          </label>
          <textarea
            id="message"
            rows="2"
            className="block py-4 w-full text-base text-gray-900 bg-[#efeff2] rounded-lg border-gray-300 border-2"
            placeholder="Write your message here..."
            onChange={handleTextareaChange}
            maxLength={500}
            onInput={(event) => {
              const input = event.target.value;
              const maxLength = event.target.maxLength;
              if (input.length > maxLength) {
                event.target.value = input.slice(0, maxLength);
              }
              if (input.length >= 450) {
                setIsEnding(true);
              } else {
                setIsEnding(false);
              }
            }}
          ></textarea>
          <p className={`text-right text-gray-500`}>
            <span className={` ${isEnding ? "text-red-500" : "text-gray-500"}`}>
              {charCount}
            </span>{" "}
            / 500
          </p>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 ml-2 text-xl text-gray-700"
          >
            Your answers:
          </label>
          <div className="block py-32 px-3 w-full text-base overflow-y-auto text-gray-900 bg-[#eaeaed] rounded-lg border-gray-300 border-2 outline-none relative">
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "20px",
                right: "20px",
                transform: "translateY(20px)",
              }}
            >
              <AIWriter delay={25}>
                <p className="text-gray-500">{gptResponse}</p>
              </AIWriter>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <button
            type="button"
            className="py-2.5 md:px-7 px-3 mr-2 mb-2 text-sm font-medium  text-white  focus:outline-none bg-[#b8b8b8] rounded-lg border border-gray-200 hover:bg-[#a4a3a3]"
          >
            Stop
          </button>
          <button
            onClick={() => setGptResponse("")}
            type="button"
            className="py-2.5 md:px-7 px-3  mr-2 mb-2 text-sm font-medium  text-white focus:outline-none bg-[#b8b8b8] rounded-lg border border-gray-200 hover:bg-[#a4a3a3]"
          >
            Clean
          </button>
          <button
            type="button"
            className="py-2.5 md:px-7 px-3 mr-2 mb-2 text-sm font-medium  text-white focus:outline-none bg-[#b8b8b8] rounded-lg border border-gray-200 hover:bg-[#a4a3a3]"
          >
            Save
          </button>

          <button
            type="button"
            className="py-2.5 md:px-7 px-3 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#b8b8b8] rounded-lg border border-gray-200 hover:bg-[#a4a3a3] active:bg-[#8d8c8c]"
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </button>
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
              success: {
                style: {
                  background: "#f0f0f0",
                  color: "#333333",
                },
              },
            }}
          />
        </div>{" "}
        <button
          type="button"
          className="text-white font-bold  text-sm md:px-10 px-8 py-2.5 mr-2 mb-2 bg-[#999898] hover:bg-[#858585]  rounded-lg mt-[0.05rem]"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default TextFields;
