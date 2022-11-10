import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { FaCheck } from 'react-icons/fa';
import Checkbox from 'react-custom-checkbox';
import { setUserAccount } from '../../store/actions/accountActions';
import { USER_ACCOUNT, GUIDE_ACCOUNT } from '../../common/mockdata';

const LoginScreen = (props) => {
  const { bookInfo, setUserAccount } = props;
  const navigate = useNavigate();
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required').email('Invalid email address'),
      password: Yup.string().required('Required').test('len', 'Min 8 characters', val => val && val.length >= 8),
    }),
    onSubmit: values => {
      setLoading(true);
      if (Object.keys(bookInfo).length === 0) {
        if (values.email === 'david@cornell.edu') {
          setUserAccount(GUIDE_ACCOUNT);
        } else {
          setUserAccount(USER_ACCOUNT);
        }
        navigate('/dashboard');
      } else {
        navigate('/confirmbook');
      }
    }
  });

  const onGoogleSuccess = (res) => {
    console.log(res);
  }

  const onGoogleFailure = (res) => {
    console.log(res);
  }

  return (
    <div className="max-w-[640px] mx-auto mt-[2rem]">
      <h1 className="font-['Bold'] text-[3rem] text-white text-center">Log In</h1>
      <GoogleLogin
        clientId="847028004854-s2orrm74glgb3h3qmvtddljf98im8i2e.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        render={renderProps => (
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full rounded-[2rem] bg-white font-['Light'] text-[1.25rem] py-2 mt-[1.25rem]"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled || loading}>
            <FcGoogle size="36" />Sign in with Google
          </button>
        )}
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
        cookiePolicy={'single_host_origin'}
        disabled={loading}
      />
      <div className="flex items-center before:content-[''] before:border-t-2 before:border-[#d9d9d9] before:flex-auto after:content-[''] after:border-t-2 after:border-[#d9d9d9] after:flex-auto mt-8">
        <span className="text-[1.5rem] text-[#cccccc] px-4">or Sign in with Email</span>
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-8 pb-8">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-[1.75rem] text-white mb-[.5rem]">Email *</label>
          <input
            type="email"
            id="email"
            placeholder="mail@tourable.com"
            className={`form-control text-[1.3rem] rounded-[1.25rem] ${formik.touched.email && formik.errors.email ? "border border-danger" : "border-none"}`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loading}
          />
          {formik.touched.email && formik.errors.email &&
            <span className="font-['Light'] text-[1.2rem] text-danger ml-2 mt-1">{formik.errors.email}</span>
          }
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="password" className="text-[1.75rem] text-white mb-[.5rem]">Password *</label>
          <input
            type="password"
            id="password"
            placeholder="min. 8 character"
            className={`form-control text-[1.3rem] rounded-[1.25rem] ${formik.touched.password && formik.errors.password ? "border border-danger" : ""}`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loading}
          />
          {formik.touched.password && formik.errors.password &&
            <span className="font-['Light'] text-[1.2rem] text-danger ml-2 mt-1">{formik.errors.password}</span>
          }
        </div>
        <div className="flex items-center justify-between mt-5">
          <Checkbox
            icon={<FaCheck size={14} className="text-primary" />}
            borderColor="white"
            className="bg-white cursor-pointer"
            label="Remember me"
            labelClassName="text-[1.4rem] text-white pl-2"
            checked={remember}
            onChange={setRemember}
          />
          <span className="font-['Bold'] text-[1.4rem] text-primary">Forgot password?</span>
        </div>
        <button
          type="submit"
          className="w-full rounded-[2rem] bg-primary font-['Light'] text-[1.5rem] text-white py-2 mt-[2rem]"
          disabled={loading}
        >Log In</button>
        <div className="flex items-center gap-2 mt-5">
          <span className="text-[1.4rem] text-white">Not registered yet?</span>
          <Link to="/signup" className="font-['Bold'] text-[1.4rem] text-primary">Create an Account</Link>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bookInfo: state.bookInfo,
  };
}
const mapDispatchToProps = { setUserAccount };
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
