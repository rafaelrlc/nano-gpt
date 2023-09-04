import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import AxiosApi from "../services/api";
import { useSettings } from "../context/Settings/SettingsContextProvider";
import ChatBot from "./ChatBot";

const TextFields = ({ newPage }) => {
  const { api } = AxiosApi();
  const { temperature, tokens } = useSettings();
  const navigate = useNavigate();

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
    if (newPage) {
      try {
        const response = await api.post("/conversation/new");
        navigate(`/chat/${response.data.conversationId}`);
        fetchConvo();
      } catch (error) {
        console.log(error);
      }
    }

    if (textFieldRef.current.value === "") {
      setIsLoading(false);
      return;
    }

    const data = {
      question: textFieldRef.current.value,
      temperature: temperature,
      token: tokens,
    };

    const userQuestion = {
      question: textFieldRef.current.value,
      response: "",
    };

    setQuestion("");
    textFieldRef.current.value = "";

    setGptDialogue((prevDialogue) => [...prevDialogue, userQuestion]); // Add userQuestion to the gptDialogue state
    scrollAnswersToBottom();

    try {
      console.log("conversaiotn id", conversationID);
      await api.post(`/${conversationID}`, data);
      getDialogue();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDialogue = async () => {
    try {
      const response = await api.get(`/${conversationID}`);
      setGptDialogue(response.data.history);
      console.log(response.data.history);
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

  const buttonState = isLoading
    ? "bg-[#4d4d4d]"
    : question.length > 0
    ? "bg-green-400 hover:bg-green-600"
    : "bg-[#a4a4a4] dark:bg-[#747474] hover:bg-[#8e8e8e] hover:dark:bg-[#5b5b5b]";

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block mb-2 ml-2 text-xl text-gray-700 dark:text-gray-200">
          Your answers:
        </label>
        <div
          ref={answersDivRef}
          className="block p-2 w-full text-base overflow-y-auto text-gray-900  
      bg-[#f5f5f5] dark:bg-[#484848]  rounded-lg border-gray-300  border-2 outline-none relative md:h-[60vh] h-[50vh] "
        >
          <ul className="flex flex-col">
            <ChatBot dialogue={gptDialogue}></ChatBot>
          </ul>
        </div>
      </div>

      <form className="flex flex-col gap-3" onSubmit={submitHandler}>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 ml-2 text-xl text-gray-700 dark:text-gray-200"
          >
            Enter your prompts:
          </label>
          <input
            id="message"
            rows="1"
            className="block py-4 px-2 mb-2 w-full  text-gray-900 dark:text-gray-200 dark:placeholder-gray-300 bg-[#f5f5f5] dark:bg-[#484848] rounded-lg border-gray-300 dark:border-gray-400 border-2 focus:ring-gray-300 focus:border-gray-300 "
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
          ></input>
          <p className={`text-right text-gray-500 dark:text-gray-200`}>
            <span
              className={` ${
                isEnding ? "text-red-500" : "text-gray-500 dark:text-gray-200"
              }`}
            >
              {question.length ? question.length : 0}
            </span>{" "}
            / {300}
          </p>
        </div>{" "}
        <div className="flex justify-end items-center">
          <button
            disabled={isLoading ? true : false}
            type="submit"
            className={`text-white mb-1 font-medium text-sm md:px-10 px-8 py-2.5 w-full md:w-auto  ${buttonState} rounded mt-[0.05rem]`}
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextFields;
