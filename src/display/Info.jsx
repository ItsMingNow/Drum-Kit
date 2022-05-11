import React from "react";

const InfoDisplay = (props) => (
  <div className="Info-Display">
    <div id='bpmMeter'>BPM : {props.theBPM} Volume : {props.theVolume}dB</div>
  </div>
)

export default InfoDisplay;