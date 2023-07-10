import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import AxiosApi from "../services/api";
import { useSettings } from "../context/Settings/SettingsContextProvider";
import ChatBot from "./ChatBot";

const TextFields = () => {
  const { api } = AxiosApi();
  const { temperature, tokens } = useSettings();

  const [gptDialogue, setGptDialogue] = useState([]);
  const [question, setQuestion] = useState(0);
  const [isEnding, setIsEnding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const textFieldRef = useRef(null);
  const answersDivRef = useRef(null);

  const params = useParams();
  const conversationID = params.id;

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (textFieldRef.current.value === "") {
      setIsLoading(false);
      return;
    }

    const data = {
      question: textFieldRef.current.value,
      temperature: temperature,
      token: tokens,
    };

    const userQuestion = [textFieldRef.current.value, ""];

    setQuestion("");
    textFieldRef.current.value = "";

    setGptDialogue((prevDialogue) => [...prevDialogue, userQuestion]); // Add userQuestion to the gptDialogue state
    scrollAnswersToBottom();

    try {
      await api.post(`/question/${conversationID}`, data);
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
    getDialogue();
  }, [conversationID]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        submitHandler(event);
      }
    };

    textFieldRef.current.addEventListener("keydown", handleKeyDown);

    return () => {
      textFieldRef.current.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const buttonState = isLoading
    ? "bg-[#4d4d4d]"
    : question.length > 0
    ? "bg-green-400 hover:bg-green-600"
    : "bg-[#a4a4a4] hover:bg-[#8e8e8e]";

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
              <ChatBot dialogue={gptDialogue}></ChatBot>
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
            rows="1"
            className="block py-4 w-full  text-gray-900 bg-[#f1f1f1] rounded-lg border-gray-300 border-2 focus:ring-gray-300 focus:border-gray-300 "
            placeholder="Write your message here..."
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
            ref={textFieldRef}
            onInput={(event) => {
              const input = event.target.value;
              const maxLength = 300;
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
              {question.length ? question.length : 0}
            </span>{" "}
            / {300}
          </p>
        </div>{" "}
        <div className="flex justify-end items-center">
          <button
            disabled={isLoading ? true : false}
            type="submit"
            className={`text-white mb-1 font-medium text-sm md:px-10 px-8 py-2.5  ${buttonState} rounded mt-[0.05rem]`}
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextFields;
