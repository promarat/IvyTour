import React from 'react';
import { connect } from 'react-redux';
import { Helpers } from '@api.stream/studio-kit';
import ParticipantWaitItem from '../../components/participant/ParticipantWaitItem';
import { ParticipantActiveItem } from '../../components/participant/ParticipantActiveItem';
import { setRiseParticipant } from '../../store/actions/participantActions';
import AVATAR from '../../assets/images/avatar.png';

const { useStudio } = Helpers.React;

const ParticipantManager = (props) => {
  const { participants, setRiseParticipant } = props;
  const { projectCommands, room } = useStudio();
  const waitMembers = participants['wait'] ?? [];
  const activeMembers = participants['active'] ?? [];

  const lowerHand = (id) => {
    room.sendData({
      type: 'RiseHand',
      id,
      value: false,
    });
    setRiseParticipant(id, false);
  }

  return (
    <div className="flex-1 bg-white rounded-[.5rem] shadow-[0_4px_4px_4px_rgba(0,0,0,.25)] p-2 overflow-auto">
      <h2 className="font-['Medium'] text-[1.5rem] text-center mt-2">Participants</h2>
      <div className="flex flex-col divide-y-2 sm:grid sm:grid-cols-2 sm:divide-y-0 sm:divide-x-2 md:flex md:divide-y-2 md:divide-x-0 lg:grid lg:divide-y-0 lg:divide-x-2 mt-[12px]">
        <div className="mb-[1.5rem] sm:pr-2 md:px-4">
          <h3 className="text-[1.25rem] text-center">Waiting Room</h3>
          <div className="flex flex-col gap-[.6rem] px-3 mt-[1.25rem]">
            {waitMembers.map(item => (
              <ParticipantWaitItem
                key={`wait-${item.id}`}
                id={item.id}
                avatar={AVATAR}
                name={item.displayName}
              />
            ))}
          </div>
        </div>
        <div className="mb-[1.5rem] pt-[1.5rem] sm:pt-0 sm:pl-2 md:px-4">
          <h3 className="text-[1.25rem] text-center">Active Room</h3>
          <div className="flex flex-col gap-[.6rem] px-3 mt-[1.25rem]">
            {activeMembers.map(item => (
              <ParticipantActiveItem
                key={`active-${item.id}`}
                enabled={true}
                projectCommands={projectCommands}
                id={item.id}
                avatar={AVATAR}
                name={item.displayName}
                video={false}
                hand={item.hand}
                lowerHand={lowerHand}
              />
            ))}
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
const mapDispatchToProps = { setRiseParticipant };
export default connect(mapStateToProps, mapDispatchToProps)(ParticipantManager);
