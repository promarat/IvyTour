import React, { useEffect, useState } from 'react';
import moment from 'moment';

const TimeDurationComponent = (props) => {
  const { eventList, onChange } = props;
  const [weeks, setWeeks] = useState(5);

  useEffect(() => {
    if (eventList.length > 0) {
      const eventDate = moment(eventList[0].date);
      const year = eventDate.year();
      const month = eventDate.month();
      const days = new Date(year, month + 1, 0).getDate();
      const leftdays = new Date(year, month, 1).getDay();
      const rightdays = 6 - new Date(year, month, days).getDay();
      setWeeks((leftdays + days + rightdays) / 7);
    }
  }, [eventList]);

  const onSelectTimeSlot = (event) => {
    onChange(event);
  }

  return (
    <div className={`flex flex-col flex-1 overflow-auto gap-5 px-8 py-5 ${weeks === 5 ? "max-h-[23.4rem]" : "max-h-[27.4rem]"}`}>
      {eventList && eventList.map(item => (
        <button
          key={item.id}
          className={`w-full rounded-[.5rem] font-['Light'] text-[1.5rem] text-center py-2 border ${item.type === 0 ? "bg-primary border-white text-white" : "border-black hover:bg-[#d9d9d9] hover:border-[#d9d9d9]"}`}
          onClick={() => onSelectTimeSlot(item)}
        >
          {item.start_time} - {item.end_time}
        </button>
      ))}
    </div>
  );
}

export default TimeDurationComponent;
