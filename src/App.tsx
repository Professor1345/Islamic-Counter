/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'

import React, { useState, useEffect, useCallback, useRef } from "react";
// import clickSound from "./assets/button-16.mp3";
import Reset from "./assets/reset.svg";
import Sound from "./assets/sound.svg";
import noSound from "./assets/no-sound.svg";
import BG from "./assets/BG.png";
const App : React.FC = () => {
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
  // const [audio] = useState(new Audio(clickSound));
  // const audioRef = React.useRef<HTMLAudioElement>(new Audio(clickSound));


  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize audio context and nodes once
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
  }, []);

  const playBeep = useCallback(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    // Create a new oscillator for each click
    const oscillator = audioContextRef.current.createOscillator();
    oscillator.type = 'square'; // Sharp, crisp tone
    oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);

    // Configure gain for instant playback
    gainNodeRef.current.gain.setValueAtTime(1, audioContextRef.current.currentTime); // Full volume
    gainNodeRef.current.gain.exponentialRampToValueAtTime(
      0.01, // Fade out quickly
      audioContextRef.current.currentTime + 0.01 // 10ms duration
    );

    // Connect and play
    oscillator.connect(gainNodeRef.current);
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.01); // Stop after 10ms

    // Cleanup oscillator after playback
    setTimeout(() => oscillator.disconnect(), 20); // Disconnect after 20ms
  }, []);
  const onCount = () => {
    
    setCounter((counter) => counter + 1);
    if (soundEnabled) {
      // const audio = audioRef.current;
      // audio.playbackRate = 5;
      // audio.currentTime = 0;
      // audio.play();
       // Handle Safari/iOS audio context suspension
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
      playBeep();
    }

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
    <div className="flex flex-col justify-end items-center h-screen relative">
      <div className="text-white text-4xl md:text-4xl font-bold my-6">
        Islamic Counter
      </div>
      <img
        src={BG}
        alt="Background Image"
        rel="preload"
        className="block size-full object-cover object-center top-0 left-0 absolute -z-10 brightness-[200%]"
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
            Count
          </button>
        </div>

        <div className="bg-green-500 fixed left-0 bottom-0 z-20 w-full flex flex-row justify-between">
          <button
            className="w-full max-w-6 md:max-w-7 m-2 cursor-pointer"
            onClick={resetCounter}
          >
            <img src={Reset} alt="Reset" />
          </button>
          <div>
            <button
              className={`w-full max-w-6 md:max-w-7 h-auto m-2 cursor-pointer ${
                soundEnabled ? "block" : "hidden"
              }`}
              onClick={noSoundClick}
            >
              <img src={Sound} alt="Sound" />
            </button>
            <button
              className={`w-full max-w-6 md:max-w-7 m-2 cursor-pointer ${
                soundEnabled ? "hidden" : "block"
              }`}
              onClick={SoundClick}
            >
              <img src={noSound} alt="No Sound" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
