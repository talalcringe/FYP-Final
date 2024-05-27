import React from 'react';
import CloseIcon from '../utils/CloseIcon';

const SideBar = ({ status, onClose, children }) => {
  return (
    <div
      className={`fixed top-24 right-0 h-[85%] overflow-y-scroll rounded-tl-lg rounded-bl-lg bg-yogurt z-50 w-1/3  border-2 border-blue ${
        status
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0 transition-transform duration-1000 ease-in-out'
      }`}
    >
      <button
        onClick={onClose}
        className='sticky top-0 left-0 rounded-full bg-white z-20 p-1 shadow-xl grid place-items-center'
      >
        <CloseIcon />
      </button>
      {children}
    </div>
  );
  å;
};

export default SideBar;
