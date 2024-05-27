import React from "react";
import GoogleIcon from "../../assets/gicon.png";

const DashboardButtons = ({ type, text }) => {
  const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
  if (type == "completed") {
    return (
      <button className="bg-blue px-3 py-1  text-white">
        {capitalizedText}
      </button>
    );
  } else if (type == "active") {
    return (
      <button className="bg-green px-3 py-1  text-white">
        {capitalizedText}
      </button>
    );
  } else if (type == "cancelled") {
    return (
      <button className="bg-red px-3 py-1  text-white">
        {capitalizedText}
      </button>
    );
  } else if (type == "onhold") {
    return (
      <button className="bg-yellow px-3 py-1  text-white">
        {capitalizedText}
      </button>
    );
  } else {
    return (
      <button className="bg-gray-500 px-3 py-1  text-white">
        {capitalizedText}
      </button>
    );
  }
};

export default DashboardButtons;
