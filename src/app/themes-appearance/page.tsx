"use client";

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import SlideInLeft from "../animations/SlideInLeft";
import Link from "next/link";
import { useTheme } from "../ThemeContext";

const ThemesAppearance = () => {
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState("default");
  const [highContrast, setHighContrast] = useState(false);

  const { theme: currentTheme, changeTheme } = useTheme();

  const increaseFontSize = () => setFontSize(fontSize + 1);
  const decreaseFontSize = () => setFontSize(fontSize - 1);

  const changeThemeHandler = (newTheme: string) => {
    setTheme(newTheme);
    changeTheme(newTheme);
  };

  const toggleHighContrast = () => setHighContrast(!highContrast);

  // Determine the current season and set the theme accordingly
  const getSeasonalTheme = () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();

    // Christmas: December 25th
    if (month === 11 && day === 25) {
      return "christmas";
    }

    // Halloween: October 31st
    if (month === 9 && day === 31) {
      return "halloween";
    }

    // Easter: variable date
    const easter = getEaster(now.getFullYear());
    if (month === easter.month && day === easter.day) {
      return "easter";
    }

    return "default";
  };

  // Helper function to calculate the date of Easter
  const getEaster = (year: number) => {
    const f = Math.floor;
    const G = year % 19;
    const C = f(year / 100);
    const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
    const I = H - f(H / 28);
    const P = I - f((year + f(year / 4) + I + 2 - C + f(C / 4)) % 7);
    const month = 3 + f((P + 40) / 44);
    const day = P + 28 - 31 * f(month / 4);

    return { month: month - 1, day };
  };

  // Set the seasonal theme if the "Seasonal" option is selected
  if (theme === "seasonal") {
    changeThemeHandler(getSeasonalTheme());
  }

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center text-black p-8 ${currentTheme.background} transition duration-500 ease-in-out`}
    >
      <div className="absolute top-0 left-0 p-8 transition duration-500 ease-in-out">
        <Link href="/settings">
          <h1
            className={`text-6xl font-extrabold text-[#6D6875] ${
              highContrast
                ? "text-white bg-black px-4 py-2 rounded-md shadow-lg"
                : ""
            } `}
          >
            Themes & Appearance
          </h1>
        </Link>
      </div>
      <SlideInLeft>
        <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-lg transition duration-500 ease-in-out">
          <div className="flex flex-col items-center space-y-4 mb-4">
            <button
              onClick={decreaseFontSize}
              className="bg-[#F9DEC9] text-4xl font-extrabold text-[#6D6875] p-2 btn rounded-full shadow-md transition duration-500 ease-in-out hover:scale-110"
            >
              <FaMinus />
            </button>
            <p className="text-4xl font-extrabold text-[#6D6875] transition duration-500 ease-in-out">
              Font Size: {fontSize}px
            </p>
            <button
              onClick={increaseFontSize}
              className="bg-[#F9DEC9] text-4xl font-extrabold text-[#6D6875] p-2 btn rounded-full shadow-md transition duration-500 ease-in-out hover:scale-110"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <label
              htmlFor="theme"
              className="text-4xl font-extrabold text-[#6D6875] transition duration-500 ease-in-out"
            >
              Themes:
            </label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => changeThemeHandler(e.target.value)}
              className="bg-[#F9DEC9] text-4xl font-extrabold text-[#6D6875] p-2 h-full w-full btn rounded-md shadow-md transition duration-500 ease-in-out hover:scale-110 hover:text-[#F9DEC9] hover:bg-[#261F2F] border-none"
            >
              <option value="default" className="gradient-default">
                Default
              </option>
              <option value="candy">Candy</option>
              <option value="darkula">Darkula</option>
              <option value="lavender">Lavender</option>
              <option value="seabreeze">Sea Breeze</option>
              <option value="sunflower">Sunflower</option>
              <option value="peachy">Peachy</option>
              <option value="seasonal">Seasonal</option>
            </select>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <label
              htmlFor="highContrast"
              className="text-4xl font-extrabold text-[#6D6875] transition duration-500 ease-in-out"
            >
              High Contrast Mode:
            </label>
            <input
              type="checkbox"
              id="highContrast"
              checked={highContrast}
              onChange={toggleHighContrast}
              className="w-8 h-8 transition duration-500 ease-in-out hover:scale-110"
            />
          </div>
        </div>
      </SlideInLeft>
    </div>
  );
};

export default ThemesAppearance;
