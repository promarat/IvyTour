import React from 'react';
import { connect } from 'react-redux';
import ParticipantView from '../../components/participant/ParticipantView';


const ParticipantSection = (props) => {
  const { participants } = props;
  const guideMember = participants['host'];
  const activeMembers = participants['active'] ? participants['active'].slice(0, 2) : [];

  return (
    <div className="flex flex-col items-center justify-center sm:flex-row lg:flex-col gap-4">
      {guideMember && (
        <div className="min-w-[25rem] sm:max-w-[25rem]">
          <ParticipantView
            participant={guideMember}
            controlled={true}
            isHost={true}
          />
        </div>
      )}
      {activeMembers.length > 0 && (
        <div className="flex gap-4 flex-row min-w-[25rem] sm:flex-col sm:min-w-fit lg:flex-row lg:min-w-[25rem]">
          {activeMembers.map((member) => (
            <div key={member.id} className="min-w-[12rem] max-w-[12rem] mx-auto">
              <ParticipantView
                participant={member}
                isHost={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    participants: state.participants,
  };
};
export default connect(mapStateToProps)(ParticipantSection);
