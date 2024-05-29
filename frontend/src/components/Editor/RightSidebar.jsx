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
import MusicApp from "../sidebars/MusicApp";

const IconButton = ({ image, onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={image} alt="" className="w-16 h-16" />
    </button>
  );
};

const RightSidebar = ({}) => {
  // console.log('Sidebar rendered with pages', selectedPageId, pages);
  const [chatmodalsidebar, SetChatBotSideBar] = useState(false);
  const [imagessidebar, setImagesSidebar] = useState(false);
  const [musicsidebar, setMusicSideBar] = useState(false);
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

  const openMusicSideBar = () => {
    console.log("RAM");
    setMusicSideBar(true);
  };

  const closeMusicSideBar = () => {
    setMusicSideBar(false);
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
        </SideBar>
      )}

      <div className="mt-5 flex flex-col gap-10">
        <IconButton image={ChatIcon} onClick={openChatBotSideBar} />
        <IconButton image={MusicIcon} onClick={openMusicSideBar} />
        <IconButton image={ImagesIcon} onClick={openImagesSideBar} />

        {imagessidebar && (
          <SideBar status={imagessidebar} onClose={closeImagesSideBar}>
            <ImageIntegration onClose={closeImagesSideBar} />
          </SideBar>
        )}
        {musicsidebar && (
          <SideBar status={musicsidebar} onClose={closeMusicSideBar}>
            <MusicApp onClose={closeMusicSideBar} />
          </SideBar>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
