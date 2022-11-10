import React from 'react';
import { Helpers } from '@api.stream/studio-kit';
import HostView from './HostView';

const { StudioProvider } = Helpers.React;

const HostScreen = () => {

  return (
    <StudioProvider>
      <HostView />
    </StudioProvider>
  );
}

export default HostScreen;
