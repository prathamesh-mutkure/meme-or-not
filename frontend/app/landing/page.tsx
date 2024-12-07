import Spline from "@splinetool/react-spline";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen border border-red-300 bg-blue-100 overflow-auto">
      <Spline style={{
        height: "100vh"
      }}
       scene="https://prod.spline.design/qQXTcWVBAinXEo7E/scene.splinecode" />
    </div>
  );
};

export default page;
