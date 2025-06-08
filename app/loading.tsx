'use client';	
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-70 z-50">
      <span className="loading loading-ring loading-xl text-primary"></span>
    </div>
  );
};

export default Loading;
