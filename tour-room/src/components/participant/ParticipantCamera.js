import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Helpers } from '@api.stream/studio-kit';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import AVATAR from '../../assets/images/avatar.png';

const { Room } = Helpers;
const { useStudio } = Helpers.React;

const ParticipantCamera = (props) => {
  const { room, projectCommands } = useStudio();
  const { participant, webcam, microphone, isHost, controlled, disabled, type } = props;
  const { id, displayName } = participant;
  const ref = useRef();
  const [srcObject] = useState(new MediaStream([]));
  const isEnabled = webcam?.mediaStreamTrack && !webcam?.isMuted;

  // Get the initial props in case the participant is on stream
  const projectParticipant = useMemo(
    () => projectCommands.getParticipantState(id, type),
    [projectCommands, id, type],
  );
  const [isMuted, setIsMuted] = useState(projectParticipant?.isMuted ?? false);

  useEffect(() => {
    // Replace the tracks on the existing MediaStream
    Room.updateMediaStreamTracks(srcObject, {
      video: webcam?.mediaStreamTrack,
      audio: microphone?.mediaStreamTrack,
    });
  }, [webcam?.mediaStreamTrack, microphone?.mediaStreamTrack, srcObject]);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = srcObject;
    }
  }, [ref, srcObject, isEnabled]);
  
  const onToggleMute = () => {
    const checked = !isMuted;
    setIsMuted(checked);
    if (controlled) {
      room.setMicrophoneEnabled(checked);
    } else if (isHost) {
      projectCommands.setParticipantVolume(id, checked);
    }
  }

  return (
    <div key={id} className="relative flex items-center justify-center bg-[#d9d9d9] rounded-[.5rem] overflow-hidden aspect-56">
      {isEnabled ? (
        <video
          // Mute because audio is only communicated through the compositor
          muted={true}
          autoPlay={true}
          ref={ref}
          className="bg-transparent m-0"
        />
      ) : (
        <img src={AVATAR} alt={displayName} className="rounded-full h-[80%] aspect-1" />
      )}
      {!disabled && (
        <div className="absolute left-[6%] bottom-[6%] rounded-[.5rem] bg-[rgba(0,0,0,.5)] text-[1rem] text-white px-2 py-1">{displayName}</div>
      )}
      {!disabled && (
        <button
          className="absolute right-[6%] bottom-[6%] rounded-full bg-[rgba(0,0,0,.5)] px-1 py-1"
          onClick={onToggleMute}
          disabled={!isHost && !controlled}
        >
          {isMuted ? (
            <BiMicrophoneOff className="text-white text-[1.3rem]" />
          ) : (
            <BiMicrophone className="text-white text-[1.3rem]" />
          )}
        </button>
      )}
    </div>
  );
}

export default ParticipantCamera;
