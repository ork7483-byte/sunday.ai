import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Play, Download } from "lucide-react";

// Use 'any' cast to bypass strict type checking issues with framer-motion v10+ and React 18
const MotionDiv = motion.div as any;
const MotionNav = motion.nav as any;
const MotionAnimatePresence = AnimatePresence as any;

// --- Navbar Component (Ported from Journal) ---
const Navbar = ({
  activePage = "beta",
  onNavigate,
}: {
  activePage?: string;
  onNavigate?: (page: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems = [
    { id: "home", label: "Overview", desc: "The future of home robotics." },
    { id: "product", label: "Technology", desc: "Under the hood of Memo." },
    { id: "business", label: "Company", desc: "Our mission and partners." },
    { id: "support", label: "Support", desc: "We are here to help." },
    { id: "careers", label: "Careers", desc: "Join the revolution." },
    { id: "journal", label: "Journal", desc: "Stories from the lab." },
    { id: "beta", label: "Beta", desc: "Join the founding family." },
  ];

  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const storyVideoRef = useRef(null);

  useEffect(() => {
    if (isStoryOpen) {
      document.body.style.overflow = "hidden";
      if (storyVideoRef.current) (storyVideoRef.current as any).play();
    } else {
      document.body.style.overflow = "unset";
      if (storyVideoRef.current) {
        (storyVideoRef.current as any).pause();
        (storyVideoRef.current as any).currentTime = 0;
      }
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isStoryOpen]);


  const handleNavigation = (id: string) => {
    if (id === "home") {
      window.location.href = "/index.html";
    } else if (id === "careers") {
      window.location.href = "/careers/index.html";
    } else if (id === "journal") {
      window.location.href = "/journal/index.html";
    } else if (id === "beta") {
      // Already on beta page
      setIsOpen(false);
    } else {
      window.location.href = `/index.html?page=${id}`;
    }
  };

  return (
    <>
      {/* Story Modal */}
      <MotionAnimatePresence>
        {isStoryOpen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-12"
          >
            {/* Modal Header */}
            <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-6 md:px-12 text-white z-[110]">
              <div className="w-12"></div>
              <span className="text-base md:text-lg font-medium tracking-tight opacity-70">Our story</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsStoryOpen(false);
                }}
                className="p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Video Container */}
            <MotionDiv
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              className="w-[90vw] max-w-5xl aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl bg-black relative mt-16"
            >
              <video
                ref={storyVideoRef}
                src="https://v.ftcdn.net/08/55/54/22/700_F_855542283_pMhC9vE2X6pI2f6pP7X4X7X4X7X4X7X4_ST.mp4"
                className="w-full h-full object-cover"
                controls
                playsInline
              />
            </MotionDiv>

            {/* Dismiss Backdrop */}
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setIsStoryOpen(false)}
            ></div>
          </MotionDiv>
        )}
      </MotionAnimatePresence>

      <MotionAnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        )}
      </MotionAnimatePresence>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <MotionNav
          layout
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className={`bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden relative z-50 ${isOpen ? "rounded-[2rem] w-full max-w-4xl" : "rounded-full w-auto"}`}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 25,
            mass: 0.8,
          }}
        >
          <MotionDiv
            layout
            className={`flex items-center justify-between transition-all duration-300 ${isOpen ? "p-6" : "pl-5 pr-6 py-3 gap-12"}`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 bg-memo-dark rounded-lg flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = "/index.html";
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
                className="font-display font-bold text-lg tracking-wide text-memo-dark cursor-pointer select-none hover:opacity-70 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = "../index.html";
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
              <MotionAnimatePresence mode="wait">
                {isOpen ? (
                  <MotionDiv
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X size={20} className="text-memo-dark" />
                  </MotionDiv>
                ) : (
                  <MotionDiv
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1.5 items-end absolute inset-0 justify-center pr-2"
                  >
                    <span className="w-5 h-0.5 bg-memo-dark rounded-full"></span>
                    <span className="w-3 h-0.5 bg-memo-dark rounded-full"></span>
                  </MotionDiv>
                )}
              </MotionAnimatePresence>
            </button>
          </MotionDiv>
          <MotionAnimatePresence>
            {isOpen && (
              <MotionDiv
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="border-t border-gray-100/50"
              >
                <div className="flex flex-col md:flex-row min-h-[500px]">
                  <div className="flex-1 p-8 flex flex-col justify-center gap-2 md:gap-3">
                    {menuItems.map((item) => (
                      <MotionDiv
                        key={item.id}
                        onClick={() => handleNavigation(item.id)}
                        className="text-left group relative py-1 pl-4 border-l-2 border-transparent hover:border-[#D4E76A] transition-all"
                        whileHover={{ x: 5 }}
                      >
                        <span
                          className={`block text-3xl font-display font-medium transition-colors ${activePage === item.id ? "text-memo-dark" : "text-gray-400 group-hover:text-memo-dark"}`}
                        >
                          {item.label}
                        </span>
                        <span className="hidden md:block text-xs font-sans text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 -translate-y-1/2 left-[200px] w-48 whitespace-nowrap pointer-events-none">
                          {item.desc}
                        </span>
                      </MotionDiv>
                    ))}
                  </div>
                  <div 
                    className="w-full md:w-[45%] p-3 bg-gray-50/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsStoryOpen(true);
                    }}
                  >
                    <div className="w-full h-full rounded-2xl overflow-hidden relative group cursor-pointer shadow-inner">
                      <img
                        src="https://images.unsplash.com/photo-1548100146-27137f8f4844?q=80&w=1200&auto=format&fit=crop"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Story"
                      />
                      {/* Default State: Glassy Button */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                        <div className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center gap-3 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-transparent group-hover:scale-110">
                          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                            <Play size={10} fill="currentColor" />
                          </div>
                          <span className="font-medium text-sm tracking-tight">Our story</span>
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
              </MotionDiv>
            )}
          </MotionAnimatePresence>
        </MotionNav>
      </div>
    </>
  );
};
// --- Footer Component (Ported from index.html) ---
const Footer = () => {
  const handleNavigation = (id: string) => {
    if (id === "home") {
      window.location.href = "/index.html";
    } else if (id === "careers") {
      window.location.href = "/careers/index.html";
    } else if (id === "journal") {
      window.location.href = "/journal/index.html";
    } else if (id === "beta") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = `/index.html?page=${id}`;
    }
  };

  return (
    <footer className="bg-[#FDFBF7] text-gray-900 pt-32 pb-16 px-6 border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="max-w-md">
            <h3 className="text-3xl md:text-4xl font-display font-medium mb-8 leading-tight">
              Join the waitlist for early access.
            </h3>
            <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-full shadow-sm focus-within:border-memo-dark transition-all">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-6 py-3 text-sm focus:outline-none"
              />
              <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-[15px]">
            {/* Explore Column */}
            <div className="flex flex-col gap-5">
              <span className="font-bold text-black uppercase tracking-widest text-[11px]">
                Explore
              </span>
              <button
                onClick={() => handleNavigation("home")}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Overview
              </button>
              <button
                onClick={() => handleNavigation("product")}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Technology
              </button>
              <button
                onClick={() => handleNavigation("journal")}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Journal
              </button>
            </div>
            {/* About Column */}
            <div className="flex flex-col gap-5">
              <span className="font-bold text-black uppercase tracking-widest text-[11px]">
                About
              </span>
              <button
                onClick={() => handleNavigation("business")}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Company
              </button>
              <button
                onClick={() => handleNavigation("careers")}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Careers
              </button>
              <button
                onClick={() => handleNavigation("beta")}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Beta Program
              </button>
              <button
                onClick={() => handleNavigation("support")}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Support
              </button>
            </div>
            {/* Social Column */}
            <div className="flex flex-col gap-5">
              <span className="font-bold text-black uppercase tracking-widest text-[11px]">
                Social
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-colors"
              >
                X (Twitter)
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200/60 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© 2025 Sunday Inc. All rights reserved.</p>
          <button className="flex items-center gap-1 hover:text-black transition-colors">
            <Download size={12} /> <span>Download Source</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

// -- Tooltip Component --
interface TooltipItemProps {
  label: string;
  content: string;
  align?: "left" | "center" | "right";
}

const TooltipItem: React.FC<TooltipItemProps> = ({
  label,
  content,
  align = "center",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Determine alignment classes
  const alignClass =
    align === "left"
      ? "left-0 origin-bottom-left"
      : align === "right"
        ? "right-0 origin-bottom-right"
        : "left-1/2 -translate-x-1/2 origin-bottom";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <button
        type="button"
        className="
          cursor-pointer text-[13px] font-medium text-gray-500 
          underline decoration-dotted decoration-gray-400 underline-offset-4
          hover:text-gray-900 transition-colors focus:outline-none
        "
      >
        {label}
      </button>

      {/* Tooltip Card */}
      <div
        className={`
          absolute bottom-full mb-3 z-50 w-[280px] md:w-[320px]
          bg-[#111] text-white p-4 rounded-2xl shadow-xl
          transition-all duration-200 ease-out
          ${alignClass}
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-2 scale-95 pointer-events-none"
          }
        `}
      >
        <p className="text-sm leading-relaxed text-gray-200">{content}</p>
      </div>
    </div>
  );
};

// -- Section 2: Features Component --
const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Your home helper",
      body: "Memo's state-of-the-art ACT-1 model clears tables, loads dishwashers, folds laundry, makes coffee, and more. Help us make each of these experiences more complete and seamless in your routine.",
    },
    {
      title: "Always learning",
      body: "Memo's brain is constantly being updated. You'll propose new skills for our hundreds of Memory Developers to collect in the wild, and help us discover unique problems Memo will face in new homes.",
    },
    {
      title: "Always on",
      body: "Memo works around the clock to make sure you can take your Sunday slow. In the beta program we'll experiment with a combination of supervision, collaboration, and complete hands-off Memo magic.",
    },
    {
      title: "Real world ready",
      body: "Memo performs tasks autonomously in new homes. You will be able to schedule Memo to do tasks either through direct voice interaction or the companion Sunday app.",
    },
  ];

  return (
    <section className="relative z-40 bg-[#FDFBF7] w-full max-w-[1200px] mx-auto px-4 py-24 md:py-32 md:px-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-0">
        {/* Left Title Block (approx 40% width on desktop) */}
        <div className="w-full md:w-[40%] pr-0 md:pr-12">
          <span className="block text-[13px] font-medium text-gray-500 mb-3 tracking-wide">
            Mundane made magic
          </span>
          <h2 className="text-[24px] md:text-[28px] font-medium text-gray-900 leading-tight">
            What Memo can do for you
          </h2>
        </div>

        {/* Right Content Grid (approx 60% width on desktop) */}
        <div className="w-full md:w-[60%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
            {features.map((item, i) => (
              <div key={i} className="flex flex-col">
                <h3 className="text-[14px] font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-[1.7] text-gray-500">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// -- Section 3: Lifestyle Component --
const LifestyleSection: React.FC = () => {
  const imageUrl = "/image/beta_hero_lifestyle.webp";

  return (
    <section className="w-full max-w-[1300px] mx-auto px-4 md:px-6 pb-24 md:pb-32">
      <div className="relative w-full rounded-[22px] overflow-hidden shadow-sm">
        <img
          src={imageUrl}
          alt="Memo at home"
          className="w-full h-auto object-cover block bg-gray-200 aspect-[16/9] md:aspect-[21/9]"
        />
        <div className="absolute bottom-5 left-6 md:bottom-8 md:left-8">
          <span className="text-white/90 text-xs md:text-sm font-medium tracking-wide drop-shadow-sm">
            Memo at home
          </span>
        </div>
      </div>
    </section>
  );
};

// -- Section 4: Founding Family Component --
const FoundingSection: React.FC = () => {
  // Styles reused from Section 2 Title: "What Memo can do for you"
  // Class: text-[24px] md:text-[28px] font-medium text-gray-900 leading-tight
  const textStyle =
    "text-[24px] md:text-[28px] font-medium text-gray-900 leading-tight";

  return (
    <section className="w-full bg-white py-20 md:py-[140px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">
          {/* Left: Titles */}
          <div className="flex flex-col gap-2">
            <h3 className={textStyle}>Be part of the story</h3>
            <span className="text-[16px] md:text-[18px] font-light text-[#8b8b8b]">
              Reserve your spot
            </span>
          </div>

          {/* Right: Body Text */}
          <div className="flex flex-col gap-8 max-w-[720px]">
            <p className={textStyle}>
              As one of the Founding Families, you’ll be first in line to secure
              a limited edition, numbered Memo. As one of the earliest adopters
              of home robots, you’ll guide what Memo learns, inform Memo’s
              design, and play a crucial role in shaping the journey of the
              whole industry.
            </p>
            <p className={textStyle}>
              Memo will be tailored to your home, you’ll get exclusive access to
              the Sunday HQ, get invites to launch events and demo days, as well
              as some special perks just for the Family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// -- Section 5: Perks Component --
const PerksSection: React.FC = () => {
  // --- CARD 1 STATE (White Glove) ---
  const [c1Active, setC1Active] = useState(false);
  const c1ReturnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const c1CooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const c1IsCooldown = useRef(false);

  // --- CARD 4 STATE (Choose Services) ---
  const [c4Active, setC4Active] = useState(false);
  const c4ReturnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const c4CooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const c4IsCooldown = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (c1ReturnTimerRef.current) clearTimeout(c1ReturnTimerRef.current);
      if (c1CooldownTimerRef.current) clearTimeout(c1CooldownTimerRef.current);
      if (c4ReturnTimerRef.current) clearTimeout(c4ReturnTimerRef.current);
      if (c4CooldownTimerRef.current) clearTimeout(c4CooldownTimerRef.current);
    };
  }, []);

  // Card 1 Logic
  const handleC1Enter = () => {
    if (c1IsCooldown.current) return;

    // Start sequence
    c1IsCooldown.current = true;
    setC1Active(true);

    // Auto return after 900ms
    c1ReturnTimerRef.current = setTimeout(() => {
      setC1Active(false);
    }, 900);

    // Cooldown reset after 1200ms total
    c1CooldownTimerRef.current = setTimeout(() => {
      c1IsCooldown.current = false;
    }, 1200);
  };

  const handleC1Leave = () => {
    // Clear return timer so it doesn't fire if we left early
    if (c1ReturnTimerRef.current) clearTimeout(c1ReturnTimerRef.current);
    // Clear cooldown timer and reset state to allow immediate re-entry safely
    if (c1CooldownTimerRef.current) clearTimeout(c1CooldownTimerRef.current);

    setC1Active(false);
    c1IsCooldown.current = false;
  };

  // Card 4 Logic (Unified with Card 1)
  const handleC4Enter = () => {
    if (c4IsCooldown.current) return;

    // Start sequence
    c4IsCooldown.current = true;
    setC4Active(true);

    // Auto return after 900ms
    c4ReturnTimerRef.current = setTimeout(() => {
      setC4Active(false);
    }, 900);

    // Cooldown reset after 1200ms total
    c4CooldownTimerRef.current = setTimeout(() => {
      c4IsCooldown.current = false;
    }, 1200);
  };

  const handleC4Leave = () => {
    // Clear return timer so it doesn't fire if we left early
    if (c4ReturnTimerRef.current) clearTimeout(c4ReturnTimerRef.current);
    // Clear cooldown timer and reset state to allow immediate re-entry safely
    if (c4CooldownTimerRef.current) clearTimeout(c4CooldownTimerRef.current);

    setC4Active(false);
    c4IsCooldown.current = false;
  };

  // Helper to add explicit trigger class for mobile tap interaction
  const handleMobileTap = (
    e: React.MouseEvent<HTMLDivElement>,
    animationClass: string,
  ) => {
    // Check if hover is supported
    if (window.matchMedia("(hover: hover)").matches) return;

    const target = e.currentTarget.querySelector(".icon-inner");
    if (target) {
      target.classList.remove(animationClass);
      // Force reflow
      void (target as HTMLElement).offsetWidth;
      target.classList.add(animationClass);

      const onEnd = () => {
        target.classList.remove(animationClass);
        target.removeEventListener("animationend", onEnd);
      };
      target.addEventListener("animationend", onEnd);
    }
  };

  const cards = [
    {
      id: "card1",
      title: "White glove service",
      body: "Our team will personally deliver, consult and guide you on your robot journey.",
      bgClass: "bg-[#FFE7DF]",
    },
    {
      id: "card2",
      title: "Mini Memo",
      body: "The first 50 members each receive a 3D printed Mini Memo.",
      bgClass: "bg-[#EBDCCD]",
    },
    {
      id: "card3",
      title: "Early access",
      body: "Influence what services Memo learns and how he performs them by being the first to access his skills",
      bgClass: "bg-[#FAF7EA]",
    },
    {
      id: "card4",
      title: "Choose services",
      body: "Help us choose which services and skills to create and when.",
      bgClass: "bg-[#D9EBEE]",
    },
  ];

  // SVG Frames for Card 4
  const renderCard4Frame = (frame: number) => {
    // Base styles
    const strokeProps = {
      stroke: "black",
      strokeWidth: "1.5",
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
      fill: "none",
    };

    return (
      <svg width="80" height="80" viewBox="0 0 24 24" {...strokeProps}>
        {/* Frame 0: Hanger Only */}
        <path d="M12 3a3 3 0 0 0-3 3v2" />
        <path d="M9 8h6l4 8H5l4-8z" />

        {/* Frame 1: Left Shoulder start */}
        {frame >= 1 && <path d="M5 8 L2 12" />}

        {/* Frame 2: Right Shoulder start */}
        {frame >= 2 && <path d="M19 8 L22 12" />}

        {/* Frame 3: Left side down */}
        {frame >= 3 && <path d="M2 12 L5 12 L5 20" />}

        {/* Frame 4: Right side down */}
        {frame >= 4 && <path d="M22 12 L19 12 L19 20" />}

        {/* Frame 5: Bottom connect */}
        {frame >= 5 && <path d="M5 20 L19 20" />}

        {/* Frame 6: Details (vertical line) */}
        {frame >= 6 && (
          <line x1="12" y1="8" x2="12" y2="20" strokeOpacity="0.2" />
        )}
      </svg>
    );
  };

  return (
    <section className="w-full bg-white pb-20 md:pb-[140px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-9 gap-y-10">
          {/* Card 1: White Glove Service */}
          <div
            className="flex flex-col items-start"
            onMouseEnter={handleC1Enter}
            onMouseLeave={handleC1Leave}
          >
            <div
              className={`
                w-full aspect-square rounded-[18px] 
                relative overflow-hidden
                flex items-center justify-center mb-6 
                cursor-pointer
                ${cards[0].bgClass}
              `}
            >
              {/* Icon 1: Box/Wallet (Default) */}
              <div
                className={`
                absolute inset-0 flex items-center justify-center
                transition-all duration-500 ease-in-out
                ${c1Active ? "opacity-0 scale-90" : "opacity-100 scale-100"}
              `}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                  <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
                </svg>
              </div>

              {/* Icon 2: Hand (Active) */}
              <div
                className={`
                absolute inset-0 flex items-center justify-center
                transition-all duration-500 ease-in-out
                ${c1Active ? "opacity-100 scale-100" : "opacity-0 scale-110"}
              `}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a1 1 0 0 1 1 1v1h1a1 1 0 0 1 1 1v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6a1 1 0 0 1 1-1h1V7a1 1 0 0 1 1-1h1V5.73A1.99 1.99 0 0 1 12 2z" />
                </svg>
              </div>
            </div>
            <h4 className="text-[15px] font-bold text-gray-900 mb-2">
              {cards[0].title}
            </h4>
            <p className="text-[13px] leading-[1.6] text-gray-500">
              {cards[0].body}
            </p>
          </div>

          {/* Card 2: Mini Memo (CSS Hover Animation) */}
          <div
            className="card2-hover flex flex-col items-start"
            onClick={(e) => handleMobileTap(e, "animate-card2")}
          >
            <div
              className={`
                w-full aspect-square rounded-[18px] 
                flex items-center justify-center mb-6 
                cursor-pointer
                ${cards[1].bgClass}
              `}
            >
              <div className="icon-inner">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                  <line x1="9" y1="10" x2="9.01" y2="10" strokeWidth="3" />
                  <line x1="15" y1="10" x2="15.01" y2="10" strokeWidth="3" />
                </svg>
              </div>
            </div>
            <h4 className="text-[15px] font-bold text-gray-900 mb-2">
              {cards[1].title}
            </h4>
            <p className="text-[13px] leading-[1.6] text-gray-500">
              {cards[1].body}
            </p>
          </div>

          {/* Card 3: Early Access (CSS Hover Animation) */}
          <div
            className="card3-hover flex flex-col items-start"
            onClick={(e) => handleMobileTap(e, "animate-card3")}
          >
            <div
              className={`
                w-full aspect-square rounded-[18px] 
                flex items-center justify-center mb-6 
                cursor-pointer
                ${cards[2].bgClass}
              `}
            >
              <div className="icon-inner">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    strokeOpacity="0.2"
                  />
                  <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path
                    d="M12 12m-8 -4a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"
                    transform="rotate(45 12 12)"
                  />
                  <path
                    d="M12 12m-4 4a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"
                    transform="rotate(-45 12 12)"
                  />
                </svg>
              </div>
            </div>
            <h4 className="text-[15px] font-bold text-gray-900 mb-2">
              {cards[2].title}
            </h4>
            <p className="text-[13px] leading-[1.6] text-gray-500">
              {cards[2].body}
            </p>
          </div>

          {/* Card 4: Sequence Animation */}
          <div
            className="flex flex-col items-start"
            onMouseEnter={handleC4Enter}
            onMouseLeave={handleC4Leave}
          >
            <div
              className={`
                  w-full aspect-square rounded-[18px] 
                  relative overflow-hidden
                  flex items-center justify-center mb-6 
                  cursor-pointer
                  ${cards[3].bgClass}
                `}
            >
              {/* Icon 1: Hanger (Default) corresponds to Frame 0 */}
              <div
                className={`
                absolute inset-0 flex items-center justify-center
                transition-all duration-500 ease-in-out
                ${c4Active ? "opacity-0 scale-90" : "opacity-100 scale-100"}
              `}
              >
                {renderCard4Frame(0)}
              </div>

              {/* Icon 2: Full Shirt (Active) corresponds to Frame 6 */}
              <div
                className={`
                absolute inset-0 flex items-center justify-center
                transition-all duration-500 ease-in-out
                ${c4Active ? "opacity-100 scale-100" : "opacity-0 scale-110"}
              `}
              >
                {renderCard4Frame(6)}
              </div>
            </div>
            <h4 className="text-[15px] font-bold text-gray-900 mb-2">
              {cards[3].title}
            </h4>
            <p className="text-[13px] leading-[1.6] text-gray-500">
              {cards[3].body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// -- Main App --
const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false,
  );

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const images = [
    { id: 1, src: "/image/beta_front.webp", label: "Front View" },
    { id: 2, src: "/image/beta_side.webp", label: "Side Profile" },
    { id: 3, src: "/image/beta_detail.jpg", label: "Detail Shot" },
    { id: 4, src: "/image/beta_interaction.jpg", label: "Interaction" },
    { id: 5, src: "/image/beta_lifestyle.webp", label: "Lifestyle" },
  ];

  // Handle Resize for Mobile/Desktop check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Interaction Handler
  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    // Only scroll into view on Desktop
    if (!isMobile) {
      const target = sectionRefs.current[index];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Intersection Observer (Desktop Only)
  useEffect(() => {
    if (isMobile) return; // Disable on mobile

    const options = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.01,
    };

    const callback: IntersectionObserverCallback = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = -1;
      let minDistance = Infinity;

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== -1) {
        setActiveIndex((prev) => (prev === closestIndex ? prev : closestIndex));
      }
    };

    const observer = new IntersectionObserver(callback, options);
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isMobile]); // Re-run effect if mobile state changes

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
      <Navbar activePage="beta" />
      <main className="mx-auto w-full pt-20">
        {/* SECTION 1 Wrapper */}
        <div className="max-w-[1400px] mx-auto">
          <div className="px-4 py-6 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start justify-center">
              {/* COLUMN 1: Image Area */}
              <div className="relative grid grid-cols-1 w-full">
                {/* --- MOBILE VIEW --- */}
                {isMobile ? (
                  <>
                    <div
                      className="
                      relative w-full aspect-[9/16]
                      bg-white rounded-[22px] 
                      shadow-sm border border-gray-100 
                      overflow-hidden flex items-center justify-center
                    "
                    >
                      <img
                        src={images[activeIndex].src}
                        alt={images[activeIndex].label}
                        className="w-full h-full object-cover z-10 transition-opacity duration-300"
                        key={`mobile-main-${activeIndex}`}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-0">
                        <span className="text-gray-400 font-semibold text-lg">
                          {images[activeIndex].label}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar px-1">
                      {images.map((img, index) => (
                        <button
                          key={`mob-thumb-${img.id}`}
                          onClick={() => handleThumbnailClick(index)}
                          className={`
                            relative flex-shrink-0 
                            w-[52px] h-[52px]
                            rounded-xl overflow-hidden 
                            transition-all duration-200
                            ${
                              activeIndex === index
                                ? "border-[3px] border-[#E53935]"
                                : "border border-gray-300/50"
                            }
                          `}
                        >
                          <img
                            src={img.src}
                            alt={img.label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  /* --- DESKTOP VIEW --- */
                  <>
                    <div className="sticky top-24 z-30 h-fit w-fit pl-6 pt-6 row-start-1 col-start-1 pointer-events-none">
                      <div
                        className="
                        w-fit flex flex-col gap-3 p-2.5 
                        bg-white/60 backdrop-blur-md 
                        rounded-2xl border border-white/50 shadow-sm
                        pointer-events-auto
                      "
                      >
                        {images.map((img, index) => (
                          <button
                            key={`dt-thumb-${img.id}`}
                            onClick={() => handleThumbnailClick(index)}
                            className={`
                              relative flex-shrink-0 
                              w-14 h-14
                              rounded-xl overflow-hidden 
                              transition-all duration-300
                              ${
                                activeIndex === index
                                  ? "border-[3px] border-[#E53935]"
                                  : "border border-gray-300/50 hover:border-gray-400"
                              }
                            `}
                          >
                            <img
                              src={img.src}
                              alt={img.label}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                const parent = e.currentTarget.parentElement;
                                if (parent)
                                  parent.style.backgroundColor = "#f0f0f0";
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-[28px] row-start-1 col-start-1">
                      {images.map((img, index) => (
                        <div
                          key={img.id}
                          ref={(el) => {
                            if (el) sectionRefs.current[index] = el;
                          }}
                          className="
                            relative w-full 
                            aspect-[9/16]
                            bg-white rounded-[22px] 
                            shadow-sm border border-gray-100 
                            overflow-hidden flex items-center justify-center
                          "
                        >
                          <img
                            src={img.src}
                            alt={img.label}
                            className="w-full h-full object-cover z-10"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-0">
                            <span className="text-gray-400 font-semibold text-lg">
                              {img.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* COLUMN 2: Text Block */}
              <div
                className="
                px-2 md:px-0 w-full
                md:sticky md:top-24 md:h-fit md:pt-10
              "
              >
                <span className="block text-xs font-bold text-gray-500 tracking-widest uppercase mb-4">
                  Vision & Values
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                  Designed for the modern home.
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Memo moves with grace and purpose. It is not just a utility,
                  but a presence that complements your daily rhythm.
                </p>
                <p className="text-base text-gray-500 leading-relaxed mb-8">
                  We stripped away the complexity of traditional robotics to
                  reveal a form that is as intuitive as it is beautiful. By
                  focusing on essential interactions, we created a companion
                  that feels less like a machine and more like a natural
                  extension of your living space.
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-3 items-center pt-6 border-t border-gray-200">
                  <TooltipItem
                    label="No cost to participate"
                    content="Our Pilot Program is fully funded. Selected households will receive the Memo unit and all maintenance at no cost during the beta period."
                    align="left"
                  />
                  <TooltipItem
                    label="Invite-only"
                    content="We are currently selecting a diverse range of homes for our closed beta. Applications are reviewed on a rolling basis."
                    align="center"
                  />
                  <TooltipItem
                    label="Launching late 2026"
                    content="The official consumer release is scheduled for Q4 2026. Participant feedback will directly shape the final production model."
                    align="right"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2 */}
          <FeaturesSection />

          {/* SECTION 3 */}
          <LifestyleSection />
        </div>

        {/* SECTION 4 (Full Width Background) */}
        <FoundingSection />

        {/* SECTION 5 (Full Width Background) */}
        <PerksSection />
      </main>
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
