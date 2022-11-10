import React from 'react';
import { Link } from 'react-router-dom';
import AVATAR from '../../assets/images/avatar.png';

const GuideDashboard = (props) => {
  const { account } = props;

  return (
    <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-center xl:justify-start gap-12 mt-[3rem] xl:ml-[4.25rem]">
      <div className="min-w-[15rem] flex flex-col items-center mx-auto md:mx-0 lg:mx-auto xl:mx-0 gap-5">
        <img src={AVATAR} alt="" className="w-[15rem] h-[15rem] rounded-[1rem]" />
        <Link
          to="/profile"
          className="w-full bg-primary rounded-[.5rem] text-[1.25rem] text-white text-center py-3"
        >Edit Profile</Link>
        <Link
          to="/password"
          className="w-full bg-secondary rounded-[.5rem] text-[1.25rem] text-white text-center py-3"
        >Change Password</Link>
      </div>
      <div className="flex flex-col p-4">
        <h1 className="font-['Bold'] text-[3.25rem] text-white">{account.firstName} {account.lastName}</h1>
        <h2 className="text-[2.75rem] text-white">{account.university}</h2>
        <div className="flex flex-col sm:flex-row mt-12">
          <label className="text-[1.75rem] text-[#808080] w-[16rem]">Email:</label>
          <span className="text-[1.75rem] text-white">{account?.email}</span>
        </div>
        <div className="flex flex-col sm:flex-row mt-4">
          <label className="text-[1.75rem] text-[#808080] w-[16rem]">Major:</label>
          <span className="text-[1.75rem] text-white">{account?.major}</span>
        </div>
        <div className="flex flex-col sm:flex-row mt-4">
          <label className="text-[1.75rem] text-[#808080] w-[16rem]">Graduating Class:</label>
          <span className="text-[1.75rem] text-white">{account?.graduateClass}</span>
        </div>
        <div className="flex flex-col sm:flex-row mt-4">
          <label className="text-[1.75rem] text-[#808080] w-[22rem]">Activities and Societies:</label>
          <ul className="list-disc text-[1.75rem] text-white ml-5">
            {account.activities && account.activities.map((item, idx) => (
              <li key={`activity-${idx}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GuideDashboard;
