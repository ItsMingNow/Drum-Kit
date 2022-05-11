import React from "react";
import { samples } from "../assets/DrumSamples";

// import
import CheckBox from "./CheckBox";

class DrumInstrument extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      checkBoxes : [],
      gridRep: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      value: 'none'
    }
    this.updateGridState = this.updateGridState.bind();
    
    // MAKES THE CHECKBOXES
    for (let i = 0; i < 16; i++) {
      this.state.checkBoxes.push(<CheckBox  key={i} id={i} updateGrid={this.updateGridState}/>);
    }

    // init state for Grid
    const initState = {};
    initState[this.props.id] = this.state.gridRep;

    this.props.updateTheMainGrid(initState);

  }

  // CHECKS IF DRUM INSTRUMENT UPDATED
  componentDidUpdate() {
  }

  updateGridState = (checkBoxIndex) => {
    this.state.gridRep[checkBoxIndex] = !this.state.gridRep[checkBoxIndex];
    this.setState(
      {
        gridRep: this.state.gridRep
      }
    )
    const passedUp = {};
    passedUp[this.state.value] = this.state.gridRep;
    this.props.updateTheMainGrid(passedUp);
  };

  updateGridName = (newID) => {
    const passedUp = {};
    passedUp[newID] = this.state.gridRep;
    this.props.updateTheMainGrid(passedUp);
  }

  handleSampleChange = (event) => {
    console.log('Drum-Instrument.jsx - value: ', event.target.value);
    this.setState({
      value: event.target.value
    });
    this.updateGridName(event.target.value);
  }

  render() {

    const options = [];
    const sampleNames = Object.keys(samples);
    let key = 0;
    options.push({
      label: 'none',
      value: 'none',
      key: key++
    })
    sampleNames.forEach( ele => {
      let newObj = {
                      label: `${ele}`,
                      value: `${ele}`,
                      key: key++
                    }
      options.push(newObj);                    
    })
    
    return(
      <div className="DrumInstrument">
        <div id='select'>
          <select className='selectBox' onChange={this.handleSampleChange}>
            {options.map((option) => (
                <option value={option.value} key={option.key}>{option.label}</option>
              ))}
          </select>
        </div>
        <div className='allCheckBoxes'>
          {this.state.checkBoxes}
        </div>
      </div>
    );
  }
}

export default DrumInstrument;