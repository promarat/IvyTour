import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import UserTourScreen from '../user/UserTourScreen';
import GuideTourScreen from '../guide/GuideTourScreen';

const MyTourScreen = (props) => {
  const { account } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(account).length === 0) {
      navigate('/login');
    }
  }, [account, navigate]);

  if (account.type === 'student') {
    return <UserTourScreen />
  }
  return (
    <GuideTourScreen />
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
}
export default connect(mapStateToProps)(MyTourScreen);
