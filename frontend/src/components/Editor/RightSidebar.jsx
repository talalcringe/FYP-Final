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
import SprintIcon from "../../assets/sprint.png";
import CreateSprint from "../pop-ups/CreateSprint";
import Overlay from "../overlays/Overlay";
import WiderOverlay from "../overlays/WiderOverlay";

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
  const [sprintsidebar, setSprintSideBar] = useState(false);
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
    setMusicSideBar(true);
  };

  const closeMusicSideBar = () => {
    setMusicSideBar(false);
  };

  const openSprintSideBar = () => {
    setSprintSideBar(true);
  };

  const closeSprintSideBar = () => {
    setSprintSideBar(false);
  };

  return (
    <div className="bg-ghostWhite text-cerulean flex flex-col justify-start items-center py-8 mx-2 p-0 h-[100vh] w-full overflow-auto">
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
        <IconButton image={SprintIcon} onClick={openSprintSideBar} />

        {imagessidebar && (
          <WiderOverlay onClose={closeImagesSideBar}>
            <ImageIntegration onClose={closeImagesSideBar} />
          </WiderOverlay>
        )}
        {musicsidebar && (
          <Overlay status={musicsidebar} onClose={closeMusicSideBar}>
            <MusicApp onClose={closeMusicSideBar} />
          </Overlay>
        )}
        {sprintsidebar && (
          <Overlay onClose={closeSprintSideBar}>
            <CreateSprint onClose={closeSprintSideBar} />
          </Overlay>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
