import React from "react";
import { Outlet } from "react-router";
import Aside from "../Component/Aside/Aside";

const DashBoardLayout = () => {
  return (
    <div className="flex">
      <Aside />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;
