import React from "react";
import Navbar from "../component/Navbar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="p-0 flex" style={{ minHeight: "100vh" }}>
        <div className="">
          <div className="flex fixed z-10">
            <Navbar />
          </div>
        </div>
        <div className="flex-1">
          <main className="min-h-screen relative">
            <div className="pt-[100px] px-7">{children}</div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
