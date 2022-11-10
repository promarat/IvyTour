import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setToken } from '../../store/actions/tokenActions';
import AVATAR from '../../assets/images/avatar.png';

const HostHeader = () => {
  const logout = () => {
    // Clear the session and reload
    setToken('');
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div className="absolute w-full h-[92px] bg-black/[.5] opacity-75 flex items-center justify-between pl-12 pr-8">
      <Link to="/" className="font-['Bold'] text-[32px] text-white">tourable</Link>
      <div className="flex items-center gap-4 cursor-pointer" onClick={logout}>
        <label className="text-[1.5rem] text-white">John Doe</label>
        <img src={AVATAR} alt="" className="w-[3rem] h-[3rem] rounded-full" />
      </div>
    </div>
  );
}

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(HostHeader);
