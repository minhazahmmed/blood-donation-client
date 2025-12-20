import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Toaster } from 'react-hot-toast';
import { toast, ToastContainer } from "react-toastify";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = ()=> {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  const handleStatusChange = (email, status) => {

  
    axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
            fetchUsers();
            
    toast.success(`Successfully updated to ${status}!`);
        }
      })
     .catch((err) => {
      toast.error("Something went wrong!"); 
      console.error(err);
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>User Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user) => (
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user?.role}</td>
                <td>{user?.status}</td>


                <th>
                  {user?.status !== "active" ? (
                    <button
                      onClick={() => handleStatusChange(user?.email, "active")}
                      className="text-white btn btn-success btn-sm"
                    >
                      Active
                    </button>
                  ) : (
                    <button
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
      <ToastContainer />
    </div>
  );
};

export default AllUsers;
