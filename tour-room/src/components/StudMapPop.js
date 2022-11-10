import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader"
import { Helpers } from '@api.stream/studio-kit'
const { useStudio } = Helpers.React

const google = window.google = window.google ? window.google : {};

const loader = new Loader({
    apiKey: process.env.REACT_APP_MAP_KEY,
    version: "weekly"
});

const StudMapPop = (props) => {
    let [status, setStatus] = useState(false)
    let { project } = useStudio();

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

        function initialize() {
            const position = props.pos;
            project.props["panorama"] = new google.maps.StreetViewPanorama(
                document.getElementById("pano"),
                {
                    position: position,
                    pov: {
                        heading: 34,
                        pitch: 10
                    },
                    linksControl: false,
                    clickToGo: false,
                }
            )

        }

        initialize();
    }, [props.trigger])

    return (props.trigger) ? (
        <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center", height: "100%", backgroundColor: "#00000"}}>
                <div id="streetmap" style={{width: "100%", height: "100%"}}>
                    <div id="pano" style={{width: "100%", height: "100%"}}></div>
                </div>
            </div>
        </div>
    ) : "";
}

export default StudMapPop;