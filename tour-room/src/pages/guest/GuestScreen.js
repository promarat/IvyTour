import React from 'react';
import { Helpers } from '@api.stream/studio-kit';
import GuestView from './GuestView';

const { StudioProvider } = Helpers.React;

const GuestScreen = () => {
  return (
    <StudioProvider>
      <GuestView />
    </StudioProvider>
  );
}

export default GuestScreen;
