import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequest = () => {
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequests, setMyRequests] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  console.log(setItemPerPage)
  
  useEffect(() => {
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemPerPage}`)
      .then((res) => {
        setMyRequests(res.data.request);
        setTotalRequest(res.data.totalRequest);
      });
  }, [axiosSecure, currentPage, itemPerPage]);

  const numberOfPages = Math.ceil(totalRequest / itemPerPage);
  const pages = [
    ...Array(numberOfPages)
      .keys()
      .map((e) => e + 1),
  ];

//   console.log(pages);

  // console.log(myRequests);
  // console.log(totalRequest);
  // console.log(numberOfPages);

  const handlePrev = () => {
    if(currentPage>1){
        setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = ()=>{
    if(currentPage < pages.length){
        setCurrentPage(currentPage + 1)
    }
  }

return (
 
  <div className="flex flex-col min-h-[calc(100vh)] justify-between">
    

    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Hospital Name</th>
            <th>Blood Group</th>
          </tr>
        </thead>
        <tbody>
          {myRequests.map((request, index) => (
            <tr key={index}>
       
              <th>{(currentPage - 1) * itemPerPage + (index + 1)}</th>
              <td>{request.recipientName}</td>
              <td>{request.hospitalName}</td>
              <td>{request.bloodGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

   
    <div className="flex flex-wrap justify-center items-center gap-3 mt-10 mb-10">
      <button onClick={handlePrev} className="btn">Prev</button>
      {pages.map((page) => (
        <button
          key={page}
          className={`btn ${page === currentPage ? "bg-[#0543ee] text-white" : ""}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button onClick={handleNext} className="btn">Next</button>
    </div>
  </div>
);
};

export default MyRequest;
