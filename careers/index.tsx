import React, { useState, useRef, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
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

const MotionDiv = motion.div as any;
const MotionNav = motion.nav as any;
const MotionAnimatePresence = AnimatePresence as any;

// --- Types & Data ---

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: any) => {
  const baseStyle =
    "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2";
  const variants: any = {
    primary: "bg-memo-dark text-white hover:bg-black hover:scale-105 shadow-lg",
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

const Navbar = ({ activePage, onNavigate }: any) => {
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
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isStoryOpen]);

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
                  onNavigate("home");
                  setIsOpen(false);
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
                        onClick={() => {
                          if (item.id === "careers") {
                            setIsOpen(false);
                          } else {
                            onNavigate(item.id);
                            setIsOpen(false);
                          }
                        }}
                        className="text-left group relative py-1 pl-4 border-l-2 border-transparent hover:border-memo-accent transition-all cursor-pointer"
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
              </MotionDiv>
            )}
          </MotionAnimatePresence>
        </MotionNav>
      </div>
    </>
  );
};

type Role = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
};

const SAMPLE_ROLES: Role[] = [
  // Robotics
  {
    id: "r1",
    title: "Robotics Controls Engineer",
    category: "Robotics",
    location: "Mountain View",
    description:
      "Design and implement advanced control algorithms for dynamic robots.",
  },
  {
    id: "r2",
    title: "SLAM Engineer",
    category: "Robotics",
    location: "Mountain View",
    description:
      "Develop robust simultaneous localization and mapping systems for unstructured environments.",
  },
  {
    id: "r3",
    title: "Full Stack Robotics Software Engineer",
    category: "Robotics",
    location: "Mountain View",
    description:
      "Bridge the gap between high-level cloud services and low-level robot operations.",
  },
  {
    id: "r4",
    title: "Robotics Systems Engineer",
    category: "Robotics",
    location: "Mountain View",
    description: "Oversee the integration of hardware and software subsystems.",
  },
  {
    id: "r5",
    title: "Robotics Motion Planning Engineer",
    category: "Robotics",
    location: "Mountain View",
    description:
      "Create safe and efficient trajectories for complex robotic manipulators.",
  },
  {
    id: "r6",
    title: "Robotics Perception Engineer",
    category: "Robotics",
    location: "Mountain View",
    description:
      "Apply computer vision and sensor fusion to help robots understand their world.",
  },

  // Hardware
  {
    id: "h1",
    title: "Mechanical Engineer",
    category: "Hardware",
    location: "Mountain View",
    description: "Design mechanisms and structures for next-generation robots.",
  },
  {
    id: "h2",
    title: "Senior Electrical Engineer",
    category: "Hardware",
    location: "Mountain View",
    description:
      "Lead the electrical architecture design from concept to production.",
  },
  {
    id: "h3",
    title: "Senior Mechanical Engineer",
    category: "Hardware",
    location: "Mountain View",
    description:
      "Drive mechanical design excellence and mentor junior engineers.",
  },
  {
    id: "h4",
    title: "Senior Reliability and Test Engineer",
    category: "Hardware",
    location: "Mountain View",
    description:
      "Ensure our robots can withstand the rigors of the real world.",
  },

  // Software
  {
    id: "s1",
    title: "Software Engineer - Full Stack",
    category: "Software",
    location: "Mountain View",
    description:
      "Build intuitive user interfaces and scalable backend services.",
  },
  {
    id: "s2",
    title: "Software Engineer - Systems",
    category: "Software",
    location: "Mountain View",
    description:
      "Optimize operating system performance and resource management.",
  },
  {
    id: "s3",
    title: "Software Engineer - Unity",
    category: "Software",
    location: "Mountain View",
    description: "Develop simulation environments for training and validation.",
  },
  {
    id: "s4",
    title: "Firmware Engineer",
    category: "Software",
    location: "Mountain View",
    description: "Write low-level code for embedded microcontrollers.",
  },

  // Machine Learning
  {
    id: "m1",
    title: "Machine Learning Research Engineer/Scientist",
    category: "Machine Learning",
    location: "Mountain View",
    description:
      "Push the boundaries of what is possible with learning-based approaches.",
  },
  {
    id: "m2",
    title: "ML Infrastructure Engineer",
    category: "Machine Learning",
    location: "Mountain View",
    description:
      "Build the pipeline and tools to train massive models efficiently.",
  },

  // Data Operations
  {
    id: "d1",
    title: "Memory Developer",
    category: "Data Operations",
    location: "Remote",
    description:
      "Curate and manage large-scale datasets for training AI models.",
  },

  // Manufacturing
  {
    id: "ma1",
    title: "Assembly Associate",
    category: "Manufacturing",
    location: "Mountain View",
    description:
      "Assemble complex electromechanical assemblies with precision.",
  },
  {
    id: "ma2",
    title: "Production Support Associate",
    category: "Manufacturing",
    location: "Mountain View",
    description:
      "Support the production line with material handling and troubleshooting.",
  },

  // Marketing
  {
    id: "mk1",
    title: "Senior Social Media Manager",
    category: "Marketing",
    location: "Mountain View",
    description: "Tell the story of our technology to a global audience.",
  },
  {
    id: "mk2",
    title: "Creative Director",
    category: "Marketing",
    location: "Mountain View",
    description: "Define and maintain the visual identity of the brand.",
  },
  {
    id: "mk3",
    title: "Video Producer",
    category: "Marketing",
    location: "Mountain View",
    description: "Create compelling video content showcasing our products.",
  },
  {
    id: "mk4",
    title: "Community Lead",
    category: "Marketing",
    location: "Mountain View",
    description: "Engage with our community of users and enthusiasts.",
  },

  // Product
  {
    id: "p1",
    title: "Senior Industrial Designer",
    category: "Product",
    location: "Mountain View",
    description: "Shape the physical form and user interaction of our robots.",
  },
];

const CATEGORIES = [
  "All",
  "Robotics",
  "Hardware",
  "Software",
  "Machine Learning",
  "Data Operations",
  "Manufacturing",
  "Marketing",
  "Product",
];

// --- Icons ---

const Icons = {
  Search: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  X: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Play: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  ),
  Pause: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  ),
  Volume2: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
  ),
  VolumeX: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <line x1="23" y1="9" x2="17" y2="15"></line>
      <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>
  ),
  ArrowRight: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  Check: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
};

// --- Components ---

const VideoHero = ({
  src,
  label,
  headline,
  className = "",
}: {
  src: string;
  label: string;
  headline: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className={`relative w-full max-w-[1200px] mx-auto overflow-hidden rounded-2xl bg-[#E5E5E5] aspect-video md:aspect-[16/9] lg:aspect-[2/1] ${className}`}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://picsum.photos/1200/675" // Fallback poster
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-8 md:p-12">
        <div className="text-white max-w-2xl">
          <span className="inline-block mb-2 text-sm md:text-base font-medium uppercase tracking-wide opacity-90">
            {label}
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-6">
            {headline}
          </h1>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 right-8 flex gap-3 z-10">
        <button
          onClick={toggleMute}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <Icons.VolumeX /> : <Icons.Volume2 />}
        </button>
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Icons.Pause /> : <Icons.Play />}
        </button>
      </div>
    </div>
  );
};

const TextBlock = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20 md:py-32">
      <div className="max-w-4xl">
        <p className="text-2xl md:text-4xl font-normal leading-relaxed text-primary">
          “The future of helpful homes is being shaped by a team that’s turning
          academic breakthroughs into real products. We’re looking for
          optimistic experts and pragmatic pioneers ready to tackle the hardest
          problems in robotics — and ship solutions that actually help people.”
        </p>
      </div>
    </section>
  );
};

const RoleDrawer = ({
  role,
  onClose,
}: {
  role: Role | null;
  onClose: () => void;
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (role) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [role]);

  // Handle outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!role) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={drawerRef}
        className="w-full max-w-lg bg-[#F6F1E8] h-full shadow-2xl p-8 md:p-12 overflow-y-auto transform transition-transform duration-300 animate-slide-in"
      >
        <div className="flex justify-between items-start mb-12">
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            {role.category}
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-secondary hover:text-primary transition-colors rounded-full hover:bg-black/5"
            aria-label="Close details"
          >
            <Icons.X />
          </button>
        </div>

        <h2 className="text-3xl font-bold text-primary mb-4 leading-tight">
          {role.title}
        </h2>
        <p className="text-lg text-secondary mb-8">{role.location}</p>

        <div className="border-t border-[#141414]/10 pt-8 mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-primary">
            Role Description
          </h3>
          <p className="text-lg leading-relaxed text-secondary">
            {role.description}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-secondary">
            This is a placeholder description. In a real application, this would
            contain detailed responsibilities, qualifications, and team
            information pulled from an API.
          </p>
        </div>

        <button className="w-full bg-primary text-white py-4 px-6 rounded-lg text-lg font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 group">
          Apply for this job
          <span className="group-hover:translate-x-1 transition-transform">
            <Icons.ArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

const RoleRow: React.FC<{ role: Role; onClick: () => void }> = ({
  role,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col md:flex-row md:items-center justify-between py-[16px] border-b border-[#141414]/[0.08] cursor-pointer hover:bg-[#141414]/[0.03] transition-colors"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="mb-2 md:mb-0">
        <h3 className="text-[16px] font-semibold text-[#141414]">
          {role.title}
        </h3>
        <span className="text-[14px] text-[#141414]/60 mt-0.5 block md:hidden">
          {role.category}
        </span>
      </div>
      <div className="text-[#141414]/60 text-[14px]">{role.location}</div>
    </div>
  );
};

const FiltersColumn = ({
  activeCategory,
  setActiveCategory,
  counts,
}: {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  counts: Record<string, number>;
}) => {
  return (
    <div className="md:sticky md:top-8 h-fit space-y-4">
      <h2 className="text-[12px] font-medium uppercase tracking-[0.08em] opacity-55 text-[#141414] mb-4 flex items-center gap-2">
        Filters
        <span className="opacity-70">({counts["All"]})</span>
      </h2>

      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto no-scrollbar pb-4 md:pb-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              h-[36px] rounded-full px-4 flex items-center text-[14px] transition-all duration-200 whitespace-nowrap w-fit md:w-full text-left
              ${
                activeCategory === cat
                  ? "bg-[#141414]/[0.06] text-[#141414]/[0.92] font-medium"
                  : "bg-transparent text-[#141414]/65 hover:bg-[#141414]/[0.04]"
              }
            `}
          >
            <span className="flex-1">{cat}</span>
            {activeCategory === cat && (
              <span className="hidden md:block text-[#141414] scale-75">
                <Icons.ArrowRight />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const CareersSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Filter Logic
  const filteredRoles = useMemo(() => {
    let roles = SAMPLE_ROLES;

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      roles = roles.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q),
      );
    }

    // Category Filter
    if (activeCategory !== "All") {
      roles = roles.filter((r) => r.category === activeCategory);
    }

    return roles;
  }, [activeCategory, searchQuery]);

  // Group roles for display
  const groupedRoles = useMemo<Record<string, Role[]>>(() => {
    if (activeCategory !== "All") {
      return { [activeCategory]: filteredRoles };
    }

    // Group by category, but respect the order of CATEGORIES array (skipping 'All')
    const groups: Record<string, Role[]> = {};
    CATEGORIES.slice(1).forEach((cat) => {
      const rolesInCat = filteredRoles.filter((r) => r.category === cat);
      if (rolesInCat.length > 0) {
        groups[cat] = rolesInCat;
      }
    });
    return groups;
  }, [activeCategory, filteredRoles]);

  // Counts for the filter sidebar (always based on full list + search, ignoring category selection itself)
  const counts = useMemo(() => {
    const searchFiltered = SAMPLE_ROLES.filter((r) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
      );
    });

    const c: Record<string, number> = { All: searchFiltered.length };
    CATEGORIES.slice(1).forEach((cat) => {
      c[cat] = searchFiltered.filter((r) => r.category === cat).length;
    });
    return c;
  }, [searchQuery]);

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-[64px]">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-[40px] relative">
        {/* Left Column: Sticky Filters */}
        <FiltersColumn
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          counts={counts}
        />

        {/* Right Column: Roles List */}
        <div>
          {/* Search Bar */}
          <div className="mb-12 sticky top-0 bg-[#F6F1E8] z-20 transition-colors pt-1">
            <div className="h-[40px] border border-[#141414]/10 rounded-[12px] flex items-center px-[14px] bg-transparent focus-within:border-[#141414]/30 transition-colors">
              <div className="text-[#141414]/40">
                <Icons.Search />
              </div>
              <input
                type="text"
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent ml-2 text-[14px] text-[#141414] placeholder-[#141414]/40 focus:outline-none"
              />
            </div>
            {/* "Showing N roles" removed as per previous request/style preference in screenshot */}
          </div>

          {/* Roles List */}
          <div className="space-y-4 min-h-[400px]">
            {Object.keys(groupedRoles).length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-xl text-[#141414]/60 mb-2">
                  No roles found.
                </p>
                <p className="text-[#141414]/40">
                  Try a different keyword or category.
                </p>
              </div>
            ) : (
              (Object.entries(groupedRoles) as [string, Role[]][]).map(
                ([category, roles]) => (
                  <div key={category} className="relative">
                    {/* Category Header */}
                    <div className="sticky top-[40px] bg-[#F6F1E8] py-2 z-10 mt-[18px] mb-2">
                      <h3 className="text-[12px] font-medium uppercase tracking-wider text-[#141414] opacity-55">
                        {category}
                      </h3>
                    </div>

                    <div className="space-y-0">
                      {roles.map((role) => (
                        <RoleRow
                          key={role.id}
                          role={role}
                          onClick={() => setSelectedRole(role)}
                        />
                      ))}
                    </div>
                  </div>
                ),
              )
            )}
          </div>
        </div>
      </div>

      <RoleDrawer role={selectedRole} onClose={() => setSelectedRole(null)} />
    </section>
  );
};

// --- Main App ---

const Footer = () => {
  const handleNavigation = (id: string) => {
    if (id === "home") {
      window.location.href = "/index.html";
    } else if (id === "careers") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "journal") {
      window.location.href = "/journal/index.html";
    } else if (id === "beta") {
      window.location.href = "/beta/index.html";
    } else {
      window.location.href = `/index.html?page=${id}`;
    }
  };

  return (
    <footer className="bg-[#FDFBF7] text-gray-900 pt-32 pb-16 px-6 border-t border-gray-200/60 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="max-w-md text-left">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-[15px] text-left">
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
        <div className="border-t border-gray-200/60 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4 text-left w-full">
          <p>© 2025 Sunday Inc. All rights reserved.</p>
          <button className="flex items-center gap-1 hover:text-black transition-colors">
            <Download size={12} /> <span>Download Source</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const handleNavigate = (pageId: string) => {
    if (pageId === "careers") return;
    if (pageId === "journal") {
      window.location.href = "/journal/index.html";
      return;
    }
    if (pageId === "beta") {
      window.location.href = "/beta/index.html";
      return;
    }
    if (pageId === "home") {
      window.location.href = "/index.html";
      return;
    }
    window.location.href = `/index.html?page=${pageId}`;
  };

  return (
    <main className="w-full min-h-screen relative font-sans text-memo-dark selection:bg-memo-accent selection:text-black">
      <Navbar activePage="careers" onNavigate={handleNavigate} />

      {/* Spacer for top Navbar */}
      <div className="h-32"></div>

      <VideoHero
        src="https://videos.pexels.com/video-files/5473806/5473806-uhd_2560_1440_25fps.mp4"
        label="Careers at Sunday"
        headline="Shape the future of AI robotics"
        className="mb-8"
      />

      <TextBlock />

      <CareersSection />

      <VideoHero
        src="https://videos.pexels.com/video-files/8555655/8555655-uhd_2560_1440_25fps.mp4"
        label="Inside the lab"
        headline="See what we build"
        className="mb-24"
      />

      <Footer />
    </main>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

export default App;
