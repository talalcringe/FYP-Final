import React, { useState } from "react";
import Buttons from "../components/buttons/NormalButtons";
import { useNavigate } from "react-router-dom";
import { createProject, headers } from "../utils/urls";
import { v4 as uuidv4 } from "uuid";
import indexedDBService from "../services/indexedDB";
import axios from "axios"; // Ensure axios is installed

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

      const response = await axios.post(createProject(projectId), data, {
        headers: headers,
        withCredentials: true,
      });
      console.log("Response:", response.data);
      navigate(`/dashboard/editor/${projectId}`);
    } catch (error) {
      console.error("Error submitting form:", error);
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
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="title" className="text-blue w-[100px]">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
              />
            </div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="authors" className="text-blue w-[100px]">
                Authors(s)
              </label>
              <input
                type="text"
                name="authors"
                id="authors"
                value={formData.authors}
                onChange={handleChange}
                className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
              />
            </div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="subtitle" className="text-blue w-[100px]">
                Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                id="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
              />
            </div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="seriesInfo" className="text-blue w-[100px]">
                Series Info
              </label>
              <input
                type="text"
                name="seriesInfo"
                id="seriesInfo"
                value={formData.seriesInfo}
                onChange={handleChange}
                className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
              />
            </div>
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
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="genre" className="text-blue w-[100px]">
                Genre
              </label>
              <input
                type="text"
                name="genre"
                id="genre"
                value={formData.genre}
                onChange={handleChange}
                className="p-2 w-[calc(100%-100px)] bg-yogurt border border-blue"
              />
            </div>
            <div className="controls flex justify-between items-center gap-3 mt-5">
              <div className="flex justify-between items-center gap-5 w-1/2">
                {page === "create" ? (
                  <Buttons type="green" text="Create Project" />
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
    </div>
  );
};

export default Exporting;
