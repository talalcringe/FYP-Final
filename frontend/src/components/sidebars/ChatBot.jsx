import React, { useState } from "react";
import { askTheBot, headers } from "../../utils/urls";
import { fallbackErrorMessage, errorToast } from "../../utils/notifications";
import Loader from "../../assets/loader.gif";
import bot from "../../assets/bot.png";

const SearchComponent = ({
  loading,
  setLoading,
  sendBackData,
  sendBackQuery,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      return errorToast("Invalid search term");
    }
    sendBackQuery(query);
    setLoading(true);
    try {
      let response = await fetch(askTheBot, {
        method: "PUT",
        headers: headers,
        credentials: "include",
        body: JSON.stringify({ searchQuery: query }),
      });

      response = await response.json();
      if (response.success === true) {
        setQuery("");
        sendBackData(response.data);
      } else {
        throw new Error(response.message || fallbackErrorMessage);
      }
    } catch (err) {
      return errorToast(err.message || fallbackErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex fill-emerald-50 sticky w-full justify-between items-center bg-white gap-2 py-2 bottom-0 top-[90%] px-2"
    >
      <input
        type="text"
        name=""
        id=""
        className="w-full rounded-md bg-white p-2 border-2"
        placeholder="Ask the bot"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="px-4 py-2 flex justify-center items-center gap-2 rounded-md bg-green text-white disabled:bg-gray-700"
        disabled={loading}
      >
        <span>Send</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 -rotate-45"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  );
};

const ChatBot = () => {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const sendBackData = (data) => {
    const response = {
      id: Math.random().toString(),
      message: data,
      pusher: "bot",
    };
    setChat((prev) => {
      return [response, ...prev];
    });
  };
  const sendBackQuery = (query) => {
    const question = {
      id: Math.random().toString(),
      message: query,
      pusher: "user",
    };
    setChat((prev) => {
      return [question, ...prev];
    });
  };
  return (
    <div className="relative h-full">
      <div className="w-[150px] py-2 bg-green border border-black rounded-md mx-auto my-3 flex flex-col items-center justify-center">
        <h3 className="text-center text-xl text-white">Ask the Bot</h3>
        <img src={bot} alt="" className="w-12 h-12" />
      </div>
      <div className="mt-16 px-2 flex flex-col-reverse justify-center items-center">
        {chat &&
          chat.length > 0 &&
          chat.map((item) => (
            <p
              key={item?.id}
              className={`bg-white py-3 px-2 rounded-lg max-w-[80%] w-full text-blue text-sm mb-2 ${
                item.pusher == "user" ? "self-end" : "self-start"
              }`}
            >
              {item?.message}
            </p>
          ))}
      </div>
      {loading && (
        <p className="text-center text-black my-5 flex justify-center items-center">
          <img src={Loader} alt="" className="w-7 h-7" />
        </p>
      )}
      <SearchComponent
        loading={loading}
        setLoading={setLoading}
        sendBackData={sendBackData}
        sendBackQuery={sendBackQuery}
      />
    </div>
  );
};

export default ChatBot;
