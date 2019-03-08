class Sound {

    constructor(context, audio) {
        this.context = context;
        this.audio = audio;
        console.log(this.audio)
    }
  
    init() {
      //this.oscillator = this.context.createOscillator();
        //this.gainNode = this.context.createGain();
        this.source = this.context.createBufferSource();
        this.source.buffer = this.audio;
        this.source.connect(this.context.destination)
  
      //this.oscillator.connect(this.gainNode);
      //this.gainNode.connect(this.context.destination);
      //this.oscillator.type = 'sine';
      //this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
    }
  
    play() {
      this.init();
  
      //this.oscillator.frequency.value = value;
     
        this.source.start(this.context.currentTime);      
        //this.oscillator.start(time);
        //this.oscillator.stop(time + 0.05)
        //this.oscillator.stop(time + 1);
       
      
  
    }
  
    stop(time) {
      //this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
      //this.oscillator.stop(time + 1);
        this.source.stop(now);
    }
  
}
  
export default Sound;