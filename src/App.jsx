import { useState, useEffect, useRef } from "react";
import "./App.css";
import Timer from "./component/Timer";

function App() {
  const audioRef = useRef(new Audio("/sounds/sound.mp3"));
  const createTimer = (initialSeconds) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
      if (isActive) {
        intervalRef.current = setInterval(() => {
          setSeconds((prevSeconds) => {
            if (prevSeconds <= 1) {
              audioRef.current.play();
              clearInterval(intervalRef.current);
              setIsActive(false);
              return initialSeconds;
            }
            return prevSeconds - 1;
          });
        }, 1000);
      } else {
        clearInterval(intervalRef.current);
      }
      return () => clearInterval(intervalRef.current);
    }, [isActive, initialSeconds]);

    // stop sound
    return { seconds, isActive, setIsActive, audioRef };
  };
  const stopSound = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const timer1 = createTimer(1200);
  const timer2 = createTimer(7200);
  const image = {
    one: "../img/image11.png",
    two: "../img/image1.png",
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Menghitung jam
    const minutes = Math.floor((seconds % 3600) / 60); // Menghitung menit setelah jam
    const secs = seconds % 60; // Sisa detik setelah menit

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="p-20 border-2 border-black min-h-screen bg-[#CCC9C4]">
      <div className="-mt-10">
        <h1 className="font-bold text-5xl text-[#7A3D1A]">ALARM ACTIVITY</h1>
        {/* button stop sound */}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full mt-5"
          onClick={stopSound}
        >
          Stop Sound
        </button>
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <Timer
            title="Good for the eyes"
            img={image.one}
            seconds={timer1.seconds}
            isActive={timer1.isActive}
            handleStart={() => timer1.setIsActive(true)}
            handleStop={() => timer1.setIsActive(false)}
            formatTime={formatTime}
            audioRef={timer1.audioRef}
          />
          <Timer
            title="Maximum Study Time"
            img={image.two}
            seconds={timer2.seconds}
            isActive={timer2.isActive}
            handleStart={() => timer2.setIsActive(true)}
            handleStop={() => timer2.setIsActive(false)}
            formatTime={formatTime}
            audioRef={timer2.audioRef}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
