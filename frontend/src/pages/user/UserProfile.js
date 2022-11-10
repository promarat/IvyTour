import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { setUserAccount } from '../../store/actions/accountActions';
import { GRADUATING_CLASSES } from '../../common/common';
import AVATAR from '../../assets/images/avatar.png';

const UserProfile = (props) => {
  const { account, setUserAccount } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    setUserAccount({ ...account, ...values });
    navigate('/dashboard');
    setLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      firstName: account?.firstName ?? '',
      lastName: account?.lastName ?? '',
      email: account?.email ?? '',
      phone: '',
      highSchool: account?.highSchool ?? '',
      graduateClass: account?.graduateClass ?? '',
      city: account?.city ?? '',
      state: account?.state ?? '',
      country: account?.country ?? '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().required('Required').email('Invalid email address'),
      phone: Yup.string().required('Required'),
      highSchool: Yup.string().required('Required'),
      graduateClass: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    }
  });

  return (
    <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-center xl:justify-start gap-12 mt-[3rem] xl:ml-[4.25rem]">
      <div className="min-w-[15rem] flex flex-col items-center mx-auto md:mx-0 lg:mx-auto xl:mx-0 gap-5">
        <img src={AVATAR} alt="" className="w-[15rem] h-[15rem] rounded-[1rem]" />
        <button
          type="button"
          className="w-full bg-primary rounded-[.5rem] text-[1.25rem] text-white py-3"
        >Change Profile Picture</button>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col p-4">
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row">
          <label htmlFor="firstName" className="text-[1.75rem] text-white w-[26rem]">First Name:</label>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="firstName"
              placeholder="John"
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.firstName && formik.errors.firstName ? "border border-danger" : "border-none"}`}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.firstName && formik.errors.firstName &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.firstName}</span>
            }
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row mt-3">
          <label htmlFor="lastName" className="text-[1.75rem] text-white w-[26rem]">Last Name:</label>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="lastName"
              placeholder="Doe"
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.lastName && formik.errors.lastName ? "border border-danger" : "border-none"}`}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.lastName && formik.errors.lastName &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.lastName}</span>
            }
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row mt-3">
          <label htmlFor="highSchool" className="text-[1.75rem] text-white w-[26rem]">High School:</label>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="highSchool"
              placeholder="Valley Christian High School"
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.highSchool && formik.errors.highSchool ? "border border-danger" : "border-none"}`}
              value={formik.values.highSchool}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.highSchool && formik.errors.highSchool &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.highSchool}</span>
            }
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row mt-3">
          <label htmlFor="graduateClass" className="text-[1.75rem] text-white w-[26rem]">Graduating Class:</label>
          <div className="flex flex-col w-full">
            <select
              type="text"
              id="graduateClass"
              placeholder="United States"
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.graduateClass && formik.errors.graduateClass ? "border border-danger" : "border-none"}`}
              value={formik.values.graduateClass}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            >
              <option value="" hidden>Click to Select</option>
              {GRADUATING_CLASSES.map(year => (
                <option key={`gradiuate-${year}`} value={`${year}`}>{year}</option>
              ))}
            </select>
            {formik.touched.graduateClass && formik.errors.graduateClass &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.graduateClass}</span>
            }
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row mt-3">
          <label htmlFor="email" className="text-[1.75rem] text-white w-[26rem]">Email:</label>
          <div className="flex flex-col w-full">
            <input
              type="email"
              id="email"
              placeholder="mail.tourable.net"
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.email && formik.errors.email ? "border border-danger" : "border-none"}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading || true}
            />
            {formik.touched.email && formik.errors.email &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.email}</span>
            }
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row mt-3">
          <label htmlFor="phone" className="text-[1.75rem] text-white w-[26rem]">Phone Number:</label>
          <div className="flex flex-col w-full">
            <PhoneInput
              country={'us'}
              inputProps={{ id: "phone", autoFocus: true, }}
              containerClass=""
              inputStyle={{ width: "100%", height: "3rem", fontSize: "1.3rem", borderRadius: ".5rem" }}
              buttonStyle={{ borderRadius: ".5rem 0 0 .5rem" }}
              value={formik.values.phone}
              onChange={(phone) => formik.setFieldValue("phone", phone)}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.phone && formik.errors.phone &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.phone}</span>
            }
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row mt-3">
          <label htmlFor="city" className="text-[1.75rem] text-white w-[26rem]">City:</label>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="city"
              placeholder="Ithana"
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.city && formik.errors.city ? "border border-danger" : "border-none"}`}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.city && formik.errors.city &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.city}</span>
            }
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row mt-3">
          <label htmlFor="state" className="text-[1.75rem] text-white w-[26rem]">State:</label>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="state"
              placeholder="New York"
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.state && formik.errors.state ? "border border-danger" : "border-none"}`}
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.state && formik.errors.state &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.state}</span>
            }
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row mt-3">
          <label htmlFor="country" className="text-[1.75rem] text-white w-[26rem]">Country:</label>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="country"
              placeholder="United States"
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.country && formik.errors.country ? "border border-danger" : "border-none"}`}
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.country && formik.errors.country &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.country}</span>
            }
          </div>
        </div>
        <button
          type="submit"
          className="bg-secondary rounded-[.5rem] text-[1.5rem] text-white py-2 mt-5 md:w-[18rem] md:ml-16 lg:w-full lg:ml-0 xl:w-[18rem] xl:ml-16"
          disabled={loading}
        >Done Editing</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
}
const mapDispatchToProps = { setUserAccount };
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);