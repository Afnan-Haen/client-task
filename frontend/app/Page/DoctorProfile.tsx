import React, { useEffect, useState } from 'react';

export default function DoctorDashboard({ user }: { user: any }) {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<any>(null);
  
  // Profile Form State
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [available_from, setAvailableFrom] = useState('');
  const [available_to, setAvailableTo] = useState('');
  const [about, setAbout] = useState('');

  // Requests State
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      const res = await fetch(`http://localhost:8000/doctor/profile/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setHasProfile(true);
        fetchRequests();
      } else {
        setHasProfile(false);
      }
    } catch (error) {
      console.error(error);
      setHasProfile(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch(`http://localhost:8000/doctor/requests/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveProfile = async () => {
    try {
      const res = await fetch('http://localhost:8000/doctor/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          specialization,
          experience,
          available_from,
          available_to,
          about,
          user_id: user.id
        })
      });
      
      if (res.ok) {
        alert("Profile saved successfully!");
        setProfile({
          specialization,
          experience,
          available_from,
          available_to,
          about
        });
        setHasProfile(true);
        fetchRequests();
      } else {
        alert("Failed to save profile.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateStatus = async (requestId: number, status: string) => {
    try {
      const res = await fetch(`http://localhost:8000/requests/${requestId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        alert(`Request ${status}!`);
        fetchRequests(); // Refresh the list
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (hasProfile === null) {
    return <div className="p-8">Loading...</div>;
  }

  if (!hasProfile) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">
          Complete Doctor Profile
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Specialization"
            className="w-full p-4 border rounded-xl"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />

          <input
            type="number"
            placeholder="Years of Experience"
            className="w-full p-4 border rounded-xl"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <div className="flex gap-4">
            <input
              type="time"
              className="w-full p-4 border rounded-xl"
              value={available_from}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />

            <input
              type="time"
              className="w-full p-4 border rounded-xl"
              value={available_to}
              onChange={(e) => setAvailableTo(e.target.value)}
            />
          </div>

          <textarea
            placeholder="About Yourself"
            className="w-full p-4 border rounded-xl h-32"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <button onClick={saveProfile} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition-colors font-semibold">
            Save Profile
          </button>
        </div>
      </div>
    );
  }

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const acceptedCount = requests.filter(r => r.status === 'accepted').length;

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 font-medium mb-1">Total Requests</p>
            <h3 className="text-3xl font-bold text-slate-900">{requests.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl">
            {requests.length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 font-medium mb-1">Pending</p>
            <h3 className="text-3xl font-bold text-amber-600">{pendingCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-xl">
            {pendingCount}
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 font-medium mb-1">Accepted</p>
            <h3 className="text-3xl font-bold text-emerald-600">{acceptedCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xl">
            {acceptedCount}
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">My Profile Summary</h2>
        
        {profile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Specialization</p>
                <p className="text-lg font-semibold text-slate-900 capitalize">{profile.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Experience</p>
                <p className="text-lg font-semibold text-slate-900">{profile.experience} Years</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Availability</p>
                <p className="text-lg font-semibold text-slate-900">{profile.available_from} - {profile.available_to}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">About Me</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 h-full">
                <p className="text-slate-700 italic">"{profile.about}"</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}