import React from "react";
import { Download } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
  onDownloadSource?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onDownloadSource,
}) => {
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
              <span className="font-bold text-black uppercase tracking-widest text-[11px]">
                Explore
              </span>
              <button
                onClick={() => onNavigate && onNavigate("home")}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Overview
              </button>
              <button
                onClick={() => onNavigate && onNavigate("product")}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Technology
              </button>
              <button
                onClick={() => {
                  window.location.href = "/journal/index.html";
                }}
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
                onClick={() => onNavigate && onNavigate("business")}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Company
              </button>
              <button
                onClick={() => {
                  window.location.href = "/careers/index.html";
                }}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Careers
              </button>
              <button
                onClick={() => {
                  window.location.href = "/beta/index.html";
                }}
                className="text-left text-gray-500 hover:text-black transition-colors"
              >
                Beta Program
              </button>
              <button
                onClick={() => onNavigate && onNavigate("support")}
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
        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2025 Sunday Inc. All rights reserved.</p>
          <button
            onClick={onDownloadSource}
            className="flex items-center gap-1 hover:text-black transition-colors"
          >
            <Download size={12} /> <span>Download Source</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
