import React, { useState } from 'react';

export default function AdminDashboard({ user }: { user: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableTo, setAvailableTo] = useState('');
  const [about, setAbout] = useState('');

  const handleCreateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/admin/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          specialization,
          experience,
          available_from: availableFrom,
          available_to: availableTo,
          about
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Doctor created successfully!');
        // Reset form
        setEmail('');
        setPassword('');
        setFirstName('');
        setSpecialization('');
        setExperience('');
        setAvailableFrom('');
        setAvailableTo('');
        setAbout('');
      } else {
        alert(data.message || 'Failed to create doctor.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <h2 className="text-3xl font-bold mb-2 text-slate-900">Admin Dashboard</h2>
      <p className="text-slate-500 mb-8">Create new doctor profiles directly into the system.</p>

      <div className="max-w-2xl">
        <form onSubmit={handleCreateDoctor} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Doctor's Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Temporary Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">First Name</label>
              <input 
                type="text" 
                required
                placeholder="John"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Specialization</label>
              <input 
                type="text" 
                required
                placeholder="Cardiologist"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                value={specialization}
                onChange={e => setSpecialization(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Experience (Years)</label>
              <input 
                type="number" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                value={experience}
                onChange={e => setExperience(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Available From</label>
              <input 
                type="time" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                value={availableFrom}
                onChange={e => setAvailableFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Available To</label>
              <input 
                type="time" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                value={availableTo}
                onChange={e => setAvailableTo(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">About the Doctor</label>
            <textarea 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 h-24"
              value={about}
              onChange={e => setAbout(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
          >
            Create Doctor Profile
          </button>
        </form>
      </div>
    </div>
  );
}
