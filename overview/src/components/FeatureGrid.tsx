import { motion } from 'framer-motion';
import { 
  Cpu, 
  Battery, 
  Wifi, 
  Camera, 
  Shield, 
  Zap, 
  Smartphone, 
  Globe,
  Music,
  Layers,
  Eye,
  Mic
} from 'lucide-react';

export function FeatureGrid() {
  const features = [
    { icon: Cpu, title: "Advanced Chip", desc: "The fastest chip ever in a smartphone." },
    { icon: Battery, title: "All-Day Battery", desc: "Go longer than ever before." },
    { icon: Wifi, title: "5G Speed", desc: "Superfast downloads and high-quality streaming." },
    { icon: Camera, title: "Pro Camera", desc: "Capture incredible detail in any light." },
    { icon: Shield, title: "Privacy Built-in", desc: "Your data belongs to you." },
    { icon: Zap, title: "Fast Charge", desc: "Up to 50% charge in 30 minutes." },
    { icon: Smartphone, title: "Super Retina XDR", desc: "OLED display that pushes the limits." },
    { icon: Globe, title: "Carbon Neutral", desc: "Designed with the planet in mind." },
    { icon: Music, title: "Spatial Audio", desc: "Sound all around you." },
    { icon: Layers, title: "Ceramic Shield", desc: "Tougher than any smartphone glass." },
    { icon: Eye, title: "Face ID", desc: "The most secure facial authentication." },
    { icon: Mic, title: "Studio Mics", desc: "Record like a pro." },
  ];

  return (
    <div className="w-full pb-32 pt-12 bg-[#F2F1E8]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="flex flex-col items-start"
            >
              <div className="mb-4 text-gray-900">
                <feature.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
