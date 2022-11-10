import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AVATAR from '../../assets/images/avatar.png';

const Header = (props) => {
  const { account } = props;

  return (
    <div className="absolute z-[100] w-full h-[92px] bg-black/[.5] opacity-75 flex items-center justify-between pl-12 pr-8">
      <Link to="/" className="font-['Bold'] text-[32px] text-white">tourable</Link>
      {Object.keys(account).length === 0 ? (
        <Link
          to="/login"
          className="border border-white rounded-[.5rem] font-['Light'] text-[1.25rem] text-white px-8 py-1"
        >log in</Link>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-[1.5rem] text-white">{account.firstName} {account.lastName}</span>
          <img src={AVATAR} alt="" className="w-[3rem] h-[3rem] rounded-full" />
        </div>
      )}
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
}
export default connect(mapStateToProps)(Header);
