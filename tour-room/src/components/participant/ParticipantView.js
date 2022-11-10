import React, { useState, useEffect } from 'react';
import { Helpers } from '@api.stream/studio-kit';
import ParticipantCamera from './ParticipantCamera';

const { useStudio } = Helpers.React;

const ParticipantView = (props) => {
  const { participant, controlled, isHost, disabled } = props;
  const { room, projectCommands } = useStudio();
  const [tracks, setTracks] = useState([]);
  // const screenshare = tracks.find((x) => x.type === 'screen_share');
  const webcam = tracks.find((x) => x.type === 'camera');
  const microphone = tracks.find((x) => x.type === 'microphone');

  useEffect(() => {
    if (!room) return;
    setTracks(participant.trackIds.map(room.getTrack).filter(Boolean));
  }, [participant?.trackIds, room]);

  return (
    <>
      <ParticipantCamera
        room={room}
        projectCommands={projectCommands}
        participant={participant}
        webcam={webcam}
        microphone={microphone}
        isHost={isHost}
        controlled={controlled}
        disabled={disabled}
        type="camera"
      />
      {/* {screenshare && (
        <div style={{ marginTop: 10 }}>
          <ParticipantScreenshare
            participant={participant}
            screenshare={screenshare}
          />
        </div>
      )} */}
    </>
  );
}

export default ParticipantView;
