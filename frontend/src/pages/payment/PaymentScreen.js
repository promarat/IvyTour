import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { OrderSection } from './OrderSection';
import { PaymentSection } from './PaymentSection';
import { PLATFORM_TAX } from '../../common/common';

const PaymentScreen = (props) => {
  const { account, premiumPlan } = props;
  const navigate = useNavigate();
  const [discountRate, setDiscountRate] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => { 
    if (Object.keys(account).length === 0) {
      navigate('/login');
    }
  }, [account, navigate]);

  useEffect(() => { 
    if (Object.keys(premiumPlan).length === 0) {
      navigate('/explore');
    } else {
      setPrice(premiumPlan.fee + PLATFORM_TAX);
    }
  }, [premiumPlan, navigate]);

  const verifyDiscountCode = (code) => {
    let rate = 0;
    if (code === 'ADMISSION2022') {
      rate = 10
    }
    setDiscountRate(rate);
    setPrice(premiumPlan.fee * (100 - rate) / 100 + PLATFORM_TAX);
  }

  return (
    <div className="px-[3rem] py-[3rem]">
      <div className="flex flex-col md:grid md:grid-cols-2 bg-white rounded-[.5rem]">
        <OrderSection
          plan={premiumPlan}
          university={premiumPlan?.type === 1 ? "Cornell University" : ""}
          tax={PLATFORM_TAX}
          discountRate={discountRate}
          price={price}
          verifyDiscountCode={verifyDiscountCode}
        />
        <PaymentSection
          fullName={`${account?.firstName} ${account?.lastName}`}
          phone={account?.phone}
          country={account?.country}
          price={price}
          color={premiumPlan?.color}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    premiumPlan: state.premiumPlan,
  };
}
export default connect(mapStateToProps)(PaymentScreen);
