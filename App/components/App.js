import React, { Component } from 'react';
import click1 from '../click1.wav';
import click2 from '../click2.wav';


class App extends Component {
    constructor() {
        super();
        this.state = {
            playing: false,
            bpm: 100,
            count: 0,
            beatsPer: 4
        }
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    handleBpmChange = event => {
        const bpm = event.target.value;
    
        if (this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(
                this.playClick,
                (60 / bpm) * 1000
            );
            this.setState({
                count: 0,  
                bpm
            })
        } else {
            this.setState({ bpm })
        }
    }

    startStop = () => {
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false
            })            
        } else {
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState({
                count: 0,
                playing: true
            }, this.playClick)
        }
    }

    playClick = () => {
        const { count, beatsPer } = this.state;

        if (count % beatsPer === 0) {
            this.click2.play()
        } else {
            this.click1.play()
        }

        this.setState(state => ({
            count: state.count === 3 ? 0 : (state.count+1)
            //count: (state.count + 1) % state.beatsPer
        })
        )
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

export default App;
