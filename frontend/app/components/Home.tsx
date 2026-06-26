import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-25 bg-[#0f172a] text-slate-50 font-sans selection:bg-indigo-500/30">
      
      

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center px-8 pt-40 pb-32 overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800/80 text-sm font-medium text-indigo-300 mb-8 backdrop-blur-md shadow-xl hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>The new standard for creators</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.15] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500">
            Publish your ideas. <br className="hidden md:block" /> Shape the conversation.
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Nexus is the premier platform for modern writers. Beautiful typography, seamless publishing, and an audience waiting to hear your voice.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/write" className="w-full sm:w-auto px-8 py-4 text-base font-semibold bg-white text-slate-950 hover:bg-slate-100 rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95 text-center">
              Start Writing Today
            </Link>
            <Link href="/blogs" className="w-full sm:w-auto px-8 py-4 text-base font-semibold bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/50 rounded-full transition-all hover:border-slate-600 backdrop-blur-sm group flex items-center justify-center gap-2 text-center">
              <span>Read Top Stories</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
        
        {/* Blog Mockup / Visual Element */}
        <div className="mt-24 w-full max-w-4xl mx-auto relative z-10 group perspective-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex flex-col md:flex-row bg-[#1e293b] border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-[1.02]">
            {/* Image side */}
            <div className="md:w-2/5 h-64 md:h-auto bg-slate-800 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop" alt="Workspace" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent md:hidden"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-[#1e293b] to-transparent hidden md:block"></div>
            </div>
            {/* Content side */}
            <div className="p-8 md:p-10 md:w-3/5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-400/10 rounded-full">Technology</span>
                <span className="text-sm font-medium text-slate-500">Just now</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">The Future of Web Development in 2026</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">Explore the latest trends in serverless architecture, edge computing, and how AI is changing the way we write code forever.</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 p-[2px]">
                  <div className="w-full h-full rounded-full border-2 border-[#1e293b] bg-white overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Author" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Alex Developer</div>
                  <div className="text-xs text-slate-500">Lead Engineer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
