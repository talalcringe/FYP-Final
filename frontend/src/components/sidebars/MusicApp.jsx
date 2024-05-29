import { useState } from "react";
import Audio from "./Audio.jsx";

function MusicApp() {
  const [showSettings, setShowSettings] = useState(true);

  const [showAudio, setShowAudio] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  return (
    <div>
      <div>
        {showSettings && (
          <Audio
            volume={volume}
            setVolume={setVolume}
            isPlaying={isAudioPlaying}
            setIsPlaying={setIsAudioPlaying}
          />
        )}
        {/* <Audio volume={volume} setVolume={setVolume} /> */}
      </div>
    </div>
  );
}

export default MusicApp;
