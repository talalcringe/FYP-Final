import React from "react";
import Buttons from "../components/buttons/NormalButtons";
import { useNavigate } from "react-router-dom";
const Exporting = ({ page }) => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="max-w-7xl mx-auto mt-32">
      <h1 className="text-3xl font-semibold uppercase text-blue text-center mb-5">
        {page == "create" ? "Create New Project" : "Export Project"}
      </h1>
      <div className="flex justify-between gap-5">
        <div className="left w-1/2">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="title text-blue w-[100px]">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="title text-blue w-[100px]">Authos(s)</label>
            <input
              type="text"
              name="title"
              id="title"
              className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="title text-blue w-[100px]">Subtitle</label>
            <input
              type="text"
              name="title"
              id="title"
              className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="title text-blue w-[100px]">Series Info</label>
            <input
              type="text"
              name="title"
              id="title"
              className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="title text-blue w-[100px]">Description</label>
            <textarea
              name="description"
              id="description"
              className="p-2 w-[calc(100%-100px)] h-40 bg-yogurt border border-blue"
            ></textarea>
          </div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="title text-blue w-[100px]">Genre</label>
            <input
              type="text"
              name="title"
              id="title"
              className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="title text-blue w-[100px]">ISBN</label>
            <input
              type="text"
              name="title"
              id="title"
              className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
            />
          </div>
          <div className="controls flex justify-between items-center gap-3 mt-5">
            <div className="flex justify-between items-center gap-5 w-1/2">
              {page == "create" ? (
                <>
                  <Buttons type="green" text="Create Project" />
                </>
              ) : (
                <>
                  <Buttons type="green" text="Export PDF" />
                  <Buttons type="blue" text="Export Epub" />
                </>
              )}
            </div>
            <div className="w-1/2 text-right">
              <Buttons type="red" text="Cancel" action={navigateToHome} />
            </div>
          </div>
        </div>
        <div className="right border border-blue w-1/2 bg-yogurt min-h-full grid place-items-center">
          <input
            type="file"
            className="block w-[300px] mx-auto text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue file:text-white
            hover:file:bg-yellow
            "
          />
        </div>
      </div>
    </div>
  );
};

export default Exporting;
