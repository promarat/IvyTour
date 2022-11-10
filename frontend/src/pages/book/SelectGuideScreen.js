import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ArrowButtonGroup from '../../components/carousel/ArrowButtonGroup';
import TourGuideCard from '../../components/tourguide/TourGuideCard';
import { setBookInfo } from '../../store/actions/bookActions';
import { MEMBERSHIP_FREE } from '../../common/common';
import { TOUR_GUIDES } from '../../common/mockdata';

const SelectGuideScreen = (props) => {
  const { account, bookInfo, setBookInfo } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(account).length === 0 || account.membership === MEMBERSHIP_FREE) {
      navigate('/login');
    }
  }, [account, navigate]);

  const onSelectGuide = (guide) => {
    console.log(guide)
    setBookInfo({ ...bookInfo, guide });
    navigate('/book');
  }

  const responsive = {
    xxl: {
      breakpoint: { max: 4000, min: 1536 },
      items: 3,
    },
    xl: {
      breakpoint: { max: 1535, min: 1280 },
      items: 3,
    },
    lg: {
      breakpoint: { max: 1279, min: 1024 },
      items: 2,
    },
    md: {
      breakpoint: { max: 1023, min: 768 },
      items: 2,
    },
    sm: {
      breakpoint: { max: 767, min: 640 },
      items: 2,
      partialVisibilityGutter: 0,
    },
    xs: {
      breakpoint: { max: 639, min: 0 },
      items: 1,
    },
  }

  return (
    <div className="mx-auto mt-[2rem] pb-4">
      <h1 className="font-['Bold'] text-[3rem] text-white text-center">Select Your Tour Guide</h1>
      <div className="relative container pt-6 mx-auto">
        <Carousel
          responsive={responsive}
          partialVisible={false}
          infinite={true}
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<ArrowButtonGroup type="secondary" />}
        >
          {TOUR_GUIDES.map((guide, idx) => (
            <TourGuideCard
              key={`guide-${idx}`}
              guide={guide}
              onClick={() => onSelectGuide(guide)}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    bookInfo: state.bookInfo,
  };
}
const mapDispatchToProps = { setBookInfo };
export default connect(mapStateToProps, mapDispatchToProps)(SelectGuideScreen);