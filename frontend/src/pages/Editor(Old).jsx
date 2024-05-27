import React, { useState } from "react";
import CreateSprint from "../components/pop-ups/CreateSprint";
import Overlay from "../components/overlays/Overlay";
import AddAudio from "../components/pop-ups/AddAudio";
import CreateOutline from "../components/pop-ups/CreateOutline";
import SideBar from "../components/SideBar";
import ChatBot from "../components/sidebars/ChatBot";
import ImageIntergration from "../components/sidebars/ImageIntergration";
import CharacterOutline from "../components/pop-ups/CharacterOutline";
import WiderOverlay from "../components/overlays/WiderOverlay";
import MusicApp from "../components/sidebars/MusicApp";

const Editor = () => {
  const [sprintmodal, setSprintModal] = useState(false);
  const [audiomodal, setAudioModal] = useState(false);
  const [outlinemodal, SetOutlineModal] = useState(false);
  const [chatmodalsidebar, SetChatBotSideBar] = useState(false);

  const openSprintModal = () => {
    setSprintModal(true);
  };

  const closeSprintModal = () => {
    setSprintModal(false);
  };

  const openAudioModal = () => {
    setAudioModal(true);
  };

  const closeAudioModal = () => {
    setAudioModal(false);
  };

  const openOutlineModal = () => {
    SetOutlineModal(true);
  };

  const closeOutlineModal = () => {
    SetOutlineModal(false);
  };
  const openSideBar = () => {
    SetChatBotSideBar(true);
  };

  const closeSideBar = () => {
    SetChatBotSideBar(false);
  };
  return (
    <section className="px-4 bg-gray-200 min-h-[90vh] mt-[90px]">
      <button
        className="px-4 py-1 rounded-full bg-yellow"
        onClick={openSprintModal}
      >
        Create Sprint
      </button>
      <button
        className="px-4 py-1 rounded-full bg-yellow"
        onClick={openAudioModal}
      >
        Add Audio
      </button>
      <button
        className="px-4 py-1 rounded-full bg-yellow"
        onClick={openOutlineModal}
      >
        Create Outline
      </button>
      <button
        className="px-4 py-1 rounded-full bg-yellow"
        onClick={openSideBar}
      >
        Songs SideBar
      </button>
      {sprintmodal && (
        <Overlay onClose={closeSprintModal}>
          <CreateSprint action={closeSprintModal} />
        </Overlay>
      )}
      {audiomodal && (
        <Overlay onClose={closeAudioModal}>
          <AddAudio action={closeAudioModal} />
        </Overlay>
      )}
      {outlinemodal && (
        <WiderOverlay onClose={closeOutlineModal}>
          <CreateOutline action={closeOutlineModal} />
          {/* <CharacterOutline onClose={closeOutlineModal} /> */}
        </WiderOverlay>
      )}
      {chatmodalsidebar && (
        <SideBar status={chatmodalsidebar} onClose={closeSideBar}>
          <ChatBot />
          {/* <ImageIntergration onClose={closeSideBar} /> */}
          {/* <Songs /> */}
          {/* <MusicApp /> */}
        </SideBar>
      )}
    </section>
  );
};

export default Editor;
