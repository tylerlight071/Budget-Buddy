"use client";

import React from "react";
import Link from "next/link";
import { FaUserAlt, FaPaintBrush, FaHeadset } from "react-icons/fa";
import SlideInLeft from "../animations/SlideInLeft";
import { useTheme } from "../ThemeContext";

const SettingsPage = () => {
  const { theme: currentTheme } = useTheme();

  return (
    <SlideInLeft>
      <div
        className={`h-screen flex flex-col justify-between items-stretch text-black p-8 ${currentTheme.background}`}
      >
        <Link href="/dashboard" passHref>
          <h1 className="text-6xl font-extrabold text-[#6D6875] mb-8 cursor-pointer hover:text-[#5D5855] transition duration-300">
            Settings
          </h1>
        </Link>
        <div className="flex flex-col items-center justify-center space-y-12 w-full h-full">
          <div className="flex flex-col justify-center items-center space-y-8 w-1/2 mx-auto">
            <Link href="/user-profile">
              <button className="border-none flex items-center text-4xl font-extrabold text-[#6D6875] p-6 btn bg-[#F9DEC9] rounded-md w-full h-full justify-center hover:bg-[#F9D8B9] shadow-md hover:shadow-lg transition duration-300 mb-4">
                <FaUserAlt className="mr-4" /> User Settings
              </button>
            </Link>
            <Link href="/themes-appearance">
              <button className="border-none flex items-center text-4xl font-extrabold text-[#6D6875] p-6 btn bg-[#F9DEC9] rounded-md w-full h-full justify-center hover:bg-[#F9D8B9] shadow-md hover:shadow-lg transition duration-300 mb-4">
                <FaPaintBrush className="mr-4" /> Themes & Appearance
              </button>
            </Link>
            <Link href="https://linktr.ee/tylerlightwood">
              <button className="border-none flex items-center text-4xl font-extrabold text-[#6D6875] p-6 btn bg-[#F9DEC9] rounded-md w-full h-full justify-center hover:bg-[#F9D8B9] shadow-md hover:shadow-lg transition duration-300">
                <FaHeadset className="mr-4" /> Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </SlideInLeft>
  );
};

export default SettingsPage;
