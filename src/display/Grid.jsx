import React, { useEffect, useState } from "react";

// Import Instrument Components
import DrumInstrument from '../componets/Drum-Instrument';

const GridDisplay = (props) => {

  const [ drums, addDrums] = useState([]);
  const [ keys , keyIncre] = useState(0);
  const [ mainGrid , updateMainGrid ] = useState({});

  // USE THIS TO DRILL UP TO DRUM MACHINE, PUT DRUMMACHINE FUNCTION HERE
  useEffect(() => {
    console.log('GRID: ', mainGrid);
    updateGridView();
  }, [mainGrid]);
  
  const updateGridView = () => {
    props.updategridView(checkReturnState());
  }

  const updateTheMainGrid = ( drumInstrumentGridArryState ) => {
    updateMainGrid( prevStat =>
      ({...prevStat, ...drumInstrumentGridArryState})
    );
  }
  
  const addDrumsClicked = () => {
    drums.push(<DrumInstrument samples={props.samples} updateTheMainGrid={updateTheMainGrid}  key={keys} id={('inst' + keys)}/>);
    addDrums([...drums]);
    keyIncre(keys + 1);
  }

  const checkReturnState = () => {
    return mainGrid;
  }

  return(
    <div className="Grid-Display">
      <button id='add-button'  onClick={()=> (addDrumsClicked())} >Add Drum</button>
      {drums}
    </div>
  );
  
}

export default GridDisplay;