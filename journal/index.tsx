import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Play, ChevronDown, Download, Cpu, Battery, Eye, Shield, Mail, FileText, Globe, Layers, Sparkles } from 'lucide-react';

// --- Navbar Component from Main Page ---
const Navbar = ({ activePage = 'journal', onNavigate }: { activePage?: string, onNavigate?: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const menuItems = [
    { id: 'home', label: 'Overview', desc: 'The future of home robotics.' },
    { id: 'product', label: 'Technology', desc: 'Under the hood of Memo.' },
    { id: 'business', label: 'Company', desc: 'Our mission and partners.' },
    { id: 'support', label: 'Support', desc: 'We are here to help.' },
    { id: 'careers', label: 'Careers', desc: 'Join the revolution.' },
    { id: 'journal', label: 'Journal', desc: 'Stories from the lab.' },
    { id: 'beta', label: 'Beta', desc: 'Join the founding family.' }
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
    if (id === 'home') {
      window.location.href = '/index.html';
    } else if (id === 'careers') {
      window.location.href = '/careers/index.html';
    } else if (id === 'journal') {
      // Already on journal page
      setIsOpen(false);
    } else if (id === 'beta') {
      window.location.href = '/beta/index.html';
    } else {
      window.location.href = `/index.html?page=${id}`;
    }
  };

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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 cursor-pointer" onClick={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav layout initial={false} animate={isOpen ? "open" : "closed"}
          className={`bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden relative z-50 ${isOpen ? "rounded-[2rem] w-full max-w-4xl" : "rounded-full w-auto"}`}
          transition={{ type: "spring", stiffness: 220, damping: 25, mass: 0.8 }}
        >
          <motion.div layout className={`flex items-center justify-between transition-all duration-300 ${isOpen ? "p-6" : "pl-5 pr-6 py-3 gap-12"}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-memo-dark rounded-lg flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform" onClick={(e) => { e.stopPropagation(); window.location.href='/index.html'; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="currentColor" /></svg>
              </div>
              <span className="font-display font-bold text-lg tracking-wide text-memo-dark cursor-pointer select-none hover:opacity-70 transition-opacity" onClick={(e) => { e.stopPropagation(); window.location.href='../index.html'; }}>SUNDAY</span>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 transition-colors relative" aria-label="Toggle Menu">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }} className="absolute inset-0 flex items-center justify-center">
                    <X size={20} className="text-memo-dark" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }} className="flex flex-col gap-1.5 items-end absolute inset-0 justify-center pr-2">
                    <span className="w-5 h-0.5 bg-memo-dark rounded-full"></span>
                    <span className="w-3 h-0.5 bg-memo-dark rounded-full"></span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
          <AnimatePresence>
            {isOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="border-t border-gray-100/50">
                <div className="flex flex-col md:flex-row min-h-[500px]">
                  <div className="flex-1 p-8 flex flex-col justify-center gap-2 md:gap-3">
                    {menuItems.map(item => (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavigation(item.id)} className="text-left group relative py-1 pl-4 border-l-2 border-transparent hover:border-[#D4E76A] transition-all" whileHover={{ x: 5 }}>
                        <span className={`block text-3xl font-display font-medium transition-colors ${activePage === item.id ? 'text-memo-dark' : 'text-gray-400 group-hover:text-memo-dark'}`}>{item.label}</span>
                        <span className="hidden md:block text-xs font-sans text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 -translate-y-1/2 left-[200px] w-48 whitespace-nowrap pointer-events-none">{item.desc}</span>
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
                  <span className="flex items-center gap-2">System Online <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
};

// --- Icons ---
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const VolumeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const MuteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// --- Component: VideoHero ---
interface VideoHeroProps {
  src: string;
  variant: 'top' | 'bottom';
  headline?: string;
  subline?: string;
}

const VideoHero = ({ src, variant, headline, subline }: VideoHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((e) => {
          console.log("Autoplay prevented or failed:", e);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={`relative w-full rounded-[20px] overflow-hidden bg-black shadow-lg transition-all duration-700 group ${
      variant === 'top' ? 'h-[70vh] min-h-[500px]' : 'h-[50vh] min-h-[400px]'
    }`}>
      {/* Video / Fallback */}
      {!hasError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black animate-pulse" />
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />

      {/* Controls Top-Left */}
      <div className="absolute top-6 left-6 z-20 flex space-x-2">
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          onClick={toggleMute}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MuteIcon /> : <VolumeIcon />}
        </button>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10 pointer-events-none">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-auto w-full">
          
          {/* Left Content */}
          <div className="text-white">
            {subline && (
              <div className="flex items-center space-x-2 text-white/80 text-xs font-semibold tracking-widest uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>{subline}</span>
              </div>
            )}
            <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight max-w-lg">
              {headline || "Visual Storytelling"}
            </h2>
          </div>

          {/* Right Content (CTA) */}
          <div>
            <button className="group relative inline-flex items-center px-6 py-3 bg-white text-black rounded-full font-medium text-sm md:text-base transition-all hover:bg-gray-100 hover:scale-105 active:scale-95">
              <span>Read Full Story</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                <ArrowRightIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Section 2 Data & Components ---

interface Post {
  id: number;
  category: string;
  title: string;
  dateText: string;
  thumbnail: string;
  href: string;
  ctaHover: string; // New field for hover text
}

const SAMPLE_POSTS: Post[] = [
  {
    id: 1,
    category: 'Stories',
    title: 'This Home Robot Clears Tables and Loads the Dishwasher All by Itself',
    dateText: 'November 20, 2025',
    thumbnail: '/assets/thumb-1.jpg',
    href: '#',
    ctaHover: '↗ Read more on wired.com'
  },
  {
    id: 2,
    category: 'Research',
    title: 'ACT-1: A Robot Foundation Model Trained on Zero Robot Data',
    dateText: 'November 19, 2025',
    thumbnail: '/assets/thumb-2.jpg',
    href: '#',
    ctaHover: '↗ Read article'
  },
  {
    id: 3,
    category: 'Stories',
    title: 'No Priors Episode | Conviction',
    dateText: 'November 18, 2025',
    thumbnail: '/assets/thumb-3.jpg',
    href: '#',
    ctaHover: '↗ Read more on youtube.com'
  },
  {
    id: 4,
    category: 'Research',
    title: 'Learning Dexterous Manipulation from Human Videos',
    dateText: 'November 15, 2025',
    thumbnail: '/assets/thumb-2.jpg',
    href: '#',
    ctaHover: '↗ Read article'
  },
  {
    id: 5,
    category: 'Stories',
    title: 'A Day in the Life of a Robot Teacher',
    dateText: 'November 12, 2025',
    thumbnail: '/assets/thumb-1.jpg',
    href: '#',
    ctaHover: '↗ Read more on wired.com'
  }
];

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <a 
    href={post.href}
    data-card="post"
    className="group flex flex-col bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-[2px]"
  >
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
      <img 
        src={post.thumbnail} 
        alt={post.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
          (e.target as HTMLImageElement).parentElement!.classList.add('fallback-gradient');
        }}
      />
    </div>
    <div className="flex flex-col flex-1 p-6">
      <h3 className="text-lg md:text-xl font-bold leading-tight mb-4 group-hover:text-gray-700 transition-colors line-clamp-2">
        {post.title}
      </h3>
      {/* 
         Meta Line Container 
         - Added cardMetaLine class
         - Added data-hover-text attribute for CSS content
      */}
      <div 
        className="cardMetaLine mt-auto pt-4 border-t border-gray-100 flex items-center text-xs md:text-sm text-gray-500 font-medium"
        data-hover-text={post.ctaHover}
      >
        <span className="uppercase tracking-wider text-black/70">{post.category}</span>
        <span className="mx-2 text-gray-300">·</span>
        <span>{post.dateText}</span>
      </div>
    </div>
  </a>
);

const Footer = () => {
  const handleNavigation = (id: string) => {
    if (id === "home") {
      window.location.href = "/index.html";
    } else if (id === "careers") {
      window.location.href = "/careers/index.html";
    } else if (id === "journal") {
      window.scrollTo({ top: 0, behavior: "smooth" });
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

// --- Main App ---
const App = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Stories', 'Research'];

  const filteredPosts = useMemo(() => {
    return SAMPLE_POSTS.filter(post => {
      const matchCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.dateText.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8 md:py-12 flex flex-col gap-12 pt-28">
      <Navbar />

      {/* SECTION 1: Top Hero */}
      <section>
        <VideoHero 
          src="/assets/hero.mp4" 
          variant="top" 
          headline="The Future of Robotics"
          subline="Research & Development"
        />
      </section>

      {/* SECTION 2: Filterable Grid */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-8 relative">
        
        {/* Left Sticky Sidebar */}
        <div className="w-full lg:w-[260px] flex-shrink-0 flex flex-col gap-8 lg:sticky lg:top-8 h-fit">
          
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input 
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 lg:py-2.5 text-left rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-black text-white shadow-md' 
                    : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count (Desktop) */}
          <div className="hidden lg:block pt-4 border-t border-gray-200">
             <p className="text-xs font-medium text-gray-400">
               Showing {filteredPosts.length} posts
             </p>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 min-h-[400px]">
          {/* Mobile Count */}
          <div className="block lg:hidden mb-6">
             <p className="text-xs font-medium text-gray-400">
               Showing {filteredPosts.length} posts
             </p>
          </div>

          {/* Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="w-full h-64 flex flex-col items-center justify-center text-center p-8 bg-white rounded-[20px] border border-dashed border-gray-200">
              <p className="text-gray-900 font-semibold mb-1">No posts found</p>
              <p className="text-gray-500 text-sm">Try searching for a different keyword or category.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                className="mt-4 text-sm font-medium text-blue-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: Bottom Hero */}
      <section>
        <VideoHero 
          src="/assets/footer.mp4" 
          variant="bottom" 
          headline="Behind the Scenes"
          subline="Studio Culture"
        />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;