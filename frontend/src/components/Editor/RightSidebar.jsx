import React, { useState } from "react";
import Button from "./Button";
import SolidButton from "./SolidButton";
import ChatBot from "../sidebars/ChatBot";
import SideBar from "../../components/SideBar";
import ExportingIcon from "../../assets/exporting.png";
import ImagesIcon from "../../assets/images.png";
import MusicIcon from "../../assets/music.png";
import ChatIcon from "../../assets/chat.png";
import ImageIntegration from "../sidebars/ImageIntergration";

const RightSidebar = ({}) => {
  // console.log('Sidebar rendered with pages', selectedPageId, pages);
  const [chatmodalsidebar, SetChatBotSideBar] = useState(false);
  const [imagessidebar, setImagesSidebar] = useState(false);
  const [more, setMore] = useState(false);

  const openChatBotSideBar = () => {
    SetChatBotSideBar(true);
  };

  const closeChatBotSideBar = () => {
    SetChatBotSideBar(false);
  };

  const openImagesSideBar = () => {
    setImagesSidebar(true);
  };

  const closeImagesSideBar = () => {
    setImagesSidebar(false);
  };

  return (
    <div className="bg-ghostWhite text-cerulean flex flex-col justify-start items-center  mx-2 p-0 h-[86vh] w-full rounded overflow-auto">
      {chatmodalsidebar && (
        <SideBar
          status={chatmodalsidebar}
          onClose={closeChatBotSideBar}
          more={more}
        >
          <ChatBot more={more} setMore={setMore} />
          {/* <ImageIntergration onClose={closeSideBar} /> */}
          {/* <Songs /> */}
          {/* <MusicApp /> */}
        </SideBar>
      )}

      <div className="mt-5 flex flex-col gap-10">
        <button
          text="Chatbot"
          color="bg-emerald h-20 w-[90%]"
          onClick={() => {
            openChatBotSideBar();
          }}
        >
          <img src={ChatIcon} alt="" className="w-16 h-16" />
        </button>
        <button
          text="Exporting"
          color="bg-emerald h-20 w-[90%]"
          onClick={() => {}}
        >
          <img src={ExportingIcon} alt="" className="w-16 h-16" />
        </button>

        <button color="bg-emerald h-20 w-[90%]" onClick={openImagesSideBar}>
          <img src={ImagesIcon} alt="" className="w-16 h-16" />
        </button>

        {imagessidebar && (
          <SideBar status={imagessidebar} onClose={closeImagesSideBar}>
            <ImageIntegration onClose={closeImagesSideBar} />
          </SideBar>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
