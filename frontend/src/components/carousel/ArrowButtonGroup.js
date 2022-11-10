import React from 'react';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const ArrowButtonGroup = ({ infinite, next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide, totalItems, slidesToShow } } = rest;

  const isFirstSlide = () => {
    return currentSlide === 0;
  }

  const isLastSlide = () => {
    return currentSlide === totalItems - slidesToShow;
  }

  const handlePrevious = () => {
    (infinite && isFirstSlide()) ? goToSlide(totalItems - 1) : previous();
  }

  const handleNext = () => {
    (infinite && isLastSlide()) ? goToSlide(0) : next();
  }

  return (
    <>
      <div
        onClick={handlePrevious}
        className={`${(infinite || !isFirstSlide()) ? "flex" : "hidden"} items-center justify-center rounded-full cursor-pointer absolute top-[calc(50%-1.5rem)] left-[4%] sm:left-0 md:left-[-3%] lg:left-0 xl:left-[-2%]`}
      >
        <BsChevronLeft className="text-[3rem] text-white" />
      </div>
      <div
        onClick={handleNext}
        className={`${(infinite || !isLastSlide()) ? "flex" : "hidden"} items-center justify-center rounded-full cursor-pointer absolute top-[calc(50%-1.5rem)] right-[4%] sm:right-0 md:right-[-3%] lg:right-0 xl:right-[-2%]`}
      >
        <BsChevronRight className="text-[3rem] text-white" />
      </div>
    </>
  );
};

export default ArrowButtonGroup;
