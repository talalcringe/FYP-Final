import React from "react";
import Buttons from "../buttons/NormalButtons";

const AddAudio = ({ action }) => {
  return (
    <div>
      <h4 className="text-center text-blue text-2xl mb-5 font-bold">
        Add Audio
      </h4>
      <div className="top flex justify-between items-center gap-4 mb-4">
        <button className="bg-blue px-4 py-2 rounded-md text-white">
          Search
        </button>
        <input
          type="search"
          name="audio_search"
          placeholder="Search Song Name"
          id="audio_search"
          className="w-full p-2 rounded-md  bg-white border border-blue"
        />
      </div>
      <div className="results mb-3">
        <textarea
          name="api_results"
          id="api_results"
          className="bg-white  rounded-md  h-52 w-full  border border-blue"
        ></textarea>
      </div>
      <div className="preview  rounded-md mb-4">
        <textarea
          name="preview"
          id="preview"
          className="bg-white  rounded-md  h-32 w-full  border border-blue"
        ></textarea>
      </div>
      <div className="controls flex justify-between items-center max-w-md mx-auto">
        <div className="flex justify-between items-center gap-2">
          <Buttons text="Upload From Device" type="blue" />
          <Buttons text="Save To Drive" type="green" />
        </div>
        <div>
          <Buttons text="Cancel" type="red" action={action} />
        </div>
      </div>
    </div>
  );
};

export default AddAudio;
