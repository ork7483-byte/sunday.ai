import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface SlideItem {
  id: number;
  image: string;
  title?: string;
  subtitle?: string;
}

interface ButtonSliderProps {
  items: SlideItem[];
  itemsPerView?: { mobile: number; tablet: number; desktop: number };
  aspectRatio?: string;
  dark?: boolean;
}

export function ButtonSlider({ 
  items, 
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  aspectRatio = "aspect-[4/3]",
  dark = false
}: ButtonSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState(itemsPerView.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(itemsPerView.tablet);
      } else {
        setVisibleItems(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, items.length - visibleItems);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative group">
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          className="flex gap-6"
          initial={false}
          animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {items.map((item) => (
            <div 
              key={item.id} 
              className={`shrink-0 ${
                visibleItems === 1 ? 'w-full' : 
                visibleItems === 2 ? 'w-[calc(50%-12px)]' : 
                'w-[calc(33.333%-16px)]'
              }`}
            >
              <div className={`relative overflow-hidden rounded-2xl ${aspectRatio} group/card cursor-pointer`}>
                <img 
                  src={item.image} 
                  alt={item.title || "Slide image"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
                {(item.title || item.subtitle) && (
                  <div className={`absolute inset-0 p-6 flex flex-col justify-end ${dark ? 'text-white bg-linear-to-t from-black/60 to-transparent' : 'text-black'}`}>
                    {item.subtitle && <p className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-80">{item.subtitle}</p>}
                    {item.title && <h3 className="text-xl font-semibold">{item.title}</h3>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button 
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`p-3 rounded-full transition-all duration-200 ${
            currentIndex === 0 
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className={`p-3 rounded-full transition-all duration-200 ${
            currentIndex === maxIndex 
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
