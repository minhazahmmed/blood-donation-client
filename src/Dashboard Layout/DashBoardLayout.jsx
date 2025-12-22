import React from "react";
import { Outlet } from "react-router";
import Aside from "../Component/Aside/Aside";

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-50">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Header (Hamburger Menu) - Responsive Fix */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm lg:hidden">
          
          {/* Logo Section Start */}
          <div className="flex items-center gap-2">
            <div className="bg-red-700 p-1.5 rounded-lg">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">
              Blood<span className="text-red-700">Flow</span>
            </span>
          </div>
          {/* Logo Section End */}

          <label htmlFor="dashboard-drawer" className="btn btn-ghost drawer-button text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>

        {/* Dynamic Pages */}
        <div className="p-6 md:p-10 flex-1">
          <Outlet />
        </div>
      </div>

      {/* Sidebar Component */}
      <Aside />
    </div>
  );
};

export default DashBoardLayout;