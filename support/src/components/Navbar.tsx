import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { X, Play } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const storyVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen || isStoryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isStoryOpen]);

  useEffect(() => {
    if (isStoryOpen && storyVideoRef.current) {
      storyVideoRef.current.play();
    } else if (!isStoryOpen && storyVideoRef.current) {
      storyVideoRef.current.pause();
      storyVideoRef.current.currentTime = 0;
    }
  }, [isStoryOpen]);

  // Use absolute paths from the root domain for all navigation
  const menuItems = [
    { id: "/", label: "Overview", desc: "The future of home robotics." },
    { id: "/#product", label: "Technology", desc: "Under the hood of Memo." },
    { id: "/#business", label: "Company", desc: "Our mission and partners." },
    { id: "/support/index.html", label: "Support", desc: "We are here to help." },
    { id: "/careers/index.html", label: "Careers", desc: "Join the revolution." },
    { id: "/journal/index.html", label: "Journal", desc: "Stories from the lab." },
    { id: "/beta/index.html", label: "Beta", desc: "Join the founding family." },
  ];

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  // Determine active page based on current pathname
  const currentPath = window.location.pathname;
  let activePageId = "/";
  if (currentPath.includes("/support")) activePageId = "/support/index.html";
  if (currentPath.includes("/overview")) activePageId = "/"; 
  if (currentPath.includes("/careers")) activePageId = "/careers/index.html";
  if (currentPath.includes("/journal")) activePageId = "/journal/index.html";
  if (currentPath.includes("/beta")) activePageId = "/beta/index.html";
  if (currentPath === "/" || currentPath === "/index.html") activePageId = "/";

  return (
    <>
      <AnimatePresence>
        {isStoryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-12"
          >
            <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-6 md:px-12 text-white z-110">
              <div className="w-12"></div>
              <span className="text-base md:text-lg font-medium tracking-tight opacity-70">
                Our story
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsStoryOpen(false);
                }}
                className="p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors group"
              >
                <X
                  size={24}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              className="w-[90vw] max-w-5xl aspect-video rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl bg-black relative mt-16"
            >
              <video
                ref={storyVideoRef}
                src="https://v.ftcdn.net/08/55/54/22/700_F_855542283_pMhC9vE2X6pI2f6pP7X4X7X4X7X4X7X4_ST.mp4"
                className="w-full h-full object-cover"
                controls
                playsInline
              />
            </motion.div>

            <div
              className="absolute inset-0 -z-10"
              onClick={() => setIsStoryOpen(false)}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          layout
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className={`bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden relative z-50 rounded-4xl ${
            isOpen ? "rounded-2xl w-full max-w-4xl" : "rounded-full w-auto"
          }`}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 25,
            mass: 0.8,
          }}
        >
          <motion.div
            layout
            className={`flex items-center justify-between transition-all duration-300 ${
              isOpen ? "p-6" : "pl-5 pr-6 py-3 gap-12"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 bg-[#111] rounded-lg flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("/");
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="font-bold text-lg tracking-wide text-[#111] cursor-pointer select-none hover:opacity-70 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("/");
                }}
              >
                SUNDAY
              </span>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 transition-colors relative"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X size={20} className="text-[#111]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1.5 items-end absolute inset-0 justify-center pr-2"
                  >
                    <span className="w-5 h-0.5 bg-[#111] rounded-full"></span>
                    <span className="w-3 h-0.5 bg-[#111] rounded-full"></span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="border-t border-gray-100/50"
              >
                <div className="flex flex-col md:flex-row min-h-[500px]">
                  <div className="flex-1 p-8 flex flex-col justify-center gap-2 md:gap-3">
                    {menuItems.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className="text-left group relative py-1 pl-4 border-l-2 border-transparent hover:border-[#D4E76A] transition-all"
                        whileHover={{ x: 5 }}
                      >
                        <span
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                          className={`block text-3xl font-medium transition-colors ${
                            activePageId === item.id
                              ? "text-[#111]"
                              : "text-gray-400 group-hover:text-[#111]"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="hidden md:block text-xs font-sans text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 -translate-y-1/2 left-[200px] w-48 whitespace-nowrap pointer-events-none">
                          {item.desc}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  <div
                    className="w-full md:w-[45%] p-3 bg-gray-50/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsStoryOpen(true);
                      setIsOpen(false);
                    }}
                  >
                    <div className="w-full h-full rounded-2xl overflow-hidden relative group cursor-pointer shadow-inner">
                      <img
                        src="https://images.unsplash.com/photo-1548100146-27137f8f4844?q=80&w=1200&auto=format&fit=crop"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Story"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                        <div className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center gap-3 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-transparent group-hover:scale-110">
                          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                            <Play size={10} fill="currentColor" />
                          </div>
                          <span className="font-medium text-sm tracking-tight">
                            Our story
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-8 py-3 text-[10px] uppercase tracking-wider text-gray-400 flex justify-between items-center font-mono border-t border-gray-100">
                  <span>Sunday Robotics Inc. © 2025</span>
                  <span className="flex items-center gap-2">
                    System Online{" "}
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
};
