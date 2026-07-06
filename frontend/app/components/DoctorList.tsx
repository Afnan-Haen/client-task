import React, { useEffect, useState } from 'react';

export default function DoctorList() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch('http://localhost:8000/doctors');
      if (res.ok) {
        const data = await res.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-sm text-slate-500">Loading directory...</div>;
  }

  return (
    <div className="mt-8 px-4">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Doctors Directory</h3>
      <div className="space-y-2">
        {doctors.length === 0 ? (
          <p className="px-2 text-sm text-slate-500">No doctors found.</p>
        ) : (
          doctors.map(doc => (
            <div key={doc.id} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100 flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                {doc.first_name ? doc.first_name.charAt(0) : 'D'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-800 truncate">Dr. {doc.first_name || doc.email?.split('@')[0] || 'Unknown'}</p>
                <p className="text-xs font-medium text-indigo-600 capitalize truncate">{doc.specialization}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
