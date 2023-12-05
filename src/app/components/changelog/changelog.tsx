import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangelogModal = ({ isOpen, onClose }: ChangelogModalProps) => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isMounted, setIsMounted] = useState(isOpen);
  const controls = useAnimation();

  useEffect(() => {
    // Set the initial state of screenSize based on the client-side window size
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("dontShowChangelog", dontShowAgain.toString());
  }, [dontShowAgain]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      controls.start({
        opacity: 1,
        transition: { duration: 0.3 },
      });
    } else {
      controls
        .start({
          opacity: 0,
          transition: { duration: 0.3 },
        })
        .then(() => {
          setIsMounted(false);
        });
    }
  }, [isOpen, controls]);

  const handleClose = () => {
    controls
      .start({
        opacity: 0,
        transition: { duration: 0.3 },
      })
      .then(() => {
        onClose();
      });
  };

  return (
    isMounted && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: screenSize.width * 0.8,
          height: screenSize.height * 0.8,
          backgroundColor: "#FFF",
          borderRadius: "12px",
          overflow: "auto",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          border: "2px solid #6D6875",
          zIndex: 1000,
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-extrabold text-[#6D6875]">
            What&apos;s New
          </h1>
          <button
            onClick={handleClose}
            className="text-[#6D6875] font-extrabold text-xl"
            style={{ cursor: "pointer", background: "none", border: "none" }}
          >
            Close
          </button>
        </div>
        <ul>
          <li className="mb-4">
            <strong className="text-3xl font-bold text-[#6D6875]">
              Version 1.0.6
            </strong>
            <ul className="ml-4 text-xl text-[#6D6875]">
              <li className="mb-2 mt-2">
                - Squashed some pesky bugs
              </li>            
            </ul>
          </li>
        </ul>
        <ul>
          <li className="mb-4">
            <strong className="text-3xl font-bold text-[#6D6875]">
              Version 1.0.5
            </strong>
            <ul className="ml-4 text-xl text-[#6D6875]">
              <li className="mb-2 mt-2">
                - Added colours to themes and added functionality so the themes apply to all pages and stay applied
              </li>
              <li className="mb-2">
                - Created a seasonal option that applies a seasonal style to the app based on the time of year
              </li>              
            </ul>
          </li>
        </ul>
        <ul>
          <li className="mb-4">
            <strong className="text-3xl font-bold text-[#6D6875]">
              Version 1.0.4
            </strong>
            <ul className="ml-4 text-xl text-[#6D6875]">
              <li className="mb-2 mt-2">
                - Squashed some of the pesky bugs in the animations
              </li>
              <li className="mb-2">
                - Modified the default theme of the app to look better and smoother
                together
              </li>
              <li className="mb-2">
                - Remodeled the settings page to give the user more options &
                more accessible
              </li>
              <li className="mb-2">
                - Added a start-up screen for a more app-like feel and breaks up
                the loading process to make the app less abrupt
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li className="mb-4">
            <strong className="text-3xl font-bold text-[#6D6875]">
              Version 1.0.3
            </strong>
            <ul className="ml-4 text-xl text-[#6D6875]">
              <li className="mb-2 mt-2">
                - Added notification tab to both the budget and shopping list
                screens
              </li>
              <li className="mb-2">- Squashed a few bugs</li>
            </ul>
          </li>
        </ul>
        <ul>
          <li className="mb-4">
            <strong className="text-3xl font-bold text-[#6D6875]">
              Version 1.0.2
            </strong>
            <ul className="ml-4 text-xl text-[#6D6875]">
              <li className="mb-2 mt-2">
                - Changed the background colour to appear more noticeable
              </li>
              <li className="mb-2">
                - Added borders to the budget, shopping and settings cards
              </li>
              <li className="mb-2">
                - Added default bills to the budget and the shopping list
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <strong className="text-3xl font-bold text-[#6D6875]">
              Version 1.0.1
            </strong>
            <ul className="ml-4 text-xl text-[#6D6875]">
              <li className="mb-2 mt-2">
                - Removed the ability to highlight text and images for a cleaner
                experience
              </li>
              <li className="mb-2">
                - Increased the default resolution from 1280x800 to 1400x900
              </li>
              <li className="mb-2">
                - Optimized the rendering process allowing pages to load faster
                for smoother response times
              </li>
            </ul>
          </li>
          <li>
            <strong className="text-3xl font-bold text-[#6D6875]">
              Version 1.0.0
            </strong>
            <ul className="ml-4 text-xl text-[#6D6875]">
              <li className="mt-2">- Initial release</li>
            </ul>
          </li>
        </ul>
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={() => setDontShowAgain(!dontShowAgain)}
            style={{ marginRight: "10px" }}
          />
          <label className="text-xl text-[#6D6875]">
            Don&apos;t show again
          </label>
        </div>
      </motion.div>
    )
  );
};

export default ChangelogModal;
