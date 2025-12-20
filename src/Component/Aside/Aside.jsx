import React, { useContext } from "react";

import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Aside = () => {
  const { role } = useContext(AuthContext);

  const handleLogOut = () => {
    signOut(auth);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        {role == "admin" && (
          <div className="p-6 text-xl font-bold border-b border-slate-700">
            Admin Panel
          </div>
        )}

        {role == "donor" && (
          <div className="p-6 text-xl font-bold border-b border-slate-700">
            User Panel
          </div>
        )}

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-slate-700"
              }`
            }
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </NavLink>

          {role == "donor" && (
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
          )}

          {role == "admin" && (
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg ${
                  isActive ? "bg-blue-600" : "hover:bg-slate-700"
                }`
              }
            >
              <HomeIcon className="h-5 w-5" />
              All Users
            </NavLink>
          )}
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
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
