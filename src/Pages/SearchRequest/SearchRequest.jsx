import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SearchRequest = () => {
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState("");
    const [upazila, setUpazila] = useState("");
    const [donors, setDonors] = useState([]);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas));
        axios.get("/district.json").then((res) => setDistricts(res.data.districts));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = e.target.blood.value;

        // এখানে /search-donors (plural) ব্যবহার করা হয়েছে ব্যাকএন্ডের সাথে মিল রেখে
        axios.get(`${import.meta.env.VITE_API_URL}/search-donors?bloodGroup=${encodeURIComponent(bloodGroup)}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setDonors(res.data);
                setSearched(true);
            })
            .catch(err => {
                console.error("Search Error:", err);
                setSearched(true);
            });
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-['Inter',sans-serif]">
            <div className="max-w-6xl mx-auto">
                {/* Search Form Card */}
                <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 mb-12">
                    <h2 className="text-3xl font-black text-slate-800 mb-8 text-center">Find a <span className="text-red-600">Lifesaver</span></h2>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-2">Blood Group</label>
                            <select name="blood" className="select select-bordered w-full rounded-xl border-gray-200 focus:border-red-500" required>
                                <option value="">Select Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => <option key={group} value={group}>{group}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-2">District</label>
                            <select value={district} onChange={(e) => setDistrict(e.target.value)} className="select select-bordered w-full rounded-xl border-gray-200">
                                <option value="">Select District</option>
                                {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-2">Upazila</label>
                            <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className="select select-bordered w-full rounded-xl border-gray-200">
                                <option value="">Select Upazila</option>
                                {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                            </select>
                        </div>

                        <button type="submit" className="btn bg-slate-900 hover:bg-red-600 text-white border-none rounded-xl h-12 font-bold uppercase tracking-wider transition-all">
                            Search Now
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                {searched && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-bold text-slate-700">Matched Donors: ({donors.length})</h3>
                        </div>
                        
                        {donors.length === 0 ? (
                            <div className="bg-white p-16 rounded-[32px] text-center border border-dashed border-gray-300">
                                <div className="text-5xl mb-4">🔍</div>
                                <p className="text-gray-500 text-lg font-medium">No donors found matching your criteria.</p>
                                <p className="text-gray-400 text-sm">Try changing the location or blood group.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {donors.map(donor => (
                                    <div key={donor._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4 mb-5">
                                            <img 
                                                src={donor.photoURL || "https://i.ibb.co/mJR6S7q/default-user.png"} 
                                                alt={donor.name} 
                                                className="w-16 h-16 rounded-2xl object-cover bg-red-50 border border-red-50" 
                                            />
                                            <div className="overflow-hidden">
                                                <h4 className="font-bold text-slate-800 text-lg truncate">{donor.name}</h4>
                                                <p className="text-sm text-slate-500 truncate">{donor.upazila}, {donor.district}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center bg-red-50/50 p-4 rounded-2xl border border-red-50">
                                            <div>
                                                <p className="text-[10px] text-red-400 font-black uppercase tracking-widest">Blood Group</p>
                                                <p className="text-xl font-black text-red-600">{donor.blood}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Status</p>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase">
                                                    {donor.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchRequest;