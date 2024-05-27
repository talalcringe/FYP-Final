import React, { act } from "react";
import Buttons from "../buttons/NormalButtons";

const CreateOutline = ({ action }) => {
  return (
    <div className="max-w-[90%] mx-auto">
      <h3 className="text-center text-blue text-2xl mb-2 font-bold">
        Book Outline
      </h3>

      <div className="flex justify-center items-center gap-2 mt-7 mb-2">
        <label htmlFor="outline_title" className="w-[100px]">
          Title
          <span className="text-red ml-1">*</span>
        </label>
        <input
          type="text"
          name="outline_title"
          id="outline_title"
          className="p-2 w-[calc(100%-100px)] rounded-md bg-white border border-blue"
        />
      </div>
      <div className="flex justify-center items-center gap-2 mb-2">
        <label htmlFor="outline_genre" className="w-[100px]">
          Genre
          <span className="text-red ml-1">*</span>
        </label>
        <input
          type="number"
          name="outline_genre"
          id="outline_genre"
          className="p-2 w-[calc(100%-100px)] rounded-md bg-white border border-blue"
        />
      </div>
      <div className="flex justify-center gap-2 mb-2">
        <label htmlFor="outline_description" className="w-[100px]">
          Outline
          <span className="text-red ml-1">*</span>
        </label>
        <textarea
          name="time_limit"
          id="time_limit"
          className="p-2 w-[calc(100%-100px)] h-40 rounded-md bg-white border border-blue"
        ></textarea>
      </div>
      <div className="controls flex  gap-20 justify-center mt-10 items-center">
        <Buttons text="Save" type="green" />
        <Buttons text="Cancel" type="red" action={action} />
      </div>
    </div>
  );
};

export default CreateOutline;
