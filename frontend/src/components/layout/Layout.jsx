// src/component/Layout.jsx
import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { useLocation, Outlet } from "react-router-dom";
import "locomotive-scroll/dist/locomotive-scroll.css";

const Layout = () => {
  const scrollRef = useRef(null);
  const location = useLocation(); 
  const locoScroll = useRef(null);

  useEffect(() => {
    locoScroll.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.1,
    });

    return () => {
      locoScroll.current?.destroy();
    };
  }, []);

  useEffect(() => {
    // Refresh LocomotiveScroll on route change
    setTimeout(() => {
      locoScroll.current?.update();
    }, 100);
  }, [location.pathname]);

  return (
    <div data-scroll-container ref={scrollRef} className="overflow-hidden">
      <Outlet /> {/* ✅ Required for nested route rendering */}
    </div>
  );
};

export default Layout;
