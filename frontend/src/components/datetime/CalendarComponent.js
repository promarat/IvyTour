import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import useWindowSize from '../../utils/useWindowSize';
import { CALENDAR_SELECTABLE_EVENTS } from '../../common/common';

const CalendarComponent = (props) => {
  const { startMonth, endMonth, selectedDate, selectable, onChangeDate, eventList, onChangeEvent } = props;
  const isMobile = useWindowSize();
  const [year, setYear] = useState(props.year ?? 2022);
  const [month, setMonth] = useState(startMonth ?? 10);
  const [curMonth, setCurMonth] = useState(startMonth ?? 10);
  const [selectedDay, setSelectedDay] = useState(-1);
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    setYear(props.year);
  }, [props.year]);

  useEffect(() => {
    setMonth(startMonth);
    setCurMonth(startMonth);
  }, [startMonth]);

  useEffect(() => {
    if (selectedDate && selectedDate.year() === year && selectedDate.month() + 1 === month) {
      setSelectedDay(selectedDate.date() - 1);
    } else {
      setSelectedDay(-1);
    }
  }, [year, month, selectedDate]);

  useEffect(() => {
    if (eventList && eventList.length > 0) {
      let datas = [];
      eventList.forEach(event => {
        const eventDate = moment(event.date);
        if (eventDate.year() === year && eventDate.month() + 1 === month) {
          const { id, type } = event;
          datas.push({
            id,
            day: eventDate.date(),
            type,
          });
        }
      });
      setCalendarData(datas);
    }
  }, [eventList, year, month]);

  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

  const moveMonth = (newMonth) => {
    setCurMonth(newMonth);
    setMonth(newMonth > 12 ? newMonth - 12 : newMonth);
    if (newMonth > 12) {
      setYear(props.year + 1);
    } else {
      setYear(props.year);
    }
    if (onChangeEvent) {
      onChangeEvent([]);
    }
  }

  const onPrev = () => {
    if (curMonth > startMonth) {
      moveMonth(curMonth - 1);
    }
  }

  const onNext = () => {
    if (curMonth < endMonth) {
      moveMonth(curMonth + 1);
    }
  }

  const onClickItem = (today, dayEventIds) => {
    if (selectable === CALENDAR_SELECTABLE_EVENTS && dayEventIds.length === 0) {
      return;
    }
    setSelectedDay(today);
    if (onChangeEvent) {
      onChangeEvent(dayEventIds);
    }
    if (onChangeDate) {
      onChangeDate(moment({ year, month: month - 1, day: today + 1 }));
    }
  }

  const renderDay = (index, weekIndex, type = 'empty', today = 0) => {
    if (type === 'empty') {
      return (<td key={`${index}empty${weekIndex}`} className="empty-cell" />);
    }

    const dayEvents = calendarData.filter(event => event.day - 1 === today);
    const dayEventIds = Array.from(dayEvents, ({ id }) => id);
    const dayType = dayEvents.length === 0 ? 'empty'
      : dayEvents.find(event => event.type === 0) ? 'all'
        : 'premium';

    return (
      <td
        key={`${index}day${weekIndex}`}
        className={`relative px-3 py-2 cursor-pointer ${index % 7 === 0 ? "text-primary" : "text-black"}`}
        onClick={() => onClickItem(today, dayEventIds)}
      >
        <div className={`w-[3rem] h-[3rem] text-[1.5rem] leading-[3rem] text-center ${selectedDay === today ? "bg-[#d9d9d9] rounded-full" : ""} ${type === 'today' ? "font-['Bold']" : "font-normal"}`}>{today + 1}</div>
        {dayType === 'all' ? (
          <div className="absolute top-2 right-1 w-[.8rem] h-[.8rem] rounded-full bg-[#88e791]" />
        ) : dayType === 'premium' ? (
          <div className="absolute top-2 right-1 w-[.8rem] h-[.8rem] rounded-full bg-[#889ce7]" />
        ) : (
          null
        )}
      </td>
    )
  }

  const renderWeek = (weekIndex) => {
    const days = daysInMonth(month, year);
    const leftdays = new Date(year, month - 1, 1).getDay();
    const start = weekIndex * 7;
    const dayElements = [];
    const now = moment();
    const isThisMonth = now.year() === year && now.month() === month - 1;

    for (let i = start; i < start + 7; i++) {
      const today = i - leftdays;
      // day is starts from 0  ex: Mar 1st -> Mar, 0
      if (today < 0) {
        dayElements.push(renderDay(i, weekIndex));
      } else if (today > (days - 1)) {
        dayElements.push(renderDay(i, weekIndex));
      } else {
        const type = isThisMonth && now.date() === today + 1 ? 'today' : 'date';
        dayElements.push(renderDay(i, weekIndex, type, today));
      }
    }
    return (<tr key={`${month}week${weekIndex}`}>{dayElements}</tr>);
  }

  const renderTable = () => {
    const days = daysInMonth(month, year);
    const leftdays = new Date(year, month - 1, 1).getDay();
    const rightdays = 6 - new Date(year, month - 1, days).getDay();
    const weeks = (leftdays + days + rightdays) / 7;

    const weekElements = [];
    for (let i = 0; i < weeks; i++) {
      weekElements.push(renderWeek(i));
    }

    return (
      <tbody key={`${month}month`}>
        {weekElements}
      </tbody>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th colSpan="7">
            <div className="flex flex-row items-center justify-between py-2">
              <span className="font-['Medium'] text-[1.5rem] ml-2">
                {new Date(year, month, -1).toLocaleString('en-us', { month: 'long' })}
                {` ${year}`}
              </span>
              <div>
                <button
                  type="button"
                  className="p-2"
                  onClick={onPrev}
                  disabled={curMonth <= startMonth}
                >
                  <AiOutlineLeft className={`${curMonth <= startMonth ? "text-zinc-500" : "text-black"}`} />
                </button>
                <button
                  type="button"
                  className="p-2"
                  onClick={onNext}
                  disabled={curMonth >= endMonth}
                >
                  <AiOutlineRight className={`${curMonth >= endMonth ? "text-zinc-500" : "text-black"}`} />
                </button>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((item) => (
            <th key={`${month}month-${item}`} className={`font-normal text-[1.5rem] text-center ${item === 'Sun' ? "text-primary" : "text-black"}`}>
              {isMobile ? item.slice(0, 1) : item}
            </th>
          ))}
        </tr>
      </thead>
      {renderTable()}
    </table>
  );
}

export default CalendarComponent;
