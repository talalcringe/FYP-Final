import React, { useState } from "react";
import { getImagesUrl, headers } from "../../utils/urls";
import { Toaster } from "react-hot-toast";
import {
  successToast,
  errorToast,
  fallbackErrorMessage,
} from "../../utils/notifications";
import ExtraButtons from "../buttons/ExtraButtons";
import Loader from "../../assets/loader.gif";

const ImageList = ({ images }) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-2 px-2 mt-4 overflow-y-scroll">
      {images.map((image) => (
        <div key={image.id} className="w-[15%] rounded-sm">
          <img src={image.webformatURL} alt={image.tags} />
          {/* <div>
            <a
              href={image.webformatURL}
              download={image.id}
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "10px 20px",
                textDecoration: "none",
                backgroundColor: "#007BFF",
                color: "#fff",
                borderRadius: "5px",
              }}
            >
              Download
            </a>
          </div> */}
        </div>
      ))}
    </div>
  );
};

const SearchBar = ({ sendBackResults, changeSending }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      return errorToast("Invalid search term");
    }
    changeSending(true);
    try {
      let response = await fetch(getImagesUrl(query), {
        method: "GET",
        headers: headers,
        credentials: "include",
      });

      response = await response.json();
      if (response.success === true) {
        sendBackResults(response.data);
      } else {
        throw new Error(response.message || fallbackErrorMessage);
      }
    } catch (err) {
      return errorToast(err.message || fallbackErrorMessage);
    } finally {
      changeSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mt-14 py-4 z-30 sticky top-0  border-b border-blue"
    >
      <div className="flex justify-between items-center gap-2 max-w-[95%] mx-auto">
        <input
          type="text"
          value={query}
          className="w-full p-2 rounded-md bg-white border border-gray-300"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search for images..."
        />
        <ExtraButtons text="Search" type="green" />
      </div>
    </form>
  );
};

const ImageIntegration = () => {
  const [images, setImages] = useState([]);
  const [sending, setSending] = useState(false);

  const changeSendingStatus = (status) => {
    setSending(status);
  };

  const sendBackResults = (data) => {
    setImages(data);
  };

  return (
    <div className="relative overflow-auto ">
      <div className="flex justify-end -mt-14">
        <SearchBar
          sendBackResults={sendBackResults}
          changeSending={changeSendingStatus}
        />
      </div>
      {sending && (
        <div className="flex justify-center">
          <img src={Loader} alt="" className="w-10 h-10 rounded-full" />
        </div>
      )}
      <div className="pt-4 pb-20 ">
        {/* Adjust padding to avoid overlap */}
        {images && <ImageList images={images} />}
      </div>
      <Toaster />
    </div>
  );
};

export default ImageIntegration;
