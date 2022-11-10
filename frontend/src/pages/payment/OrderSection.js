import React, { useState } from 'react';
import DISCOUNT_IMG from '../../assets/images/discount.svg';

const OrderSection = (props) => {
  const { plan, university, tax, discountRate, verifyDiscountCode, price } = props;
  const [discountCode, setDiscountCode] = useState('');

  return (
    <div className="flex flex-col p-8 border-[rgba(0,0,0,.07)] border-b-2 md:border-0 md:border-r-2 xl:p-12">
      <h2 className="font-['SemiBold'] text-[1.5rem]">Order Summary</h2>
      <div className="flex flex-row justify-between bg-[#f8fafc] border border-[#e3e8ef] rounded-[.75rem] px-6 py-6 mt-6">
        <div className="flex flex-row gap-4">
          <div className={`min-w-[1.5rem] h-[1.5rem] bg-[${plan?.color ?? "#fd6262"}] rounded-[.5rem]`} />
          <div className="flex flex-col gap-2">
            <p className="text-[1rem]">{plan?.title}</p>
            {university && (
              <p className="text-[1rem] text-[#677489]">School: <span className="text-black">{university}</span></p>
            )}
          </div>
        </div>
        <p className="text-[1rem] text-[#111729]">${plan?.fee}</p>
      </div>
      <p className="font-['Bold'] text-[1.2rem] text-[#111729] mt-6">Discount Code</p>
      <div className="flex flex-row border-2 border-[#889ce7] rounded-[.75rem] px-4 py-0 mt-2">
        <img src={DISCOUNT_IMG} alt="" />
        <input type="text" className="w-full form-control" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
        <button type="button" className="text-[1rem] text-[#889ce7]" onClick={() => verifyDiscountCode(discountCode)}>Apply</button>
      </div>
      <div className="w-full border border-[#e3e8ef] mt-7" />
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center justify-between">
          <label className="text-[1rem] text-[#677489]">Subtotal</label>
          <span className="text-[1rem] text-[#111729]">${(+plan?.fee).toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-[1rem] text-[#677489]">Taxes and Fees</label>
          <span className="text-[1rem] text-[#111729]">${tax.toFixed(2)}</span>
        </div>
        {!!discountRate && (
          <div className="flex items-center justify-between">
            <label className="text-[1rem] text-[#677489]">Discount ({discountRate}%)</label>
            <span className="text-[1rem] text-[#111729]">-${(plan?.fee * discountRate / 100).toFixed(2)}</span>
          </div>
        )}
        <div className="w-full border border-[#e3e8ef]" />
        <div className="flex items-center justify-between mt-1">
          <label className="text-[1rem] text-[#111729]">Total</label>
          <span className="text-[1rem] text-[#111729]">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export { OrderSection };
