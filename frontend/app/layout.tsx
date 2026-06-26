import type { ReactNode } from 'react';
import './globals.css';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50 antialiased">
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
