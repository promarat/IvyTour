import React from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

const CollapseButton = (props) => {
  const { collapsed, onClick } = props;

  return (
    <button
      type="button"
      className="bg-[#727272] rounded-r-[.25rem] px-0.5 py-4"
      onClick={onClick}
    >
      {collapsed ? (
        <MdOutlineArrowForwardIos className="text-white" />
      ): (
        <MdOutlineArrowBackIosNew className="text-white" />
      )}
    </button>
  )
}

export default CollapseButton;
