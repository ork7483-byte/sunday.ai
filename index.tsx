import React, { useState, useEffect, useRef } from "react";
      import ReactDOM from "react-dom/client";
      import {
        motion,
        AnimatePresence,
        useScroll,
        useTransform,
        useInView,
        useMotionValue,
        useSpring,
      } from "framer-motion";
      import {
        Menu,
        X,
        ArrowRight,
        Play,
        ChevronDown,
        Download,
        Cpu,
        Battery,
        Eye,
        Shield,
        Mail,
        FileText,
        Globe,
        Layers,
        Sparkles,
      } from "lucide-react";

      const Button = ({
        children,
        variant = "primary",
        className = "",
        ...props
      }) => {
        const baseStyle =
          "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2";
        const variants = {
          primary:
            "bg-memo-dark text-white hover:bg-black hover:scale-105 shadow-lg",
          secondary:
            "bg-white text-memo-dark border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md",
          accent:
            "bg-[#DFE878] text-memo-dark hover:bg-[#E6EF85] hover:scale-105 shadow-md",
        };
        return (
          <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
          >
            {children}
          </button>
        );
      };

      const Navbar = ({ activePage, onNavigate }) => {
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
          {
            id: "overview",
            label: "Overview",
            desc: "The future of home robotics.",
          },
          {
            id: "product",
            label: "Technology",
            desc: "Under the hood of Memo.",
          },
          {
            id: "business",
            label: "Company",
            desc: "Our mission and partners.",
          },
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
            if (storyVideoRef.current) storyVideoRef.current.play();
          } else {
            document.body.style.overflow = "unset";
            if (storyVideoRef.current) {
              storyVideoRef.current.pause();
              storyVideoRef.current.currentTime = 0;
            }
          }
          return () => { document.body.style.overflow = "unset"; };
        }, [isStoryOpen]);

        return (
          <>
            {/* Story Modal */}
            <AnimatePresence>
              {isStoryOpen && (
                <motion.div
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
                  <motion.div
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
                  </motion.div>

                  {/* Dismiss Backdrop */}
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
                className={`bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden relative z-50 ${isOpen ? "rounded-[2rem] w-full max-w-4xl" : "rounded-full w-auto"}`}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 25,
                  mass: 0.8,
                }}
              >
                <motion.div
                  layout
                  className={`flex items-center justify-between transition-all duration-300 ${isOpen ? "p-6" : "pl-5 pr-6 py-3 gap-12"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 bg-memo-dark rounded-lg flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate("home");
                        setIsOpen(false);
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
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
                        onNavigate("home");
                        setIsOpen(false);
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
                          <X size={20} className="text-memo-dark" />
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
                          <span className="w-5 h-0.5 bg-memo-dark rounded-full"></span>
                          <span className="w-3 h-0.5 bg-memo-dark rounded-full"></span>
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
                              onClick={() => {
                                console.log("Navbar click:", item.id);
                                if (item.id === "careers") {
                                  console.log("Navigating to careers");
                                  window.location.href = "/careers/index.html";
                                } else if (item.id === "journal") {
                                  console.log("Navigating to journal");
                                  window.location.href = "/journal/index.html";
                                } else if (item.id === "beta") {
                                  console.log("Navigating to beta");
                                  window.location.href = "/beta/index.html";
                                } else if (item.id === "overview") {
                                  console.log("Navigating to overview");
                                  window.location.href = "/overview/index.html";
                                } else if (item.id === "support") {
                                  console.log("Navigating to support");
                                  window.location.href = "/index.html";
                                } else {
                                  console.log("Navigating internal:", item.id);
                                  onNavigate(item.id);
                                  setIsOpen(false);
                                }
                              }}
                              className="text-left group relative py-1 pl-4 border-l-2 border-transparent hover:border-memo-accent transition-all"
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
                            </motion.button>
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.nav>
            </div>
          </>
        );
      };

      const Footer = ({ onNavigate, onDownloadSource }) => {
        return (
          <footer className="bg-[#FDFBF7] text-gray-900 pt-32 pb-16 px-6 border-t border-gray-100">
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
                    <span className="font-bold text-black uppercase tracking-widest text-[11px]">Explore</span>
                    <button onClick={() => onNavigate("home")} className="text-left text-gray-500 hover:text-black transition-colors">
                      Overview
                    </button>
                    <button onClick={() => onNavigate("product")} className="text-left text-gray-500 hover:text-black transition-colors">
                      Technology
                    </button>
                    <button onClick={() => { window.location.href = "/journal/index.html" }} className="text-left text-gray-500 hover:text-black transition-colors">
                      Journal
                    </button>
                  </div>
                  {/* About Column */}
                  <div className="flex flex-col gap-5">
                    <span className="font-bold text-black uppercase tracking-widest text-[11px]">About</span>
                    <button onClick={() => onNavigate("business")} className="text-left text-gray-500 hover:text-black transition-colors">
                      Company
                    </button>
                    <button onClick={() => { window.location.href = "/careers/index.html" }} className="text-left text-gray-500 hover:text-black transition-colors">
                      Careers
                    </button>
                    <button onClick={() => { window.location.href = "/beta/index.html" }} className="text-left text-gray-500 hover:text-black transition-colors">
                      Beta Program
                    </button>
                    <button onClick={() => { window.location.href = '/index.html'; }} className="text-left text-gray-500 hover:text-black transition-colors">
                      Support
                    </button>
                  </div>
                  {/* Social Column */}
                  <div className="flex flex-col gap-5">
                    <span className="font-bold text-black uppercase tracking-widest text-[11px]">Social</span>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">
                      Instagram
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">
                      X (Twitter)
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                <p>© 2025 Sunday Inc. All rights reserved.</p>
                <button
                  onClick={onDownloadSource}
                  className="flex items-center gap-1 hover:text-white text-memo-accent transition-colors"
                >
                  <Download size={12} /> <span>Download Source</span>
                </button>
              </div>
            </div>
          </footer>
        );
      };

      const PageHeader = ({ title, subtitle }) => (
        <div className="pt-40 pb-20 px-6 bg-[#F2F0EA]">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-medium mb-6 text-memo-dark"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      );

      const StorySection = () => {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1 flex flex-col justify-center space-y-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-5xl font-display leading-tight text-memo-dark"
                >
                  Built for busy households, Memo works 24/7 to make your life
                  lighter. Hand off your repetitive to-do’s, so you can focus on
                  what really matters.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-600 leading-relaxed font-light"
                >
                  Robots should give you back what matters most — time. Watch
                  how our team came together to work on this mission.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 w-full h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden relative shadow-lg group cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <video
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="your-video-file-here.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                ></video>
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110"
                  >
                    <Play className="fill-current" size={20} />
                    <span className="font-semibold text-lg">Our story</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Video Fullscreen Modal */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
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
                        setIsOpen(false);
                      }}
                      className="p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors group"
                    >
                      <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Video Container */}
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 30 }}
                    className="w-[90vw] max-w-5xl aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl bg-black relative mt-16"
                  >
                    <video
                      className="w-full h-full"
                      src="your-video-file-here.mp4"
                      autoPlay
                      controls
                      playsInline
                    ></video>
                  </motion.div>

                  {/* Dismiss Backdrop */}
                  <div
                    className="absolute inset-0 -z-10"
                    onClick={() => setIsOpen(false)}
                  ></div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        );
      };

      const ScrollTextSection = () => {
        const containerRef = useRef(null);
        const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

        useEffect(() => {
          const handleResize = () => setIsMobile(window.innerWidth < 768);
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
        }, []);

        const { scrollYProgress } = useScroll({
          target: containerRef,
          offset: ["start end", "end start"],
        });

        // Desktop: horizontal stagger
        const x1 = useTransform(
          scrollYProgress,
          [0.15, 0.45],
          isMobile ? [0, 0] : [-120, 0],
        );
        const x2 = useTransform(
          scrollYProgress,
          [0.15, 0.45],
          isMobile ? [0, 0] : [40, 0],
        );
        const x3 = useTransform(
          scrollYProgress,
          [0.15, 0.45],
          isMobile ? [0, 0] : [180, 0],
        );

        // Mobile: words start far apart vertically, then converge
        // Desktop: slight vertical stagger
        const y1 = useTransform(
          scrollYProgress,
          [0.1, 0.45],
          isMobile ? [-100, 0] : [-40, 0],
        );
        const y2 = useTransform(
          scrollYProgress,
          [0.15, 0.45],
          isMobile ? [0, 0] : [60, 0],
        );
        const y3 = useTransform(
          scrollYProgress,
          [0.2, 0.45],
          isMobile ? [100, 0] : [120, 0],
        );

        // Individual word opacity for mobile (staggered reveal)
        const op1 = useTransform(scrollYProgress, [0.08, 0.15], [0, 1]);
        const op2 = useTransform(scrollYProgress, [0.14, 0.22], [0, 1]);
        const op3 = useTransform(scrollYProgress, [0.2, 0.28], [0, 1]);

        // Description text fade-in after alignment
        const descOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
        const descY = useTransform(scrollYProgress, [0.5, 0.65], [40, 0]);

        const wordStyle = {
          fontWeight: 700,
          color: "#111",
          fontFamily: "'Inter', 'Outfit', sans-serif",
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          display: "block",
          textAlign: "center",
        };

        return (
          <section
            ref={containerRef}
            style={{
              height: "300vh",
              position: "relative",
              background: "#f9f8f4",
            }}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: "0 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  gap: isMobile ? "8px" : "24px",
                  flexWrap: "nowrap",
                }}
              >
                <motion.span
                  style={{
                    ...wordStyle,
                    x: x1,
                    y: y1,
                    opacity: isMobile ? op1 : 1,
                    fontSize: isMobile
                      ? "clamp(40px, 12vw, 64px)"
                      : "clamp(48px, 8vw, 96px)",
                  }}
                >
                  small
                </motion.span>
                <motion.span
                  style={{
                    ...wordStyle,
                    x: x2,
                    y: y2,
                    opacity: isMobile ? op2 : 1,
                    fontSize: isMobile
                      ? "clamp(40px, 12vw, 64px)"
                      : "clamp(48px, 8vw, 96px)",
                  }}
                >
                  made
                </motion.span>
                <motion.span
                  style={{
                    ...wordStyle,
                    x: x3,
                    y: y3,
                    opacity: isMobile ? op3 : 1,
                    fontSize: isMobile
                      ? "clamp(40px, 12vw, 64px)"
                      : "clamp(48px, 8vw, 96px)",
                  }}
                >
                  magic
                </motion.span>
              </div>
              <motion.p
                style={{
                  opacity: descOpacity,
                  y: descY,
                  maxWidth: "600px",
                  textAlign: "center",
                  fontSize: isMobile ? "15px" : "18px",
                  lineHeight: 1.7,
                  color: "rgba(0,0,0,0.6)",
                  marginTop: isMobile ? "32px" : "48px",
                  padding: "0 24px",
                }}
              >
                Powered by state-of-the-art AI models and an ever-expanding{" "}
                <span className="relative inline group cursor-pointer z-10">
                  <span className="underline decoration-dotted decoration-gray-400 underline-offset-4">
                    Skill Library
                  </span>
                  <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[320px] p-4 bg-[#111] text-white text-sm font-sans text-left rounded-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none shadow-xl">
                    <strong className="block mb-1.5 text-base font-semibold tracking-wide text-white">
                      Skill Library
                    </strong>
                    <span className="text-gray-200 leading-relaxed font-normal block">
                      Our ever-growing dataset of in-the-wild data, generated by
                      Memory Developers using our Skill Capture Gloves. As of
                      November 2025, it's approximately 10 million examples.
                    </span>
                  </span>
                </span>
                , Memo doesn't just know how to do a few tasks—Memo improves its
                skills faster than any robot that has come before it.
              </motion.p>
            </div>
          </section>
        );
      };

      const ShowcaseSection = ({ 
        title = "Memo is always learning",
        card1Title = "New skills every month",
        card1Desc = "In December 2024, Memo had only one arm and learned its first task: arranging shoes. Today, Memo is trained on multiple skills in parallel. In October 2025, Memo learned to fold piles of socks, handle glassware, and pull a shot of espresso."
      }) => {
        return (
          <section className="s4-showcase">
            <div className="s4-inner">
              <div className="s4-hero">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000"
                  alt="Hero"
                  className="s4-hero-media"
                />
                <h2 className="s4-hero-title">{title}</h2>
              </div>
              <div className="s4-grid">
                <div className="s4-card s4-card-text">
                  <h3 className="s4-card-heading">{card1Title}</h3>
                  <p className="s4-card-desc">{card1Desc}</p>
                </div>
                <div
                  className="s4-card s4-card-video"
                  onMouseEnter={(e) =>
                    e.currentTarget.querySelector("video")?.play()
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.querySelector("video")?.pause()
                  }
                >
                  <video
                    className="s4-video"
                    src="video1.mp4"
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800"
                  ></video>
                  <div className="s4-video-overlay"></div>
                  <div className="s4-badges">
                    <span className="s4-badge">Autonomous</span>
                    <span className="s4-badge s4-badge-accent">1x</span>
                  </div>
                  <div className="s4-caption">
                    <span className="s4-play-icon">▶</span>
                    <span>Memo making an espresso</span>
                  </div>
                </div>
                <div
                  className="s4-card s4-card-video"
                  onMouseEnter={(e) =>
                    e.currentTarget.querySelector("video")?.play()
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.querySelector("video")?.pause()
                  }
                >
                  <video
                    className="s4-video"
                    src="video2.mp4"
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1517677208171-0bc5e5294e27?auto=format&fit=crop&q=80&w=800"
                  ></video>
                  <div className="s4-video-overlay"></div>
                  <div className="s4-badges">
                    <span className="s4-badge">Autonomous</span>
                    <span className="s4-badge s4-badge-accent">5x</span>
                  </div>
                  <div className="s4-caption">
                    <span className="s4-play-icon">▶</span>
                    <span>Memo folding six pairs of socks in a row</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      };

      const KitchenShowcaseSection = () => {
        return (
          <section className="s4-showcase">
            <div className="s4-inner">
              <div className="s4-hero">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000"
                  alt="Kitchen"
                  className="s4-hero-media"
                />
                <h2 className="s4-hero-title">Memo works in the kitchen</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] mt-[12px]">
                <div className="s4-card s4-card-text !h-full" style={{ padding: '32px 28px', background: '#F5F0EB' }}>
                  <h3 className="s4-card-heading text-[#1a1a1a] mb-5">Lightening the load</h3>
                  <p className="s4-card-desc text-[#1a1a1a]">
                    Memo can quietly and autonomously clear tables of plates and delicate glasses, throw out food scraps, and load up your dishwasher before running it. Let Memo take care of the table, so you can go take care of the things only you can do.
                  </p>
                </div>
                <div
                  className="s4-card s4-card-video !h-full"
                  onMouseEnter={(e) => e.currentTarget.querySelector("video")?.play()}
                  onMouseLeave={(e) => e.currentTarget.querySelector("video")?.pause()}
                >
                  <video
                    className="s4-video"
                    src="video2.mp4"
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1517677208171-0bc5e5294e27?auto=format&fit=crop&q=80&w=800"
                  ></video>
                  <div className="s4-video-overlay"></div>
                  <div className="s4-badges">
                    <span className="s4-badge">Autonomous</span>
                    <span className="s4-badge s4-badge-accent">5x</span>
                  </div>
                  <div className="s4-caption">
                    <span className="s4-play-icon">▶</span>
                    <span>Uncut video of Memo cleaning up</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      };

      const ProductExperience = () => {
        const [activeTab, setActiveTab] = useState("Features");
        const containerRef = useRef(null);
        const stickyRef = useRef(null);
        const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

        useEffect(() => {
          const handleResize = () => setIsMobile(window.innerWidth < 768);
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
        }, []);

        // 360° 뷰어 상태
        const TOTAL_FRAMES = 120;
        const [frameIdx, setFrameIdx] = useState(0);
        const [isDragging360, setIsDragging360] = useState(false);
        const dragStartX = useRef(0);
        const dragStartFrame = useRef(0);

        // 360° 이미지 프리로드
        useEffect(() => {
          for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `/360/ezgif-frame-${String(i).padStart(3, '0')}.png`;
          }
        }, []);

        const getFrameSrc = (idx) =>
          `/360/ezgif-frame-${String(((idx % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES + 1).padStart(3, '0')}.png`;

        const handlePointerDown360 = (e) => {
          setIsDragging360(true);
          dragStartX.current = e.clientX;
          dragStartFrame.current = frameIdx;
          e.currentTarget.setPointerCapture(e.pointerId);
        };

        const handlePointerMove360 = (e) => {
          if (stickyRef.current) {
            const rect = stickyRef.current.getBoundingClientRect();
            const mx = (e.clientX - rect.left) / rect.width - 0.5;
            const my = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(mx);
            mouseY.set(my);
          }
          if (!isDragging360) return;
          const dx = e.clientX - dragStartX.current;
          const sensitivity = 3;
          const frameDelta = Math.round(dx / sensitivity);
          setFrameIdx(dragStartFrame.current + frameDelta);
        };

        const handlePointerUp360 = () => {
          setIsDragging360(false);
        };

        useEffect(() => {
          console.log("ProductExperience mounted with activeTab:", activeTab);
        }, []);

        const { scrollYProgress } = useScroll({
          target: containerRef,
          offset: ["start end", "end end"],
        });

        // Mouse tracking for parallax
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);
        const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
        const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

        const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
        const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
        const pillX = useTransform(smoothX, [-0.5, 0.5], [-150, 150]);
        const pillY = useTransform(smoothY, [-0.5, 0.5], [-100, 100]);

        const handleMouseMove = (e) => {
          if (!stickyRef.current) return;
          const rect = stickyRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          mouseX.set(x);
          mouseY.set(y);
        };

        // offset "start end" 기준: 25% = 섹션 상단이 뷰포트 상단에 도달 (sticky 시작)
        // 가로 스크롤: 알약이 자리잡은 35% 이후부터 시작
        const x = useTransform(scrollYProgress, [0.35, 0.90], ["0%", "-80%"]);
        // 알약: 20~25% 구간에서 페이드 인 (섹션이 뷰포트에 진입할 때)
        const menuOpacity = useTransform(
          scrollYProgress,
          [0.20, 0.25, 0.95, 1],
          [0, 1, 1, 0],
        );
        // 알약 위치: 타이틀 근처(top 15%)에서 시작 → 25~35% 구간에서 하단(top 85%)으로 선형 이동
        const pillTopPercent = useTransform(
          scrollYProgress,
          [0.20, 0.35, 1],
          [15, 89, 89],
        );
        const pillTop = useTransform(pillTopPercent, v => `${v}%`);

        const items = [
          {
            title: "Privacy First",
            desc: "All data is processed locally. Your home stays private.",
            img: "image/grid_01.png",
            dark: true,
            type: "image",
          },
          {
            title: "Seamless Integration",
            desc: "Memo works with your existing smart home ecosystem.",
            dark: false,
            type: "text",
          },
          {
            title: "Child & Pet Safe",
            desc: "Advanced obstacle avoidance guarantees safety for loved ones.",
            img: "image/grid_03.png",
            dark: false,
            type: "image",
          },
          {
            title: "Interior Friendly",
            desc: "Designed to blend in with modern home aesthetics.",
            img: "image/grid_04.png",
            dark: true,
            type: "image",
          },
          {
            title: "Always Learning",
            desc: "Continuous updates bring new skills and improvements.",
            dark: false,
            type: "text",
          },
          {
            title: "Sustainable Design",
            desc: "Built with eco-friendly materials and energy efficiency in mind.",
            img: "image/grid_06.png",
            dark: true,
            type: "image",
          },
        ];

        return (
          <section
            ref={containerRef}
            className={`relative ${isMobile ? "h-[100vh]" : "h-[400vh]"}`}
            style={{ backgroundColor: "#F2F1E8" }}
          >
            <div
              ref={stickyRef}
              onMouseMove={handleMouseMove}
              className="sticky top-0 h-screen overflow-hidden flex flex-col items-center relative"
            >
              <div className="flex-[1.5] w-full" />
              <div className="flex-none w-full px-6 z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-display mb-0 leading-tight">
                  Designed for real life
                </h2>
              </div>
              <div className="flex-1 w-full" />

              <div
                className="flex-none w-full flex items-center justify-center min-h-0 h-[65vh]"
              >
                <AnimatePresence mode="wait">
                  {activeTab === "Features" && (
                     <motion.div
                       key="features"
                       className={`flex gap-8 items-center w-full h-[65vh] ${
                         isMobile
                           ? "overflow-x-auto snap-x snap-mandatory px-6 pb-4"
                           : "pl-[10vw]"
                       }`}
                       style={{ x: isMobile ? 0 : x }}
                     >
                       {items.map((item, idx) => (
                         <div
                           key={idx}
                           className={`relative shrink-0 rounded-3xl overflow-hidden h-full aspect-[3/4] group shadow-lg ${
                             isMobile ? "snap-center w-[80vw] h-auto max-h-full" : ""
                           } ${
                             item.type === "text"
                               ? "bg-gray-100 flex flex-col justify-center items-center text-center p-8"
                               : "bg-gray-200"
                           }`}
                         >
                           {item.type === "image" ? (
                             <img
                               src={item.img}
                               alt={item.title}
                               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                             />
                           ) : (
                             <>
                               <h3 className="text-3xl font-bold mb-4 text-memo-dark">
                                 {item.title}
                               </h3>
                               <p className="text-gray-600 max-w-xs">
                                 {item.desc}
                               </p>
                             </>
                           )}
                         </div>
                       ))}
                     </motion.div>
                  )}

                  {activeTab === "360°" && (
                    <motion.div
                      key="360"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex items-center justify-center relative select-none"
                      style={{
                        cursor: isDragging360 ? "grabbing" : "grab",
                        touchAction: "pan-y",
                      }}
                      onPointerDown={handlePointerDown360}
                      onPointerMove={handlePointerMove360}
                      onPointerUp={handlePointerUp360}
                      onPointerLeave={handlePointerUp360}
                      onPointerCancel={handlePointerUp360}
                    >
                      {!isDragging360 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                          <motion.div
                            className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-2xl"
                            style={{ x: pillX, y: pillY }}
                          >
                            Drag to rotate
                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                              <span className="text-[10px]">🔄</span>
                            </div>
                          </motion.div>
                        </div>
                      )}
                      <img
                        src={getFrameSrc(frameIdx)}
                        alt="Robot 360"
                        className={`${
                          isMobile
                            ? "w-[80vw] h-auto max-h-full aspect-[3/4]"
                            : "h-full w-auto"
                        } object-contain pointer-events-none transition-transform`}
                        style={{ 
                          mixBlendMode: 'multiply',
                          transform: isMobile ? 'scale(3.0)' : 'none'
                        }}
                        draggable={false}
                      />
                    </motion.div>
                  )}

                  {activeTab === "Anatomy" && (
                    <motion.div
                      key="anatomy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex items-center justify-center relative"
                    >
                      <motion.div
                        className="w-full h-full flex items-center justify-center"
                        style={{ rotateX, rotateY, perspective: 1000 }}
                      >
                        <img
                          src="image/anatomy.png"
                          alt="Anatomy"
                          className={`${
                            isMobile
                              ? "w-[80vw] h-auto max-h-full aspect-[3/4]"
                              : "h-full w-auto"
                          } object-contain transition-transform`}
                          style={{
                            mixBlendMode: 'multiply',
                            transform: isMobile ? 'scale(3.0)' : 'none'
                          }}
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop";
                            e.target.style.opacity = 0.3;
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex-[2.5] w-full" />

              {/* 알약 메뉴 - absolute 포지션, 스크롤에 따라 위치 이동 */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
                style={{
                  top: isMobile ? "89%" : (activeTab === "Features" ? pillTop : "89%"),
                  opacity: isMobile ? 1 : (activeTab === "Features" ? menuOpacity : 1),
                }}
              >
                <div className="bg-gray-200/80 backdrop-blur-md rounded-full p-1.5 flex gap-1 shadow-lg">
                  {["Features", "360°", "Anatomy"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-colors z-10 ${activeTab === tab ? "text-gray-800" : "text-gray-500 hover:text-gray-800"}`}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="pill"
                          className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      {tab}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        );
      };

      const ImitationSection = () => {
        const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
        useEffect(() => {
          const handleResize = () => setIsMobile(window.innerWidth < 768);
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
        }, []);
        
        const containerRef = useRef(null);
        const { scrollYProgress } = useScroll({
          target: containerRef,
          offset: ["start end", "end end"],
        });

        // Text: visual "reveal" from behind previous section
        // Moves linearly until 0.85 scroll progress, then STOPS (locks in place)
        // -70vh (hidden above) -> 0vh (center) on desktop, 15vh (lower) on mobile
        const textY = useTransform(
          scrollYProgress,
          [0, 0.85],
          ["-70vh", isMobile ? "15vh" : "0vh"]
        );

        // Robot: starts BELOW viewport (y: 100%), slides UP into position
        // Starts at 0.2 and finishes EXACTLY at 0.85 with the text
        // Synchronized finish creates a "locking" effect at the end
        const robotY = useTransform(
          scrollYProgress,
          [0.2, 0.85],
          ["100%", "0%"],
        );

        return (
          <section
            ref={containerRef}
            style={{
              height: "200vh",
              position: "relative",
              background:
                "linear-gradient(180deg, #f9f8f4 0%, #C5CEC5 8%, #C5CEC5 100%)",
            }}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {/* Text — visible immediately, slides down uniformly */}
              <motion.h2
                style={{
                  y: textY,
                  position: "absolute",
                  fontSize: "clamp(32px, 6vw, 72px)",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'Inter', 'Outfit', sans-serif",
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                  zIndex: 1,
                  padding: "0 24px",
                }}
              >
                From imitation to intuition
              </motion.h2>

              {/* Robot hand — slides up from below viewport (no fade) */}
              <motion.div
                style={{
                  y: robotY,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <img
                  src="/image/robot-glove.webp"
                  alt="Robot glove"
                  style={{
                    width: isMobile ? "280px" : "clamp(200px, 32vw, 420px)",
                    height: "auto",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                  }}
                />
              </motion.div>
            </div>
          </section>
        );
      };

      const GloveVideoSection = ({ onNavigate }) => {
        return (
          <section className="py-24 px-6 bg-memo-bg text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              {/* Top Text */}
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-memo-dark mb-12 leading-tight max-w-2xl">
                Our{" "}
                <span className="relative inline group cursor-pointer z-10">
                  <span className="underline decoration-dotted decoration-gray-400 underline-offset-4">
                    Skill Capture Glove™
                  </span>
                  <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[320px] p-4 bg-[#111] text-white text-sm font-sans text-left rounded-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none shadow-xl">
                    <strong className="block mb-1.5 text-base font-semibold tracking-wide text-white">
                      Skill Capture Glove
                    </strong>
                    <span className="text-gray-200 leading-relaxed font-normal block">
                      Our patented Skill Capture Glove is a one-to-one
                      representation of Memo's hand and enables anyone to teach
                      Memo nearly any skill. What you can do wearing the Skill
                      Capture Glove, Memo can learn.
                    </span>
                  </span>
                </span>{" "}
                enables Memo to distill millions of human movements into its
                onboard AI, unlocking helpful home skills. What the glove does,
                Memo learns.
              </h2>

              {/* Video Container */}
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12 bg-gray-100 group">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="image/glove_video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute bottom-6 left-6 text-white font-medium text-sm flex items-center gap-2 drop-shadow-md">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  Skill Capture Glove in use
                </div>
              </div>

              {/* Bottom Text */}
              <p className="text-lg text-gray-600 mb-10 max-w-2xl leading-relaxed">
                To date we’ve shipped over 2,000 gloves to our{" "}
                <span className="relative inline group cursor-pointer z-10">
                  <span className="underline decoration-dotted decoration-gray-400 underline-offset-4">
                    Memory Developers
                  </span>
                  <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[320px] p-4 bg-[#111] text-white text-sm font-sans text-left rounded-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none shadow-xl">
                    <strong className="block mb-1.5 text-base font-semibold tracking-wide text-white">
                      Memory Developer
                    </strong>
                    <span className="text-gray-200 leading-relaxed font-normal block">
                      Memory Developers (MDs) are data collectors who use our
                      Skill Capture Gloves to train our models on a wide
                      diversity of tasks. Our MDs represent households across
                      the US and collect from their lived-in homes, rather than
                      warehouses.
                    </span>
                  </span>
                </span>
                . They collect ‘memories’ in their homes to make Memo useful in
                yours.
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => onNavigate("product")}
                  className="px-8 py-3 rounded-full border border-gray-200 font-medium transition-all duration-300 hover:bg-black hover:text-white hover:border-black"
                >
                  Explore Technology
                </button>
                <button
                  onClick={() => (window.location.href = "/beta/index.html")}
                  className="px-8 py-3 rounded-full border border-gray-200 font-medium transition-all duration-300 hover:bg-black hover:text-white hover:border-black"
                >
                  Become a MemDev
                </button>
              </div>
            </div>
          </section>
        );
      };

      const FAQSection = () => {
        const faqs = [
          {
            q: "What tasks can Memo perform?",
            a: "Memo handles tidying, laundry transport, basic cleaning, and home monitoring. It learns new skills via OTA updates.",
          },
          {
            q: "When will it be available?",
            a: "Pre-orders are open now for the Founding Family edition, shipping late 2026.",
          },
          {
            q: "Does it record video?",
            a: "Memo uses cameras for navigation, but no video is stored or transmitted to the cloud without your explicit consent.",
          },
        ];
        return (
          <section className="py-24 px-6 bg-memo-bg">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-sm font-semibold uppercase text-gray-400 mb-12 tracking-widest">
                Common Questions
              </h3>
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-200 py-6 group">
                  <details className="group cursor-pointer">
                    <summary className="flex justify-between items-center font-medium text-lg list-none">
                      {faq.q}
                      <ChevronDown className="transition-transform group-open:rotate-180 text-gray-400" />
                    </summary>
                    <p className="pt-4 text-gray-500 leading-relaxed animate-fade-in">
                      {faq.a}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </section>
        );
      };

      const ScrollChartSection = () => {
        useEffect(() => {
          var wrapper = document.querySelector(".s6-scroll-wrapper");
          var barsContainer = document.getElementById("s6Bars");
          var indicator = document.getElementById("s6Indicator");
          if (!wrapper || !barsContainer || !indicator) return;
          barsContainer.innerHTML = "";
          var totalBars = 267;
          var peak = totalBars * 0.7;
          for (var i = 0; i < totalBars; i++) {
            var bar = document.createElement("div");
            bar.className = "s6-bar";
            var dist = Math.abs(i - peak) / peak;
            var height = Math.max(3, Math.round((1 - dist * dist) * 92));
            height += Math.round((Math.random() - 0.5) * 6);
            height = Math.min(95, Math.max(3, height));
            bar.style.setProperty("--h", height + "%");
            barsContainer.appendChild(bar);
          }
          var bars = barsContainer.querySelectorAll(".s6-bar");
          function onScroll() {
            var rect = wrapper.getBoundingClientRect();
            var wrapperH = wrapper.offsetHeight;
            var vh = window.innerHeight;
            var scrolled = -rect.top / (wrapperH - vh);
            var progress = Math.min(Math.max(scrolled, 0), 1);
            var barsWidth = barsContainer.scrollWidth;
            var viewWidth = wrapper.offsetWidth;
            var maxTx = barsWidth - viewWidth;
            var tx = -(progress * maxTx);
            barsContainer.style.transform = "translateX(" + tx + "px)";
            var chartArea = document.querySelector(".s6-chart-area");
            if (!chartArea) return;
            var chartRect = chartArea.getBoundingClientRect();
            var centerX = chartRect.left + chartRect.width / 2;
            var closestBar = null;
            var closestDist = Infinity;
            for (var i = 0; i < bars.length; i++) {
              var barRect = bars[i].getBoundingClientRect();
              var barCenterX = barRect.left + barRect.width / 2;
              var d = Math.abs(barCenterX - centerX);
              if (d < closestDist) {
                closestDist = d;
                closestBar = bars[i];
              }
            }
            if (closestBar) {
              var barRect = closestBar.getBoundingClientRect();
              var topPos = barRect.top - chartRect.top;
              indicator.style.top = topPos + "px";
            }
          }
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          onScroll();
          return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
          };
        }, []);
        return (
          <section className="s6-scroll-wrapper">
            <div className="s6-sticky">
              <div className="s6-content">
                <div className="s6-header">
                  <div className="s6-header-left">
                    <h2 className="s6-title">
                      The world's richest movement library
                    </h2>
                    <p className="s6-subtitle">Data capture</p>
                    <span className="s6-badge">Total Episodes: 10M</span>
                  </div>
                  <div className="s6-header-right">
                    <p className="s6-desc">
                      We capture hundreds of hours of human movement from real
                      homes every single day, building the world's most diverse
                      library of motion data.
                    </p>
                  </div>
                </div>
                <div className="s6-chart-area">
                  <div className="s6-indicator" id="s6Indicator">
                    <span className="s6-ind-dot"></span>
                    <span className="s6-ind-label">22,483 Eps</span>
                  </div>
                  <div className="s6-bars" id="s6Bars"></div>
                </div>
              </div>
            </div>
          </section>
        );
      };

      const TextDetailsSection = () => {
        return (
          <section className="s7-text-section">
            <div className="s7-inner">
              <p className="s7-paragraph">
                To date, we've shipped over 2,000 Memory Gloves to contributors
                across the country. These Memory Developers transform their
                everyday movements into training data, allowing Memo to learn
                faster than any other robot.
              </p>
              <p className="s7-paragraph">
                This massive, diverse dataset is the foundation of Memo's
                intelligence. Higher quality data directly translates to faster
                skill acquisition and more natural movements. Unlike traditional
                programmed robots, Memo learns from actual human
                experience—understanding not just what to do, but how real
                people do it.
              </p>
            </div>
          </section>
        );
      };

      const InfrastructureCycleSection = () => {
        useEffect(() => {
          var items = document.querySelectorAll(".s8-acc-item");
          var dots = document.querySelectorAll(".s8-pdot");
          var cycleLabel = document.getElementById("s8CycleLabel");
          var circleOuter = document.getElementById("s8Circle");
          var clLabels = document.querySelectorAll(".s8-cl");
          if (!items.length || !circleOuter) return;
          circleOuter.innerHTML = "";
          // Add center line
          var centerLine = document.createElement("div");
          centerLine.className = "s8-center-line";
          circleOuter.appendChild(centerLine);

          var names = ["Recruit", "Design", "Review", "Train", "Evaluate"];
          var currentStep = 0;
          var autoTimer = null;
          var totalDashes = 160;

          // Outer ring
          for (var i = 0; i < totalDashes; i++) {
            var dash = document.createElement("div");
            dash.className = "s8-dash";
            var angle = (i / totalDashes) * 360;
            dash.style.transform = "rotate(" + angle + "deg)";
            circleOuter.appendChild(dash);
          }

          // Inner ring
          for (var j = 0; j < totalDashes; j++) {
            var dashIn = document.createElement("div");
            dashIn.className = "s8-dash-inner";
            var angleIn = (j / totalDashes) * 360;
            dashIn.style.transform = "rotate(" + angleIn + "deg)";
            circleOuter.appendChild(dashIn);
          }

          var dashes = circleOuter.querySelectorAll(".s8-dash");
          var dashesIn = circleOuter.querySelectorAll(".s8-dash-inner");

          var descriptions = [
            "We start by carefully recruiting an ever-growing community of data contributors we call Memory Developers (MDs). This community represents a wide diversity of US households who are curious and eager to shape the future of helpful robotics.",
            "We guide our Memory Developers (MDs) to take on almost any household chore - all while wearing our Skill Capture Gloves for sensory rich data.",
            "All data undergoes a rigorous, task-specific rating and multiple rounds of QA — ensuring our models learn only from the highest-quality data.",
            "We perpetually fine-tune our models, experimenting with data recipes, weighting, and augmentation to achieve our ideal model performance.",
            "We eval our models daily with Memo. These evals, in combination with data from our Memory Developers enable Memo to work in new homes it's never seen before.",
          ];

          var mobileTitle = document.getElementById("s8MobileTitle");
          var mobileBody = document.getElementById("s8MobileBody");

          function setStep(index) {
            currentStep = index;
            items.forEach(function (item, i) {
              if (i === index) {
                item.classList.add("s8-acc-active");
                var arrow = item.querySelector(".s8-acc-arrow");
                if (arrow) arrow.innerHTML = "&#x2303;";
              } else {
                item.classList.remove("s8-acc-active");
                var arrow = item.querySelector(".s8-acc-arrow");
                if (arrow) arrow.innerHTML = "&#x2304;";
              }
            });
            if (cycleLabel) cycleLabel.textContent = names[index];
            const centerLabel = document.querySelector(".s8-circle-center span");
            if (centerLabel) centerLabel.innerText = names[index];

            // Update mobile description card
            if (mobileTitle) mobileTitle.textContent = names[index];
            if (mobileBody) mobileBody.textContent = descriptions[index];

            var endDash;
            if (index === 0) endDash = 1; // Recruit: Just the first dash (직선)
            else if (index === 1) endDash = totalDashes * 0.25; // Design: 12-3
            else if (index === 2) endDash = totalDashes * 0.50; // Review: 12-6
            else if (index === 3) endDash = totalDashes * 0.75; // Train: 12-9
            else if (index === 4) endDash = totalDashes * 1.0;  // Evaluate: 12-12

            dashes.forEach(function (d, i) {
              if (i < endDash) {
                d.classList.add("s8-dash-active");
              } else {
                d.classList.remove("s8-dash-active");
              }
            });

            dashesIn.forEach(function (d, i) {
              if (i < endDash) {
                d.classList.add("s8-dash-inner-active");
              } else {
                d.classList.remove("s8-dash-inner-active");
              }
            });

            // Highlight center line for Recruit (Step 0) only
            if (index === 0) {
              centerLine.style.borderLeftColor = "rgba(255, 255, 255, 0.8)";
            } else {
              centerLine.style.borderLeftColor = "rgba(255, 255, 255, 0.2)";
            }

            clLabels.forEach(function (cl) {
              cl.classList.remove("s8-cl-active");
            });
            if (index >= 1 && clLabels[index - 1]) {
              clLabels[index - 1].classList.add("s8-cl-active");
            }
            dots.forEach(function (dot, i) {
              if (i === index) dot.classList.add("s8-pdot-active");
              else dot.classList.remove("s8-pdot-active");
            });
          }
          const clickHandlers = [];
          items.forEach(function (item, i) {
            const handler = function () {
              setStep(i);
              clearInterval(autoTimer);
              autoTimer = setInterval(nextStep, 4000);
            };
            item.addEventListener("click", handler);
            clickHandlers.push({ item, handler });
          });

          // Mobile prev/next buttons
          var prevBtn = document.getElementById("s8MobilePrev");
          var nextBtn = document.getElementById("s8MobileNext");
          function handlePrev() {
            setStep((currentStep - 1 + names.length) % names.length);
            clearInterval(autoTimer);
            autoTimer = setInterval(nextStep, 4000);
          }
          function handleNext() {
            setStep((currentStep + 1) % names.length);
            clearInterval(autoTimer);
            autoTimer = setInterval(nextStep, 4000);
          }
          if (prevBtn) prevBtn.addEventListener("click", handlePrev);
          if (nextBtn) nextBtn.addEventListener("click", handleNext);

          function nextStep() {
            setStep((currentStep + 1) % names.length);
          }
          autoTimer = setInterval(nextStep, 4000);
          setStep(0);
          return () => {
            clearInterval(autoTimer);
            clickHandlers.forEach(({ item, handler }) => {
              item.removeEventListener("click", handler);
            });
            if (prevBtn) prevBtn.removeEventListener("click", handlePrev);
            if (nextBtn) nextBtn.removeEventListener("click", handleNext);
          };
        }, []);
        return (
          <section className="s8-section">
            <div className="s8-inner">
              <div className="s8-header">
                <div className="s8-header-left">
                  <h2 className="s8-title">
                    The infrastructure behind the intelligence
                  </h2>
                  <p className="s8-subtitle">Transforming data into skills</p>
                </div>
                <div className="s8-header-right">
                  <p className="s8-header-desc">
                    Memo gets smarter every week. We've built the shortest
                    iteration cycle in robotics: from data capture to deployed
                    capability in less than a week.
                  </p>
                </div>
              </div>
              <div className="s8-main">
                <div className="s8-accordion">
                  {[0, 1, 2, 3, 4].map((step, i) => (
                    <div
                      key={step}
                      className={`s8-acc-item ${i === 0 ? "s8-acc-active" : ""}`}
                      data-step={step}
                    >
                      <div className="s8-acc-header">
                        <span className="s8-acc-dot"></span>
                        <span className="s8-acc-name">
                          {
                            [
                              "Recruit",
                              "Design",
                              "Review",
                              "Train",
                              "Evaluate",
                            ][i]
                          }
                        </span>
                        <span className="s8-acc-sub">
                          {
                            [
                              "Finding our Memory Developers",
                              "Documenting Task Guidelines",
                              "Data review",
                              "Motor memory",
                              "Model improvement",
                            ][i]
                          }
                        </span>
                        <span className="s8-acc-arrow">
                          {i === 0 ? "\u2303" : "\u2304"}
                        </span>
                      </div>
                      <div className="s8-acc-body">
                        <p>
                          {
                            [
                              "We start by carefully recruiting an ever-growing community of data contributors we call Memory Developers (MDs). This community represents a wide diversity of US households who are curious and eager to shape the future of helpful robotics.",
                              "We guide our Memory Developers (MDs) to take on almost any household chore - all while wearing our Skill Capture Gloves for sensory rich data.",
                              "All data undergoes a rigorous, task-specific rating and multiple rounds of QA — ensuring our models learn only from the highest-quality data.",
                              "We perpetually fine-tune our models, experimenting with data recipes, weighting, and augmentation to achieve our ideal model performance.",
                              "We eval our models daily with Memo. These evals, in combination with data from our Memory Developers enable Memo to work in new homes it's never seen before.",
                            ][i]
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="s8-cycle-wrap">
                  <div className="s8-cycle-header">
                    <span className="s8-cycle-label" id="s8CycleLabel">
                      Recruit
                    </span>
                    <span className="s8-cycle-time">48 Hour Cycle</span>
                  </div>
                  <div className="s8-cycle">
                    <div className="s8-circle-outer" id="s8Circle"></div>
                    <div className="s8-circle-labels">
                      <span className="s8-cl s8-cl-top">Design</span>
                      <span className="s8-cl s8-cl-right">Review</span>
                      <span className="s8-cl s8-cl-bottom">Train</span>
                      <span className="s8-cl s8-cl-left">Evaluate</span>
                    </div>
                    <div className="s8-circle-center">
                      <span>Recruit</span>
                    </div>
                    <div className="s8-progress-dots">
                      <span
                        className="s8-pdot s8-pdot-active"
                        data-dot="0"
                      ></span>
                      <span className="s8-pdot" data-dot="1"></span>
                      <span className="s8-pdot" data-dot="2"></span>
                      <span className="s8-pdot" data-dot="3"></span>
                      <span className="s8-pdot" data-dot="4"></span>
                    </div>
                  </div>
                  <div className="s8-mobile-nav">
                    <button className="s8-mobile-nav-btn" id="s8MobilePrev">&#x2039;</button>
                    <button className="s8-mobile-nav-btn" id="s8MobileNext">&#x203A;</button>
                  </div>
                </div>
                <div className="s8-mobile-desc">
                  <h3 className="s8-mobile-desc-title" id="s8MobileTitle">Recruit</h3>
                  <p className="s8-mobile-desc-body" id="s8MobileBody">
                    We start by carefully recruiting an ever-growing community of data contributors we call Memory Developers (MDs). This community represents a wide diversity of US households who are curious and eager to shape the future of helpful robotics.
                  </p>
                </div>
              </div>
              <div className="s8-bottom-text">
                <p>
                  Our infrastructure seamlessly connects every step: recruiting
                  Memory Developers, capturing movements, training models, and
                  evaluating performance. Memory Developers perform carefully
                  choreographed actions while our Memory Glove captures precise
                  motion data through force sensors, cameras, joint
                  potentiometers.
                </p>
                <p>
                  Each cycle builds on the last. Our data operations team
                  evaluates performance, identifies gaps, and refines collection
                  strategies. With every iteration, we expand recovery from
                  failure and accelerate Memo's path to real usefulness.
                </p>
              </div>
            </div>
          </section>
        );
      };

      const SpecificationsSection = () => {
        return (
          <section className="s9-section">
            <div className="s9-inner">
              <div className="s9-left">
                <h2 className="s9-title">
                  Real-world ready, technically proven
                </h2>
                <a href="#" className="s9-link">
                  Specifications
                </a>
              </div>
              <div className="s9-right">
                <p className="s9-desc">
                  Designed for real lives and trained in real homes across the
                  US, Memo works with you, not around you. From studio
                  apartments to family houses, it adapts to your space and
                  routines from day one. No special setup, no learning curve —
                  just a helper that fits naturally into your household.
                </p>
              </div>
            </div>
          </section>
        );
      };

      const SpecificationsDetailSection = () => {
        useEffect(() => {
          const navLinks = document.querySelectorAll(".s10-nav-link");
          const blocks = document.querySelectorAll(".s10-block");
          if (!navLinks.length || !blocks.length) return;
          const clickHandlers = [];
          navLinks.forEach(function (link) {
            const handler = function (e) {
              e.preventDefault();
              const targetId = this.getAttribute("data-target");
              const target = document.getElementById(targetId);
              if (target) {
                const offset = 100;
                const top =
                  target.getBoundingClientRect().top +
                  window.pageYOffset -
                  offset;
                window.scrollTo({ top: top, behavior: "smooth" });
              }
            };
            link.addEventListener("click", handler);
            clickHandlers.push({ link, handler });
          });
          const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0,
          };
          const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(function (link) {
                  if (link.getAttribute("data-target") === id) {
                    link.classList.add("s10-nav-active");
                  } else {
                    link.classList.remove("s10-nav-active");
                  }
                });
              }
            });
          }, observerOptions);
          blocks.forEach(function (block) {
            observer.observe(block);
          });
          return () => {
            clickHandlers.forEach(({ link, handler }) =>
              link.removeEventListener("click", handler),
            );
            observer.disconnect();
          };
        }, []);
        return (
          <section className="s10-section">
            <div className="s10-inner">
              <nav className="s10-nav" id="s10Nav">
                <a
                  href="#s10-hardware"
                  className="s10-nav-link s10-nav-active"
                  data-target="s10-hardware"
                >
                  Hardware Specs
                </a>
                <a
                  href="#s10-design"
                  className="s10-nav-link"
                  data-target="s10-design"
                >
                  Design and dimensions
                </a>
                <a
                  href="#s10-safety"
                  className="s10-nav-link"
                  data-target="s10-safety"
                >
                  Safety and security
                </a>
                <a
                  href="#s10-glossary"
                  className="s10-nav-link"
                  data-target="s10-glossary"
                >
                  Glossary
                </a>
              </nav>
              <div className="s10-content">
                <div className="s10-block" id="s10-hardware">
                  <h2 className="s10-block-title">Hardware Specs</h2>
                  <div className="s10-hw-grid">
                    <div className="s10-hw-image">
                      <div className="s10-hw-img-box">
                        <img src="/image/테크놀로지.svg" alt="Robot Architecture" />
                      </div>
                    </div>
                    <div className="s10-hw-specs">
                      <div className="s10-spec-card">
                        <h3 className="s10-spec-title">Overview</h3>
                        <div className="s10-spec-body">
                          <p>
                            <strong>Height:</strong> 1.7 meters
                          </p>
                          <p>
                            <strong>Weight:</strong> 170 pounds
                          </p>
                          <p>
                            <strong>Horizontal reach:</strong> 0.8 meters
                          </p>
                          <p>
                            <strong>Vertical reach:</strong> 2.1 meters
                          </p>
                        </div>
                      </div>
                      <div className="s10-spec-card">
                        <h3 className="s10-spec-title">Degrees of Freedom</h3>
                        <div className="s10-spec-body">
                          <p>
                            <strong>Arms:</strong> 2 x 7
                          </p>
                          <p>
                            <strong>Hands:</strong> 2 x 4
                          </p>
                          <p>
                            <strong>Torso:</strong> 1
                          </p>
                          <p>
                            <strong>Lower Body:</strong> 4
                          </p>
                        </div>
                      </div>
                      <div className="s10-spec-card">
                        <h3 className="s10-spec-title">Speed</h3>
                        <div className="s10-spec-body">
                          <p>
                            <strong>Navigation Max:</strong> 1 meter/s
                          </p>
                          <p>
                            <strong>Manipulation:</strong> Memory Developer do
                            demonstrations at about half of natural human speed
                            during a task, and our team runs models at about
                            60-80% of data speed.
                          </p>
                        </div>
                      </div>
                      <div className="s10-spec-card">
                        <h3 className="s10-spec-title">Battery</h3>
                        <div className="s10-spec-body">
                          <p>
                            <strong>Runtime:</strong> 4 hours
                          </p>
                          <p>
                            <strong>Charge time:</strong> 1 hour
                          </p>
                          <p className="s10-muted">
                            Self-charging will be available for the Beta Program.
                          </p>
                        </div>
                      </div>
                      <div className="s10-spec-card">
                        <h3 className="s10-spec-title">Materials</h3>
                        <div className="s10-spec-body">
                          <p>
                            A blend of rigid and elastic polymers for robustness
                            and safety. The soft pieces of the body's cladding
                            are available in a wide array of colors.
                          </p>
                        </div>
                      </div>
                      <div className="s10-spec-card">
                        <h3 className="s10-spec-title">Ingress Protection</h3>
                        <div className="s10-spec-body">
                          <p>
                            <strong>Hand:</strong> IP67
                          </p>
                          <p>
                            <strong>Lower Arm:</strong> IP66
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="s10-block" id="s10-design">
                  <h2 className="s10-block-title">Design and dimensions</h2>
                  <div className="s10-design-grid">
                    <div className="s10-design-card">
                      <div className="s10-design-img-box">
                        <img src="/image/테크놀로지지.svg" alt="Side View Left" />
                      </div>
                    </div>
                    <div className="s10-design-card">
                      <div className="s10-design-img-box">
                        <img src="/image/테크놀로지지.svg" alt="Side View Right" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="s10-block" id="s10-safety">
                  <h2 className="s10-block-title">Safety and security</h2>
                  <div className="s10-safety-list">
                    <div className="s10-safety-row">
                      <div className="s10-safety-label">Hardware safety</div>
                      <div className="s10-safety-desc">
                        We designed Memo to be compliant and passively safe. If
                        you bump into it, it naturally yields, and it remains
                        stable even if power is cut at any configuration.
                      </div>
                    </div>
                    <div className="s10-safety-row">
                      <div className="s10-safety-label">Software safety</div>
                      <div className="s10-safety-desc">
                        Memo has built-in collision avoidance for both static
                        and dynamic obstacles. It only performs tasks we've
                        explicitly taught it — tasks that are useful and safe.
                        Every behavior is governed by rigorous data review.
                      </div>
                    </div>
                    <div className="s10-safety-row">
                      <div className="s10-safety-label">Data security</div>
                      <div className="s10-safety-desc">
                        With Skill Capture Glove and our Memory Developers, we
                        do not need to depend on data from your home to train
                        Memo. If you ever choose to share feedback about Memo's
                        behavior, it will only happen with your explicit
                        consent.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="s10-block" id="s10-glossary">
                  <h2 className="s10-block-title">Glossary</h2>
                  <div className="s10-glossary-grid">
                    <div className="s10-glossary-card">
                      <h4 className="s10-glossary-term">Actuator</h4>
                      <p className="s10-glossary-def">
                        A component that converts energy (electrical, hydraulic,
                        pneumatic) into motion, enabling movement of a robot's
                        joints or mechanisms.
                      </p>
                    </div>
                    <div className="s10-glossary-card">
                      <h4 className="s10-glossary-term">Teleoperation</h4>
                      <p className="s10-glossary-def">
                        Teleoperation is the control of a robot by a human
                        operator at a distance. The human sees what the robot
                        sees and directly sends commands to move the robot's
                        arms, wheels, hands, etc.
                      </p>
                    </div>
                    <div className="s10-glossary-card">
                      <h4 className="s10-glossary-term">Skill Capture Glove</h4>
                      <p className="s10-glossary-def">
                        Our patented Skill Capture Glove is a one-to-one
                        representation of Memo's hand and enables anyone to
                        teach Memo nearly any skill. What you can do wearing the
                        Skill Capture Glove, Memo can learn.
                      </p>
                    </div>
                    <div className="s10-glossary-card">
                      <h4 className="s10-glossary-term">Compliant Control</h4>
                      <p className="s10-glossary-def">
                        In robotics, compliant control refers to any control
                        strategy that allows a robot to intentionally yield,
                        flex, or adapt its motion in response to external forces
                        — instead of behaving like a rigid, unstoppable machine.
                      </p>
                    </div>
                    <div className="s10-glossary-card">
                      <h4 className="s10-glossary-term">Skill Library</h4>
                      <p className="s10-glossary-def">
                        Our ever-growing dataset of in-the-wild data, generated
                        by Memory Developers using our Skill Capture Gloves. As
                        of November 2025, it's approximately 10 million
                        examples.
                      </p>
                    </div>
                    <div className="s10-glossary-card">
                      <h4 className="s10-glossary-term">Passive Stability</h4>
                      <p className="s10-glossary-def">
                        A system is passively stable if it naturally settles
                        into a stable equilibrium (e.g. not tipping over) due to
                        its mechanical design, and does not require ongoing
                        actuation to maintain that configuration.
                      </p>
                    </div>
                    <div className="s10-glossary-card">
                      <h4 className="s10-glossary-term">Memory Developer</h4>
                      <p className="s10-glossary-def">
                        Memory Developers (MDs) are data collectors who use our
                        Skill Capture Gloves to train our models on a wide
                        diversity of tasks. Our MDs represent households across
                        the US and collect from their lived-in homes, rather
                        than warehouses.
                      </p>
                    </div>
                    <div className="s10-glossary-card">
                      <h4 className="s10-glossary-term">Autonomous</h4>
                      <p className="s10-glossary-def">
                        When a robot operates autonomously, it acts on its own.
                        It senses the world and accomplishes tasks without
                        moment-to-moment guidance. This contrasts teleoperation,
                        in which humans remote-control robots.
                      </p>
                    </div>
                    <div className="s10-glossary-card">
                      <h4 className="s10-glossary-term">ACT-1</h4>
                      <p className="s10-glossary-def">
                        ACT-1 (pronounced act-one) is the robot foundation model
                        we've built in-house at Sunday. It learns from data
                        captured by Memory Developers using our Skill Capture
                        Gloves.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      };

      const HomePage = ({ onNavigate }) => {
        const Hero = () => (
          <section className="relative w-full h-[110vh] flex items-center justify-center overflow-hidden">
            <div className="spline-wrapper">
              <iframe
                src="https://my.spline.design/nexbotrobotcharacterconcept-PWeampkham0WHJrFpqEePuUU/"
                frameBorder="0"
                width="100%"
                height="100%"
                title="3D Robot Model"
              ></iframe>
            </div>
            <div className="relative z-10 text-center max-w-4xl px-6 mt-20 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-white/50 backdrop-blur-md border border-white/40 text-xs font-semibold uppercase tracking-wider mb-6 text-gray-800">
                  Beta launching late 2026
                </span>
                <h1 className="text-6xl md:text-8xl font-display font-medium text-white leading-tight mb-8" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3), 0 4px 40px rgba(0,0,0,0.15)' }}>
                  Say hello to <br />
                  <span className="font-bold">Memo</span>
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
                  <Button
                    variant="primary"
                    className="h-14 px-8 text-lg rounded-full"
                  >
                    Join the Founding Family
                  </Button>
                  <Button
                    variant="accent"
                    className="h-14 px-8 text-lg rounded-full flex items-center gap-2"
                  >
                    Watch the film <Play size={16} fill="currentColor" />
                  </Button>
                </div>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9F8F4] to-transparent z-10 pointer-events-none"></div>
          </section>
        );
        const FeatureSection = ({
          title,
          description,
          imgSrc,
          subImgSrc,
          videoLabel,
          reverse = false,
        }) => (
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-display mb-6 tracking-tight">
                {title}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                {description}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <motion.div
                className={`md:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl group h-[500px] bg-gray-200`}
                whileHover={{ scale: 1.01 }}
              >
                <img
                  src={imgSrc}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 glass-panel px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  {videoLabel || "Memo in action"}
                </div>
              </motion.div>
              <div className="md:col-span-4 flex flex-col gap-6">
                <motion.div
                  className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-2xl font-bold mb-4">Autonomous 5+</h3>
                  <p className="text-gray-600 mb-6">
                    Memo autonomously maps your home and adapts to changes in
                    real-time.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
                      LiDAR
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
                      Vision
                    </span>
                  </div>
                </motion.div>
                {subImgSrc && (
                  <motion.div
                    className="h-64 rounded-3xl overflow-hidden relative shadow-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={subImgSrc}
                      alt="Detail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 text-white font-medium text-sm drop-shadow-md">
                      Real-time processing
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        );
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-container"
          >
            <Hero />
            <StorySection />
            <ScrollTextSection />
            <KitchenShowcaseSection />
            <ShowcaseSection 
              title="Memo works in homes it's never seen" 
              card1Title="Every home is different. Memo works in yours."
              card1Desc="We believe Memo should be easy to use in the real-world, working autonomously out-of-the-box. Hundreds of people in unique homes show Memo how chores are done each day, so Memo can robustly handle the chaos of real life."
            />
            <ShowcaseSection />
            <ProductExperience />
            <ImitationSection />
            <GloveVideoSection onNavigate={onNavigate} />
            <FAQSection />
          </motion.div>
        );
      };

      const BusinessPage = () => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-container"
          >
            <section className="cp-hero">
              <div className="cp-hero-video-wrap">
                <video
                  className="cp-hero-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="videos/company-hero.mp4" type="video/mp4" />
                </video>
                <div className="cp-hero-overlay"></div>
              </div>
              <div className="cp-hero-text">
                <h1 className="cp-hero-title">Sunday</h1>
                <p className="cp-hero-sub">The helpful robotics company</p>
              </div>
            </section>

            <section className="cp-mission">
              <div className="cp-mission-inner">
                <p className="cp-mission-text">
                  While most technology demands your attention, we're building
                  the opposite, technology that gives you back time. We believe
                  every day should feel like Sunday, filled with connection,
                  creativity, and the moments that make us human.
                </p>
              </div>
            </section>

            <section className="cp-carousel">
              <div className="cp-carousel-track">
                {/* 원본 12개 */}
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e8e4df" }}
                  >
                    1
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#d4d0cb" }}
                  >
                    2
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e0dcd7" }}
                  >
                    3
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#ccc8c3" }}
                  >
                    4
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e8e4df" }}
                  >
                    5
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#d4d0cb" }}
                  >
                    6
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e0dcd7" }}
                  >
                    7
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#ccc8c3" }}
                  >
                    8
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e8e4df" }}
                  >
                    9
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#d4d0cb" }}
                  >
                    10
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e0dcd7" }}
                  >
                    11
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#ccc8c3" }}
                  >
                    12
                  </div>
                </div>
                {/* 복제본 12개 */}
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e8e4df" }}
                  >
                    1
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#d4d0cb" }}
                  >
                    2
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e0dcd7" }}
                  >
                    3
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#ccc8c3" }}
                  >
                    4
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e8e4df" }}
                  >
                    5
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#d4d0cb" }}
                  >
                    6
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e0dcd7" }}
                  >
                    7
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#ccc8c3" }}
                  >
                    8
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e8e4df" }}
                  >
                    9
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#d4d0cb" }}
                  >
                    10
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#e0dcd7" }}
                  >
                    11
                  </div>
                </div>
                <div className="cp-carousel-slide">
                  <div
                    className="cp-slide-img"
                    style={{ background: "#ccc8c3" }}
                  >
                    12
                  </div>
                </div>
              </div>
            </section>

            <section className="cp-research">
              <div className="cp-research-inner">
                <div className="cp-research-left">
                  <h2 className="cp-research-title">
                    Industry-leading research
                  </h2>
                  <p className="cp-research-sub">Development</p>
                </div>
                <div className="cp-research-right">
                  <p className="cp-research-text">
                    Tony Zhao and Cheng Chi's research created the foundation
                    the entire robotics ecosystem now builds upon. ALOHA,
                    Diffusion Policy, the UMI gripper — their breakthroughs
                    showed how robots could finally learn from humans
                    efficiently.
                  </p>
                  <p className="cp-research-text">
                    At Sunday, we're taking these innovations from the lab to
                    life. By collecting data from hundreds of real people in
                    real homes, we are building robots that don't just work in
                    controlled environments — they work in yours.
                  </p>
                </div>
              </div>
            </section>

            <section className="cp-team-section">
              <div className="cp-team-inner">
                <div className="cp-team-header">
                  <div className="cp-team-left">
                    <h2 className="cp-team-title">Led by young mavericks</h2>
                    <p className="cp-team-sub">Team</p>
                  </div>
                  <div className="cp-team-right">
                    <div className="cp-team-photo">
                      <span>Founders Photo</span>
                    </div>
                  </div>
                </div>

                <div className="cp-team-header">
                  <div className="cp-team-left"></div>
                  <div className="cp-team-right">
                    <div className="cp-founders-list">
                      <div className="cp-founder-item">
                        <h3>Tony Zhao</h3>
                        <p className="role">CEO, Co-Founder</p>
                        <p className="desc">
                          Tony earned his B.S. in EECS from UC Berkeley in 2021,
                          and dropped out of his Stanford CS PhD in 2024. He was
                          advised by renowned researchers Sergey Levine and
                          Chelsea Finn, and his research on robotic fine
                          manipulation tasks led to the widely recognized ALOHA
                          project.
                        </p>
                      </div>
                      <div className="cp-founder-item">
                        <h3>Cheng Chi</h3>
                        <p className="role">CTO, Co-Founder</p>
                        <p className="desc">
                          Cheng earned his B.S. in CS from the University of
                          Michigan and PhD in CS from Columbia University. A
                          leading robotics researcher, he invented Diffusion
                          Policy, a seminal work that has been widely adopted
                          across industry.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cp-team-header" style={{ paddingTop: "48px" }}>
                  <div className="cp-team-left"></div>
                  <div className="cp-team-right">
                    <p className="cp-team-sub" style={{ marginBottom: "24px" }}>
                      Team
                    </p>
                    <div className="cp-member-list">
                      {[
                        "Alper Canberk",
                        "Alykan Vucina",
                        "Antwan Nguyen",
                        "Asama Anwar",
                        "Billy Plummer",
                        "Camilla Guo",
                        "Chris Greer",
                        "Christopher Doan",
                        "Clayton Haight",
                        "Connor Hughes",
                        "Dzuy Doan",
                        "Eddie Chavez",
                        "Elliot Kim",
                        "Fabi Fernandez-Han",
                        "Farhan Khan",
                        "Fernando Estrada",
                        "Haichuan Che",
                        "Henry Yu",
                        "Hojung Choi",
                        "Jade Moreau",
                        "Jared Vucina",
                        "Jason Peterson",
                        "Jenald Villena",
                        "Johnson Zhong",
                        "Keval Shah",
                        "Kevin Wolf",
                        "Kyle Miller",
                        "Nadeesha Amarasinghe",
                        "Nishant Desai",
                        "Perry Jia",
                        "Phillip Chan",
                        "Rahul Nimbalkar",
                        "Raul Sampedro",
                        "Shy Yang",
                        "Stephen Grinager",
                        "Tsugumi Murata",
                        "Sunday Team",
                      ].map((name) => (
                        <div key={name} className="cp-member">
                          <span>{name}</span>
                          <div className="cp-member-avatar-box">
                            <img
                              src={`/team/${name.toLowerCase().replace(/\s+/g, "-")}.png`}
                              className="cp-member-hover-img"
                              alt={name}
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="cp-hero" style={{ marginTop: "40px" }}>
              <div className="cp-hero-video-wrap">
                <video
                  className="cp-hero-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source
                    src="https://assets.mixkit.co/videos/preview/mixkit-manufacturing-process-in-a-factory-4286-large.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="cp-hero-overlay"></div>
              </div>
              <div className="cp-hero-text">
                <h1 className="cp-hero-title">Building Tomorrow</h1>
                <p className="cp-hero-sub">
                  Join us in shaping the future of robotics
                </p>
              </div>
            </section>

            <section className="cp-values">
              <div className="cp-values-inner">
                <div className="cp-values-left">
                  <h2 className="cp-values-title">What we care about</h2>
                  <p className="cp-values-sub">Company values</p>
                </div>
                <div className="cp-values-right">
                  <div className="cp-value-item">
                    <div className="cp-value-head">Solutions over methods</div>
                    <div className="cp-value-body">
                      Stay low ego, and don't worry about being right in
                      principle, or staying within your job description. Find
                      the thing that works.
                    </div>
                  </div>
                  <div className="cp-value-item">
                    <div className="cp-value-head">Kindness</div>
                    <div className="cp-value-body">
                      If we are not able to be kind to each other, we cannot
                      expect our product to bring people joy.
                    </div>
                  </div>
                  <div className="cp-value-item">
                    <div className="cp-value-head">
                      We are each other's customers
                    </div>
                    <div className="cp-value-body">
                      We share a vision. We exist to help each other get
                      unblocked, move faster, and make better-informed
                      decisions.
                    </div>
                  </div>
                  <div className="cp-value-item">
                    <div className="cp-value-head">Hard things are hard</div>
                    <div className="cp-value-body">
                      If it were easy, everyone would do it. Persistence through
                      hard times will define our success.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        );
      };

      const ProductPage = () => {
        const specs = [
          { label: "Height", value: "120 cm" },
          { label: "Weight", value: "45 kg" },
          { label: "Battery Life", value: "8 Hours" },
          { label: "Payload", value: "15 kg" },
        ];
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-container"
          >
            <PageHeader
              title="Product Introduction"
              subtitle="Meet Memo. The first general-purpose robot designed specifically for the home environment."
            />
            <section className="py-12 px-6">
              <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden relative h-[70vh] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2000"
                  alt="Product Hero"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h2 className="text-4xl font-bold mb-4">
                    Precision Engineering
                  </h2>
                  <p className="max-w-xl text-lg text-gray-200">
                    Every curve of Memo is designed for safety and aesthetic
                    harmony with your furniture.
                  </p>
                </div>
              </div>
            </section>
            <section className="py-24 px-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <h3 className="text-3xl font-display mb-8">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {specs.map((s, i) => (
                      <div
                        key={i}
                        className="p-6 bg-white border border-gray-200 rounded-2xl"
                      >
                        <div className="text-gray-500 text-sm mb-2">
                          {s.label}
                        </div>
                        <div className="text-2xl font-bold text-memo-dark">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <Eye size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">
                          360° Vision System
                        </h4>
                        <p className="text-gray-600">
                          12 cameras and LiDAR for perfect spatial awareness.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <Battery size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">All-Day Autonomy</h4>
                        <p className="text-gray-600">
                          Self-charging dock included. Goes from 0 to 80% in 40
                          mins.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <Shield size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">
                          Soft-Touch Exterior
                        </h4>
                        <p className="text-gray-600">
                          Fabric and silicone outer layers for maximum safety.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-full min-h-[500px] bg-gray-100 rounded-3xl overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&q=80&w=1000"
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt="Tech"
                  />
                </div>
              </div>
            </section>
            <section className="s3-intro">
              <div className="s3-inner">
                <div className="s3-left">
                  <h2 className="s3-title">A breakthrough in Robotic AI</h2>
                  <p className="s3-subtitle">
                    Memo learns without teleoperation
                  </p>
                </div>
                <div className="s3-right">
                  <p className="s3-desc">
                    While other robots learn from wide-spread data—collected
                    from the robot itself—Memo learns directly from humans
                    wearing the Skill Capture Glove™.
                  </p>
                </div>
              </div>
            </section>
            <section className="s4-videos">
              <div className="s4v-inner">
                <div
                  className="s4v-card"
                  onMouseEnter={(e) =>
                    e.currentTarget.querySelector("video")?.play()
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.querySelector("video")?.pause()
                  }
                >
                  <video className="s4v-video" muted loop playsInline poster="">
                    <source src="video1.mp4" type="video/mp4" />
                  </video>
                  <div className="s4v-overlay"></div>
                  <div className="s4v-caption">
                    <span className="s4v-icon">⊙</span>
                    <span>Anything the glove can handle, so can Memo</span>
                  </div>
                </div>
                <div
                  className="s4v-card"
                  onMouseEnter={(e) =>
                    e.currentTarget.querySelector("video")?.play()
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.querySelector("video")?.pause()
                  }
                >
                  <video className="s4v-video" muted loop playsInline poster="">
                    <source src="video2.mp4" type="video/mp4" />
                  </video>
                  <div className="s4v-overlay"></div>
                  <div className="s4v-caption">
                    <span className="s4v-icon">▶</span>
                    <span>Even super tiny objects</span>
                  </div>
                </div>
              </div>
            </section>
            <section className="s5-text">
              <div className="s5t-inner">
                <p className="s5t-paragraph">
                  The bottleneck in robotics is training data. Learning a single
                  complex task can take thousands of hours, and traditional data
                  gathering—like{" "}
                  <span className="relative inline group cursor-pointer z-10">
                    <span className="s5t-link">
                      teleoperation
                    </span>
                    <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[320px] p-4 bg-[#111] text-white text-sm font-sans text-left rounded-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none shadow-xl" style={{zIndex: 50}}>
                      <strong className="block mb-1.5 text-base font-semibold tracking-wide text-white">
                        Teleoperation
                      </strong>
                      <span className="text-gray-200 leading-relaxed font-normal block">
                        Teleoperation is the control of a robot by a human operator at a distance. The human sees what the robot sees and directly sends commands to move the robot's arms, wheels, hands, etc.
                      </span>
                    </span>
                  </span>
                  —is slow, costly, and intrusive. Sunday's goal is different:
                  we are building true autonomy in a scalable way.
                </p>
                <p className="s5t-paragraph">
                  Enter the{" "}
                  <span className="relative inline group cursor-pointer z-10">
                    <span className="s5t-link">
                      Skill Capture Glove
                    </span>
                    <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[320px] p-4 bg-[#111] text-white text-sm font-sans text-left rounded-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none shadow-xl" style={{zIndex: 50}}>
                      <strong className="block mb-1.5 text-base font-semibold tracking-wide text-white">
                        Skill Capture Glove
                      </strong>
                      <span className="text-gray-200 leading-relaxed font-normal block">
                        Our patented Skill Capture Glove is a one-to-one representation of Memo's hand and enables anyone to teach Memo nearly any skill. What you can do wearing the Skill Capture Glove, Memo can learn.
                      </span>
                    </span>
                  </span>
                  . This technology allows our team of{" "}
                  <span className="relative inline group cursor-pointer z-10">
                    <span className="s5t-link">
                      Memory Developers
                    </span>
                    <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[320px] p-4 bg-[#111] text-white text-sm font-sans text-left rounded-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none shadow-xl" style={{zIndex: 50}}>
                      <strong className="block mb-1.5 text-base font-semibold tracking-wide text-white">
                        Memory Developer
                      </strong>
                      <span className="text-gray-200 leading-relaxed font-normal block">
                        Memory Developers (MDs) are data collectors who use our Skill Capture Gloves to train our models on a wide diversity of tasks. Our MDs represent households across the US and collect from their lived-in homes.
                      </span>
                    </span>
                  </span>{" "}
                  to generate data at scale and train Memo rapidly, long before
                  it reaches your living room. We co-designed Memo's hand to be
                  a perfect mirror of the glove's shape and sensors. As a
                  result, any skill you demonstrate, Memo can master.
                </p>
              </div>
            </section>
            <ScrollChartSection />
            <TextDetailsSection />
            <InfrastructureCycleSection />
            <SpecificationsSection />
            <SpecificationsDetailSection />
          </motion.div>
        );
      };

      const SupportPage = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="page-container"
        >
          <PageHeader title="Support" subtitle="We are here to help." />
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <p className="text-lg text-gray-600">
              Contact us at{" "}
              <a
                href="mailto:support@sunday.com"
                className="text-memo-dark underline"
              >
                support@sunday.com
              </a>{" "}
              for assistance.
            </p>
          </div>
        </motion.div>
      );

      const App = () => {
        const [currentPage, setCurrentPage] = useState("home");
        useEffect(() => {
          const params = new URLSearchParams(window.location.search);
          const page = params.get("page");
          if (page) setCurrentPage(page);
        }, []);
        const handleNavigate = (pageId) => {
          setCurrentPage(pageId);
          window.scrollTo(0, 0);
        };
        const handleDownloadSource = async () => {
          if (!window.JSZip) {
            alert("Loading system...");
            return;
          }
          const zip = new JSZip();
          const styleTag = document.querySelector("style");
          zip.file("style.css", styleTag ? styleTag.innerHTML.trim() : "");
          const scripts = document.querySelectorAll(
            'script[type="text/babel"]',
          );
          let jsContent = "";
          scripts.forEach((script) => {
            if (script.innerHTML.includes("const App ="))
              jsContent = script.innerHTML;
          });
          const jsFileContent = `/** Sunday Memo Robot Source */\n${jsContent}`;
          zip.file("script.js", jsFileContent);
          const cloneHtml = document.documentElement.cloneNode(true);
          const clonedStyle = cloneHtml.querySelector("style");
          if (clonedStyle) clonedStyle.remove();
          const clonedScripts = cloneHtml.querySelectorAll(
            'script[type="text/babel"]',
          );
          clonedScripts.forEach((script) => {
            if (script.innerHTML.includes("const App =")) {
              const scriptLink = document.createElement("script");
              scriptLink.type = "text/babel";
              scriptLink.setAttribute("data-type", "module");
              scriptLink.src = "./script.js";
              script.parentNode.insertBefore(scriptLink, script);
              script.remove();
            }
          });
          const cssLink = document.createElement("link");
          cssLink.rel = "stylesheet";
          cssLink.href = "./style.css";
          cloneHtml.querySelector("head").appendChild(cssLink);
          const root = cloneHtml.querySelector("#root");
          if (root) root.innerHTML = "";
          const jszipScript = cloneHtml.querySelector('script[src*="jszip"]');
          if (jszipScript) jszipScript.remove();
          zip.file("index.html", `<!DOCTYPE html>\n${cloneHtml.outerHTML}`);
          const content = await zip.generateAsync({ type: "blob" });
          const url = URL.createObjectURL(content);
          const a = document.createElement("a");
          a.href = url;
          a.download = "sunday-memo-multipage.zip";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        };
        const renderPage = () => {
          switch (currentPage) {
            case "business":
              return <BusinessPage key="business" />;
            case "product":
              return <ProductPage key="product" />;
            case "support":
              return <SupportPage key="support" />;
            default:
              return <HomePage key="home" onNavigate={handleNavigate} />;
          }
        };
        return (
          <div className="relative font-sans text-memo-dark selection:bg-memo-accent selection:text-black">
            <Navbar activePage={currentPage} onNavigate={handleNavigate} />
            <main className="min-h-screen">
              <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
            </main>
            <Footer
              onNavigate={handleNavigate}
              onDownloadSource={handleDownloadSource}
            />
          </div>
        );
      };

      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);