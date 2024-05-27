import React from "react";
import Cancel from "../assets/Cancel.png";

const CloseIcon = () => {
  return (
    <div className="inline-block rounded-full bg-black">
      <img src={Cancel} alt="" />
    </div>
  );
};

export default CloseIcon;
