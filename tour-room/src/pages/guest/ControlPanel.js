import React, { useState } from 'react';
import { Helpers } from '@api.stream/studio-kit';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import { FiVideo, FiVideoOff } from 'react-icons/fi';
import { TbHandStop, TbUsers } from 'react-icons/tb';
import { MdOutlineChat, MdOutlineMarkChatUnread } from 'react-icons/md';
import { IoHandRight } from 'react-icons/io5';
import { ImPhoneHangUp } from 'react-icons/im';

const { useStudio } = Helpers.React;

const ControlPanel = (props) => {
  const { isHand, showChat, isUnread, showMembers, toggleHand, toggleChat, toggleMembers, logout } = props;
  const { room } = useStudio();
  const [isMuted, setIsMuted] = useState(false);
  const [isCamera, setIsCamera] = useState(true);

  const toggleMute = () => {
    const checked = !isMuted;
    setIsMuted(checked);
    room.setMicrophoneEnabled(checked);
  }

  const toggleCamera = () => {
    const checked = !isCamera;
    setIsCamera(checked);
    room.setCameraEnabled(checked);
  }

  return (
    <div className="flex items-center justify-center gap-[.5rem] sm:gap-[1.2rem]">
      <button
        type="button"
        className={`w-[3.6rem] h-[3.6rem] flex items-center justify-center rounded-full ${isMuted ? "bg-[#ff4343]" : "bg-[#535353]"} shadow-[0_4px_4px_rgba(0,0,0,.25)]`}
        onClick={toggleMute}
      >
        {isMuted ? (
          <BiMicrophoneOff className="text-white text-[1.6rem]" />
        ) : (
          <BiMicrophone className="text-white text-[1.6rem]" />
        )}
      </button>
      <button
        type="button"
        className={`w-[3.6rem] h-[3.6rem] flex items-center justify-center rounded-full ${isCamera ? "bg-[#535353]" : "bg-[#ff4343]"} shadow-[0_4px_4px_rgba(0,0,0,.25)]`}
        onClick={toggleCamera}
      >
        {isCamera ? (
          <FiVideo className="text-white text-[1.6rem]" />
        ) : (
          <FiVideoOff className="text-white text-[1.6rem]" />
        )}
      </button>
      <button
        type="button"
        className={`w-[3.6rem] h-[3.6rem] flex items-center justify-center rounded-full ${isHand ? "bg-[#8ab4f8]" : "bg-[#535353]"} shadow-[0_4px_4px_rgba(0,0,0,.25)]`}
        onClick={toggleHand}
      >
        {isHand ? (
          <IoHandRight className="text-[#535353] text-[1.6rem]" />
        ) : (
          <TbHandStop className="text-white text-[1.6rem]" />
        )}
      </button>
      <button
        type="button"
        className={`w-[3.6rem] h-[3.6rem] flex items-center justify-center rounded-full ${showChat ? "bg-[#8ab4f8]" : isUnread ? "bg-[#ff4343]" : "bg-[#535353]"} shadow-[0_4px_4px_rgba(0,0,0,.25)]`}
        onClick={toggleChat}
      >
        {showChat ? (
          <MdOutlineChat className="text-[#535353] text-[1.6rem]" />
        ) : isUnread ? (
          <MdOutlineMarkChatUnread className="text-white text-[1.6rem]" />
        ) : (
          <MdOutlineChat className="text-white text-[1.6rem]" />
        )}
      </button>
      <button
        type="button"
        className={`w-[3.6rem] h-[3.6rem] flex items-center justify-center rounded-full ${showMembers ? "bg-[#8ab4f8]" : "bg-[#535353]"} shadow-[0_4px_4px_rgba(0,0,0,.25)]`}
        onClick={toggleMembers}
      >
        <TbUsers className={`${showMembers ? "text-[#535353]" : "text-white"} text-[1.6rem]`} />
      </button>
      <button
        type="button"
        className="w-[5.4rem] h-[3.6rem] flex items-center justify-center rounded-full bg-[#ff4343] shadow-[0_4px_4px_rgba(0,0,0,.25)]"
        onClick={logout}
      >
        <ImPhoneHangUp className="text-white text-[2rem]" />
      </button>
    </div>
  );
}

export { ControlPanel };
