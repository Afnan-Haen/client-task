"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DeleteBlogButton from '../components/DeleteBlogButton';
import DoctorDashboard from './DoctorProfile';
import PatientDashboard from './PatientProfile';
import Settings from './Settings';
import Blogs from './Blogs';
import AdminDashboard from './AdminDashboard';
import Notifications from '../components/Notifications';
import DoctorList from '../components/DoctorList';

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
    if (parsedUser.role === 'admin') {
      setActiveTab('admin');
    } else if (parsedUser.role === 'doctor') {
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
    <div className=" bg-[#f3f1f9] min-h-screen pt-16">
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-40 flex items-center justify-between px-8">
        <div className="font-bold text-xl text-indigo-600">MedApp</div>
        <div className="flex items-center gap-4">
          <Notifications user={user} />
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-sm text-slate-600">
            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className='fixed left-0 top-16 bg-white shadow-xl w-[260px] h-[calc(100vh-4rem)] z-30 overflow-y-auto'>
        
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
        
        <DoctorList />
      </aside>

      <div className="max-w-5xl mx-auto space-y-10 pl-[260px] py-12 pr-8">
        
        {/* Navigation Tabs */}
        <div className='tab-btn py-2 w-full flex justify-center items-center gap-5'>
          {user.role === 'admin' && (
            <div className={`tab-item ${activeTab === 'admin' ? 'scale-105' : 'opacity-70'}`}>
              <button 
                onClick={() => setActiveTab('admin')} 
                className={`py-3 px-8 rounded-full border border-slate-800 text-white font-semibold transition-all ${activeTab === 'admin' ? 'bg-gradient-to-r from-[#110072] to-[#7a5698] shadow-lg' : 'bg-slate-800'}`}
              >
                ADMIN
              </button>
            </div>
          )}
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

        {activeTab === 'admin' && <AdminDashboard user={user} />}
        {activeTab === 'doctor' && <DoctorDashboard user={user} />}
        {activeTab === 'patient' && <PatientDashboard user={user} />}
        {activeTab === 'blogs' && <Blogs user={user} blogs={blogs} />}
        {activeTab === 'settings' && <Settings user={user} handleLogout={handleLogout} />}


      </div>
    </div>
  );
}
