import React, { useState, useMemo } from 'react';
import { FiVideo, FiVideoOff } from 'react-icons/fi';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import { TbHandStop } from 'react-icons/tb';

const ParticipantActiveItem = (props) => {
  const { enabled, projectCommands, id, avatar, name, video, hand, lowerHand } = props;
  const type = "camera";

  // Get the initial props in case the participant is on stream
  const projectParticipant = useMemo(() => {
    if (!projectCommands || !id) {
      return;
    }
    return projectCommands.getParticipantState(id, type);
  }, [projectCommands, id]);

  const [isMuted, setIsMuted] = useState(projectParticipant?.isMuted ?? false);

  const toggleMute = () => {
    const checked = !isMuted;
    if (projectCommands) {
      projectCommands.setParticipantMuted(id, checked);
    }
    setIsMuted(checked);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[1rem]">
        <img src={avatar} alt="" className="w-[36px] h-[36px] rounded-[.5rem]" />
        <span className="text-[1.125rem]">{name}</span>
      </div>
      <div className="flex items-center gap-2 text-[1.5rem]">
        {hand && (
          <div
            className={`${enabled ? "cursor-pointer" : ""}`}
            onClick={() => lowerHand(id)}
            disabled={!enabled}
          >
            <TbHandStop className="text-[#0060ff]" />
          </div>
        )}
        <div
          className={`${enabled ? "cursor-pointer" : ""}`}
          onClick={toggleMute}
          disabled={!enabled || !projectCommands}
        >
          {isMuted ? (
            <BiMicrophoneOff className="text-[#eb5757]" />
          ) : (
            <BiMicrophone className="text-[#0060ff]" />
          )}
        </div>
        {video ? (
          <FiVideo className="text-[#0060ff]" />
        ) : (
          <FiVideoOff className="text-[#eb5757]" />
        )}
      </div>
    </div>
  );
}

export { ParticipantActiveItem };
