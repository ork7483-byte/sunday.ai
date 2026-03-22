import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export interface SlideItem {
  id: number;
  video?: string;
  image?: string;
  title: string;
  poster?: string;
}

interface ScrollCarouselProps {
  title?: string;
  subtitle?: string;
  items: SlideItem[];
  dark?: boolean;
}

export function ScrollCarousel({ title, subtitle, items, dark = false }: ScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to active index for video playback
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      Math.max(Math.round(latest * (items.length - 1)), 0),
      items.length - 1
    );
    setActiveIndex(newIndex);
  });

  // Auto-play active video, pause others
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          // Optional: don't reset time to keep continuity if user scrolls back and forth quickly
        }
      }
    });
  }, [activeIndex]);

  // Calculate horizontal offset
  // We want the active item to be centered.
  // Initial position (progress 0): Item 0 is centered.
  // Final position (progress 1): Item N-1 is centered.
  // Center of screen is 50vw.
  // Item width is 60vw. Gap is 2rem (32px).
  // Item 0 center relative to track start: 30vw
  // Track x at progress 0: 50vw - 30vw = 20vw
  // Item N-1 center relative to track start: (N-1)*(60vw + 32px) + 30vw
  // Track x at progress 1: 50vw - ((N-1)*(60vw + 32px) + 30vw) = 20vw - (N-1)*(60vw + 32px)
  
  const x = useTransform(
    scrollYProgress,
    (latest) => {
      const totalScrollVw = (items.length - 1) * 60;
      const totalScrollRem = (items.length - 1) * 2;
      return `calc(20vw - ${latest * totalScrollVw}vw - ${latest * totalScrollRem}rem)`;
    }
  );

  return (
    <div 
      ref={containerRef} 
      className={`relative bg-[#F2F1E8] text-black`}
      style={{ height: `${items.length * 150 + 100}vh` }} // Increased height for slower scroll
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-12 left-[20vw] z-10 text-left pr-4">
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs font-bold uppercase tracking-widest mb-2 text-gray-500"
            >
              {subtitle}
            </motion.p>
          )}
          {title && (
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-semibold tracking-tight"
            >
              {title}
            </motion.h2>
          )}
        </div>
        
        <div className="relative w-full h-[60vh] mt-20">
          <motion.div 
            className="flex gap-8 absolute left-0 h-full items-center"
            style={{ x }}
          >
             {items.map((item, index) => (
               <motion.div
                 key={item.id}
                 className={`relative w-[60vw] aspect-video rounded-2xl overflow-hidden shrink-0 transition-all duration-500 ${
                   index === activeIndex ? 'opacity-100 scale-100 shadow-2xl' : 'opacity-40 scale-90'
                 }`}
               >
                 {item.video ? (
                   <video
                     ref={(el) => {
                       videoRefs.current[index] = el;
                     }}
                     src={item.video}
                     poster={item.poster}
                     muted
                     loop
                     playsInline
                     className="w-full h-full object-cover"
                   />
                 ) : (
                   <img 
                     src={item.image} 
                     alt={item.title} 
                     className="w-full h-full object-cover"
                   />
                 )}
                 
                 <div className={`absolute bottom-8 left-8 text-white transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}>
                   <h3 className="text-2xl md:text-3xl font-semibold drop-shadow-md">{item.title}</h3>
                 </div>
               </motion.div>
             ))}
          </motion.div>
        </div>
        
        <motion.p 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-12 left-0 right-0 text-center text-sm text-gray-500"
        >
          Scroll to explore
        </motion.p>
      </div>
    </div>
  );
}
