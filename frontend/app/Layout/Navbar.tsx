import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 font-bold text-xl tracking-tight">
            <Link href="/" className='font-semibold text-[22px] text-white'>IZUNA-DOCS</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link href="/blogs" className="hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Blogs</Link>
            <Link href="/about" className="hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link href="/contact" className="hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            <Link href="/dashboard" className="hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-md text-sm font-medium">Register</Link>
            <Link href="/login" className="bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-md text-sm font-medium">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
