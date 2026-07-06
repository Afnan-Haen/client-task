import { useEffect, useState } from "react";

export default function PatientProfile({ user }: { user: any }) {
    const [hasProfile, setHasProfile] = useState<boolean | null>(null);
    const [doctors, setDoctors] = useState<any[]>([]);
    const [searchSpecialization, setSearchSpecialization] = useState("");

    // Form state
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [condition, setCondition] = useState("");

    useEffect(() => {
        checkProfile();
    }, []);

    const checkProfile = async () => {
        try {
            const res = await fetch(`http://localhost:8000/patient/profile/${user.id}`);
            if (res.ok) {
                setHasProfile(true);
                fetchDoctors();
            } else {
                setHasProfile(false);
            }
        } catch (error) {
            console.error(error);
            setHasProfile(false);
        }
    };

    const fetchDoctors = async () => {
        try {
            const res = await fetch(`http://localhost:8000/doctors`);
            if (res.ok) {
                const data = await res.json();
                setDoctors(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = async () => {
        if (!searchSpecialization.trim()) {
            fetchDoctors();
            return;
        }

        try {
            const res = await fetch(`http://localhost:8000/doctors/specialization/${searchSpecialization.trim()}`);
            if (res.ok) {
                const data = await res.json();
                setDoctors(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveProfile = async () => {
        try {
            const res = await fetch('http://localhost:8000/patient/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    user_id: user.id,
                    full_name: fullName,
                    phone_number: phoneNumber,
                    age: age,
                    gender: gender,
                    condition: condition
                }),
            });
            if (res.ok) {
                alert("Profile saved successfully!");
                setHasProfile(true);
                fetchDoctors();
            } else {
                alert("Failed to save profile.");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    const sendRequest = async (doctorId: number) => {
        try {
            const res = await fetch('http://localhost:8000/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patient_id: user.id,
                    doctor_id: doctorId
                })
            });
            if (res.ok) {
                alert("Request sent successfully!");
            } else if (res.status === 409) {
                alert("You have already sent a request to this doctor.");
            } else {
                alert("Failed to send request.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (hasProfile === null) return <div className="p-8">Loading...</div>;

    if (!hasProfile) {
        return (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-3xl font-bold mb-6 text-slate-900">
                    Complete Patient Profile
                </h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-4 border rounded-xl"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Phone Number"
                        className="w-full p-4 border rounded-xl"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Age"
                        className="w-full p-4 border rounded-xl"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <select
                        className="w-full p-4 border rounded-xl bg-white"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Condition or Problem"
                        className="w-full p-4 border rounded-xl"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                    />

                    <button onClick={saveProfile} className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-8 py-3 rounded-xl font-semibold">
                        Save Profile
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-bold text-slate-900">Available Doctors</h2>
                
                <div className="flex w-full md:w-auto gap-2">
                    <input
                        type="text"
                        placeholder="Search specialization (e.g. cardiologist)"
                        className="px-4 py-2 border rounded-xl flex-grow md:w-64"
                        value={searchSpecialization}
                        onChange={(e) => setSearchSpecialization(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button 
                        onClick={handleSearch}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition-colors font-medium"
                    >
                        Search
                    </button>
                    {searchSpecialization && (
                        <button 
                            onClick={() => {
                                setSearchSpecialization("");
                                fetchDoctors();
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl transition-colors font-medium"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
            
            {doctors.length === 0 ? (
                <p className="text-slate-500">No doctors available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doctors.map(doctor => (
                        <div key={doctor.id} className="p-6 border rounded-2xl bg-slate-50 hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Dr. {doctor.email}</h3>
                                <p className="text-indigo-600 font-medium mb-4 capitalize">{doctor.specialization}</p>
                                
                                <div className="space-y-2 text-sm text-slate-600 mb-6">
                                    <p><span className="font-semibold">Experience:</span> {doctor.experience} years</p>
                                    <p><span className="font-semibold">Available:</span> {doctor.available_from} - {doctor.available_to}</p>
                                    <p className="line-clamp-2 mt-2 italic">"{doctor.about}"</p>
                                </div>
                            </div>

                            <button 
                                onClick={() => sendRequest(doctor.user_id)} 
                                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors mt-auto"
                            >
                                Request Appointment
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}