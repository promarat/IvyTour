import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Helpers } from '@api.stream/studio-kit';
import { Loader } from '@googlemaps/js-api-loader';
import { setParticipants, setWaitParticipants, setRiseParticipant } from '../../store/actions/participantActions';
import ParticipantSection from './ParticipantSection';
import ChatView from '../../components/chat/ChatView';
import ParticipantManager from './ParticipantManager';
import VideoTree from './VideoTree';
import HostMap from './HostMap';
import CollapseButton from '../../components/sidebar/CollapseButton';

const { useStudio } = Helpers.React;

const getUrl = () => (
  window.location.protocol +
  '//' +
  window.location.host
)

const loader = new Loader({
  apiKey: process.env.REACT_APP_MAP_KEY,
  version: "weekly"
});

const ProjectView = (props) => {
  const { setParticipants, setWaitParticipants, setRiseParticipant, participants } = props;
  const { studio, project, room, projectCommands } = useStudio();
  const renderContainer = useRef();
  const [guestUrl, setGuestUrl] = useState('');
  const [selfId, setSelfId] = useState();
  const [chatHistory, setChatHistory] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [mapStatus, setMapStatus] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const activeMembers = participants['active'] ?? [];

  useEffect(() => {
    loader.load().then(() => {
      setMapStatus(true);
    })
  }, []);

  // Generate project links
  useEffect(() => {
    if (studio) {
      // studio.createPreviewLink().then(setPreviewUrl)
      studio.createGuestLink(getUrl() + '/guest').then(setGuestUrl);
    }
  }, [studio]);

  useEffect(() => {
    if (!studio || !project.id) return;
    studio.render({
      containerEl: renderContainer.current,
      projectId: project.id,
      dragAndDrop: false,
    });
  }, [studio, renderContainer, project]);

  // Listen for room participants
  useEffect(() => {
    if (!room || !projectCommands) return;
    return room.useParticipants((items) => {
      setParticipants(items);
      // Prune non-existent guests from the project
      projectCommands.pruneParticipants();

      items.forEach((participant) => {
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
      if (data.type === 'UserJoinRequest') {
        setWaitParticipants([room.getParticipant(senderId)]);
        room.sendData({ type: "ParticipantChange", participants: participants["wait"], status: "wait" });
        room.sendData({ type: "ParticipantChange", participants: participants["active"], status: "active" }, [senderId]);
      } else if (data.type === 'RiseHand') {
        setRiseParticipant(data.id, data.value);
      }
    })
  }, [room, setWaitParticipants, setRiseParticipant, participants])

  useEffect(() => {
    if (room) {
      return room.useChatHistory((history) => {
        setChatHistory(history);
      });
    }
  }, [room]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  if (!room) return null;

  return (
    <div className="">
      <div className="flex gap-3">
        <label>Guest URL</label>
        <input
          type="text"
          value={guestUrl}
          readOnly={true}
          className="w-[600px]"
        />
      </div>
      <div className="relative flex flex-col lg:flex-row justify-center xl:justify-center pb-4">
        <div className={`${collapsed ? "hidden" : "absolute"} z-10 inline-flex left-0 top-0 bottom-4 min-w-[22rem] max-h-[calc(100vh-92px-3.6rem)] 2xl:min-w-fit 2xl:max-h-fit 2xl:relative 2xl:flex flex-1 max-w-[22rem] m-2`}>
          <VideoTree
            mapStatus={mapStatus}
            showMap={showMap}
            setShowMap={setShowMap}
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
          />
        </div>
        {collapsed && (
          <div className="absolute left-0 top-5 2xl:hidden z-10">
            <CollapseButton
              collapsed={collapsed}
              onClick={toggleCollapsed}
            />
          </div>
        )}
        <div className="relative flex flex-col gap-4 lg:w-[calc(100%-28rem)] lg:max-w-[50rem] lg:flex-1 m-2">
          <div
            ref={renderContainer}
            className="w-full aspect-56 rounded-[.5rem] overflow-hidden"
          />
          {showMap && (
            <div className="absolute w-full aspect-56 rounded-[.5rem] overflow-hidden">
              <HostMap room={room} />
            </div>
          )}
          <div className="hidden lg:flex flex-1 lg:max-h-[16.8rem]">
            <ParticipantManager />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:min-w-[25rem] m-2">
          <ParticipantSection />
          <div className="flex flex-col flex-1 gap-4 md:flex-row">
            <div className="flex max-h-[23rem] md:flex-1 lg:hidden">
              <ParticipantManager />
            </div>
            <div className={`flex max-h-[23rem] md:flex-1 md:max-h-fit ${activeMembers.length > 0 ? "lg:min-h-[calc(100vh-32rem)]" : "lg:min-h-[calc(100vh-24.2rem)]"}`}>
              <ChatView
                chatHistory={chatHistory}
                selfId={selfId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    participants: state.participants,
  };
};
const mapDispatchToProps = { setParticipants, setWaitParticipants, setRiseParticipant };
export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
