import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

const ConfirmBookScreen = (props) => {
  const { bookInfo } = props;
  const navigate = useNavigate();
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    if (Object.keys(bookInfo).length !== 3
      || Object.keys(bookInfo.book).length === 0
    ) {
      navigate('/search');
    } else {
      const date = moment(bookInfo.book.date);
      setDateStr(date.format('dddd - MM/DD/YYYY'));
      setTimeStr(`${bookInfo.book.start_time} - ${bookInfo.book.end_time} EST`);
    }
  }, [bookInfo, navigate]);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="font-['Bold'] text-[3rem] text-white text-center">Congratulations!</h1>
      <p className="text-[1.75rem] text-white text-center">Your tour of <span className="font-['Bold'] text-primary">{bookInfo?.university?.title}</span> has been booked</p>
      <div className="max-w-[42rem] bg-white rounded-[1rem] flex flex-col p-[2rem] mt-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <label className="italic text-[1.5rem] text-[#808080]">University:</label>
          <span className="text-[1.5rem] text-right">{bookInfo?.university?.title}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <label className="italic text-[1.5rem] text-[#808080]">Tour Guide:</label>
          <span className="text-[1.5rem] text-right">{bookInfo?.guide?.name}</span>
        </div>
        <p className="italic text-[1.1rem] text-[#808080] text-right">{bookInfo?.guide?.major} {bookInfo?.guide?.graduateClass}'</p>
        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <label className="italic text-[1.5rem] text-[#808080]">Date:</label>
          <span className="text-[1.5rem] text-right">{dateStr}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <label className="italic text-[1.5rem] text-[#808080]">Time:</label>
          <span className="text-[1.5rem] text-right">{timeStr}</span>
        </div>
        <p className="text-[1.5rem] text-center mt-[2.5rem]">*Link to the tour will be available 24 hours before the tour time at your <span className="underline cursor-pointer">dashboard</span></p>
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-[2.2rem]">
          <button
            type="button"
            className="w-full rounded-[.5rem] bg-primary text-[1.75rem] text-white text-center py-3"
          >Add to Calendar</button>
          <Link
            to="/dashboard"
            className="w-full rounded-[.5rem] bg-secondary text-[1.75rem] text-white text-center py-3"
          >Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bookInfo: state.bookInfo,
  };
}
export default connect(mapStateToProps)(ConfirmBookScreen);
