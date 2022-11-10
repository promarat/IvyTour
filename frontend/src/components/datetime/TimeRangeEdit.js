import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const TimeRangeEdit = (props) => {
  const { theme, start, end, disabled, setStartTime, setEndTime, onRemove } = props;

  return (
    <div className="flex flex-row items-center">
      <input
        type="time"
        className={`w-[9rem] bg-white rounded-[.5rem] text-[1.25rem] appearance-none focus:outline-none pl-2 py-1 border ${theme === 'dark' ? "border-[#7e7e7e]" : "border-white"}`}
        value={start}
        onChange={(e) => setStartTime(e.target.value)}
        disabled={disabled}
      />
      <span className={`text-[1.5rem] mx-2 ${theme === 'dark' ? "text-black" : "text-white"}`}>-</span>
      <input
        type="time"
        className={`w-[9rem] bg-white rounded-[.5rem] text-[1.25rem] appearance-none focus:outline-none pl-2 py-1 border ${start && end && end <= start ? "border-danger" : theme === 'dark' ? "border-[#7e7e7e]" : "border-white"}`}
        value={end}
        onChange={(e) => setEndTime(e.target.value)}
        disabled={disabled}
      />
      <FiTrash2 className={`text-[1.5rem] ml-5 cursor-pointer ${theme === 'dark' ? "text-black" : "text-white"}`} onClick={onRemove} />
    </div>
  );
}

export default TimeRangeEdit;
