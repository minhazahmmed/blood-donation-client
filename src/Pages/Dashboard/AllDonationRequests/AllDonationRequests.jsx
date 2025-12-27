import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router";
import { FaRegEdit } from "react-icons/fa";

const AllDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const size = 5;

  const fetchAllRequests = () => {
    setIsLoading(true);
    axiosSecure
      .get(`/all-requests?status=${filter}&page=${page}&size=${size}`)
      .then((res) => {
        setRequests(res.data.requests || []);
        setTotalCount(res.data.totalCount || 0);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/request/status/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Status updated to ${newStatus}`,
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllRequests();
      }
    } catch (err) {
      console.error("Status update error:", err);
      Swal.fire("Error", "Could not update status", "error");
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, [filter, page]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Only admins can delete this permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/request/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            fetchAllRequests();
            Swal.fire("Deleted!", "Request has been deleted.", "success");
          }
        });
      }
    });
  };

  const totalPages = Math.ceil(totalCount / size);
  const pages = [...Array(totalPages).keys()];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-bars loading-xl text-red-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-0 font-['Inter',sans-serif] p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-5 rounded-lg shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 tracking-tight">
          Donation <span className="text-red-700">Management</span>
        </h2>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-600">Filter:</span>
          <select
            className="select select-bordered select-sm focus:outline-none border-red-300"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(0);
            }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead className="bg-gray-50/50">
              <tr className="text-slate-600 uppercase text-[13px] font-bold tracking-widest">
                <th className="py-5 px-8">Recipient</th>
                <th>Location</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr
                    key={req._id}
                    className="border-b border-gray-50 hover:bg-red-50/30 transition-colors"
                  >
                    <td className="py-4 px-8">
                      <span className="font-bold text-slate-700 block">
                        {req.recipient_name}
                      </span>
                      <span className="text-red-500 text-xs font-semibold">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="text-slate-600 font-medium">
                      {req.recipient_upazila}, {req.recipient_district}
                    </td>
                    <td>
                      <div className="font-bold text-slate-600">
                        {req.donationDate}
                      </div>
                      <div className="text-xs text-gray-400">
                        {req.donationTime}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
                          req.donation_status === "pending"
                            ? "bg-amber-100 text-amber-600"
                            : req.donation_status === "inprogress"
                            ? "bg-blue-100 text-blue-600"
                            : req.donation_status === "done"
                            ? "bg-green-100 text-green-600"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {req.donation_status}
                      </span>
                    </td>
<td className="text-center min-w-[260px]">
  <div className="flex items-center justify-center gap-2">
    {role === "admin" ? (
      <>
        {/* Status Select */}
        <select
          defaultValue={req.donation_status}
          onChange={(e) =>
            handleStatusChange(req._id, e.target.value)
          }
          className="select select-bordered select-xs text-[13px] 
                     border-red-200 focus:ring-red-500 
                     h-8 w-[120px]"
        >
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>

        {/* Edit */}
        <Link
          to={`/dashboard/update-request/${req._id}`}
          title="Edit Request"
          className="p-2 text-slate-400 hover:text-blue-700 
                     hover:bg-blue-50 rounded-xl transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </Link>

        {/* Delete */}
        <button
          onClick={() => handleDelete(req._id)}
          title="Delete Request"
          className="p-2 text-slate-400 hover:text-red-700 
                     hover:bg-red-50 rounded-xl transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </>
    ) : (
      <select
        defaultValue={req.donation_status}
        onChange={(e) =>
          handleStatusChange(req._id, e.target.value)
        }
        className="select select-bordered select-xs text-[13px] 
                   border-red-200 focus:ring-red-500 
                   h-8 w-[120px]"
      >
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </select>
    )}
  </div>
</td>



                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 pb-10">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="btn btn-xs sm:btn-sm btn-outline border-gray-200 text-slate-600 hover:bg-red-600 hover:border-red-600 hover:text-white disabled:opacity-30 rounded-xl px-3 sm:px-4"
          >
            Prev
          </button>
          <div className="flex gap-1 sm:gap-2">
            {pages.map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`btn btn-xs sm:btn-sm btn-circle border-none font-bold transition-all ${
                  page === num
                    ? "bg-red-600 text-white shadow-lg shadow-red-200"
                    : "bg-white shadow-sm text-slate-600 hover:bg-red-50"
                }`}
              >
                {num + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
            className="btn btn-xs sm:btn-sm btn-outline border-gray-200 text-slate-600 hover:bg-red-600 hover:border-red-600 hover:text-white disabled:opacity-30 rounded-xl px-3 sm:px-4"
          >
            Next
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllDonationRequests;
