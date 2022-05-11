import React, { useEffect, useState, setState } from "react";

const Transport = (props) => {
  const [ bpmRange, SetBpmRange ] = useState(100);
  const [ volumeRange, SetVolumeRange ] = useState(0);

  useEffect(() => {
    updateThatBPM();
  }, [bpmRange]);

  useEffect(() => {
    updateThatVolume();
  }, [volumeRange]);

  const updateThatBPM = () => {
    props.setBPM(returnBPM());
  }

  const changeBpm = (e) => {
    SetBpmRange(e.target.value);
  }

  const returnBPM = () => {
    return bpmRange;
  }

  const updateThatVolume = () => {
    props.updateVolume(returnVolume());
  }

  const changeVolume = (e) => {
    SetVolumeRange(e.target.value);
  }

  const returnVolume = () => {
    return volumeRange;
  }

  return(
  <div className="Transport">
    <label>BPM</label>
    <input type="range" min="0" max="200" value={bpmRange} onChange={changeBpm} class="slider" id="BPM"></input>
    <button onClick={props.play}>Play/Pause</button>
    <button onClick={props.stop}>Stop</button>
    <label>Volume</label>
    <input id='volumeInput' type="range" min="-50" max="0" value={volumeRange} onChange={changeVolume} class="slider"></input>
  </div>
  )
}

export default Transport;