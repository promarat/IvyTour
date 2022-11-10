import React from 'react';
import AVATAR from '../../assets/images/avatar.png';

const UniversityItem = (props) => {
  const { title, ranking, fee, undergraduate, onClick } = props;

  return (
    <div className="flex items-center gap-[1.5rem] cursor-pointer" onClick={onClick}>
      <img src={AVATAR} alt="" className="w-[10rem] h-[10rem] rounded-[.5rem]" />
      <div className="flex flex-col">
        <h2 className="font-['Bold'] text-[3rem] text-primary">{title}</h2>
        <h3 className="font-['Bold'] text-[1.5rem] text-white">{ranking}</h3>
        <p className="font-['Bold'] text-[1.5rem] text-white">Tuition and Fees: ${fee}</p>
        <p className="font-['Bold'] text-[1.5rem] text-white">Undergraduate Enrollment: {undergraduate}</p>
      </div>
    </div>
  );
}

export { UniversityItem };
