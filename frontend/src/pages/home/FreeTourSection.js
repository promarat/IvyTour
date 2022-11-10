import React from 'react';

const FreeTourSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[2rem] mx-2 my-[8rem]">
      <p className="font-['Light'] text-[2.5rem] text-white text-center">Interested in Booking a Free Tour?</p>
      <button
        type="button"
        className="w-full max-w-[340px] h-[3.4rem] bg-primary rounded-[.5rem] text-[1.2rem] text-white"
      >Learn More</button>
    </div>
  );
}

export { FreeTourSection };
