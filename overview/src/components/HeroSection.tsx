import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      >
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        {/* Fallback if video fails */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/80 z-10" />
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-end items-center pb-24 md:pb-32 px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-tight drop-shadow-lg">
            새롭게 경험하는 세상.<br />
            새롭게 바뀌는 일상.
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
