import React from "react";

const Timer = ({
  img,
  title,
  seconds,
  isActive,
  handleStart,
  handleStop,
  formatTime,
  audioRef,
  handleReset,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#7A3D1A] text-[#CCC9C4] p-4 rounded-lg shadow-lg relative overflow-hidden">
      <img src={img} alt="" className="w-[200px] absolute -left-[40px] top-[30px]"/>

      <p className="text-2xl font-bold mb-6">{title}</p>
      <div className="text-6xl font-mono mb-6">{formatTime(seconds)}</div>
      <div className="flex space-x-4">
        <button
          onClick={handleStart}
          disabled={isActive}
          className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition-colors ${
            isActive
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isActive}
          className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition-colors ${
            !isActive
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Stop
        </button>
        
      </div>
      {/* Elemen audio untuk alarm */}
      <audio ref={audioRef} src="/sounds/sound.mp3" />
    </div>
  );
};

export default Timer;
