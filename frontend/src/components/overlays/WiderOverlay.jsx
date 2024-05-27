import React from "react";
import CloseIcon from "../../utils/CloseIcon";

const WiderOverlay = ({ children, onClose }) => {
  return (
    <div
      className="inset-0 bg-[rgba(0,0,0,0.5)] left-0 top-0 grid place-items-center min-h-screen fixed z-50 overflow-y-scroll"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="w-[1000px] bg-yogurt px-4 mx-auto rounded-xl py-12 relative z-40"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            onClose();
          }}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};

export default WiderOverlay;
