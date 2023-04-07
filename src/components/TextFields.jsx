import React from "react";
import TypeWriterEffect from "react-typewriter-effect";

const responseTest =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer \
took a galley of type and scrambled it to make a type specimen book. It has survived not only five \
centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was \
popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and \
more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const TextFields = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-10">
        <div>
          <label for="message" class="block mb-2 ml-2 text-xl text-gray-700">
            Enter your prompts:
          </label>
          <textarea
            id="message"
            rows="2"
            class="block py-4 w-full text-base text-gray-900 bg-[#efeff2] rounded-lg  border-gray-300 border-2 "
            placeholder="Write your message here..."
          ></textarea>
        </div>
        <div>
          <label for="message" class="block mb-2 ml-2 text-xl text-gray-700">
            Your answers:
          </label>
          <div class="block py-32 px-3 w-full text-base overflow-y-auto text-gray-900 bg-[#eaeaed] rounded-lg border-gray-300 border-2 outline-none relative">
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "20px",
                right: "20px",
                transform: "translateY(20px)",
              }}
            >
              <TypeWriterEffect
                textStyle={{
                  color: "#6f7276",
                  fontWeight: 500,
                }}
                startDelay={700}
                cursorColor="#cececf"
                multiText={[responseTest]}
                multiTextDelay={1000}
                typeSpeed={30}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          class="text-white  text-sm md:px-10 px-8 py-2.5 mr-2 mb-2 bg-[#999898] hover:bg-[#858585] font-medium rounded-lg "
        >
          Go
        </button>
        <div>
          <button
            type="button"
            class="py-2.5 md:px-7 px-3 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#b8b8b8] rounded-lg border border-gray-200 hover:bg-[#a4a3a3]"
          >
            Stop
          </button>
          <button
            type="button"
            class="py-2.5 md:px-7 px-3  mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#b8b8b8] rounded-lg border border-gray-200 hover:bg-[#a4a3a3]"
          >
            Clean
          </button>
          <button
            type="button"
            class="py-2.5 md:px-7 px-3 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#b8b8b8] rounded-lg border border-gray-200 hover:bg-[#a4a3a3]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextFields;
