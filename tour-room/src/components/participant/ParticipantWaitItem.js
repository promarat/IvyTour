import React from 'react';
import { connect } from 'react-redux';
import { Helpers } from '@api.stream/studio-kit';
import { setActiveParticipants } from '../../store/actions/participantActions';

const { useStudio } = Helpers.React;

const ParticipantWaitItem = (props) => {
  const { id, avatar, name, setActiveParticipants } = props;
  const { room, projectCommands } = useStudio();

  const allowGuest = () => {
    const type = 'camera';
    projectCommands.addParticipant(id, { isMuted: false, noDisplay: true, isHidden: true, volume: 1 }, type);
    setActiveParticipants([room.getParticipant(id)]);
    room.sendData({ type: 'UserAllowed', id: id});
    room.sendData({type: "ParticipantChange", participants: [room.getParticipant(id)], status: "active"});
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[1rem]">
        <img src={avatar} alt="" className="w-[36px] h-[36px] rounded-[.5rem]" />
        <span className="text-[1.125rem]">{name}</span>
      </div>
      <button
        type="button"
        className="bg-[#fd6262] rounded-[.5rem] font-normal text-[.8rem] text-white px-2 py-2"
        onClick={allowGuest}
      >Admit</button>
    </div>
  );
}


const mapDispatchToProps = { setActiveParticipants };
export default connect(null, mapDispatchToProps)(ParticipantWaitItem);
