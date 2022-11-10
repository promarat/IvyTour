import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import SideBar from '../components/sidebar/SideBar';
import CollapseButton from '../components/sidebar/CollapseButton';
import { frontRoutes, innerRoutes } from '../routes/routes';

const PAGE_TYPE_NONE = -1;
const PAGE_TYPE_FRONT = 0;
const PAGE_TYPE_INNER = 1;

const AppLayout = (props) => {
  const { pathname } = useLocation();
  const [pageType, setPageType] = useState(PAGE_TYPE_NONE);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const includePage = (routes, path) => {
      return routes.filter((e) => {
        if (e.exact) {
          return e.path === path;
        } else {
          const words = e.path.split(':');
          const keys = path.split('?');
          if (words.length === 2) {
            return path.startsWith(words[0]);
          } else if (keys.length === 1 || keys.length === 2) {
            return path.startsWith(keys[0]);
          } else {
            /// 404 page
            return false;
          }
        }
      }).length > 0;
    }

    const getPageType = (path) => {
      if (includePage(innerRoutes, path)) {
        return PAGE_TYPE_INNER;
      } else if (includePage(frontRoutes, path)) {
        return PAGE_TYPE_FRONT;
      } else {
        return PAGE_TYPE_NONE;
      }
    }

    setPageType(getPageType(pathname));
  }, [pathname]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  return (
    <div className="relative">
      <div className="absolute bg-gradient-to-b from-[#4e4e4e] to-[#000] w-full h-full min-h-[100vh] z-[-10]" />
      <Header />
      <div className={`relative flex ${pathname !== "/" ? "pt-[92px]" : ""}`}>
        {pageType === PAGE_TYPE_INNER && (
          <SideBar
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
          />
        )}
        {collapsed && (
          <div className="absolute lg:hidden z-10">
            <CollapseButton
              collapsed={collapsed}
              onClick={toggleCollapsed}
            />
          </div>
        )}        
        <div className="w-full">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
