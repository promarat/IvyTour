import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmLoginScreen = () => {
  return (
    <div className="min-h-[100vh] mx-auto pb-4 pt-12 md:pt-[8rem] lg:pt-[12rem]">
      <h1 className="font-['Bold'] text-[3rem] text-white text-center">Please Sign Up or<br />Log In to Confirm Booking</h1>
      <div className="flex flex-col max-w-[40rem] mx-auto gap-4 mt-8">
        <Link to="/signup" className="w-full rounded-[.5rem] bg-primary font-['Light'] text-[1.5rem] text-white text-center py-3">Sign Up</Link>
        <div className="flex items-center before:content-[''] before:border-t-2 before:border-[#d9d9d9] before:flex-auto after:content-[''] after:border-t-2 after:border-[#d9d9d9] after:flex-auto">
          <span className="text-[1.5rem] text-[#cccccc] px-4">or</span>
        </div>
        <Link to="/login" className="w-full rounded-[.5rem] bg-secondary font-['Light'] text-[1.5rem] text-white text-center py-3">Log In</Link>
      </div>
    </div>
  );
}

export default ConfirmLoginScreen;
