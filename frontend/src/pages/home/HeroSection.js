import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUniversities } from '../../store/actions/universityActions';
import { setBookInfo } from '../../store/actions/bookActions';
import { MEMBERSHIP_FREE } from '../../common/common';
import { TOUR_GUIDE } from '../../common/mockdata';

const HeroSection = (props) => {
  const { account, universities, setBookInfo } = props;
  const navigate = useNavigate();

  useEffect(() => {
    getUniversities();
  }, []);

  const onSelectUniversity = (item) => {
    if (Object.keys(account).length === 0 || account?.membership === MEMBERSHIP_FREE) {
      setBookInfo({
        university: item,
        guide: TOUR_GUIDE,
      });
      navigate('/book');
    } else {
      setBookInfo({
        university: item,
        guide: null,
      });
      navigate('/selectguide');
    }
  }

  return (
    <div className="relative bg-black/75">
      <div className="absolute bg-[url('assets/images/hero_bg.png')] bg-no-repeat bg-center bg-cover w-full h-full z-[-10]" />
      <div className="pt-[92px] px-2 sm:px-4 md:px-[36px] lg:px-[64px] xl:px-[96px] 2xl:px-[108px] pb-[14rem]">
        <h1 className="font-['Bold'] text-[3.8rem] sm:text-[5rem] text-center md:text-left text-white mt-[6rem]">The free, personalized <br />360° college tours</h1>
        <p className="font-['Light'] text-[1.8rem] text-center md:text-left text-white">Talk to a current undergraduate students in your dream school!</p>
        <div className="flex flex-col items-center md:items-start gap-[.5rem] mt-[1.25rem]">
          <Link
            to="/search"
            className="flex items-center justify-center w-full max-w-[340px] h-[3.4rem] bg-primary rounded-[.5rem] text-[1.2rem] text-white"
          >Learn More</Link>
          <Link
            to="/login"
            className="flex items-center justify-center w-full max-w-[340px] h-[3.4rem] bg-secondary rounded-[.5rem] text-[1.2rem] text-white"
          >Already a User</Link>
        </div>
        <p className="font-['Medium'] text-[2rem] text-center md:text-left text-white mt-[10rem]">Free College Tours Available at schools like:</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 mt-2">
          {universities && universities.map((item, idx) => (
            <h2
              key={`university-${idx}`}
              className="font-['Medium'] text-[1.5rem] text-[#cccccc] text-center cursor-pointer"
              onClick={() => onSelectUniversity(item)}
            >{item.short}</h2>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    universities: state.universities,
  };
}
const mapDispatchToProps = { setBookInfo };
export default connect(mapStateToProps, mapDispatchToProps)(HeroSection);
