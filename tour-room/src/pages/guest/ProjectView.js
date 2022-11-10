import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Helpers } from '@api.stream/studio-kit';
import { Loader } from '@googlemaps/js-api-loader';
import ParticipantSection from './ParticipantSection';
import ChatView from '../../components/chat/ChatView';
import ParticipantManager from './ParticipantManager';
import { ControlPanel } from './ControlPanel';
import GuestMap from './GuestMap';
import { setRiseParticipant } from '../../store/actions/participantActions';

const { Room } = Helpers;
const { useStudio } = Helpers.React;

const loader = new Loader({
  apiKey: process.env.REACT_APP_MAP_KEY,
  version: "weekly"
});

const ProjectView = (props) => {
  const { selfId, showMap, mapPos, participants, setRiseParticipant } = props;
  const { studio, project, room } = useStudio();
  const renderContainer = useRef();
  const [showChat, setShowChat] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [isUnread, setIsUnread] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [mapStatus, setMapStatus] = useState(false);
  const isHand = participants['self']?.hand;

  useEffect(() => {
    loader.load().then(() => {
      setMapStatus(true);
    })
  }, []);

  useEffect(() => {
    Room.ensureDevicePermissions();
  });

  useEffect(() => {
    if (room) {
      room.sendData({ type: "UserJoined" });
    }
  }, [room]);

  useEffect(() => {
    if (room) {
      return room.useChatHistory((history) => {
        setChatHistory(history);
        if (history.length > 0) {
          setIsUnread(true);
        }
      });
    }
  }, [room]);

  useEffect(() => {
    if (!studio || !project) return;
    studio.render({
      containerEl: renderContainer.current,
      projectId: project.id,
      dragAndDrop: false, // Disable controls for guests
    });
  }, [renderContainer, studio, project]);

  const toggleChat = () => {
    const checked = !showChat;
    setShowChat(checked);
    setIsUnread(false);
    if (checked && showMembers) {
      toggleMembers();
    }
  }

  const toggleMembers = () => {
    const checked = !showMembers;
    setShowMembers(checked);
    if (checked && showChat) {
      toggleChat();
    }
  }

  const toggleHand = () => {
    const checked = !isHand;
    room.sendData({
      type: 'RiseHand',
      id: selfId,
      value: checked,
    });
    setRiseParticipant(selfId, checked);
  }

  if (!room) return null;

  return (
    <div className="relative flex flex-col pb-4 lg:h-[100vh]">
      <div className="relative flex flex-col gap-4 m-2 lg:items-end lg:m-0">
        <div
          ref={renderContainer}
          className="w-full aspect-56 lg:absolute lg:z-[-1] lg:w-[100vw] lg:h-[100vh] lg:top-0 lg:left-0 lg:aspect-auto rounded-[.5rem] overflow-hidden"
        />
        {showMap && mapStatus && (
          <div className="absolute w-full aspect-56 lg:z-[-1] lg:w-[100vw] lg:h-[100vh] lg:top-0 lg:left-0 lg:aspect-auto rounded-[.5rem] overflow-hidden">
            <GuestMap position={mapPos} />
          </div>
        )}
        <div className="flex flex-col gap-4 lg:pt-9 lg:pr-9">
          <ParticipantSection />
          <div className="flex flex-row max-h-[23rem] lg:min-h-[calc(100vh-32rem)] lg:max-h-[calc(100vh-32rem)] 2xl:min-h-[calc(100vh-27rem)] 2xl:max-h-[calc(100vh-27rem)]">
            {showChat && (
              <ChatView
                chatHistory={chatHistory}
                selfId={selfId}
                showCloseIcon={true}
                onClose={toggleChat}
              />
            )}
            {showMembers && (
              <ParticipantManager showCloseIcon={true} onClose={toggleMembers} />
            )}
          </div>
        </div>
      </div>
      <div className="w-full my-4 lg:absolute lg:bottom-4">
        <ControlPanel
          showChat={showChat}
          toggleChat={toggleChat}
          isUnread={isUnread}
          showMembers={showMembers}
          toggleMembers={toggleMembers}
          isHand={isHand}
          toggleHand={toggleHand}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    participants: state.participants,
  };
};
const mapDispatchToProps = { setRiseParticipant };
export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
