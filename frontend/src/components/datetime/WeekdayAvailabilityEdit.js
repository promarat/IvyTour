import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import Checkbox from 'react-custom-checkbox';
import TimeRangeEdit from './TimeRangeEdit';

const WeekDayAvailabilityEdit = (props) => {
  const { availability, onCheck, onAddTime, onRemoveTime, disabled } = props;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
      <div className="flex items-start">
        <Checkbox
          icon={<FaCheck size={14} className="text-primary" />}
          borderColor="white"
          className="bg-white cursor-pointer"
          label={availability?.title}
          labelClassName="w-[7rem] font-['Bold'] text-[1.4rem] text-white pl-2"
          checked={availability?.checked}
          onChange={onCheck}
          disabled={disabled}
        />
        <div className="w-[14rem] flex justify-end sm:hidden">
          <AiOutlinePlus
            className="text-[1.8rem] text-white cursor-pointer"
            onClick={onAddTime}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {!availability?.times || availability.times.length === 0 ? (
          <p className="text-[1.5rem] leading-[2.5rem] text-[#d9d9d9] w-[22.6rem]">Unavailable</p>
        ) : availability.times.map((time, idx) => (
          <TimeRangeEdit
            key={`${availability.title}-${idx}`}
            start={time.start}
            end={time.end}
            onRemove={() => onRemoveTime(idx)}
            disabled={disabled}
          />
        ))}
      </div>
      <AiOutlinePlus
        className="text-[1.8rem] text-white cursor-pointer ml-4 mt-1 hidden sm:block"
        onClick={onAddTime}
        disabled={disabled}
      />
    </div>
  );
}

export default WeekDayAvailabilityEdit;
