import React from 'react';
import { Link } from 'react-router-dom';

const GuestHeader = () => {
  return (
    <div className="absolute top-[2.25rem] left-[2.25rem] flex gap-3 bg-[rgba(0,0,0,.75)] rounded-[.5rem] px-4 py-1">
      <Link to="/" className="font-['Bold'] text-[1.5rem] text-white">tourable</Link>
      <span className="font-['Light'] text-[1.5rem] text-white">|</span>
      <Link to="/" className="font-['Light'] text-[1.5rem] text-white">Back to Home</Link>
    </div>
  );
}

export default GuestHeader;
