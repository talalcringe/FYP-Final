import React, { useState } from "react";
import Buttons from "../buttons/NormalButtons";
import { headers, createSprint } from "../../utils/urls";
import { errorToast, fallbackErrorMessage } from "../../utils/notifications";
import { Toaster } from "react-hot-toast";

const CreateSprint = ({ action }) => {
  // State hooks for form fields
  const [sprintTitle, setSprintTitle] = useState("");
  const [wordGoal, setWordGoal] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [error, setError] = useState("");

  const ClearForm = () => {
    setSprintTitle("");
    setWordGoal("");
    setTimeLimit("");
    setError("");
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!sprintTitle || !wordGoal || !timeLimit) {
      return errorToast("Please fill in all fields.");
    }

    // Construct the sprint data
    const sprintData = {
      projectid,
      sprintTitle,
      numberOfWords: parseInt(wordGoal),
      targetTime: parseInt(timeLimit),
      date: new Date().toISOString(),
    };

    try {
      let response = await fetch(createSprint, {
        method: "POST",
        headers,
        body: JSON.stringify(sprintData),
      });

      response = await response.json();

      if (response.success == true) {
        console.log(response);
        ClearForm();
      } else {
        throw new Error(response.message || fallbackErrorMessage);
      }
    } catch (error) {
      setError(error.message);
      errorToast(error.message);
    }
  };

  return (
    <div className="max-w-[90%] mx-auto">
      <h3 className="text-center text-blue text-2xl mb-2 font-bold">
        Create Sprint
      </h3>
      <p className="text-center text-xl text-blue">
        Select the target words and time for your sprint
      </p>
      {error && <p className="text-center text-red mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center gap-2 mt-7 mb-2">
          <label htmlFor="sprint_title" className="w-1/5">
            Sprint Title
            <span className="text-red ml-1">*</span>
          </label>
          <input
            type="text"
            name="sprint_title"
            id="sprint_title"
            value={sprintTitle}
            onChange={(e) => setSprintTitle(e.target.value)}
            className="p-2 w-4/5 rounded-md bg-white border border-blue"
          />
        </div>
        <div className="flex justify-center items-center gap-2 mb-2">
          <label htmlFor="word_count" className="w-1/5">
            Word Goal
            <span className="text-red ml-1">*</span>
          </label>
          <input
            type="number"
            name="word_count"
            id="word_count"
            value={wordGoal}
            onChange={(e) => setWordGoal(e.target.value)}
            className="p-2 w-4/5 rounded-md bg-white border border-blue"
          />
        </div>
        <div className="flex justify-center items-center gap-2 mb-2">
          <label htmlFor="time_limit" className="w-1/5">
            Time Limit
            <span className="text-red ml-1">*</span>
          </label>
          <input
            type="number"
            name="time_limit"
            id="time_limit"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            className="p-2 w-4/5 rounded-md bg-white border border-blue"
          />
        </div>
        <div className="controls flex justify-center mt-10 gap-10 items-center">
          <Buttons text="Create" type="green" />
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default CreateSprint;
