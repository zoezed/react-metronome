import React, { Component } from 'react';
import Owns from './/Owns';
import Buffer from './/Buffer';
import Sound from './/Sounds';
import click1 from '../click1.wav';
import click2 from '../click2.wav';

var context = null;
var timerID;
const sounds = ['../sound/click1.wav', '../sound/click2.wav'];

class AltApp extends Component {
    
    constructor() {
        super();
        this.state = {
            playing: false,
            bpm: 60,
            count: 0,
            beatsPer: 4,
            firstTime: true
        }
    }   

    handleBpmChange = event => {
        const bpm = event.target.value;
    
        if (this.state.playing) {

            context.close();
            
            this.setState({                 
                bpm: bpm,
                playing: false,
                firstTime: true
                
            }, () => {
                this.startStop();
            })
            
        } else {
            this.setState({ bpm })
        }
    }

    startStop = () => {
        
        let tempo = this.state.bpm
        let lookahead = 25.0;
        let scheduleAhead = 0.1;
        let currentNote = 0;
        let nextNoteTime = 0.0;
        currentNote = 0;            
        let soundRes = [];        
        context = new (window.AudioContext || window.webkitAudioContext)();
        nextNoteTime = context.currentTime;

        if (this.state.playing) {
            context.close();
            this.setState({
                playing: false,
                firstTime: true
            })
        }
        
        if (this.state.firstTime) {
            waitLoad()
           
            async function waitLoad() {               
                
                await prepBuffer(sounds);
            }

            function scheduleNote(beatNumber, time) {
                           
                waitLoad();
                playSoundStop(time, true);
                
            }

            function nextNote() {
                const secondsPerBeat = 60 / tempo;

                nextNoteTime += secondsPerBeat
               
                //advance the beat number, wrap to zero
                currentNote++;
                if (currentNote === 4) {
                    currentNote = 0;
                }
            }

            function scheduler() {
                
                while (nextNoteTime < context.currentTime + scheduleAhead) {
                    scheduleNote(currentNote, nextNoteTime);
                    nextNote();
                    console.log("schedule" + currentNote + "next" + nextNoteTime, soundRes)
                }

                timerID = window.setTimeout(scheduler, lookahead);
                
            }

            async function prepBuffer(sounds) {                  
                for (const url of sounds) {
                    
                    console.log("url" + url)
                    await loadEach(url)
                }             
               
            }

            function loadEach(url) {                
                console.log(url)
                fetch(url).then(function (response) {
                    console.log(response)
                    let reader = response.body.getReader();
                    console.log(reader)
                    function read() {
                        return reader.read().then(({ value, done }) => {
                            if (done) {
                                console.log("done")
                                scheduler();
                                return
                            } else {
                                console.log(value)
                                context.decodeAudioData(value.buffer, function (buffer) {
                                    console.log(buffer)
                                    soundRes.push(buffer);
                                    
                                }, function (err) {
                                    console.log("err" + err);
                                });
                            }
                            
                            read();
                        });
                    }
                    read();
                })
            }

            function playSoundStop(time, onOff) {                
                let source = context.createBufferSource();
                console.log(typeof soundRes)
                console.log("ever in playsoundstop")
                console.log(soundRes)
                console.log(soundRes[0])
                if (onOff) {
                    if (currentNote === 0) {
                        let buffer = soundRes[0];
                        
                            source.buffer = buffer
                            source.connect(context.destination)
                            source.start(time)
                        
                    }
                    else {
                        let buffer = soundRes[1];
                        
                            source.buffer = buffer
                            source.connect(context.destination)
                            source.start(time)
                        
                        
                    }
                }
                else {
                    console.log("stop")
                    source.stop(now);
                    soundRes = null;
                    clearInterval(timerID)
                    
                }
            }  

            this.setState({
                firstTime: false,
                playing: true
            })
        }
       
    } 
    
    render() {

        const { playing, bpm } = this.state;
        
        return (
            <div className="metronome">
                <div className="slider">
                    <div>{bpm} bpm</div>
                    <input
                        type="range"
                        min="60"
                        max="240"
                        value={bpm}
                        onChange = {this.handleBpmChange}
                    />
                </div>
                <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
            </div>
        )
    }
}

export default AltApp;
