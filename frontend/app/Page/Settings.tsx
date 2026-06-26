export default function Settings({ user, handleLogout }: { user: any, handleLogout?: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/70 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row items-center gap-8 justify-between">
      <div className="relative flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-lg">
          <div className="w-full h-full rounded-full border-4 border-white bg-white overflow-hidden flex items-center justify-center">
            <span className="text-3xl font-bold text-indigo-600">{user?.email?.charAt(0).toUpperCase() || 'U'}</span>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Settings & Profile</h1>
          <p className="text-slate-500 font-medium">{user?.email}</p>
          <span className="mt-2 inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wider">{user?.role || 'Patient'} Account</span>
        </div>
      </div>

      <div className="relative">
        <button 
          onClick={handleLogout}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
