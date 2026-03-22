import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export interface SlideItem {
  id: number;
  video?: string;
  image?: string;
  title: string;
  poster?: string;
}

interface ClickCarouselProps {
  title?: string;
  subtitle?: string;
  items: SlideItem[];
  dark?: boolean;
}

export function ClickCarousel({ title, subtitle, items, dark = false }: ClickCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play active video, pause others
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch(() => {}); // Ignore auto-play errors
        } else {
          video.pause();
          video.currentTime = 0; // Optional: reset video
        }
      }
    });
  }, [currentIndex]);

  const itemWidth = isMobile ? '85vw' : '60vw';

  return (
    <div className={`w-full overflow-hidden py-16 md:py-24 ${dark ? 'bg-black text-white' : 'bg-[#F2F1E8] text-black'}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {subtitle && (
          <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            {subtitle}
          </p>
        )}
        {title && (
          <h2 className="text-3xl md:text-5xl font-semibold mb-8 md:mb-12 tracking-tight">
            {title}
          </h2>
        )}
        
        <div className="relative h-[40vh] md:h-[60vh] w-full">
          <motion.div 
            className="flex gap-4 md:gap-8 absolute left-0 h-full"
            animate={{ 
              x: `calc(-1 * (${currentIndex} * (${itemWidth} + ${isMobile ? '1rem' : '2rem'})))`
            }}
            transition={{ type: "spring", stiffness: 100, damping: 40, mass: 1.2 }}
          >
             {items.map((item, index) => (
               <motion.div
                 key={item.id}
                 className={`relative w-[85vw] md:w-[60vw] h-full rounded-2xl overflow-hidden shrink-0 transition-all duration-700 cursor-pointer ${
                   index === currentIndex ? 'opacity-100 scale-100 shadow-2xl' : 'opacity-40 scale-95 hover:opacity-60'
                 }`}
                 onClick={() => setCurrentIndex(index)}
               >
                 {item.video ? (
                   <video
                     ref={el => videoRefs.current[index] = el}
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
                 
                 <div className={`absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                   <h3 className="text-xl md:text-3xl font-semibold drop-shadow-md">{item.title}</h3>
                 </div>
               </motion.div>
             ))}
          </motion.div>
        </div>
        <p className={`text-center mt-6 md:mt-8 text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
          {items[0].video ? "Tap a video to focus" : "Tap an image to focus"}
        </p>
      </div>
    </div>
  );
}
