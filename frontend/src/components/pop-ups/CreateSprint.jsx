import React from "react";
import Buttons from "../buttons/NormalButtons";

const CreateSprint = ({ action }) => {
  return (
    <div className="max-w-[90%] mx-auto">
      <h3 className="text-center text-blue text-2xl mb-2 font-bold">
        Create Sprint
      </h3>
      <p className="text-center text-xl text-blue">
        Select the target words and time for your sprint
      </p>
      <div className="flex justify-center items-center gap-2 mt-7 mb-2">
        <label htmlFor="sprint_title" className="w-1/5">
          Sprint Title
          <span className="text-red ml-1">*</span>
        </label>
        <input
          type="text"
          name="sprint_title"
          id="sprint_title"
          className="p-2 w-4/5 rounded-md bg-white border border-blue"
        />
      </div>
      <div className="flex justify-center items-center gap-2 mb-2">
        <label htmlFor="word_countm" className="w-1/5">
          Word Goal
          <span className="text-red ml-1">*</span>
        </label>
        <input
          type="number"
          name="word_count"
          id="word_count"
          className="p-2 w-4/5 rounded-md bg-white border border-blue"
        />
      </div>
      <div className="flex justify-center items-center gap-2 mb-2">
        <label htmlFor="word_count" className="w-1/5">
          Time Limit
          <span className="text-red ml-1">*</span>
        </label>
        <input
          type="number"
          name="time_limit"
          id="time_limit"
          className="p-2 w-4/5 rounded-md bg-white border border-blue"
        />
      </div>
      <div className="controls flex justify-center mt-10 gap-10 items-center">
        <Buttons text="Create" type="green" />
        <Buttons text="Cancel" type="red" action={action} />
      </div>
    </div>
  );
};

export default CreateSprint;
