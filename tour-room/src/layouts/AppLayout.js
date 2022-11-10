import React from 'react';
import { useLocation } from 'react-router-dom';
import HostHeader from '../pages/host/HostHeader';
import GuestHeader from '../pages/guest/GuestHeader';

const AppLayout = (props) => {
  const { pathname } = useLocation();

  return (
    <div className="relative">
      <div className="absolute bg-gradient-to-b from-[#4e4e4e] to-[#000] w-full h-full min-h-[100vh] z-[-10]" />
      {pathname.startsWith('/guest') ? (
        <GuestHeader />
      ) : (
        <HostHeader />
      )}
      <div className={`${pathname === "/host" ? "pt-[92px]" : ""}`}>
        {props.children}
      </div>
    </div>
  );
}

export default AppLayout;
