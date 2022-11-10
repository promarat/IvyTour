import React from 'react';
import AVATAR from '../../assets/images/avatar.png';

const TourGuideItem = (props) => {
  const { guide } = props;

  return (
    <div className="w-[18.5rem]">
      <img src={AVATAR} alt="" className="w-[18.5rem] h-[18.5rem] rounded-[.5rem]" />
      <h2 className="font-['Bold'] text-[2rem] text-primary text-center">{guide?.name ?? ""}</h2>
      <div className="text-[1.2rem] text-white">
        <p><span className="font-['Bold'] mr-1">Major:</span>{guide?.major ?? ""}</p>
        <p><span className="font-['Bold'] mr-1">Graduating Class:</span>{guide?.graduateClass ?? ""}</p>
        <span className="font-['Bold'] mr-1">Activities and Societies:</span>
        <ul className="list-disc ml-5">
          {guide?.activities && guide.activities.map((item, idx) => (
            <li key={`activity-${idx}`}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TourGuideItem;
