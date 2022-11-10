import React from 'react';
import { connect } from 'react-redux';
import { MdOutlineClose } from 'react-icons/md';
import { ParticipantActiveItem } from '../../components/participant/ParticipantActiveItem';
import AVATAR from '../../assets/images/avatar.png';

const ParticipantManager = (props) => {
  const { participants, showCloseIcon, onClose } = props;
  const activeMembers = participants['active'] ?? [];

  return (
    <div className="relative flex flex-col flex-1 bg-white rounded-[.5rem] shadow-[0_4px_4px_4px_rgba(0,0,0,.25)] max-h-[30rem] p-2">
      {showCloseIcon && (
        <MdOutlineClose
          className="absolute left-4 top-5 text-[1.8rem] cursor-pointer"
          onClick={onClose}
        />
      )}
      <h2 className="font-['Medium'] text-[1.5rem] text-center mt-2">Participants</h2>
      <div className="flex flex-col gap-[.6rem] px-3 mt-[1.25rem] overflow-auto">
        {activeMembers.map(item => (
          <ParticipantActiveItem
            key={`active-${item.id}`}
            id={item.id}
            avatar={AVATAR}
            name={item.displayName}
            video={true}
            hand={item.hand}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    participants: state.participants,
  };
};
export default connect(mapStateToProps)(ParticipantManager);
