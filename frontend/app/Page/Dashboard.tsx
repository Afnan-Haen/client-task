"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DeleteBlogButton from '../components/DeleteBlogButton';
import DoctorDashboard from './DoctorProfile';
import PatientDashboard from './PatientProfile';
import Settings from './Settings';
import Blogs from './Blogs';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: number, email: string, role?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>('blogs');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login'); 
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    
    // Default tab based on role
    if (parsedUser.role === 'doctor') {
      setActiveTab('doctor');
    } else if (parsedUser.role === 'patient') {
      setActiveTab('patient');
    } else {
      setActiveTab('blogs');
    }

    // 2. Fetch blogs
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('http://localhost:8000/blogs', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/logout', { method: 'POST' });
      localStorage.removeItem('user');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className=" bg-[#f3f1f9] py-12 px-8">
      
      <aside className='absolute left-0 top-16 bg-white shadow-xl w-[200px] h-full z-50'>
        
        <ul className="mt-4">
          <li className='px-6 py-3 hover:bg-slate-50 transition-colors'>
            <Link href="/dashboard" className="text-slate-700 font-medium">Dashboard</Link>
          </li>
          <li className='px-6 py-3 hover:bg-slate-50 transition-colors'>
            <Link href="/profile" className="text-slate-700 font-medium">Profile</Link>
          </li>
          <li className='px-6 py-3 hover:bg-slate-50 transition-colors'>
            <Link href="/write" className="text-slate-700 font-medium">Write</Link>
          </li>
          <li className='px-6 py-3 hover:bg-slate-50 transition-colors'>
            <Link href="/blogs" className="text-slate-700 font-medium">Blogs</Link>
          </li>
        </ul>
      </aside>

      <div className="max-w-5xl mx-auto space-y-10 pl-[200px]">
        
        {/* Navigation Tabs */}
        <div className='tab-btn py-2 w-full flex justify-center items-center gap-5'>
          {user.role === 'doctor' && (
            <div className={`tab-item ${activeTab === 'doctor' ? 'scale-105' : 'opacity-70'}`}>
              <button 
                onClick={() => setActiveTab('doctor')} 
                className={`py-3 px-8 rounded-full border border-slate-800 text-white font-semibold transition-all ${activeTab === 'doctor' ? 'bg-gradient-to-r from-[#110072] to-[#7a5698] shadow-lg' : 'bg-slate-800'}`}
              >
                DOCTOR
              </button>
            </div>
          )}
          {user.role === 'patient' && (
            <div className={`tab-item ${activeTab === 'patient' ? 'scale-105' : 'opacity-70'}`}>
              <button 
                onClick={() => setActiveTab('patient')} 
                className={`py-3 px-8 rounded-full border border-slate-800 text-white font-semibold transition-all ${activeTab === 'patient' ? 'bg-gradient-to-r from-[#110072] to-[#7a5698] shadow-lg' : 'bg-slate-800'}`}
              >
                PATIENTS
              </button>
            </div>
          )}
          <div className={`tab-item ${activeTab === 'blogs' ? 'scale-105' : 'opacity-70'}`}>
            <button 
              onClick={() => setActiveTab('blogs')} 
              className={`py-3 px-8 rounded-full border border-slate-800 text-white font-semibold transition-all ${activeTab === 'blogs' ? 'bg-gradient-to-r from-[#110072] to-[#7a5698] shadow-lg' : 'bg-slate-800'}`}
            >
              BLOGS
            </button>
          </div>
          <div className={`tab-item ${activeTab === 'settings' ? 'scale-105' : 'opacity-70'}`}>
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`py-3 px-8 rounded-full border border-slate-800 text-white font-semibold transition-all ${activeTab === 'settings' ? 'bg-gradient-to-r from-[#110072] to-[#7a5698] shadow-lg' : 'bg-slate-800'}`}
            >
              SETTINGS
            </button>
          </div>
        </div>

        {/* --- Content Areas based on activeTab --- */}

        {activeTab === 'doctor' && <DoctorDashboard user={user} />}
        {activeTab === 'patient' && <PatientDashboard user={user} />}
        {activeTab === 'blogs' && <Blogs user={user} blogs={blogs} />}
        {activeTab === 'settings' && <Settings user={user} handleLogout={handleLogout} />}


      </div>
    </div>
  );
}
