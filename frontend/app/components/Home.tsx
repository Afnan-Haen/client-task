"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-[#0f172a] text-slate-50 font-sans selection:bg-indigo-500/30">
      
      

      {/* Hero Section */}
      <section className="hero-section relative min-h-[700px] overflow-hidden flex items-center pt-28 pb-12 md:pt-30 md:pb-16 lg:pt-35 lg:pb-25" id="hero">
        {/* Sunset Skyline Background with dark to soft fade overlays */}
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://cdn.prod.website-files.com/69fda2cd307dcc6cf810e935/6a3a2438c708e1ff558f3710_hero-bg.png')" }}></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/85 via-white/50 to-transparent hidden max-[630px]:block pointer-events-none"></div>

        <div className="relative z-10 mx-auto lg:container w-full px-4 lg:px-8">
          <div className="max-w-3xl">
            
            {/* Hero Content */}
            <div className="hero-left-content flex flex-col items-start">
              {/* Badge Capsule */}
              <h1 className="inline-flex items-center gap-1.5 m-0 bg-[linear-gradient(90deg,_rgba(144,_68,_169,_0.2)_0%,_rgba(184,_126,_200,_0.2)_100%)] text-[#8841A0] leading-[1] text-xs font-normal px-3 py-2 rounded-full mb-4">
                Best e-Invoicing Software in the Philippines
              </h1>
              {/* Headline */}
              <h2 className="text-[36px] lg:text-[44px] xl:text-[56px] font-medium leading-[1.14] mb-4 bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(180deg, #AA50C8 0%, #030203 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
               Want an EIS readiness walkthrough for your business?
              </h2>
              
              {/* Description */}
              <p className="text-base sm:text-lg text-[#150B19]/80 leading-normal mb-8">
                  ClearTax converts your ERP invoice data into BIR-compliant structured JSON, transmits data to the EIS within the mandated 3-day window, and keeps your business audit-ready, automatically.
              </p>
               
              
              
              
              {/* Call to Action button */}
              <button 
                onClick={() => {
                  const el = document.getElementById('gridRisk');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-12 py-2 md:py-4 font-gilroy rounded-full font-normal text-white transition-all duration-300 hover:-translate-y-1 text-base cursor-pointer bg-[linear-gradient(90deg,_#110072_0%,_#7A5698_100%)] border border-white/20"
                style={{ outline: "none" }}
              >
                Explore platform
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-8 bg-slate-950 relative border-t border-slate-900/50">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">Everything a writer needs</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Focus on your words. We handle the design, typography, and delivery to your audience.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-3xl hover:bg-slate-800/40 transition-colors backdrop-blur-sm group">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                ✍️
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Distraction-Free Editor</h3>
              <p className="text-slate-400 leading-relaxed">A clean, markdown-supported editing experience that gets out of your way so the ideas can flow.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-3xl hover:bg-slate-800/40 transition-colors backdrop-blur-sm group">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                🎨
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Beautiful Typography</h3>
              <p className="text-slate-400 leading-relaxed">Carefully crafted fonts and spacing ensure your articles look absolutely stunning on any device.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-3xl hover:bg-slate-800/40 transition-colors backdrop-blur-sm group">
              <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                🚀
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Instant Publishing</h3>
              <p className="text-slate-400 leading-relaxed">Hit publish and your thoughts are instantly live to the world, backed by edge-optimized delivery.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#0a0f1a] py-12 px-8 text-center text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold text-slate-300">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs">N</div>
            Nexus
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Nexus Publishing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
