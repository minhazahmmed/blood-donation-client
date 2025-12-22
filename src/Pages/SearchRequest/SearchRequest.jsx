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

       
        axios.get(`http://localhost:5000/search-donor?bloodGroup=${encodeURIComponent(bloodGroup)}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setDonors(res.data);
                setSearched(true);
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Search Form Card */}
                <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 mb-12">
                    <h2 className="text-3xl font-black text-slate-800 mb-8 text-center">Find a <span className="text-red-600">Lifesaver</span></h2>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-2">Blood Group</label>
                            <select name="blood" className="select select-bordered w-full rounded-xl border-gray-200 focus:border-red-500" >
                                <option value="">Select Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => <option key={group} value={group}>{group}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-2">District</label>
                            <select value={district} onChange={(e) => setDistrict(e.target.value)} className="select select-bordered w-full rounded-xl border-gray-200" >
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

                        <button className="btn bg-slate-900 hover:bg-red-600 text-white border-none rounded-xl h-12 font-bold uppercase tracking-wider transition-all">
                            Search Now
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                {searched && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-700 ml-2">Available Donors: ({donors.length})</h3>
                        {donors.length === 0 ? (
                            <div className="bg-white p-12 rounded-[32px] text-center border border-dashed border-gray-300">
                                <p className="text-gray-400 text-lg font-medium">No donors found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {donors.map(donor => (
    <div key={donor._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
        
            <img src={donor.photoURL} alt="" className="w-14 h-14 rounded-2xl object-cover bg-red-50" />
            <div>
                <h4 className="font-bold text-slate-800 text-lg">{donor.name}</h4>
                <p className="text-sm text-slate-500">{donor.upazila}, {donor.district}</p>
            </div>
        </div>
        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
            <p className="text-sm font-bold text-red-600 uppercase">Group: {donor.blood}</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{donor.status}</p>
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