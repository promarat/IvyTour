import React, { useEffect } from 'react';
import { Helpers } from '@api.stream/studio-kit';

const { useStudio } = Helpers.React;

const google = window.google = window.google ? window.google : {};

const GuestMap = (props) => {
  const { position } = props;
  let { project } = useStudio();

  useEffect(() => {
    const holder = document.getElementById("pano");
    if (!holder || !project) return;

    project.props["panorama"] = new google.maps.StreetViewPanorama(
      holder,
      {
        position: position,
        pov: {
          heading: 34,
          pitch: 10
        },
        linksControl: false,
        clickToGo: false,
      }
    );
  }, [project, position]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div id="pano" className="w-full h-full" />
    </div>
  );
}

export default GuestMap;
