import React, { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from '@stripe/react-stripe-js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PaymentSection = (props) => {
  const { fullName, phone, country, price, color } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fullName && phone && country) {
      setValues({ fullName, phone, country });
    }
  }, [fullName, phone, country]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  }

  const handleChangeInput = (field, value) => {
    setValues({ ...values, [field]: value });
    if (!value) {
      setErrors({ ...errors, [field]: 'Required!' });
    } else {
      setErrors({ ...errors, [field]: undefined });
    }
  }

  const handleChangeCard = (field, e) => {
    if (e.empty) {
      setErrors({ ...errors, [field]: 'Required!' });
    } else if (e.error?.code === 'invalid_number'
      || e.error?.code === 'invalid_expiry_year'
      || e.error?.code === 'invalid_expiry_month_past') {
      setErrors({ ...errors, [field]: 'Invalid' });
    } else if (!e.complete) {
      setErrors({ ...errors, [field]: 'Incomplete' });
    } else if (e.complete) {
      setErrors({ ...errors, [field]: undefined });
      setValues({ ...values, [field]: 'Inputted' });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let newTouched = touched;
    let newErrors = errors;
    ['fullName', 'phone', 'country', 'postalcode', 'cardno', 'expire', 'cvc'].map(field => {
      if (errors[field]) {
        isValid = false;
      } else if (!values[field]) {
        newTouched = { ...newTouched, [field]: true };
        newErrors = { ...newErrors, [field]: 'Required!' };
        isValid = false;
      }
      return field;
    });

    if (!isValid) {
      setTouched(newTouched);
      setErrors(newErrors);
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (!price) {
      return;
    }

    setLoading(true);
    // api createPayment
    setLoading(false);
  }

  return (
    <div className="flex flex-col p-8 xl:p-12">
      <h2 className="font-['SemiBold'] text-[1.5rem]">Payment Details</h2>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="fullName" className="text-[.8rem] text-[#4f5b76]">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="John Doe"
            className={`form-control text-[.8rem] rounded-[.375rem] border-2 shadow-[0_2px_4px_rgba(0,0,0,.07)] ${touched.fullName && errors.fullName ? "border-danger" : "border-[#e0e0e0]"}`}
            value={values.fullName ?? ''}
            onChange={(e) => handleChangeInput('fullName', e.target.value)}
            onBlur={() => handleBlur('fullName')}
            disabled={loading || true}
          />
          {touched.fullName && errors.fullName && (
            <span className="font-['Light'] text-[.7rem] text-danger">{errors.fullName}</span>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label htmlFor="phone" className="text-[.8rem] text-[#4f5b76]">Phone Number</label>
          <PhoneInput
            country={'us'}
            inputProps={{ id: "phone", autoFocus: true, }}
            inputStyle={{ width: "100%", height: "2.4rem", fontSize: ".8rem", borderWidth: "2px", borderRadius: ".375rem" }}
            buttonStyle={{ borderWidth: "2px", borderRadius: ".375rem 0 0 .375rem" }}
            value={values.phone ?? ''}
            onChange={(phone) => handleChangeInput('phone', phone)}
            onBlur={() => handleBlur('phone')}
            disabled={loading || true}
          />
          {touched.phone && errors.phone &&
            <span className="font-['Light'] text-[.7rem] text-danger">{errors.phone}</span>
          }
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label htmlFor="cardno" className="text-[.8rem] text-[#4f5b76]">Card number</label>
          <CardNumberElement
            id="cardno"
            // options={options}
            className={`form-control text-[.8rem] rounded-[.375rem] border-2 shadow-[0_2px_4px_rgba(0,0,0,.07)] ${touched.cardno && errors.cardno ? "border-danger" : "border-[#e0e0e0]"}`}
            onChange={(e) => handleChangeCard('cardno', e)}
            onBlur={() => handleBlur('cardno')}
            disabled={loading}
          />
          {touched.cardno && errors.cardno && (
            <span className="font-['Light'] text-[.7rem] text-danger">{errors.cardno}</span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 mt-3">
          <div className="flex flex-1 flex-col gap-1">
            <label htmlFor="expire" className="text-[.8rem] text-[#4f5b76]">Expiry</label>
            <CardExpiryElement
              id="expire"
              className={`form-control text-[.8rem] rounded-[.375rem] border-2 shadow-[0_2px_4px_rgba(0,0,0,.07)] ${touched.expire && errors.expire ? "border-danger" : "border-[#e0e0e0]"}`}
              onChange={(e) => handleChangeCard('expire', e)}
              onBlur={() => handleBlur('expire')}
              disabled={loading}
            />
            {touched.expire && errors.expire && (
              <span className="font-['Light'] text-[.7rem] text-danger">{errors.expire}</span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label htmlFor="cvc" className="text-[.8rem] text-[#4f5b76]">CVC</label>
            <CardCvcElement
              id="cvc"
              className={`form-control text-[.8rem] rounded-[.375rem] border-2 shadow-[0_2px_4px_rgba(0,0,0,.07)] ${touched.cvc && errors.cvc ? "border-danger" : "border-[#e0e0e0]"}`}
              onChange={(e) => handleChangeCard('cvc', e)}
              onBlur={() => handleBlur('cvc')}
              disabled={loading}
            />
            {touched.cvc && errors.cvc && (
              <span className="font-['Light'] text-[.7rem] text-danger">{errors.cvc}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 mt-3">
          <div className="flex flex-1 flex-col gap-1">
            <label htmlFor="country" className="text-[.8rem] text-[#4f5b76]">Country</label>
            <input
              type="text"
              id="country"
              placeholder="United States"
              className={`form-control text-[.8rem] rounded-[.375rem] border-2 shadow-[0_2px_4px_rgba(0,0,0,.07)] ${touched.country && errors.country ? "border-danger" : "border-[#e0e0e0]"}`}
              value={values.country ?? ''}
              onChange={(e) => handleChangeInput('country', e.target.value)}
              onBlur={() => handleBlur('country')}
              disabled={loading}
            />
            {touched.country && errors.country && (
              <span className="font-['Light'] text-[.7rem] text-danger">{errors.country}</span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label htmlFor="postalcode" className="text-[.8rem] text-[#4f5b76]">POSTAL CODE</label>
            <input
              type="text"
              id="postalcode"
              placeholder="12345"
              className={`form-control text-[.8rem] rounded-[.375rem] border-2 shadow-[0_2px_4px_rgba(0,0,0,.07)] ${touched.postalcode && errors.postalcode ? "border-danger" : "border-[#e0e0e0]"}`}
              value={values.postalcode ?? ''}
              onChange={(e) => handleChangeInput('postalcode', e.target.value)}
              onBlur={() => handleBlur('postalcode')}
              disabled={loading}
            />
            {touched.postalcode && errors.postalcode && (
              <span className="font-['Light'] text-[.7rem] text-danger">{errors.postalcode}</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full ${color ? `bg-[${color}]` : "bg-primary"} rounded-[.5rem] text-[1.25rem] text-white py-1 mt-5`}
          disabled={loading}
        >Make Payment</button>
      </form>
    </div>
  );
}

export { PaymentSection };
