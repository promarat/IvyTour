import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader"

const google = window.google = window.google ? window.google : {};

const loader = new Loader({
    apiKey: process.env.REACT_APP_MAP_KEY,
    version: "weekly"
});

const initialize = (room) => {
    const cornell = { lat: 42.454323, lng: -76.475266 };
    
    const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano"),
        {
            position: cornell,
            pov: {
                heading: 34,
                pitch: 10
            },
        }
    )

    panorama.addListener("position_changed", () => {
        room.sendData({type: "PosChanged", pos: {lat: panorama.getPosition().lat(), lng: panorama.getPosition().lng()}});
    })
}

const MapPop = (props) => {
    let [status, setStatus] = useState(false);

    useEffect(() => {
        if (status) return;
        loader.load().then(() => {
            setStatus(true)
        })
    }, [status])

    useEffect(() => {
        if (props.trigger === false) return;
        let holder = document.getElementById("pano")
        if (!holder) return;

        initialize(props.room);
    }, [props.trigger])

    return (props.trigger) ? (
        <div style={{position: "absolute", top: 0, left: 0, width: "50%", height: "25%", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "100"}}>
            <div style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center", height: "100%", backgroundColor: "#00000"}}>
                <div id="streetmap" style={{width: "100%", height: "100%"}}>
                    <div id="pano" style={{width: "100%", height: "100%"}}></div>
                </div>
            </div>
        </div>
    ) : "";
}

export default MapPop;