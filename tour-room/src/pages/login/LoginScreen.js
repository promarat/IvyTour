import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { setToken } from '../../store/actions/tokenActions';

const LoginScreen = (props) => {
  const { setToken } = props;
  const navigate = useNavigate();

  const login = async (event) => {
    const http = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    let res = await http.get(`/auth/${nanoid(21)}`);
    setToken(res.data);
    navigate('/host');
  }

  return (
    <div className="pt-20">
      <button
        onClick={login}
        className="text-[18px] border-2 px-6 py-4 mt-3 rounded-md text-sm font-medium"
      >Login To Stream</button>
    </div>
  );
}

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(LoginScreen);
