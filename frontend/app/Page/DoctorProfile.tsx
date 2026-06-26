import React, { useEffect, useState } from 'react';

export default function DoctorDashboard({ user }: { user: any }) {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  
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

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <h2 className="text-3xl font-bold mb-8 text-slate-900">Patient Requests</h2>
      
      {requests.length === 0 ? (
        <p className="text-slate-500">You have no requests at the moment.</p>
      ) : (
        <div className="grid gap-6">
          {requests.map(req => (
            <div key={req.id} className="p-6 border rounded-2xl bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{req.full_name} <span className="text-sm font-normal text-slate-500">({req.age} yrs, {req.gender})</span></h3>
                <p className="text-slate-600 mt-1"><span className="font-semibold">Condition:</span> {req.condition}</p>
                <p className="text-slate-500 text-sm mt-2">Contact: {req.phone_number} | {req.email}</p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                <span className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${req.status === 'pending' ? 'bg-amber-100 text-amber-700' : req.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {req.status}
                </span>
                {req.status === 'pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdateStatus(req.id, 'accepted')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition-colors">Accept</button>
                    <button onClick={() => handleUpdateStatus(req.id, 'rejected')} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors">Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}