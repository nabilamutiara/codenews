import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1500); 
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-sm  text-gray-800">
          Dashboard hanya dapat diakses pada mode desktop
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-screen min-h-screen bg-white">
      <Sidebar />
      <div className="ml-[250px] w-[calc(100vw-268px)] min-h-[100vh]">
        <Header />
        <div className="p-4">
          <div className="pt-[85px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;