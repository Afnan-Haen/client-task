export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Tailwind CSS, and a custom PHP Backend.</p>
      </div>
    </footer>
  );
}
