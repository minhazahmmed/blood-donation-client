import React from "react";

import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router";

const Aside = () => {
    return (
         <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-slate-700">
          AdminPanel
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="/dashboard/main"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-slate-700"
              }`
            }
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </NavLink>


          <NavLink
            to="/dashboard/add-request"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-slate-700"
              }`
            }
          >
            <HomeIcon className="h-5 w-5" />
            Add Request
          </NavLink>

          <NavLink
            to="/dashboard/manage-product"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-slate-700"
              }`
            }
          >
            <HomeIcon className="h-5 w-5" />
            Manage Product
          </NavLink>

          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-slate-700"
              }`
            }
          >
            <UsersIcon className="h-5 w-5" />
            Users
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-slate-700"
              }`
            }
          >
            <Cog6ToothIcon className="h-5 w-5" />
            Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-600">
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

     
     
    </div>
  );
  
};

export default Aside;