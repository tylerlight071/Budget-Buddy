"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import SlideInLeft from "../animations/SlideInLeft";
import Weather_Widget from "../components/weatherwidget/page";
import Budget_Card from "../components/home_cards/budgetcard";
import Shopping_Card from "../components/home_cards/shoppingcard";
import Settings_Card from "../components/home_cards/settingscard";
import ChangelogModal from "../components/changelog/changelog";
import { useUser } from "@clerk/nextjs";
import { motion, useAnimation } from "framer-motion";
import { FiBell } from "react-icons/fi";
import { useTheme } from "../ThemeContext";

export default function Home() {
  const [title, setTitle] = useState("");
  const [isChangelogModalOpen, setIsChangelogModalOpen] = useState(false);
  const { user } = useUser();
  const { theme, changeTheme } = useTheme();

  const cardControls = useAnimation();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    const name = user?.firstName || "User";

    if (hours >= 0 && hours < 12) {
      setTitle(`Good Morning ${name}!`);
    } else if (hours >= 12 && hours < 16) {
      setTitle(`Good Afternoon ${name}!`);
    } else {
      setTitle(`Good Evening ${name}!`);
    }

    cardControls.start("visible");
  }, [user, cardControls]);

  return (
    <div
      className={`h-screen flex flex-col justify-between items-stretch text-black p-8 ${theme.background}`}
    >
      <SlideInLeft>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="flex justify-end items-start w-full mt-6">
          <motion.button
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl p-2  text-[#F9DEC9] rounded-full relative btn border-none bg-[#261F2F] mb-4"
            onClick={() => setIsChangelogModalOpen(true)}
          >
            <FiBell />
            <div className="animate-pulse absolute top-0 right-0 bg-red-500 h-2 w-2 rounded-full"></div>
          </motion.button>
        </div>
        <div className="flex justify-between items-center w-full mt-8 ">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-extrabold text-[#6D6875]"
          >
            {title}
          </motion.div>
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Weather_Widget />
          </motion.div>
        </div>
        {isChangelogModalOpen && (
          <ChangelogModal
            isOpen={isChangelogModalOpen}
            onClose={() => setIsChangelogModalOpen(false)}
          />
        )}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={cardControls}
          transition={{
            staggerChildren: 0.2,
          }}
          className="justify-between flex space-x-6 mt-20"
        >
          <Budget_Card />
          <Shopping_Card />
          <Settings_Card />
        </motion.div>
      </SlideInLeft>
    </div>
  );
}
