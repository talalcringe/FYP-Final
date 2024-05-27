// Audio.js
import React, { useState, useRef, useContext, useEffect } from "react";
import ReactSlider from "react-slider";
import { PlayButton } from "./MusicIcons";
import { PauseButton } from "./MusicIcons";
import { Howl } from "howler";
import { AudioButton } from "./MusicIcons";
import AudioSettingsModal from "./AudioSettingsModal";

function Audio({ volume, setVolume, isPlaying, setIsPlaying }) {
  const [sound, setSound] = useState(null);
  const soundRef = useRef(null);
  const [selectedAudioUrl, setSelectedAudioUrl] = useState("");

  useEffect(() => {
    const initializeSound = () => {
      const newSound = new Howl({
        src: [selectedAudioUrl], // Use the selected audio URL
        format: ["mp3"],
        html5: true,
        loop: true,
        volume: volume / 100,
        onplay: () => {
          // Set isPlaying to true when the sound starts playing
          setIsPlaying(true);
        },
        onpause: () => {
          // Set isPlaying to false when the sound is paused
          setIsPlaying(false);
        },
        onend: () => {
          // Set isPlaying to false when the sound ends
          setIsPlaying(false);
        },
      });

      setSound(newSound);
      soundRef.current = newSound;
    };

    // If isPlaying is true, initialize and play the sound
    if (isPlaying) {
      initializeSound();
      soundRef.current.play();
    } else {
      // If not playing, unload the sound
      if (soundRef.current) {
        soundRef.current.unload();
      }
    }

    return () => {
      // Clean up and unload the sound when the component unmounts
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [isPlaying, volume, setIsPlaying, selectedAudioUrl]);

  const handleSliderChange = (newValue) => {
    setVolume(newValue);
    if (soundRef.current) {
      soundRef.current.volume(newValue / 100);
    }
  };

  return (
    <div className="pt-14">
      <ReactSlider
        className="w-1/2 mx-auto bg-green h-6 rounded-3xl grid place-items-center"
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={volume}
        onChange={handleSliderChange}
        min={0}
        max={100}
      />
      <div className="text-black text-center my-2">
        <span className="font-semibold">Volume:</span> {volume}
      </div>
      <div className="flex justify-center items-center">
        {isPlaying ? (
          <PauseButton onClick={() => setIsPlaying(false)} />
        ) : (
          <PlayButton onClick={() => setIsPlaying(true)} />
        )}
      </div>
      <AudioSettingsModal
        onSelectAudio={(selectedAudioUrl) =>
          setSelectedAudioUrl(selectedAudioUrl)
        }
      />
    </div>
  );
}

export default Audio;
