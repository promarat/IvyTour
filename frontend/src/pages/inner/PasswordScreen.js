import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PasswordScreen = (props) => {
  const { account } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    if (Object.keys(account).length === 0) {
      navigate('/login');
    }
  }, [account, navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    // check whether current password, and set new password
    navigate('/dashboard');
    setLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Required'),
      newPassword: Yup.string().required('Required').min(8, 'The password has to be minimum of 8 characters'),
      confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    }
  });

  return (
    <div className="max-w-[640px] mx-auto mt-[3rem]">
      <h1 className="font-['Bold'] text-[3rem] text-white text-center">Change Password</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col p-4">
        <div className="flex flex-col">
          <label htmlFor="currentPassword" className="text-[1.75rem] leading-[3.4rem] text-white">Current Password:</label>
          <div className="flex flex-col w-full">
            <input
              type="password"
              id="currentPassword"
              placeholder=""
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.currentPassword && formik.errors.currentPassword ? "border border-danger" : "border-none"}`}
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.currentPassword && formik.errors.currentPassword &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.currentPassword}</span>
            }
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="newPassword" className="text-[1.75rem] leading-[3.4rem] text-white">New Password:</label>
          <div className="flex flex-col w-full">
            <input
              type="password"
              id="newPassword"
              placeholder=""
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.newPassword && formik.errors.newPassword ? "border border-danger" : "border-none"}`}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.newPassword && formik.errors.newPassword &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.newPassword}</span>
            }
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="confirmPassword" className="text-[1.75rem] leading-[3.4rem] text-white">Confirm Password:</label>
          <div className="flex flex-col w-full">
            <input
              type="password"
              id="confirmPassword"
              placeholder=""
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border border-danger" : "border-none"}`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.confirmPassword}</span>
            }
          </div>
        </div>
        <button
          type="submit"
          className="bg-secondary rounded-[.5rem] text-[1.5rem] text-white px-10 py-2 mt-8 mx-auto"
          disabled={loading}
        >Change</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
}
export default connect(mapStateToProps)(PasswordScreen);
