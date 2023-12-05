"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useTheme } from "./ThemeContext";

const StartupScreen = () => {
  const [text, setText] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const fullText = "Budget Buddy";
  const controls = useAnimation();
  const textMoveControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText((prevText) => {
        if (prevText.length < fullText.length) {
          return prevText + fullText[prevText.length];
        }
        clearInterval(intervalId);
        setAnimationComplete(true);
        return fullText;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const delay = 0.5;
    controls.start((i) => ({
      y: 0,
      scale: 1.1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: delay + i * 0.1,
      },
    }));
  }, [text, controls]);

  useEffect(() => {
    if (animationComplete) {
      setTimeout(() => {
        setShowButton(true);
      }, 2000);
    }
  }, [animationComplete]);

  useEffect(() => {
    if (showButton) {
      textMoveControls.start({
        y: "-10px",
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 0.5,
        },
      });
      buttonControls.start({
        y: [50, 0],
        opacity: [0, 1],
        scale: [0.7, 1],
        rotate: [0, -5, 5, 0],
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 0.7,
        },
      });
    }
  }, [showButton, textMoveControls, buttonControls]);

  const { theme: currentTheme } = useTheme();

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center text-black p-8 ${currentTheme.background}`}
    >
      <motion.div
        className="text-8xl font-extrabold text-[#6D6875]"
        animate={textMoveControls}
      >
        {fullText.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: -100, opacity: 0 }}
            animate={animationComplete ? undefined : controls}
            custom={index}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
      {showButton && (
        <Link href="/dashboard">
          <motion.button
            initial={{ y: 50, opacity: 0, scale: 0.7 }}
            animate={buttonControls}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="mt-8 px-4 py-2 btn bg-[#6D6875] text-white font-bold rounded"
          >
            Get Started
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default StartupScreen;
