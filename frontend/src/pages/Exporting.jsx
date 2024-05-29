import React, { useState } from "react";
import Buttons from "../components/buttons/NormalButtons";
import { useNavigate } from "react-router-dom";
import { createProject, headers } from "../utils/urls";
import { v4 as uuidv4 } from "uuid";
import indexedDBService from "../services/indexedDB";
import { errorToast, successToast } from "../utils/notifications";
import { Toaster } from "react-hot-toast";
import Loader from "../assets/loader.gif";

const Exporting = ({ page }) => {
  const navigate = useNavigate();

  const projectId = uuidv4();

  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    subtitle: "",
    seriesInfo: "",
    description: "",
    genre: "",
    image: null,
  });

  const [creating, setCreating] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    const data = { ...formData, projectId };

    if (formData.image) {
      data.image = await convertToBase64(formData.image);
    }

    try {
      if (page === "create") {
        await indexedDBService.setItem(projectId, data);
      } else {
        await indexedDBService.updateItem(projectId, data);
      }

      let response = await fetch(createProject(projectId), {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(data),
      });

      response = await response.json();

      if (response.success) {
        successToast(response.message || "Project Created Successfully");
        setTimeout(() => {
          navigate(`/dashboard/editor/${projectId}`);
        }, 1000);
      } else {
        throw new Error(response.message || "Failed to create project");
      }
    } catch (error) {
      errorToast(error.message);
      console.error("Error submitting form:", error);
    } finally {
      setCreating(false);
    }
  };

  const navigateToHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="max-w-7xl mx-auto mt-32">
      <h1 className="text-3xl font-semibold uppercase text-blue text-center mb-5">
        {page === "create" ? "Create New Project" : "Export Project"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-5">
          <div className="left w-1/2">
            {["title", "authors", "subtitle", "seriesInfo", "genre"].map(
              (field) => (
                <div
                  className="flex justify-between items-center mb-2"
                  key={field}
                >
                  <label
                    htmlFor={field}
                    className="text-blue w-[100px] capitalize"
                  >
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    id={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
                  />
                </div>
              )
            )}
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="description" className="text-blue w-[100px]">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 w-[calc(100%-100px)] h-40 bg-yogurt border border-blue"
              ></textarea>
            </div>
            <div className="controls flex justify-between items-center gap-3 mt-5">
              <div className="flex justify-between items-center gap-5 w-1/2">
                {page === "create" ? (
                  creating ? (
                    <div>
                      <button className="bg-white border border-blue px-6 py-2 rounded-lg flex justify-center items-center gap-2">
                        <img
                          src={Loader}
                          className="w-5 h-5"
                          alt="Loading..."
                        />
                        <span>Creating...</span>
                      </button>
                    </div>
                  ) : (
                    <Buttons type="green" text="Create Project" />
                  )
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
              name="image"
              onChange={handleChange}
              className="block w-[300px] mx-auto text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue file:text-white
              hover:file:bg-yellow"
            />
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Exporting;
