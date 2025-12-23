import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider"; // AuthContext ইমপোর্ট করুন নিজের ইমেইল চেক করার জন্য

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useContext(AuthContext); // বর্তমান লগইন করা অ্যাডমিন
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // স্ট্যাটাস পরিবর্তনের হ্যান্ডলার (Block/Unblock)
  const handleStatusChange = (email, status) => {
    if (email === currentUser?.email) {
      return toast.error("You cannot block yourself!");
    }

    axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          fetchUsers();
          toast.success(`User is now ${status}!`);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong!");
      });
  };

  // রোল পরিবর্তনের হ্যান্ডলার (Admin/Volunteer/Donor)
  const handleRoleChange = (email, newRole) => {
    if (email === currentUser?.email) {
      return toast.error("You cannot change your own role!");
    }

    axiosSecure.patch(`/update/user/role?email=${email}&role=${newRole}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          fetchUsers();
          toast.success(`Successfully promoted to ${newRole}!`);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong!");
      });
  };

  return (
    <div className="p-5">
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Role</th>
              <th>User Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user?.photoURL} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">{user?.email}</div>
                    </div>
                  </div>
                </td>
                
                {/* রোল পরিবর্তন ড্রপডাউন */}
                <td>
                  <select
                    disabled={user?.email === currentUser?.email}
                    onChange={(e) => handleRoleChange(user?.email, e.target.value)}
                    value={user?.role}
                    className="select select-bordered select-xs w-full max-w-xs focus:ring-red-500"
                  >
                    <option value="donor">Donor</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td>
                  <span className={`badge ${user?.status === 'active' ? 'badge-success' : 'badge-error'} text-white`}>
                    {user?.status}
                  </span>
                </td>

                <th className="flex justify-center gap-2">
                  {user?.status !== "active" ? (
                    <button
                      disabled={user?.email === currentUser?.email}
                      onClick={() => handleStatusChange(user?.email, "active")}
                      className="text-white btn btn-success btn-sm"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      disabled={user?.email === currentUser?.email}
                      onClick={() => handleStatusChange(user?.email, "blocked")}
                      className="text-white btn btn-error btn-sm"
                    >
                      Block
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AllUsers;