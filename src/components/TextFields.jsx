import React, { useEffect, useState, useRef } from "react";
import { responseTest } from "../utils/prompts";
import { BsRobot, BsPerson } from "react-icons/bs";
import { AiOutlineRobot } from "react-icons/ai";
import { useParams } from "react-router-dom";
import AxiosApi from "../services/api";
//    <form className="flex flex-col" onSubmit={submitHandler}>
const TextFields = () => {
  const { api } = AxiosApi();
  const [gptDialogue, setGptDialogue] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [isEnding, setIsEnding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const textFieldRef = useRef(null);
  const answersDivRef = useRef(null);

  const params = useParams();
  const conversationID = params.id;

  const handleTextareaChange = (event) => {
    setCharCount(event.target.value.length);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (textFieldRef.current.value === "") return;

    const newQuestion = { question: textFieldRef.current.value };
    const userQuestion = [newQuestion.question, ""];
    textFieldRef.current.value = "";

    setGptDialogue((prevDialogue) => [...prevDialogue, userQuestion]); // Add userQuestion to the gptDialogue state
    scrollAnswersToBottom();

    try {
      await api.post(`/question/${conversationID}`, newQuestion);
      getDialogue();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDialogue = async () => {
    try {
      const response = await api.get(`/getConversation/${conversationID}`);
      setGptDialogue(response.data.history);
      scrollAnswersToBottom();
    } catch (error) {
      console.log(error);
    }
  };

  const scrollAnswersToBottom = () => {
    if (answersDivRef.current) {
      answersDivRef.current.scrollTop = answersDivRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    console.log(conversationID);
    getDialogue();
  }, [conversationID]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label
          htmlFor="message"
          className="block mb-2 ml-2 text-xl text-gray-700"
        >
          Your answers:
        </label>
        {gptDialogue.length > 0 ? (
          <div
            ref={answersDivRef}
            className="block p-2 w-full text-base overflow-y-auto text-gray-900 
      bg-[#f1f1f1] rounded-lg border-gray-300 border-2 outline-none relative max-h-[400px] min-h-[400px]"
          >
            <ul className="flex flex-col">
              {gptDialogue.map((item) => (
                <li className="flex flex-col gap-5 p-2 py-4 rounded-xl">
                  <div className="bg-[#f2f2f2] p-2 rounded-lg flex items-center gap-3">
                    <BsPerson className="text-gray-700 " />
                    <p>{item[0]}</p>
                  </div>
                  <div className="bg-[#e9e9e9] p-2 rounded-lg flex items-center gap-3">
                    <AiOutlineRobot className="text-gray-700 text-xl" />
                    <p className="text-base">{item[1]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            className="p-2 w-full text-base overflow-y-auto text-gray-900 text-center items-center flex justify-center
          bg-[#f1f1f1] rounded-lg border-gray-300 border-2 outline-none relative max-h-[400px] min-h-[400px]"
          >
            <h1 className="text-xl text-gray-500">Ask a Question</h1>
          </div>
        )}
      </div>

      <form className="flex flex-col gap-3" onSubmit={submitHandler}>
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
            className="block py-4 w-full  text-gray-900 bg-[#f1f1f1] rounded-lg border-gray-300 border-2 focus:ring-gray-300 focus:border-gray-300 "
            placeholder="Write your message here..."
            onChange={handleTextareaChange}
            maxLength={500}
            ref={textFieldRef}
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
        </div>{" "}
        <div className="flex justify-end items-center">
          <button
            disabled={textFieldRef.current.value == "" ? true : false}
            type="submit"
            className={`text-white  mb-1 font-medium text-sm md:px-10 px-8 py-2.5 bg-[#a4a4a4] hover:bg-[#8e8e8e] rounded mt-[0.05rem] ${
              textFieldRef.current.value === ""
                ? "bg-[#a4a4a4]"
                : "bg-[#8ed269]"
            }`}
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextFields;
