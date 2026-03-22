import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Watch, 
  Glasses, 
  Headphones, 
  Tv, 
  Search, 
  ChevronRight, 
  Wrench, 
  Settings, 
  Battery, 
  MessageSquare,
  MapPin
} from 'lucide-react';
import { Navbar } from './components/Navbar';

// Apple Logo Component
const AppleLogo = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.05-.74 3.44-.74 1.5.04 2.65.65 3.32 1.65-2.92 1.76-2.38 5.95.53 7.14-.65 1.65-1.53 3.26-2.37 4.18zM12.03 7.25c-.15-2.23 1.68-4.06 3.71-4.25.26 2.41-2.26 4.44-3.71 4.25z" />
  </svg>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#F2F1E8] text-gray-900 pb-20">
      <Navbar />
      {/* Header Section */}
      <header className="pt-24 pb-12 text-center px-4">
        <div className="flex justify-center mb-6">
          <AppleLogo className="w-12 h-12 text-black" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Apple 지원</h1>
        <p className="text-xl text-gray-500 font-medium">도움이 필요하십니까? 여기에서 시작하세요.</p>
      </header>

      {/* Device Icon Grid */}
      <section className="container mx-auto max-w-5xl px-4 mb-16">
        <div className="grid grid-cols-4 md:grid-cols-7 gap-8 justify-items-center">
          {[
            { icon: Smartphone, label: "iPhone" },
            { icon: Laptop, label: "Mac" },
            { icon: Tablet, label: "iPad" },
            { icon: Watch, label: "Watch" },
            { icon: Glasses, label: "Vision" },
            { icon: Headphones, label: "AirPods" },
            { icon: Tv, label: "TV" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-3 flex items-center justify-center transition-transform group-hover:scale-105">
                <item.icon className="w-10 h-10 md:w-12 md:h-12 stroke-[1.5]" />
              </div>
              <span className="text-sm font-medium group-hover:underline decoration-1 underline-offset-4">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Support Tools (Quick Links) */}
      <section className="container mx-auto max-w-5xl px-4 mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">지원 도구</h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          {[
            "Apple 계정 암호 재설정하기",
            "맞춤형 AppleCare 플랜 확인하기",
            "구독 변경하기"
          ].map((text, index) => (
            <button 
              key={index}
              className="bg-gray-100 hover:bg-gray-200 text-sm font-medium py-3 px-6 rounded-full transition-colors"
            >
              {text}
            </button>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section className="container mx-auto max-w-5xl px-4 mb-20">
        <h2 className="text-2xl font-bold text-center mb-8">추가 주제 검색하기</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full py-4 pl-12 pr-4 text-gray-900 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg placeholder-gray-400"
            placeholder="지원 검색하기"
          />
        </div>
      </section>

      {/* Main Feature Cards */}
      <section className="container mx-auto max-w-5xl px-4 space-y-8 mb-20">
        {/* AppleCare Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row h-auto md:h-[400px]">
          <div className="w-full md:w-1/2 bg-gray-50 relative p-8 flex items-center justify-center">
             {/* Abstract representation of devices for AppleCare */}
             <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute top-1/4 left-1/4 w-32 h-48 bg-white rounded-2xl shadow-md border border-gray-200 transform -rotate-6 z-10 flex items-center justify-center">
                   <Smartphone className="w-16 h-16 text-gray-300" />
                </div>
                <div className="absolute top-1/3 right-1/4 w-48 h-32 bg-white rounded-2xl shadow-md border border-gray-200 transform rotate-3 z-0 flex items-center justify-center">
                   <Laptop className="w-20 h-20 text-gray-300" />
                </div>
                <div className="absolute bottom-10 left-1/3 flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm z-20">
                   <AppleLogo className="w-4 h-4 text-red-500" />
                   <span className="font-semibold text-gray-800">Care</span>
                </div>
             </div>
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4 leading-tight">AppleCare로<br/>관리하기</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              모든 AppleCare 플랜은 Apple 제품에 대한 원스톱 서비스를 제공하며, 제품 낙하 및 액체 유입 등의 사고에 대한 빠르고 쉬운 수리를 제공합니다.
            </p>
            <a href="#" className="text-blue-600 hover:underline flex items-center font-medium">
              더 알아보기 <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>

        {/* Repair Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row h-auto md:h-[400px]">
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
            <h3 className="text-3xl font-bold mb-4 leading-tight">Apple 수리 및 서비스</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              신뢰할 수 있는 전문가가 Apple 정품 부품을 사용해 수행하는 Apple 인증 수리를 받을 수 있도록 도와드리겠습니다.
            </p>
            <a href="#" className="text-blue-600 hover:underline flex items-center font-medium">
              수리 시작하기 <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="w-full md:w-1/2 bg-blue-500 relative p-8 overflow-hidden order-1 md:order-2">
            {/* Pattern of icons */}
            <div className="grid grid-cols-4 gap-8 opacity-20 transform -rotate-12 scale-125">
               {[...Array(16)].map((_, i) => (
                 <div key={i} className="flex justify-center">
                   {i % 4 === 0 && <Wrench className="w-12 h-12 text-white" />}
                   {i % 4 === 1 && <Settings className="w-12 h-12 text-white" />}
                   {i % 4 === 2 && <Battery className="w-12 h-12 text-white" />}
                   {i % 4 === 3 && <Smartphone className="w-12 h-12 text-white" />}
                 </div>
               ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-32 h-32 bg-blue-400 rounded-full flex items-center justify-center shadow-inner">
                  <Wrench className="w-16 h-16 text-white" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="container mx-auto max-w-5xl px-4 mb-20">
        <h2 className="text-2xl font-bold text-center mb-8">더 살펴보기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Apple Support App */}
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-gray-100 transition-colors">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-md">
              <AppleLogo className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Apple 지원 앱</h3>
            <p className="text-gray-500 text-sm mb-6 px-4">
              모든 Apple 제품에 대한 지원을 한 곳에서 확인해 보세요. 전문가와의 연결도 가능합니다.
            </p>
            <a href="#" className="text-blue-600 hover:underline flex items-center text-sm font-medium mt-auto">
              다운로드하기 <ChevronRight className="w-3 h-3 ml-1" />
            </a>
          </div>

          {/* Today at Apple */}
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-gray-100 transition-colors">
            <div className="w-full h-48 bg-gray-200 rounded-2xl mb-6 overflow-hidden relative">
               <img 
                 src="https://picsum.photos/seed/apple/400/300" 
                 alt="Today at Apple" 
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
            </div>
            <h3 className="text-xl font-bold mb-2">Today at Apple</h3>
            <p className="text-gray-500 text-sm mb-6 px-4">
              Apple Store에서 진행되는 창의적 세션에서 배우고, 창작하고 영감을 받아 보세요.
            </p>
            <a href="#" className="text-blue-600 hover:underline flex items-center text-sm font-medium mt-auto">
              참가 신청하기 <ChevronRight className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Text Info Sections */}
      <section className="container mx-auto max-w-5xl px-4 space-y-4 mb-20">
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold mb-3">내구성을 고려한 설계</h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-4xl mx-auto">
            Apple은 항상 고객에게 최고의 경험을 제공하기 위해 노력하고 있으며, 이를 위해 오래 사용할 수 있는 제품을 디자인하고 있습니다. 내구성을 고려한 설계는 Apple의 전사적인 노력으로, 첫 번째 프로토타입을 제작하기 훨씬 전에 초기 결정을 내리고 과거 고객 사용 데이터와 향후 사용 예측을 반영합니다. 엔진, 모건, 개인 정보 보호에서 마감까지 챙기면서 내구성과 수리 용이성 사이의 균형을 유지해야 합니다.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            안전하고 신뢰할 수 있는 수리를 비롯하여 내구성을 고려한 Apple의 설계 방식에 대해 자세히 알아보십시오. <a href="#" className="text-blue-600 hover:underline">보기(PDF)</a>
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold mb-3">유사/모조품 주의</h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-4xl mx-auto text-left md:text-center">
            일부 유사/모조품과 타사 배터리 및 전원 어댑터는 제대로 설계되지 않아 안전 관련 문제를 초래할 수 있습니다. 배터리 교체 시 Apple 정품 배터리로 교체하기 위해서는 <a href="#" className="text-blue-600 hover:underline">Apple Store</a> 또는 <a href="#" className="text-blue-600 hover:underline">Apple 공인 서비스 제공업체</a>를 방문하시는 것이 좋습니다. Apple 기기 충전용 어댑터를 교체해야 한다면 Apple 전원 어댑터로 교체하시는 것이 좋습니다.
          </p>
          <p className="text-gray-500 text-sm mt-4 text-left md:text-center">
            정품이 아닌 교체용 디스플레이는 시각적 품질이 좋지 않거나 제대로 작동하지 않을 수 있습니다. 신뢰할 수 있는 전문가가 정품 Apple 부품만을 사용하여 Apple 인증 디스플레이 수리를 수행합니다.
          </p>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="container mx-auto max-w-5xl px-4 pb-12">
        <h3 className="font-bold mb-4 text-sm">Apple 서비스 프로그램</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-blue-600 hover:underline text-xs">전원이 켜지지 않는 문제에 대한 Mac mini 서비스 프로그램</a></li>
          <li><a href="#" className="text-blue-600 hover:underline text-xs">후면 카메라 문제에 대한 iPhone 14 Plus 서비스 프로그램</a></li>
          <li><a href="#" className="text-blue-600 hover:underline text-xs">15형 MacBook Pro 배터리 리콜 프로그램</a></li>
          <li><a href="#" className="text-blue-600 hover:underline text-xs">모든 프로그램 보기 <ChevronRight className="w-3 h-3 inline" /></a></li>
        </ul>
      </footer>
    </div>
  );
}
