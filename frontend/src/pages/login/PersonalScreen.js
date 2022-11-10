import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GRADUATING_CLASSES } from '../../common/common';

const PersonalScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    navigate('/');
    setLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      highSchool: '',
      graduateClass: '',
      city: '',
      state: '',
      country: '',
    },
    validationSchema: Yup.object({
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
    <div className="max-w-[640px] mx-auto mt-[2rem]">
      <h1 className="font-['Bold'] text-[3rem] text-white text-center">Last Step!</h1>
      <h2 className="font-['Bold'] text-[3rem] text-white text-center">Input Your Information</h2>
      <form onSubmit={formik.handleSubmit} className="mt-8 pb-8">
        <div className="flex flex-col">
          <label htmlFor="highSchool" className="text-[1.75rem] text-white mb-[.5rem]">High School Name *</label>
          <input
            type="text"
            id="highSchool"
            placeholder="High School"
            className={`form-control text-[1.3rem] rounded-[1.25rem] ${formik.touched.highSchool && formik.errors.highSchool ? "border border-danger" : "border-none"}`}
            value={formik.values.highSchool}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loading}
          />
          {formik.touched.highSchool && formik.errors.highSchool &&
            <span className="font-['Light'] text-[1.2rem] text-danger ml-2 mt-1">{formik.errors.highSchool}</span>
          }
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="graduateClass" className="text-[1.75rem] text-white mb-[.5rem]">Graduating Class *</label>
          <select
            type="text"
            id="graduateClass"
            placeholder="United States"
            className={`form-control text-[1.3rem] rounded-[1.25rem] ${formik.touched.graduateClass && formik.errors.graduateClass ? "border border-danger" : "border-none"}`}
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
            <span className="font-['Light'] text-[1.2rem] text-danger ml-2 mt-1">{formik.errors.graduateClass}</span>
          }
        </div>
        <div className="flex gap-3 mt-5">
          <div className="flex flex-col">
            <label htmlFor="city" className="text-[1.75rem] text-white mb-[.5rem]">City *</label>
            <input
              type="text"
              id="city"
              placeholder="Miami"
              className={`form-control text-[1.3rem] rounded-[1.25rem] ${formik.touched.city && formik.errors.city ? "border border-danger" : "border-none"}`}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.city && formik.errors.city &&
              <span className="font-['Light'] text-[1.2rem] text-danger ml-2 mt-1">{formik.errors.city}</span>
            }
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="text-[1.75rem] text-white mb-[.5rem]">State *</label>
            <input
              type="text"
              id="state"
              placeholder="Florida"
              className={`form-control text-[1.3rem] rounded-[1.25rem] ${formik.touched.state && formik.errors.state ? "border border-danger" : "border-none"}`}
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.state && formik.errors.state &&
              <span className="font-['Light'] text-[1.2rem] text-danger ml-2 mt-1">{formik.errors.state}</span>
            }
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="country" className="text-[1.75rem] text-white mb-[.5rem]">Country *</label>
          <input
            type="text"
            id="country"
            placeholder="United States"
            className={`form-control text-[1.3rem] rounded-[1.25rem] ${formik.touched.country && formik.errors.country ? "border border-danger" : "border-none"}`}
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loading}
          />
          {formik.touched.country && formik.errors.country &&
            <span className="font-['Light'] text-[1.2rem] text-danger ml-2 mt-1">{formik.errors.country}</span>
          }
        </div>
        <button
          type="submit"
          className="w-full rounded-[2rem] bg-primary font-['Light'] text-[1.5rem] text-white py-2 mt-[2rem]"
          disabled={loading}
        >Finish</button>
      </form>
    </div>
  );
}

export default PersonalScreen;
