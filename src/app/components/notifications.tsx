import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationsSidebarProps {
  notifications: string[];
}

const NotificationsSidebar: React.FC<NotificationsSidebarProps> = ({
  notifications,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bell icon button to open the sidebar */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="btn btn-[#6D6875] bg-[#261F2F] border-none mt-2 text-[#F9DEC9]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 right-0 w-64 h-full bg-[#FFE4D8] p-4 shadow-md z-50"
          >
            {/* Close button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="btn btn-[#6D6875] mt-2 text-[#F9DEC9] mb-4"
            >
              Close
            </button>

            {/* Notifications */}
            <ul className="text-black">
              <h1 className="text-3xl font-extrabold text-[#6D6875] mb-5">
                Notifications
              </h1>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <li
                    key={index}
                    className="mb-4 mt-2 bg-[#] p-4 rounded-md border-solid border-2 border-[#6D6875]"
                  >
                    {notification}
                  </li>
                ))
              ) : (
                <p className="text-1xl font-extrabold text-[#6D6875] mb-5">
                  No new notifications
                </p>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsSidebarOpen(false)}
          className="fixed top-0 left-0 w-full h-full bg-black z-40"
        ></motion.div>
      )}
    </div>
  );
};

export default NotificationsSidebar;
