import React from 'react';
import { connect } from 'react-redux';
import AVATAR from '../../assets/images/avatar.png';

const WaitingRoom = (props) => {
  const { participants } = props;
  const waitItems = participants["wait"] ? participants["wait"].filter(item => item.role !== 'ROLE_HOST') : [];

  const renderParticipant = (id, avatar, name) => (
    <div key={`waiting-${id}`} className="flex flex-col items-center justify-center">
      <img src={avatar} alt="" className="w-[10rem] h-[10rem] rounded-[.5rem]" />
      <label className="text-[1.25rem] text-white mt-2">{name}</label>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] py-8">
      <h1 className="font-['Bold'] text-[3rem] text-white">Waiting Room</h1>
      <p className="text-[3rem] text-white text-center max-w-[60rem]">Please hang out here for a moment while the tour guide prepares the tour!</p>
      <div className="flex flex-wrap items-center justify-center gap-[3rem] max-w-[60rem] mt-4">
        {waitItems.map(item => (
          renderParticipant(item.id, AVATAR, item.displayName)
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
export default connect(mapStateToProps)(WaitingRoom);
