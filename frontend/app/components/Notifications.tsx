import React, { useEffect, useState } from 'react';

export default function Notifications({ user }: { user: any }) {
  const [requests, setRequests] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user && user.role === 'doctor') {
      fetchRequests();
    }
  }, [user]);

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

  const handleUpdateStatus = async (requestId: number, status: string) => {
    try {
      const res = await fetch(`http://localhost:8000/requests/${requestId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        // Refresh the list silently
        fetchRequests();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user || user.role !== 'doctor') return null;

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {pendingCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
            {pendingCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Notifications</h3>
          </div>
          
          <div className="p-2">
            {requests.length === 0 ? (
              <p className="p-4 text-center text-sm text-slate-500">No notifications.</p>
            ) : (
              requests.map(req => (
                <div key={req.id} className="p-3 mb-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{req.full_name}</p>
                      <p className="text-xs text-slate-500">{req.age} yrs • {req.condition}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${req.status === 'pending' ? 'bg-amber-100 text-amber-700' : req.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {req.status}
                    </span>
                  </div>
                  
                  {req.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={() => handleUpdateStatus(req.id, 'accepted')} 
                        className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(req.id, 'rejected')} 
                        className="flex-1 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
