import React, { useState, setState } from "react";

// Tone JS
import * as Tone from 'tone';
import { Sampler } from "tone";


// Import Display Components
import GridDisplay from '../display/Grid';
import TransportDisplay from '../display/Transport';
import InfoDisplay from '../display/Info';

// import drum samples
import { samples } from "../assets/DrumSamples";


class DrumMachineContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoaded: false,
      gridState: {},
      bpm: 100,
      beat: 0,
      volume: 0
    };

    // BIND CONTEXT
    this.clickPlay = this.clickPlay.bind(this);
    this.clickStop = this.clickStop.bind(this);
    this.updategridView = this.updategridView.bind(this);
    this.updateBPM = this.updateBPM.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
    

    // Creates Sampler to  
    this.sampler = new Sampler({
        urls: {
          C1: samples.kick,
          D1: samples.snare,
          E1: samples.clap,
          F1: samples.hatOpen,
          G1: samples.hatClose,
          A2: samples.block,
          B2: samples.wood,
        },
        onload: () => {
          this.setState({ isLoaded: true });
        }
      }
    ).toDestination();
    
    // Initialize Volume
    this.sampler.volume.value = this.state.volume;
    
    // Start Tonejs Engine
    Tone.start();

    // Initialize BPM
    Tone.Transport.bpm.value = this.state.bpm;

    // LOOPING MECHANICS
    const loop = new Tone.Loop((time) => {

      // Volume MECHANIC
      this.sampler.volume.value = this.state.volume;

      // Beat MECHANIC
      let beat = this.state.beat;

      // IF GRID HAS STUFF
      if (this.state.gridState) {

        // IF GRID HAS A KICK ON THIS BEAT
        if (this.state.gridState.kick) {
          if ( this.state.gridState.kick[beat] === true ) {
              this.sampler.triggerAttack("C1");
          }
        }

        // IF GRID HAS A SNARE ON THIS BEAT
        if (this.state.gridState.snare) {
          if ( this.state.gridState.snare[beat] === true ) {
              this.sampler.triggerAttack("D1");
          }
        }   

        // IF GRID HAS A CLAP ON THIS BEAT
        if (this.state.gridState.clap) {
          if ( this.state.gridState.clap[beat] === true ) {
              this.sampler.triggerAttack("E1");            
          }
        }

        // IF GRID HAS A hatOpen ON THIS BEAT
        if (this.state.gridState.hatOpen) {
          if ( this.state.gridState.hatOpen[beat] === true ) {
              this.sampler.triggerAttack("F1");            
          }
        }

        // IF GRID HAS A hatClose ON THIS BEAT
        if (this.state.gridState.hatClose) {
          if ( this.state.gridState.hatClose[beat] === true ) {
              this.sampler.triggerAttack("G1");            
          }
        }

        // IF GRID HAS A block ON THIS BEAT
        if (this.state.gridState.block) {
          if ( this.state.gridState.block[beat] === true ) {
              this.sampler.triggerAttack("A2");            
          }
        }

        // IF GRID HAS A wood ON THIS BEAT
        if (this.state.gridState.wood) {
          if ( this.state.gridState.wood[beat] === true ) {
              this.sampler.triggerAttack("B2");            
          }
        }

      }

      this.setState({
        beat: ((beat + 1) % 16)
      })

    }, "8n").start(0);
    
  }
  // END OF CONSTRUCTOR

  componentDidUpdate() {

    // console.log('DRUMMACHINE - GRID UPDATED ', this.state.gridState);
    Tone.Transport.bpm.value = this.state.bpm;

  }

  updategridView(gridObj){
    this.setState({
      gridState: gridObj
    });    
  }

  clickPlay() {

    if (Object.keys(this.state.gridState).length === 0) {
      return ;
    }

    if (Tone.Transport.state !== 'started') {
      Tone.start();
      Tone.Transport.start();
      console.log('play clicked');
    } else {
      Tone.Transport.stop();
      console.log('pause clicked');
    }

  }

  clickStop() {

    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop();
    } 
    
    this.setState({
        beat: 0
    })

  }

  // Tranport Update BPM
  updateBPM(newBpm) {
    this.setState({
      bpm: newBpm
    });
  }

  updateVolume(newVolume) {
    this.setState({
      volume: newVolume
    });
  }

  render() {
    return( 
      <div className="Drum-Machine-Container">
        <h2>Drum Machine Container</h2>
        <TransportDisplay updateVolume={this.updateVolume} volume={this.volume} setBPM={this.updateBPM} bpm={this.state.bpm} play={this.clickPlay} stop={this.clickStop}/>
        <InfoDisplay theBPM={this.state.bpm} theVolume={this.state.volume}/>
        <GridDisplay samples={samples} updategridView={this.updategridView}/>
        
      </div>
    );
  }
}

export default DrumMachineContainer;