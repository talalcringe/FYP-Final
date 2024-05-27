import React from "react";

const Buttons = ({ type, text, action }) => {
  if (type == "blue") {
    return (
      <button
        className="bg-blue px-4 py-2 rounded-md text-white"
        onClick={action}
      >
        {text}
      </button>
    );
  } else if (type == "green") {
    return (
      <button
        className="bg-green px-4 py-2 rounded-md text-white"
        onClick={action}
      >
        {text}
      </button>
    );
  } else if (type == "red") {
    return (
      <button
        className="bg-red px-4 py-2 rounded-md text-white"
        onClick={action}
      >
        {text}
      </button>
    );
  } else if (type == "login") {
    return (
      <button
        className="bg-green px-10 py-4 rounded-md text-white flex justify-center items-center gap-2"
        onClick={action}
      >
        <img src={GoogleIcon} alt="google-icon" />
        <span>{text}</span>
      </button>
    );
  } else {
    return (
      <button
        className="bg-gray-500 px-4 py-2 rounded-md text-white"
        onClick={action}
      >
        {text}
      </button>
    );
  }
};

export default Buttons;
