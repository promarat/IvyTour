import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { FaCheck } from 'react-icons/fa';
import Checkbox from 'react-custom-checkbox';

const SignupScreen = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().required('Required').email('Invalid email address'),
      password: Yup.string().required('Required').test('len', 'Min 8 characters', val => val && val.length >= 8),
    }),
    onSubmit: values => {
      setLoading(true);
      navigate('/verify');
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
      <h1 className="font-['Bold'] text-[3rem] text-white text-center">Sign Up</h1>
      <GoogleLogin
        clientId="847028004854-s2orrm74glgb3h3qmvtddljf98im8i2e.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        render={renderProps => (
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full rounded-[2rem] bg-white font-['Light'] text-[1.25rem] py-2 mt-[1.25rem]"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled || loading}>
            <FcGoogle size="36" />Sign up with Google
          </button>
        )}
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
        cookiePolicy={'single_host_origin'}
        disabled={loading}
      />
      <div className="flex items-center before:content-[''] before:border-t-2 before:border-[#d9d9d9] before:flex-auto after:content-[''] after:border-t-2 after:border-[#d9d9d9] after:flex-auto mt-8">
        <span className="text-[1.5rem] text-[#cccccc] px-4">or Sign up with Email</span>
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-8 pb-8">
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-[1.75rem] text-white mb-[.5rem]">First Name *</label>
            <input
              type="text"
              id="firstName"
              placeholder="John"
              className={`form-control text-[1.3rem] rounded-[1.25rem] ${formik.touched.firstName && formik.errors.firstName ? "border border-danger" : "border-none"}`}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.firstName && formik.errors.firstName &&
              <span className="font-['Light'] text-[1.2rem] text-danger ml-2 mt-1">{formik.errors.firstName}</span>
            }
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-[1.75rem] text-white mb-[.5rem]">Last Name *</label>
            <input
              type="text"
              id="lastName"
              placeholder="Doe"
              className={`form-control text-[1.3rem] rounded-[1.25rem] ${formik.touched.lastName && formik.errors.lastName ? "border border-danger" : "border-none"}`}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.lastName && formik.errors.lastName &&
              <span className="font-['Light'] text-[1.2rem] text-danger ml-2 mt-1">{formik.errors.lastName}</span>
            }
          </div>
        </div>
        <div className="flex flex-col mt-5">
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
        <div className="flex items-center gap-2 mt-5">
          <Checkbox
            icon={<FaCheck size={14} className="text-primary" />}
            borderColor="white"
            className="bg-white cursor-pointer"
            label="I have read the"
            labelClassName="text-[1.4rem] text-white pl-2"
            checked={agree}
            onChange={setAgree}
          />
          <span className="text-[1.4rem] text-white">terms of services</span>
        </div>
        <button
          type="submit"
          className="w-full rounded-[2rem] bg-primary font-['Light'] text-[1.5rem] text-white py-2 mt-[2rem]"
          disabled={loading || !agree}
        >Register</button>
        <div className="flex items-center gap-2 mt-5">
          <span className="text-[1.4rem] text-white">Already have an account?</span>
          <Link to="/login" className="font-['Bold'] text-[1.4rem] text-primary">Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignupScreen;
