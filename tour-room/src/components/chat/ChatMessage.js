import React from 'react';
import AVATAR from '../../assets/images/avatar.png';

const ChatMessage = (props) => {
  const { message, isSelf } = props;

  const displayTimeComponent = (component) =>
    component < 10 ? `0${component}` : String(component)

  const displayTime = (time) =>
    `${time.getHours()}:${displayTimeComponent(
      time.getMinutes(),
    )}:${displayTimeComponent(time.getSeconds())}`

  const sent = new Date(message.timestamp);

  return (
    <div className={`${isSelf ? "text-right" : ""}`}>
      <span className="text-[.9rem] text-[#444444]">{message.displayName}</span>
      <div className={`flex gap-[.5rem] ${isSelf ? "flex-row-reverse" : ""}`}>
        <img src={AVATAR} alt="" className="w-[36px] h-[36px] rounded-[.5rem]" />
        <div className="flex flex-col bg-[#d9d9d9] rounded-[.5rem] px-2 pt-2 pb-1 gap-1">
          <p className="font-normal text-[.9rem] text-black">{message.content}</p>
          <span className="font-normal text-[.6rem] text-[#444444] text-right">{displayTime(sent)}</span>
        </div>
      </div>
    </div>
  );
}

export { ChatMessage };
