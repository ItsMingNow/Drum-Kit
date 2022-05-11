import React from "react";

// Import Transport Components
import Transport from "../componets/Transport";

const TransportDisplay = (props) => (
  <div className="Transport-Display">
    <h2>TransportDisplay</h2>
    <Transport updateVolume={props.updateVolume} setBPM={props.setBPM} bpm={props.bpm} volume={props.volume} play={props.play} stop={props.stop}/>
  </div>
)

export default TransportDisplay;