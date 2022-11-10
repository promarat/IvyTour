import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCode from 'react-auth-code-input';

const VerifyScreen = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const email = "johndoe@tourable.com";

  const onVerify = () => {
    console.log(code);
    setLoading(true);
    navigate('/personal');
  }

  return (
    <div className="max-w-[640px] mx-auto mt-[4.5rem] pb-4">
      <h1 className="font-['Bold'] text-[3rem] text-white text-center">Verify Email Address</h1>
      <p className="text-[1.75rem] text-white text-center mt-[3.5rem]">Just one more step. We already sent an email to {email}. Please check your inbox and input the 6-digit code below.</p>
      <AuthCode
        length={6}
        containerClassName="flex items-center justify-center gap-[.8rem] sm:gap-[1.5rem] mt-[3.5rem]"
        inputClassName="w-full h-[10rem] rounded-[1rem] font-['SemiBold'] text-[3.2rem] text-center"
        onChange={setCode}
        disabled={loading}
      />
      <button
        type="button"
        className="w-full rounded-[1rem] bg-primary font-['Light'] text-[1.5rem] text-white py-4 mt-[3.75rem]"
        onClick={onVerify}
        disabled={loading || code.length !== 6}
      >Verify</button>
    </div>
  );
}

export default VerifyScreen;
