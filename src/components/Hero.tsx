import React from 'react';

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          以匠人之手，<br className="md:hidden" />築你所想之居
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-2">
          Fit Renov. 專業室內設計與裝修工程
        </p>
        <p className="text-md text-gray-300 mb-10 max-w-2xl mx-auto">
          結合傳統職人工藝與量身定制的現代美學，為您打造完美家居。透明報價，絕無隱藏收費。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <button 
            className="btn-primary px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2"
            onClick={() => {
              document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            立即獲取免費初步估價
          </button>
          <button 
            className="px-8 py-4 rounded-full text-lg font-semibold bg-white/10 text-white backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-all duration-200"
            onClick={() => {
              document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            了解服務流程
          </button>
        </div>
      </div>
    </section>
  );
}
