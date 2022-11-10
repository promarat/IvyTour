import React from 'react';
import { connect } from 'react-redux';
import ParticipantView from '../../components/participant/ParticipantView';

const ParticipantSection = (props) => {
  const { participants } = props;
  const guideMember = participants['host'];
  const selfMember = participants['self'];
  const activeMembers = participants['active'] ?? [];
  const activeMember = activeMembers.find(participant => participant.id !== selfMember?.id);

  return (
    <div className="flex flex-col items-center justify-center sm:flex-row lg:flex-col gap-4">
      {guideMember && (
        <div className="min-w-[25rem] sm:max-w-[25rem]">
          <ParticipantView
            participant={guideMember}
            controlled={false}
            isHost={false}
          />
        </div>
      )}
      <div className="flex gap-4 flex-row min-w-[25rem] sm:flex-col sm:min-w-fit lg:flex-row lg:min-w-[25rem]">
        {activeMember && (
          <div className="min-w-[12rem] max-w-[12rem] mx-auto">
            <ParticipantView
              participant={activeMember}
              isHost={false}
            />
          </div>
        )}
        {selfMember && (
          <div className="min-w-[12rem] max-w-[12rem] mx-auto">
            <ParticipantView
              participant={selfMember}
              isHost={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    participants: state.participants,
  };
};

export default connect(mapStateToProps)(ParticipantSection);
