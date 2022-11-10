import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { init, Helpers } from '@api.stream/studio-kit';
import { DeviceSelection } from '../../components/Devices';
import ProjectView from './ProjectView';
import WaitingRoom from './WaitingRoom';
import { setParticipants, setActiveParticipants, setWaitParticipants, setRiseParticipant } from '../../store/actions/participantActions';
import { config } from '../../config/config';

const { useStudio } = Helpers.React;

const DEFAULT_GUEST_NAME = 'Guest-' + Math.floor(Math.random() * 1e4);

const GuestView = (props) => {
  const { setParticipants, setActiveParticipants, setWaitParticipants, setRiseParticipant } = props;
  const { studio, project, room, setStudio, setProject, setRoom, projectCommands } = useStudio();
  const [joining, setJoining] = useState(false);
  const [displayName, setDisplayName] = useState(DEFAULT_GUEST_NAME);
  const [error, setError] = useState();
  const [inRoom, setInRoom] = useState(false);
  const [selfId, setSelfId] = useState();
  const [waiting, setWaiting] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [mapPos, setMapPos] = useState({});

  // Store as a global for debugging in console
  window.SDK = useStudio();

  // Initialize studio
  useEffect(() => {
    if (!joining) return;
    if (!studio) {
      init({
        env: config.env,
      })
        .then(setStudio)
        .catch((e) => {
          console.warn(e);
          setError(e.message);
        })
    }
  }, [joining, studio, setStudio]);

  // Initialize project
  useEffect(() => {
    if (!studio) return;

    if (studio.initialProject) {
      // If the SDK detects a token in the URL, it will return the project
      //  associated with it (e.g. guest view)
      setProject(studio.initialProject);
    } else {
      setError('Invalid token');
    }
  }, [studio, setProject]);

  // Initialize room
  useEffect(() => {
    if (!project || inRoom) return;
    setInRoom(true);
    project
      .joinRoom({
        displayName,
      })
      .then((room) => {
        setJoining(false);
        setRoom(room);
        room.sendData({ type: "UserJoinRequest" });
        setWaiting(true);
      })
      .catch((e) => {
        setError(e.message);
        setInRoom(false);
      })
  }, [project, displayName, inRoom, setRoom]);

  // Listen for room participants
  useEffect(() => {
    if (!room || !projectCommands) return;
    return room.useParticipants((participants) => {
      setParticipants(participants);
      // Prune non-existent guests from the project
      projectCommands.pruneParticipants();
      // get self video
      participants.forEach((participant) => {
        if (participant.isSelf) {
          setSelfId(participant.id);
        }
      });
    });
  }, [room, setParticipants, projectCommands]);

  // Listen for room events
  useEffect(() => {
    if (!room) return;
    return room.onData((data, senderId) => {
      if (data.type === 'UserAllowed'
        && data.id === room.participantId
        && room.getParticipant(senderId).role === 'ROLE_HOST'
      ) {
        setWaiting(false);
      } else if (data.type === 'ParticipantChange'
        && room.getParticipant(senderId).role === 'ROLE_HOST'
      ) {
        if (data.status === 'active') {
          setActiveParticipants(data.participants);
        } else if (data.status === 'wait') {
          setWaitParticipants(data.participants);
        }
      } else if (data.type === 'MapStateChange'
        && room.getParticipant(senderId).role === 'ROLE_HOST'
      ) {
        setShowMap(data.visible);
        setMapPos(data.pos);
      } else if (data.type === 'PosChanged'
        && room.getParticipant(senderId).role === 'ROLE_HOST'
        && project
      ) {
        project.props.panorama.setPosition(data.pos);
      } else if (data.type === 'RiseHand') {
        setRiseParticipant(data.id, data.value);
      }
    });
  }, [room, project, setActiveParticipants, setWaitParticipants, setRiseParticipant]);

  if (error) {
    return <div>{error}</div>
  }

  if (joining) {
    return <div>Joining as {displayName}...</div>
  }

  if (!room) {
    return (
      <form
        className="pt-[6rem]"
        onSubmit={(e) => {
          e.preventDefault()
          setJoining(true)
        }}
      >
        <div>
          <label>Display Name</label>
          <input
            type="text"
            autoFocus={true}
            defaultValue={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value)
            }}
          />
        </div>
        <DeviceSelection />
        <button
          style={{ marginTop: 8, width: 70 }}
          onClick={() => {
            setJoining(true)
          }}
        >
          Join
        </button>
      </form>
    )
  }

  if (waiting) {
    return <WaitingRoom />
  }

  return (
    <div className="">
      <ProjectView
        selfId={selfId}
        showMap={showMap}
        mapPos={mapPos}
      />
    </div>
  );
}

const mapDispatchToProps = { setParticipants, setActiveParticipants, setWaitParticipants, setRiseParticipant };
export default connect(null, mapDispatchToProps)(GuestView);
