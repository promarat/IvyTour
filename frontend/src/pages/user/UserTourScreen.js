import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { AiOutlineCaretRight, AiOutlineCaretDown } from 'react-icons/ai';
import { MY_TOUR_EVENTS } from '../../common/mockdata';

const UserTourScreen = () => {
  const [prevTours, setPrevTours] = useState([]);
  const [nextTours, setNextTours] = useState([]);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  useEffect(() => {
    let prevs = [];
    let upcomings = [];
    const now = moment();
    const list = MY_TOUR_EVENTS.sort((a, b) => ((new Date(a.date)) - (new Date(b.date))));
    list.forEach(event => {
      if (moment(event.date).diff(now, 'days') < 0) {
        prevs.push(event);
      } else if (moment(event.date).diff(now, 'days') === 0) {
        if (moment(event.start_time, ["h:mm a"]).diff(now) < 0) {
          prevs.push(event);
        } else {
          upcomings.push(event);
        }
      } else {
        upcomings.push(event);
      }
    });
    setPrevTours(prevs);
    setNextTours(upcomings);
  }, []);

  const togglePrev = () => {
    setShowPrev(!showPrev);
  }

  const toggleNext = () => {
    setShowNext(!showNext);
  }

  const renderEvent = (event, isUpcoming) => (
    <div key={event.id} className="flex flex-col items-start sm:flex-row sm:items-center justify-between bg-[#d9d9d9] hover:bg-white rounded-[.5rem] px-8 py-5 gap-4">
      <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
        <p className="font-['Bold'] text-[1.75rem]">{event.university}</p>
        <span className="hidden md:block text-[1.75rem]">|</span>
        <span className="text-[1.75rem]">{moment(event.date).format('MM/DD')}, {event.start_time} - {event.end_time}</span>
      </div>
      {isUpcoming && (
        <button
          type="button"
          className="bg-primary rounded-[.5rem] text-[1.5rem] text-white py-4 w-full max-w-[20rem] mx-auto"
          disabled={event.url ? false : true}
        >{event.url ? "Click to Join the Room" : "Room Link Not Available"}</button>
      )}
    </div>
  );

  return (
    <div className="px-11 py-6">
      <div className="flex items-center gap-5 cursor-pointer" onClick={toggleNext}>
        {showNext ? (
          <AiOutlineCaretDown className="text-[#8f8f8f]" />
        ) : (
          <AiOutlineCaretRight className="text-[#8f8f8f]" />
        )}
        <span className="font-['Bold'] text-[2.5rem] text-white">Upcoming Tours</span>
      </div>
      {showNext && (
        <div className="flex flex-col gap-5 mt-8">
          {nextTours.length > 0 && nextTours.map(event => (
            renderEvent(event, true)
          ))}
        </div>
      )}
      <div className="flex items-center gap-5 mt-8 cursor-pointer" onClick={togglePrev}>
        {showPrev ? (
          <AiOutlineCaretDown className="text-[#8f8f8f]" />
        ) : (
          <AiOutlineCaretRight className="text-[#8f8f8f]" />
        )}
        <span className="font-['Bold'] text-[2.5rem] text-white">Previous Tours</span>
      </div>
      {showPrev && (
        <div className="flex flex-col gap-5 mt-8">
          {prevTours.length > 0 && prevTours.map(event => (
            renderEvent(event, false)
          ))}
        </div>
      )}
    </div>
  );
}

export default UserTourScreen;
