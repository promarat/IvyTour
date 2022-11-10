import React from "react";

const Popup = (props) => {
    return (props.trigger) ? (
        <div style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.2", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{position: "relative", padding: "32px", width: "100%", maxWidth: "640px", backgroundColor: "#FFF"}}>
                <button onClick={() => props.setTrigger(false)}>Close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;