import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helpers, init } from '@api.stream/studio-kit';
import { nanoid } from 'nanoid';
import { setToken } from '../../store/actions/tokenActions';
import ProjectView from './ProjectView';
import { config } from '../../config/config';
import { setActiveParticipants } from '../../store/actions/participantActions';

const { ScenelessProject } = Helpers;
const { useStudio } = Helpers.React;

const HostView = (props) => {
  const navigate = useNavigate();
  const { token, setToken } = props;
  const {
    studio,
    project,
    projectCommands,
    room,
    setProject,
    setRoom,
    setStudio,
  } = useStudio();
  const [failure, setFailure] = useState(null);

  // Store as a global for debugging in console
  window.SDK = useStudio();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token || studio) return;

    init({
      env: config.env,
    })
      .then(setStudio)
      .catch(e => {
        console.warn('Failed to initialize', e);
        setFailure(e.message);
      });
  }, [token, studio, setStudio]);

  useEffect(() => {
    if (!studio || project) return;
    // If the SDK detects a token in the URL, it will return the project
    //  associated with it (e.g. guest view)
    setProject(studio.initialProject);
  }, [studio, project, setProject]);

  useEffect(() => {
    if (!token || !studio || project) {
      return;
    }
    // Log in
    studio.load(token).then(async (user) => {
      // If there's a project, return it - otherwise create one
      let project = user.projects[0];
      
      if (!project) {
        project = await ScenelessProject.create({
          backgroundImage: 'https://www.coindesk.com/resizer/9KKmCHfJGOfXu8SWX1Q7w1fTBT0=/arc-photo-coindesk/arc2-prod/public/RORTMU2XOFHUPMCLZNYQ2UDOWI.jpg'
        });
      }

      const activeProject = await studio.Command.setActiveProject({
        projectId: project.id,
      });
      const room = await activeProject.joinRoom({
        displayName: nanoid(6),
      });

      setRoom(room);
      setProject(activeProject);
    }).catch((e) => {
      console.warn(e);
      setToken(null);
    });
  }, [token, studio, project, setProject, setRoom, setToken]);

  useEffect(() => {
    if (room) {
      setActiveParticipants([room.getParticipant(room.participantId)]);
      room.sendData({ type: 'UserJoined' });
    }
  }, [room]);

  useEffect(() => {
    if (projectCommands && room) {
      // Prune non-existent participants from the project
      projectCommands.pruneParticipants();
    }
  }, [projectCommands, room]);

  if (project && room) {
    return <ProjectView />
  }
  // if (studio && !token) {
  //   return <div>Login</div>
  // }
  if (failure) {
    return <div>Failed to initialize: `{failure}`</div>
  }
  return <div>Loading...</div>
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};
const mapDispatchToProps = { setToken };
export default connect(mapStateToProps, mapDispatchToProps)(HostView);
