"use client";

import React, { useEffect, ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface AOSWrapperProps {
  children: ReactNode;
}

const AOSWrapper = ({ children }: AOSWrapperProps) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return <>{children}</>;
};

export default AOSWrapper;
