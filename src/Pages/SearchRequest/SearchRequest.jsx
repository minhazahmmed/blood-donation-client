import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxios from '../../hooks/useAxios';

const SearchRequest = () => {
    
  const [passwordError, setPasswordError] = useState("");
    const[upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState("");
   const [upazila, setUpazila] = useState("");
   const axiosInstance = useAxios();
  
    const { registerWithEmailPassword, setUser, googleSignin } =
      useContext(AuthContext);
  
    useEffect(() => {
  
      axios.get('/upazila.json')
      .then(res => {
        setUpazilas(res.data.upazilas)
      } )
  
  
      axios.get("/district.json").then((res) => {
        setDistricts(res.data.districts);
      });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = e.target.blood.value;

        axiosInstance.get(`/search-request?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
        .then(res=> {
            console.log(res.data);
            
        })
    }
  

    return (
    <div className="min-h-screen flex items-start justify-center bg-linear-to-br from-red-50 via-rose-100 to-red-200 px-4 pt-15">
            <div className=" bg-white rounded-3xl shadow-2xl border border-red-200">
            <form onSubmit={handleSearch} className="flex items-center gap-9 p-6 space-y-4">

                <div className='w-64'>
            <label className="text-sm font-semibold text-red-700">
              Blood Group
            </label>
            <select
              name="blood"
              className="select select-bordered w-full border-red-300"
              defaultValue=""
              required
            >
              <option disabled value="">
                Select Blood Group
              </option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          {/* District */}
          <div className="w-64">
            <label className="text-sm font-semibold text-red-700">
              District
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="select select-bordered w-full border-red-300"
              required
            >
              <option value="" disabled>
                Select District
              </option>
              {districts?.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

       {/* Upazila */}
          <div className="w-64">
            <label className="text-sm font-semibold text-red-700">
             Upazila
            </label>
            <select
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="select select-bordered w-full border-red-300"
              required
            >
              <option value="" disabled>
                Select Upazila
              </option>
              {upazilas?.map((u) => (
                <option key={u?.id} value={u?.name}>
                  {u?.name}
                </option>
              ))}
            </select>
          </div>

  <button className="btn">Search</button>
            </form>
        </div>
    </div>
    );
};

export default SearchRequest;