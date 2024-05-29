import React, { useEffect, useState } from "react";
import {
  askTheBot,
  headers,
  getAllChats,
  fetchOneChat,
  startNewchat,
} from "../../utils/urls";
import { fallbackErrorMessage, errorToast } from "../../utils/notifications";
import { Toaster } from "react-hot-toast";
import Loader from "../../assets/loader.gif";
import bot from "../../assets/bot.png";

const SearchComponent = ({
  loading,
  setLoading,
  sendBackData,
  sendBackQuery,
  id,
  getChatData,
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
        body: JSON.stringify({
          searchQuery: query,
          chatid: id || Math.random().toString(),
        }),
      });

      response = await response.json();
      if (response.success === true) {
        setQuery("");
        sendBackData(response.data.answer);
        getChatData(response.data.chat);
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
      className="flex fill-emerald-50  fixed justify-between items-center bg-white gap-2 py-2  w-[66.5%] right-0 bottom-0  px-2"
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

const ChatBot = ({ setMore, more }) => {
  const [chat, setChat] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [chats, setChats] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [initiating, setInitiating] = useState(false);
  const [allowNewChat, setAllowNewChat] = useState(true);

  const sendBackData = (data) => {
    const response = {
      id: chat.id || Math.random().toString(),
      parts: [{ text: data }],
      role: "model",
    };
    setChat((prev) => {
      const { history } = prev;
      let updatedHistory;
      if (history) {
        updatedHistory = [...history, response];
      } else {
        updatedHistory = [response];
      }
      const newItem = { ...prev, history: updatedHistory };
      console.log("R", newItem);
      return newItem;
    });
  };
  const sendBackQuery = (query) => {
    const question = {
      id: chat.id || Math.random().toString(),
      parts: [{ text: query }],
      role: "user",
    };
    setChat((prev) => {
      const { history } = prev;
      let updatedHistory;
      if (history) {
        updatedHistory = [...history, question];
      } else {
        updatedHistory = [question];
      }
      const newItem = { ...prev, history: updatedHistory };
      console.log("Q", newItem);
      return newItem;
    });
  };

  useEffect(() => {
    const fetchAllChats = async () => {
      setFetching(true);
      try {
        let response = await fetch(getAllChats, {
          method: "GET",
          headers: headers,
          credentials: "include",
        });

        response = await response.json();
        console.log(response);
        if (response.success === true) {
          setChats(response.data);
        } else {
          throw new Error(response.message || fallbackErrorMessage);
        }
      } catch (err) {
        return errorToast(err.message || fallbackErrorMessage);
      } finally {
        setFetching(false);
      }
    };

    more && fetchAllChats();
  }, [more]); // Add more to the dependency array

  useEffect(() => {
    const isThereAnyEmptyChat = chats.some((item) => item.name == "Untitled");
    isThereAnyEmptyChat ? setAllowNewChat(false) : setAllowNewChat(true);
    console.log(isThereAnyEmptyChat, allowNewChat);
  }, [chats]);

  const fetchSingleChat = async (id) => {
    console.log("ASAER", id);
    try {
      setLoadingChat(true);
      let response = await fetch(fetchOneChat(id), {
        method: "GET",
        headers: headers,
        credentials: "include",
      });

      response = await response.json();
      console.log("SC", response);
      if (response.success === true) {
        setChat(response.data);
      } else {
        throw new Error(response.message || fallbackErrorMessage);
      }
    } catch (err) {
      return errorToast(err.message || fallbackErrorMessage);
    } finally {
      setLoadingChat(false);
    }
  };

  const initiateNewChat = async () => {
    const newChatId = Math.random().toString();
    try {
      setInitiating(true);
      let response = await fetch(startNewchat(newChatId), {
        method: "GET",
        headers: headers,
        credentials: "include",
      });

      response = await response.json();
      console.log("NC", response);
      if (response.success === true) {
        setChat(response.data);
        setChats((prev) => [{ id: newChatId, name: "Untitled" }, ...prev]);
      } else {
        throw new Error(response.message || fallbackErrorMessage);
      }
    } catch (err) {
      return errorToast(err.message || fallbackErrorMessage);
    } finally {
      setInitiating(false);
    }
  };

  const getChatData = (data) => {
    const { name, id } = data;
    const chatIndex = chats.findIndex((item) => item.id === id);

    if (chatIndex === -1) {
      // If the chat does not exist, add it to the beginning of the chats array
      setChats((prev) => [{ name, id }, ...prev]);
    } else {
      // If the chat exists, update its name
      const updatedChats = [...chats]; // Create a copy of the chats array
      updatedChats[chatIndex] = { ...updatedChats[chatIndex], name }; // Update the name of the chat
      setChats(updatedChats); // Update the state with the modified chats array
    }
  };

  return (
    <div className="relative h-full">
      <div className="w-full py-2 bg-green  sticky top-0 rounded-b-lg mx-auto flex flex-col items-center justify-center">
        <h3 className="text-center text-xl text-white">Ask the Bot</h3>
        <img src={bot} alt="" className="w-12 h-12" />
      </div>
      <button
        className="sticky top-[50%] -left-4 bg-red rounded-full z-50"
        onClick={() => {
          setMore((prev) => !prev);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-8 transition-all  ease-out delay-150 ${
            more ? "rotate-0 " : "rotate-180"
          } p-1 rounded-full shadow-lg text-white`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          />
        </svg>
      </button>
      <div className="flex justify-between overflow-scroll h-[76%]">
        {more && (
          <div className="left w-2/6 h-full sticky overflow-auto top-0 bottom-0  px-2 border-r border-gray-400">
            {fetching && <img src={Loader} className="w-8 h-8" />}
            {chats && chats.length > 0 && (
              <>
                <h4 className="text-black text-center mb-3 font-semibold text-lg">
                  Your Previous Chats
                </h4>
                <button
                  key={Math.random().toString()}
                  className="bg-white p-2 rounded-md text-gray-600 mb-1 cursor-pointer hover:shadow-md flex justify-center text-sm items-center w-full gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={initiateNewChat}
                  disabled={!allowNewChat}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <p className="text-center">New Chat</p>
                </button>
                {chats.map((item) => (
                  <button
                    key={item.id}
                    className="bg-white p-2 rounded-md text-gray-600 text-sm mb-1 cursor-pointer hover:shadow-md disabled:cursor-not-allowed w-full"
                    onClick={() => {
                      fetchSingleChat(item.id);
                    }}
                  >
                    <p className="text-center">{item.name}</p>
                  </button>
                ))}
              </>
            )}
            {chats && chats.length === 0 && (
              <p className="text-center font-semibold">No chats to show</p>
            )}
          </div>
        )}

        <div className={`right ${more ? "w-4/6" : "w-full"} h-full relative`}>
          <div className="mt-16 px-2 flex flex-col justify-center items-center">
            {chat &&
              chat.history &&
              chat.history.map((item) => {
                return (
                  item.parts[0].text && ( // Add this conditional check
                    <p
                      key={Math.random().toString()}
                      className={`bg-white py-3 px-2 rounded-lg max-w-[80%] w-full text-blue text-sm mb-2 ${
                        item.role == "user" ? "self-end" : "self-start"
                      }`}
                    >
                      {item.parts[0].text}
                    </p>
                  )
                );
              })}
          </div>
          {loading && (
            <p className="text-center text-black my-5 flex justify-center items-center">
              <img src={Loader} alt="" className="w-7 h-7" />
            </p>
          )}
          {loadingChat && (
            <p className="text-center text-black my-5 flex justify-center items-center">
              <img src={Loader} alt="" className="w-7 h-7" />
            </p>
          )}
          <SearchComponent
            loading={loading}
            setLoading={setLoading}
            sendBackData={sendBackData}
            sendBackQuery={sendBackQuery}
            id={chat?.id}
            getChatData={getChatData}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ChatBot;
