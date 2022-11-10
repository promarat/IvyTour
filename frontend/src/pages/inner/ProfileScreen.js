import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import UserProfile from '../user/UserProfile';
import GuideProfile from '../guide/GuideProfile';

const ProfileScreen = (props) => {
  const { account } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(account).length === 0) {
      navigate('/login');
    }
  }, [account, navigate]);

  if (account.type === 'student') {
    return <UserProfile />
  }
  return (
    <GuideProfile />
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
}
export default connect(mapStateToProps)(ProfileScreen);
