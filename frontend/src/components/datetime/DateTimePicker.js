import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { AiOutlinePlus } from 'react-icons/ai';
import CalendarComponent from './CalendarComponent';
import TimeRangeEdit from './TimeRangeEdit';
import { CALENDAR_SELECTABLE_ALL } from '../../common/common';
import { EVENT_LIST } from '../../common/mockdata';

const DateTimePicker = (props) => {
  const { year, startMonth, endMonth, open, onClose, onChange } = props;
  const eventList = EVENT_LIST;
  const [date, setDate] = useState();
  const [times, setTimes] = useState([]);

  const onChangeDate = (date) => {
    setDate(date);
  }

  const onAddTime = () => {
    setTimes([...times, { start: '', end: '' }]);
  }

  const onRemoveTime = (index) => {
    setTimes(times.filter((_, idx) => idx !== index));
  }

  const onChangeTime = (index, type, time) => {
    const newTimes = times.map((item, idx) => {
      if (index === idx) {
        return { ...item, [type]: time };
      }
      return item;
    });
    setTimes(newTimes);
  }

  const onCancel = () => {
    setTimes([]);
    onClose();
  }

  const onApply = () => {
    if (!date) return;
    const newTimes = times.filter(time => time.start && time.end);
    if (newTimes.length === 0) return;
    const uniqueTimes = newTimes.reduce((unique, o) => {
      if (!unique.some(obj => obj.start === o.start && obj.end === o.end)) {
        unique.push(o);
      }
      return unique;
    }, []);
    if (uniqueTimes.length === 0) return;
    if (uniqueTimes.find(time => time.end < time.start)) return;
    onChange({ date, times: uniqueTimes });
    setTimes([]);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={false}
      closeOnOverlayClick={false}
      center={true}
      classNames={{ root: "z-100", modal: "rounded-[.5rem] p-0" }}
    >
      <div className="modal-body">
        <div className="min-h-[31rem] px-[1.2rem] pt-[1.2rem]">
          <CalendarComponent
            year={year}
            startMonth={startMonth}
            endMonth={endMonth}
            selectable={CALENDAR_SELECTABLE_ALL}
            eventList={eventList}
            onChangeDate={onChangeDate}
          />
        </div>
        <div className="w-full bg-[#d9d9d9] border-y-2 border-[#b7b7b7] px-8 py-4">
          <p className="font-['Bold'] text-[1.25rem]">What hours are you available?</p>
          <div className="flex items-start justify-start mt-4">
            <div className="flex flex-col items-center gap-4">
              {times.length === 0 ? (
                <p className="text-[1.25rem] leading-[2.6rem] text-black w-[22.6rem]">Unavailable</p>
              ) : times.map((time, idx) => (
                <TimeRangeEdit
                  key={`time-${idx}`}
                  theme="dark"
                  start={time.start}
                  end={time.end}
                  setStartTime={(time) => onChangeTime(idx, 'start', time)}
                  setEndTime={(time) => onChangeTime(idx, 'end', time)}
                  onRemove={() => onRemoveTime(idx)}
                />
              ))}
            </div>
            <AiOutlinePlus
              className="text-[1.8rem] text-black cursor-pointer ml-4 mt-1"
              onClick={onAddTime}
            />
          </div>
        </div>
        <div className="flex items-center gap-5 px-6 py-8">
          <button
            type="button"
            className="w-full bg-white border border-black rounded-[2rem] text-[1.25rem] py-3"
            onClick={onCancel}
          >Cancel</button>
          <button
            type="button"
            className="w-full bg-primary border border-primary rounded-[2rem] text-[1.25rem] text-white py-3"
            onClick={onApply}
          >Apply</button>
        </div>
      </div>
    </Modal>
  )
}

export default DateTimePicker;
