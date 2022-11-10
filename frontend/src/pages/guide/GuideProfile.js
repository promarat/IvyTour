import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setUserAccount } from '../../store/actions/accountActions';
import { GRADUATING_CLASSES } from '../../common/common';
import AVATAR from '../../assets/images/avatar.png';

const GuideProfile = (props) => {
  const { account, setUserAccount } = props;
  const navigate = useNavigate();
  const addRef = useRef();
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account.activities) {
      setActivities(account.activities);
    }
  }, [account]);

  const onChangeActivity = (e, index) => {
    setActivities(activities.map((item, idx) => {
      if (index === idx) {
        return e.target.value;
      }
      return item;
    }));
  }

  const onChangeNewActivity = (e) => {
    setNewActivity(e.target.value);
  }

  const onAddActivity = () => {
    if (isAdd && newActivity) {
      setActivities([...activities, newActivity]);
      setNewActivity('');
    } else {
      setIsAdd(true);
    }
    addRef.current.focus();
  }

  const handleSubmit = async (values) => {
    setLoading(true);
    const filterActivities = activities.filter(item => item);
    const newActivities = newActivity ? [...filterActivities, newActivity] : filterActivities;
    setUserAccount({ ...account, ...values, activities: newActivities });
    navigate('/dashboard');
    setLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      firstName: account?.firstName ?? '',
      lastName: account?.lastName ?? '',
      email: account?.email ?? '',
      university: account?.university ?? '',
      graduateClass: account?.graduateClass ?? '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().required('Required').email('Invalid email address'),
      university: Yup.string().required('Required'),
      graduateClass: Yup.string().required('Required'),
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
          <label htmlFor="university" className="text-[1.75rem] text-white w-[26rem]">University:</label>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="university"
              placeholder="Valley Christian High School"
              className={`form-control text-[1.3rem] rounded-[.5rem] ${formik.touched.university && formik.errors.university ? "border border-danger" : "border-none"}`}
              value={formik.values.university}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.university && formik.errors.university &&
              <span className="font-['Light'] text-[1.2rem] text-danger mt-1">{formik.errors.university}</span>
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
          <label className="text-[1.75rem] text-white w-[26rem]">Activities and Societies:</label>
          <div className="flex flex-col w-full gap-3">
            {activities.map((item, idx) => (
              <input
                key={`activity-${idx}`}
                type="text"
                className="form-control text-[1.3rem] rounded-[.5rem]"
                value={item}
                onChange={e => onChangeActivity(e, idx)}
                disabled={loading}
              />
            ))}
            {isAdd && (
              <input
                type="text"
                ref={addRef}
                className="form-control text-[1.3rem] rounded-[.5rem]"
                value={newActivity}
                onChange={onChangeNewActivity}
                disabled={loading}
              />
            )}
            <button
              type="button"
              className="font-['Bold'] text-[1.75rem] text-[#889ce7] ml-auto"
              onClick={onAddActivity}
              disabled={loading}
            >+ add more</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(GuideProfile);
