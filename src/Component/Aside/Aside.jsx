import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { 
    Squares2X2Icon, PlusIcon, ClipboardDocumentListIcon, 
    UsersIcon, ArrowLeftStartOnRectangleIcon, HomeIcon,
    ChartBarIcon, DocumentTextIcon, UserCircleIcon,
    BookOpenIcon 
} from "@heroicons/react/24/solid";

const Aside = () => {
  const { role, user } = useContext(AuthContext);

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("dashboard-drawer");
    if (drawerCheckbox) { drawerCheckbox.checked = false; }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <HomeIcon className="h-5 w-5" />, show: true },
    
    // ডোনারদের জন্য মেইন ড্যাশবোর্ড লিঙ্ক
    { name: "Dashboard", path: "/dashboard", icon: <Squares2X2Icon className="h-5 w-5" />, show: role === "donor" },

    // অ্যাডমিনদের জন্য নির্দিষ্ট লিঙ্কসমূহ
    { name: "Admin Home", path: "/dashboard/admin-home", icon: <ChartBarIcon className="h-5 w-5" />, show: role === "admin" },
    
    // ভলান্টিয়ারদের জন্য নির্দিষ্ট লিঙ্ক (নতুন যোগ করা হয়েছে)
    { name: "Volunteer Home", path: "/dashboard/volunteer-home", icon: <ChartBarIcon className="h-5 w-5" />, show: role === "volunteer" },
    
    { name: "All Users", path: "/dashboard/all-users", icon: <UsersIcon className="h-5 w-5" />, show: role === "admin" },
    
    // অ্যাডমিন ও ভলান্টিয়ারদের জন্য
    { name: "All Donation Request", path: "/dashboard/all-donation-requests", icon: <DocumentTextIcon className="h-5 w-5" />, show: role === "admin" || role === "volunteer" },

    // Content Management (Admin ও Volunteer এর জন্য)
    { 
      name: "Content Management", 
      path: "/dashboard/content-management", 
      icon: <BookOpenIcon className="h-5 w-5" />, 
      show: role === "admin" || role === "volunteer" 
    },

    // শুধুমাত্র ডোনারদের জন্য পার্সোনাল রিকোয়েস্ট ম্যানেজমেন্ট
    { name: "My Requests", path: "/dashboard/my-request", icon: <ClipboardDocumentListIcon className="h-5 w-5" />, show: role === "donor" },
    { name: "Add Request", path: "/dashboard/add-request", icon: <PlusIcon className="h-5 w-5" />, show: role === "donor" },
    
    // সবার জন্য প্রোফাইল লিঙ্ক
    { name: "Profile", path: "/dashboard/profile", icon: <UserCircleIcon className="h-5 w-5" />, show: true },
  ];

  return (
    <div className="drawer-side z-50 font-['Inter',sans-serif]">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
      <div className="menu p-0 w-64 sm:w-72 min-h-full bg-red-50 border-r border-red-100 text-slate-800">
        
        <div className="p-6 sm:p-8 border-b border-red-100 mb-4 bg-white/50 text-center sm:text-left">
            <span className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-800 block">
              Blood<span className="text-red-700">Flow</span>
            </span>
            <p className="text-[10px] sm:text-[11px] text-red-400 font-bold uppercase tracking-widest mt-1">Management System</p>
        </div>

        <div className="px-4 sm:px-6 mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
            <img 
              src={user?.photoURL || "https://i.ibb.co/mJR6S7q/default-user.png"} 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-cover border-2 border-white shadow-md" 
              alt="Profile" 
            />
            <div className="truncate">
                <p className="text-[14px] sm:text-[16px] font-bold text-slate-800 tracking-tight ">
                  {user?.displayName || "User"}
                </p>
                <p className="text-[10px] sm:text-[12px] bg-red-100 text-red-600 px-2 py-0.5 rounded-md font-semibold uppercase inline-block ">
                  {role}
                </p>
            </div>
        </div>

        <div className="px-3 sm:px-4 space-y-1.5 flex-1 overflow-y-auto"> 
          {navLinks.map((link) => link.show && (
            <NavLink 
              key={link.path} 
              to={link.path} 
              end={link.path === "/dashboard"}
              onClick={closeDrawer}
              className={({ isActive }) => `flex items-center gap-3 sm:gap-4 px-4 py-2.5 sm:py-3 rounded-2xl font-bold text-[14px] sm:text-base transition-all ${isActive ? "bg-red-700 text-white shadow-lg shadow-red-200" : "hover:bg-red-100/50 text-slate-500 hover:text-red-600"}`}>
              {link.icon} {link.name}
            </NavLink>
          ))}
        </div>

        <div className="p-4 sm:p-6 border-t border-red-100 mt-auto">
          <button onClick={() => { signOut(auth); closeDrawer(); }} className="flex items-center gap-3 sm:gap-4 w-full px-4 py-2.5 sm:py-3 rounded-2xl font-bold text-[14px] sm:text-base text-slate-500 hover:text-red-700 hover:bg-red-100 transition-all">
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aside;