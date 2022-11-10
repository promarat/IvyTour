import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPremiumPlan } from '../../store/actions/planActions';
import { MEMBERSHIPS } from '../../common/common';

const ExploreScreen = (props) => {
  const { account, setPremiumPlan } = props;
  const navigate = useNavigate();
  const [membership, setMembership] = useState();
  const [premiumPlans, setPremiumPlans] = useState([]);

  useEffect(() => {
    if (Object.keys(account).length === 0) {
      navigate('/login');
    }
  }, [account, navigate]);

  useEffect(() => {
    setMembership(MEMBERSHIPS[account.membership ?? 0]);
    setPremiumPlans(MEMBERSHIPS.filter((_, index) => index !== account.membership));
  }, [account]);

  const onPayment = (type, color, title, fee) => {
    setPremiumPlan({ type, color, title, fee });
    navigate('/payment');
  }

  const renderCurrentPlan = (color, title) => {
    const borderColor = `border-[${color}]`;
    const bgColor = `bg-[${color}]`;

    return (
      <div className={`flex flex-col bg-white rounded-[.5rem] border-t-[6px] ${borderColor} p-6`}>
        <div className="flex items-center gap-2">
          <div className={`w-[1rem] h-[1rem] rounded-[.25rem] ${bgColor}`} />
          <span className="font-['Light'] text-[1rem]">{title}</span>
        </div>
        <p className="text-[2rem] mt-8">You are currently on our <span className="font-['Bold']">{title}</span> Plan</p>
      </div>
    )
  };

  const renderPremiumPlan = (type, color, title, summary, fee, features, badge) => {
    const borderColor = type === 1 ? "border-primary" : "border-[#fbb01e]";
    const bgColor = type === 1 ? "bg-primary" : "bg-[#fbb01e]";

    return (
      <div className={`relative flex flex-col items-center bg-white rounded-[.5rem] border-t-[6px] ${borderColor} p-6`}>
        {badge && (
          <div className={`absolute top-[-1.8rem] ${bgColor} text-[1.5rem] text-white px-6 py-2`}>Best Value</div>
        )}
        <label className="font-['Bold'] text-[2rem] text-center mt-6">{title}</label>
        <div className="flex">
          <span className="text-[2rem]">$</span>
          <span className="font-['Bold'] text-[4rem]">{fee}</span>
        </div>
        <p className="text-[1rem] text-[#808080] -mt-6">Every year</p>
        <p className="font-['Bold'] text-[1.125rem] text-center mt-6">{summary}</p>
        <button
          type="button"
          className={`${bgColor} rounded-[1.5rem] text-[1.25rem] text-white px-16 py-2 mt-5`}
          onClick={() => onPayment(type, color, title, fee)}
        >Buy Now</button>
        <div className="flex flex-col items-center mt-4">
          {features && features.map((feature, idx) => (
            <span key={`${title}-feature-${idx}`} className="text-[1.25rem]">{feature}</span>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className="px-12 py-10">
      {membership && (
        renderCurrentPlan(membership.color, membership.title)
      )}
      <h1 className="font-['Light'] text-[2.75rem] text-white text-center mt-4">Choose Your Premium Plan</h1>
      <div className="flex flex-col items-center md:flex-row md:items-stretch justify-center gap-9 mt-6">
        {premiumPlans.length > 0 && premiumPlans.map((plan, idx) => (
          <div key={`plan-${idx}`} className="flex">
            {renderPremiumPlan(plan.type, plan.color, plan.title, plan.summary, plan.fee, plan.features, !!plan.badge)}
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
}
const mapDispatchToProps = { setPremiumPlan };
export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen);
