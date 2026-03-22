/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeroSection } from './components/HeroSection';
import { ClickCarousel, SlideItem } from './components/ClickCarousel';
import { ScrollCarousel } from './components/ScrollCarousel';
import { VideoSection } from './components/VideoSection';
import { FeatureGrid } from './components/FeatureGrid';
import { CTABanner } from './components/CTABanner';
import { Navbar } from './components/Navbar';

import { Footer } from './components/Footer';

export default function App() {
  // Section 2 Data
  const carouselItems: SlideItem[] = [
    { 
      id: 1, 
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", 
      title: "Cinematic Experience",
      poster: "https://picsum.photos/seed/poster1/1600/900"
    },
    { 
      id: 2, 
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", 
      title: "Pro Workflow",
      poster: "https://picsum.photos/seed/poster2/1600/900"
    },
    { 
      id: 3, 
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", 
      title: "Capture Life",
      poster: "https://picsum.photos/seed/poster3/1600/900"
    },
    { 
      id: 4, 
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", 
      title: "Escape Reality",
      poster: "https://picsum.photos/seed/poster4/1600/900"
    },
    { 
      id: 5, 
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", 
      title: "Pure Fun",
      poster: "https://picsum.photos/seed/poster5/1600/900"
    },
  ];

  // Section 4 Data
  const section4Items: SlideItem[] = [
    { id: 1, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", title: "Speed", poster: "https://picsum.photos/seed/s4p1/1600/900" },
    { id: 2, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", title: "Power", poster: "https://picsum.photos/seed/s4p2/1600/900" },
    { id: 3, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", title: "Emotion", poster: "https://picsum.photos/seed/s4p3/1600/900" },
    { id: 4, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", title: "Adventure", poster: "https://picsum.photos/seed/s4p4/1600/900" },
    { id: 5, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", title: "Sci-Fi", poster: "https://picsum.photos/seed/s4p5/1600/900" },
  ];

  // Section 5 Data
  const section5Items: SlideItem[] = [
    { id: 1, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4", title: "Design", poster: "https://picsum.photos/seed/s5p1/1600/900" },
    { id: 2, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", title: "Journey", poster: "https://picsum.photos/seed/s5p2/1600/900" },
    { id: 3, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4", title: "Value", poster: "https://picsum.photos/seed/s5p3/1600/900" },
    { id: 4, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Animation", poster: "https://picsum.photos/seed/s5p4/1600/900" },
    { id: 5, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Dream", poster: "https://picsum.photos/seed/s5p5/1600/900" },
  ];

  // Section 6 Data
  const section6Items: SlideItem[] = [
    { id: 1, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "Intensity", poster: "https://picsum.photos/seed/s6p1/1600/900" },
    { id: 2, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", title: "Freedom", poster: "https://picsum.photos/seed/s6p2/1600/900" },
    { id: 3, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", title: "Joy", poster: "https://picsum.photos/seed/s6p3/1600/900" },
    { id: 4, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", title: "Thrill", poster: "https://picsum.photos/seed/s6p4/1600/900" },
    { id: 5, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", title: "Drama", poster: "https://picsum.photos/seed/s6p5/1600/900" },
  ];

  // Section 7 Data
  const section7Items: SlideItem[] = [
    { id: 1, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", title: "Story", poster: "https://picsum.photos/seed/s7p1/1600/900" },
    { id: 2, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", title: "Explore", poster: "https://picsum.photos/seed/s7p2/1600/900" },
    { id: 3, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", title: "Future", poster: "https://picsum.photos/seed/s7p3/1600/900" },
    { id: 4, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4", title: "Classic", poster: "https://picsum.photos/seed/s7p4/1600/900" },
    { id: 5, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", title: "Race", poster: "https://picsum.photos/seed/s7p5/1600/900" },
  ];

  const handleNavigate = (page: string) => {
    if (page === 'home') {
      window.location.href = '/index.html';
    }
  };

  const handleDownloadSource = async () => {
    try {
      // You can define download logic here if needed
      console.log('Download Source clicked');
    } catch (error) {
      console.error('Error downloading source:', error);
      alert('Failed to download source code');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F1E8]">
      <Navbar />
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Scroll Carousel (가로 스크롤) */}
      <ScrollCarousel 
        title="일단 핵심부터." 
        items={carouselItems} 
      />

      {/* Section 3: Video with Margins */}
      <VideoSection />

      {/* Section 4 */}
      <ScrollCarousel 
        title="지금까지 경험한 적 없는 웹 브라우징." 
        subtitle="Connectivity"
        items={section4Items} 
      />

      {/* Section 5 */}
      <ScrollCarousel 
        title="상호 작용하는 새로운 방법들." 
        subtitle="Productivity"
        items={section5Items} 
      />

      {/* Section 6 */}
      <ScrollCarousel 
        title="볼거리는 더 많이. 보는 시각은 새롭게." 
        subtitle="Entertainment"
        items={section6Items} 
      />

      {/* Section 7 */}
      <ScrollCarousel 
        title="어디로든 떠나 극한에 도전하다." 
        subtitle="Environment"
        items={section7Items} 
        dark={true}
      />

      {/* Section 8: Feature Grid */}
      <section className="bg-[#F2F1E8]">
        <div className="max-w-[1400px] mx-auto px-8 pt-24">
          <h2 className="text-3xl font-semibold mb-4">그 밖의 다양한 기능들.</h2>
        </div>
        <FeatureGrid />
      </section>

      {/* Section 9: CTA Banner */}
      <CTABanner />

      <Footer onNavigate={handleNavigate} onDownloadSource={handleDownloadSource} />
    </div>
  );
}
