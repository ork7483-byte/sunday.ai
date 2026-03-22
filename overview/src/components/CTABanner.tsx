import { ArrowRight, Download } from 'lucide-react';

export function CTABanner() {
  return (
    <div className="w-full py-20 bg-[#F2F1E8] relative">
      {/* Floating Download Source Button */}
      <a 
        href="/api/download-source"
        className="fixed top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors text-sm font-medium"
        title="Download Project Source Code"
      >
        <Download size={16} />
        Download Source
      </a>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 */}
          <div className="relative h-[600px] bg-[#F5F5F7] rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center p-8 group cursor-pointer transition-transform duration-500 hover:scale-[1.01]">
            <img 
              src="https://picsum.photos/seed/cta1/800/1000" 
              alt="Product 1" 
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-700"
            />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                
              </div>
              <h3 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">Vision Pro</h3>
              <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">Welcome to the era of spatial computing.</p>
              <a href="#" className="inline-flex items-center text-blue-600 hover:underline font-medium text-lg">
                Learn more <ArrowRight size={18} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative h-[600px] bg-[#F5F5F7] rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center p-8 group cursor-pointer transition-transform duration-500 hover:scale-[1.01]">
            <img 
              src="https://picsum.photos/seed/cta2/800/1000" 
              alt="Product 2" 
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-700"
            />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                
              </div>
              <h3 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">iPhone 16 Pro</h3>
              <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">The ultimate iPhone.</p>
              <a href="#" className="inline-flex items-center text-blue-600 hover:underline font-medium text-lg">
                Buy <ArrowRight size={18} className="ml-1" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
