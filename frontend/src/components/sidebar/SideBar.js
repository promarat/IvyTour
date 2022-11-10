import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import CollapseButton from './CollapseButton';

const SideBar = (props) => {
  const { collapsed, toggleCollapsed, account } = props;
  const { pathname } = useLocation();

  return (
    <div className={`${collapsed ? "hidden lg:inline-flex" : "absolute z-10 bottom-0 top-[92px] lg:relative lg:top-0"} max-w-[21.225rem] lg:max-w-[20rem] flex items-start w-full`}>
      <div className="w-full h-full min-h-[calc(100vh-92px)] bg-[#727272] flex flex-1 flex-col gap-3 pl-8 pt-10 text-[1.75rem]">
        <Link to="/dashboard" className={`${pathname === "/dashboard" || pathname === '/profile' || pathname === '/password' ? "text-[#889ce7] font-['Bold']" : "text-white"}`}>Account</Link>
        <Link to="/mytour" className={`${pathname === "/mytour" ? "text-[#889ce7] font-['Bold']" : "text-white"}`}>My Tours</Link>
        {account?.type === 'student' ? (
          <Link to="/explore" className={`${pathname === "/explore" || pathname === '/payment' ? "text-[#889ce7] font-['Bold']" : "text-white"}`}>Explore Premium</Link>
        ) : (
          <Link to="/schedule" className={`${pathname === "/schedule" ? "text-[#889ce7] font-['Bold']" : "text-white"}`}>Time Schedule</Link>
        )}
      </div>
      <div className="lg:hidden">
        <CollapseButton
          collapsed={collapsed}
          onClick={toggleCollapsed}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
}
export default connect(mapStateToProps)(SideBar);
