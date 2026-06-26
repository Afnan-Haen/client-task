"use client";

import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role:'' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Registration successful!');
        setFormData({ name: '', email: '', password: '', role:'' });
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred while connecting to the server.');
    }
  };

  return (
    <div className="py-12 px-8 flex justify-center">
      <div className="w-full max-w-md p-8 border border-slate-200 rounded-2xl shadow-xl bg-white">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Create an Account</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">Full Name</label>
            <input 
              type="text" 
              placeholder="Jane Doe"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">Email Address</label>
            <input 
              type="email" 
              placeholder="jane@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">Role</label>
            <select name="role" id="role" value={formData.role}
            onChange={e => setFormData({...formData, role: e.target.value})}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          
          <button type="submit" className="w-full py-3 mt-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors cursor-pointer">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
