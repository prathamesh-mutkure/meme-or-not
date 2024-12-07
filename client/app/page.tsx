"use client";

import FeaturesSectionDemo from "@/components/Landing/Features";
import Footer from "@/components/Landing/Footer";
import AnimatedHeading from "@/components/Landing/Heading";
import TimelineDemo from "@/components/Landing/Timeline";
import Spline from "@splinetool/react-spline";
import React from "react";

const page = () => {
  return (
    <div>
      <AnimatedHeading />
      <div className="min-h-screen border overflow-auto" style={{
        "backgroundColor": "#0A0A0F"
      }}>
        <Spline
          style={{
            height: "100vh",
          }}
          scene="https://prod.spline.design/qQXTcWVBAinXEo7E/scene.splinecode"
        />
      </div>
      <FeaturesSectionDemo />
      <TimelineDemo />
      <Footer />
    </div>
  );
};

export default page;
