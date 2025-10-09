// src/Layout.jsx
import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { useLocation } from "react-router-dom";
import "locomotive-scroll/dist/locomotive-scroll.css";

const Layout = ({ children }) => {
  const scrollRef = useRef(null);
  const location = useLocation(); // detects route change
  const locoScroll = useRef(null); // store scroll instance

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
    // Refresh Locomotive on route change (after slight delay to load new content)
    setTimeout(() => {
      locoScroll.current?.update();
    }, 100);
  }, [location.pathname]);

  return (
    <div data-scroll-container ref={scrollRef} className="overflow-hidden">
      {children}
    </div>
  );
};

export default Layout;
