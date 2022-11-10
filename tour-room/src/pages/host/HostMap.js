import React, { useEffect } from 'react';

const google = window.google = window.google ? window.google : {};

const HostMap = (props) => {
  const { room } = props;

  useEffect(() => {
    const cornell = { lat: 42.454323, lng: -76.475266 };
    const holder = document.getElementById("pano");
    if (!holder || !room) return;

    const panorama = new google.maps.StreetViewPanorama(
      holder,
      {
        position: cornell,
        pov: {
          heading: 34,
          pitch: 10
        },
      }
    );

    panorama.addListener("position_changed", () => {
      room.sendData({
        type: "PosChanged",
        pos: {
          lat: panorama.getPosition().lat(),
          lng: panorama.getPosition().lng(),
        }
      });
    });
  }, [room]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div id="pano" className="w-full h-full" />
    </div>
  );
}

export default HostMap;
