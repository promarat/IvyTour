import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import TourGuideItem from '../../components/tourguide/TourGuideItem';
import CalendarComponent from '../../components/datetime/CalendarComponent';
import TimeDurationComponent from '../../components/datetime/TimeDurationComponent';
import { setBookInfo } from '../../store/actions/bookActions';
import { MEMBERSHIP_FREE, CALENDAR_SELECTABLE_EVENTS } from '../../common/common';
import { EVENT_LIST } from '../../common/mockdata';

const BookScreen = (props) => {
  const { account, bookInfo, setBookInfo } = props;
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);
  const [year, setYear] = useState(0);
  const [startMonth, setStartMonth] = useState(0);
  const [endMonth, setEndMonth] = useState(0);
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    if (Object.keys(bookInfo).length === 0) {
      navigate('/search');
    }
  }, [bookInfo, navigate]);

  useEffect(() => {
    const list = EVENT_LIST.sort((a, b) => ((new Date(a.date)) - (new Date(b.date))));
    setEventList(list);
    setYear(moment(list[0].date).year());
    const start = moment(list[0].date).month() + 1;
    setStartMonth(start);
    if (list.length > 1) {
      let end = moment(list[list.length - 1].date).month() + 1;
      if (end < start) {
        end += 12;
      }
      setEndMonth(end);
    } else {
      setEndMonth(start);
    }
  }, []);

  const onChangeDate = (eventIds) => {
    setDayEvents(EVENT_LIST.filter(event => eventIds.includes(event.id)));
  }

  const onChangeTime = (event) => {
    setBookInfo({ ...bookInfo, book: event });
    navigate('/needlogin');
  }

  const renderDateDescription = (color, description) => (
    <div className="flex items-center gap-2">
      <div className={`w-[.8rem] h-[.8rem] rounded-full bg-[${color}]`} />
      <div className="text-[1rem]">{description}</div>
    </div>
  )

  const renderTimeDescription = (bgColor, description) => (
    <div className="flex items-center gap-2">
      <div className={`w-[.8rem] h-[.8rem] rounded-[.25rem] ${bgColor ? bgColor : "border border-black"}`} />
      <div className="text-[1rem]">{description}</div>
    </div>
  )

  return (
    <div className="mx-auto mt-[2rem] pb-4">
      <h1 className="font-['Bold'] text-[3rem] text-white text-center">Free College Tours for <span className="text-primary">{bookInfo.university?.title ?? ""}</span></h1>
      <div className="flex flex-col lg:flex-row lg:items-start justify-center gap-[4rem] mt-6">
        <div className="mx-auto lg:mx-4">
          <TourGuideItem guide={bookInfo.guide} />
        </div>
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <div className="flex flex-col xl:flex-row gap-[2rem]">
            <div className="sm:max-w-[40rem] bg-white rounded-[.5rem]">
              <div className="p-5">
                <CalendarComponent
                  year={year}
                  startMonth={startMonth}
                  endMonth={endMonth}
                  selectable={CALENDAR_SELECTABLE_EVENTS}
                  eventList={eventList}
                  onChangeEvent={onChangeDate}
                />
              </div>
              <div className="flex flex-col gap-1 px-6 pb-5">
                {renderDateDescription("#88e791", "tour dates available for all users")}
                {renderDateDescription("#889ce7", "tour dates available for premium users")}
              </div>
            </div>
            {dayEvents.length > 0 && (
              <div className="flex flex-col sm:max-w-[40rem] bg-[#f0f0f0] rounded-[.5rem]">
                <p className="text-[1rem] text-right pt-8 pr-8">Time zone: <span className="italic underline cursor-pointer">Eastern Standard Time</span></p>
                <TimeDurationComponent
                  eventList={dayEvents}
                  onChange={onChangeTime}
                />
                <div className="flex flex-col gap-1 px-6 py-5">
                  {renderTimeDescription("bg-primary", "tour dates available for all users")}
                  {renderTimeDescription(null, "tour dates available for premium users")}
                </div>
              </div>
            )}
          </div>
          {account?.membership !== MEMBERSHIP_FREE ? (
            <p className="w-full text-[1.25rem] italic text-white text-center lg:text-left">*You have access to full booking privileges</p>
          ) : (
            <p className="w-full text-[1.25rem] italic text-white text-center lg:text-left">*Upgrade to a <span className="font-['Bold'] underline cursor-pointer">premium plan</span> to select different tour guide or more times</p>
          )}
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(BookScreen);
