import { motion } from 'framer-motion';
import { useRef } from 'react';

export function VideoSection() {
  return (
    <div className="w-full py-32 bg-[#F2F1E8]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Innovation</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
            Your widgets and apps.<br />
            Always exactly where you left them.
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black relative"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
          </video>
          
          {/* Play button overlay simulation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center pl-1">
              <div className="w-0 h-0 border-t-10 border-t-transparent border-l-18 border-l-white border-b-10 border-b-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-2xl"
        >
          <p className="text-lg text-gray-600 leading-relaxed">
            Read today's top news from the corner of your room while your real space<br className="hidden md:block" />
            remains entirely visible. When viewing photos, you can dim the surrounding glow<br className="hidden md:block" />
            to create a forest-like atmosphere. And by turning the Digital Crown,<br className="hidden md:block" />
            you can adjust your level of immersion—blending reality with your device experience.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
