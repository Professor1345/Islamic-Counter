// import React from 'react'

import { useState, useEffect } from "react";
import clickSound from "./assets/button-16.mp3";
import Reset from "./assets/reset.svg";
import Sound from "./assets/sound.svg";
import noSound from "./assets/no-sound.svg";
import BG from "./assets/BG.png";
const App = () => {
  const [counter, setCounter] = useState<number>(
    0 || Number(localStorage.getItem("counter"))
  );
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  useEffect(() => {
    localStorage.setItem("counter", counter.toString());
  }, [counter]);
  // if (
  //   !counter
  // ) {
  //   throw new Error("Counter is undefined");
  // }
  const onCount = () => {
    if (soundEnabled) {
      const audio = new Audio(clickSound);
      audio.play();
    }

    setCounter((counter) => counter + 1);
    localStorage.setItem("counter", counter.toString());
  };

  const resetCounter = () => {
    setCounter(0);
    localStorage.setItem("counter", "0");
  };

  const noSoundClick = () => {
    setSoundEnabled(false);
  };
  const SoundClick = () => {
    setSoundEnabled(true);
  };
  return (
    <div className="flex flex-col justify-end items-center h-screen">
      <img
        src={BG}
        alt="Background Image"
        rel="preload"
        className="block size-full object-cover object-center absolute -z-10 brightness-[200%]"
      />
      <div className=" h-[85%] flex flex-col justify-center">
        <div className="py-4 px-2 text-center text-black bg-white text-xl md:text-3xl rounded-xl border-solid border border-gray-800">
          <input
            type="number"
            name="number"
            id="number"
            value={counter}
            className="text-center w-48 bg-transparent"
            disabled
          />
        </div>
        <div className="text-center text-white">
          Developed by{" "}
          <a
            href="https://hammedbello.netlify.app/"
            target="_blank"
            className="underline"
          >
            Bello
          </a>
        </div>

        <div className="my-16 md:my-12 lg:my-16 ">
          <button
            className=" text-white font-semibold text-2xl md:text-3xl p-4 bg-green-500 size-60 flex justify-center items-center rounded-full hover:shadow-lg hover:shadow-green-300"
            onClick={onCount}
          >
            Counter
          </button>
        </div>

        <div className="bg-green-500 fixed left-0 bottom-0 w-full flex flex-row justify-between">
          <button
            className="w-full max-w-6 md:max-w-8 m-2 cursor-pointer"
            onClick={resetCounter}
          >
            <img src={Reset} alt="Reset" />
          </button>
          <div>
            <button
              className={`w-full max-w-6 md:max-w-8 h-auto m-2 cursor-pointer ${
                soundEnabled ? "block" : "hidden"
              }`}
              onClick={noSoundClick}
            >
              <img src={noSound} alt="No Sound" />
            </button>
            <button
              className={`w-full max-w-6 md:max-w-8 m-2 cursor-pointer ${
                soundEnabled ? "hidden" : "block"
              }`}
              onClick={SoundClick}
            >
              <img src={Sound} alt="Sound" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
