import React from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

const CollapseButton = (props) => {
  const { collapsed, onClick } = props;

  return (
    <button
      type="button"
      className="bg-white rounded-r-[.25rem] px-0.5 py-4"
      onClick={onClick}
    >
      {collapsed ? (
        <MdOutlineArrowForwardIos className="text-[#727272]" />
      ): (
        <MdOutlineArrowBackIosNew className="text-[#727272]" />
      )}
    </button>
  )
}

export default CollapseButton;
