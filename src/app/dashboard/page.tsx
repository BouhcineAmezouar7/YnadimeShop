import Sidebar from "@/components/Dashboard/Sidebar";
import Content from "@/components/Dashboard/Content";
import React from "react";

export default function page() {
  return (
    <>
      <div className="flex flex-wrap content-start gap-[2%] bg-[#F8F9FA] h-screen">
        <div className="h-3/4">
          <Sidebar />
        </div>
        <div className="grow h-3/4">
          <Content />
        </div>
      </div>
    </>
  );
}
