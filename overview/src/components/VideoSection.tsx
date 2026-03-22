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
            당신의 위젯과 앱.<br />
            놓아둔 그 자리에 항상 그대로.
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
            방 한 켠에서 오늘의 주요 뉴스를 읽을 때에도 나의 실제 공간은 그대로<br className="hidden md:block" />
            보이도록 할 수 있습니다. 사진을 감상할 때는 주변 조명을 어둡게 줄이면<br className="hidden md:block" />
            마치 숲과 같은 분위기를 연출할 수 있죠. 그리고 몰입의 다이얼을 Digital Crown으로 돌려<br className="hidden md:block" />
            공간 환경의 정도 - 현실과 Apple Vision Pro 경험을 조절할 수 있습니다.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
