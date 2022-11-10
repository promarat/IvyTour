import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import UserDashboard from '../user/UserDashboard';
import GuideDashboard from '../guide/GuideDashboard';

const DashboardScreen = (props) => {
  const { account } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(account).length === 0) {
      navigate('/login');
    }
  }, [account, navigate]);

  if (account.type === 'student') {
    return <UserDashboard account={account} />
  }
  return (
    <GuideDashboard account={account} />
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
}
export default connect(mapStateToProps)(DashboardScreen);
