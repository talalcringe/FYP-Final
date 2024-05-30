import React, { useState, useEffect } from "react";
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
import { PlayIcon, PauseIcon } from "../../utils/icons";
import { useDispatch } from "react-redux";
import { updateSprint } from "../../store/userSlice";
import { updateSprintStatus, headers } from "../../utils/urls";

import indexedDBService from "../../services/indexedDB";
let startingWordCount = 0;

const IconButton = ({ image, onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={image} alt="" className="w-16 h-16" />
    </button>
  );
};

const SprintCard = ({
  timeRemaining,
  isPaused,
  targetWordCount,
  onPlayPauseClick,
}) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}m ${seconds}s`;
  };
  console.log(targetWordCount);
  return (
    <div className="border-2 border-blue py-4 px-2 w-[90%] mr-auto rounded-md text-center text-sm">
      <div className="border-b pb-2">
        <p className="text-yellow font-semibold">Words Remaining</p>
        <p>{targetWordCount}</p>
      </div>
      <div className="pt-2">
        <p className="text-yellow font-semibold">Time Remaining</p>
        <p>{formatTime(timeRemaining)}</p>
      </div>
      <div className="pt-2 flex justify-center items-center">
        <button onClick={onPlayPauseClick}>
          {isPaused ? PlayIcon : PauseIcon}
        </button>
      </div>
    </div>
  );
};

const RightSidebar = ({ projectId, allWords, totalWordCount, word_count }) => {
  const dispatch = useDispatch();

  const [chatmodalsidebar, SetChatBotSideBar] = useState(false);
  const [imagessidebar, setImagesSidebar] = useState(false);
  const [musicsidebar, setMusicSideBar] = useState(false);
  const [sprintsidebar, setSprintSideBar] = useState(false);
  const [more, setMore] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [currentWordCount, setCurrentWordCount] = useState(0); // Mock word count for demonstration
  const [targetWordCount, setTargetWordCount] = useState(0);
  const [sprintId, setSprintId] = useState(null);

  const sendSprintStatus = async (status) => {
    try {
      let response = await fetch(updateSprintStatus(sprintId), {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify({ projectid: projectId, status }),
      });

      response = await response.json();

      if (response.success === true) {
        console.log(response);
        // Handle success case
      } else {
        throw new Error(response.message || "Failed to update sprint status");
      }
    } catch (error) {
      console.error("Error updating sprint status:", error.message);
    }
  };

  useEffect(() => {
    let timerId;
    if (timeRemaining > 0 && !isPaused) {
      timerId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeRemaining === 0 || currentWordCount >= targetWordCount) {
      let status = currentWordCount >= targetWordCount ? "success" : "failure";
      sprintId && sendSprintStatus(status);
      sprintId && dispatch(updateSprint({ currentWordCount }));
    }
    console.log(
      "allWords",
      allWords,
      "totalWordCount",
      totalWordCount,
      "word_count",
      word_count
    );
    if (startingWordCount != 0) {
      setCurrentWordCount(totalWordCount + word_count - startingWordCount);
      console.log("cwc", currentWordCount);
    }

    return () => clearInterval(timerId);
  }, [timeRemaining, isPaused, currentWordCount, targetWordCount, dispatch]);

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

  const handleSprintCreation = (sprintTime, sprintWords, sprintId) => {
    startingWordCount = allWords;
    const targetWords = allWords + sprintWords;

    setTimeRemaining(sprintTime * 60); // Convert minutes to seconds
    setIsPaused(false); // Start the timer immediately
    setSprintSideBar(false);
    setCurrentWordCount(startingWordCount); // Initialize the current word count
    setTargetWordCount(sprintWords); // Set the target word count
    setSprintId(sprintId);

    indexedDBService.setItem(sprintId, {
      startTime: new Date(),
      duration: sprintTime * 60,
      startingWords: startingWordCount,
      wordGoal: sprintWords,
      targetWordCount: sprintWords,
      status: "ongoing",
    });

    dispatch(
      updateSprint({
        startingwords: startingWordCount,
        endWords: targetWords,
      })
    );
  };

  const handlePlayPauseClick = () => {
    setIsPaused((prevState) => !prevState);
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
        </SideBar>
      )}

      <div className="mt-5 flex flex-col justify-center items-center gap-10">
        {timeRemaining !== 0 && (
          <SprintCard
            timeRemaining={timeRemaining}
            isPaused={isPaused}
            targetWordCount={targetWordCount}
            onPlayPauseClick={handlePlayPauseClick}
          />
        )}
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
        {timeRemaining === 0 && sprintsidebar && (
          <Overlay onClose={closeSprintSideBar}>
            <CreateSprint
              onClose={closeSprintSideBar}
              projectId={projectId}
              onSprintCreated={handleSprintCreation}
            />
          </Overlay>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
