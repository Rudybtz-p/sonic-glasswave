export class AudioAnalyzer {
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;
  private source?: MediaElementAudioSourceNode;

  constructor() {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    
    console.log('Audio analyzer initialized with FFT size:', this.analyser.fftSize);
  }

  connectToAudio(audioElement: HTMLAudioElement) {
    if (this.source) {
      this.source.disconnect();
    }

    this.source = this.audioContext.createMediaElementSource(audioElement);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    
    console.log('Connected audio element to analyzer');
  }

  getAudioData(): Uint8Array {
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }

  dispose() {
    if (this.source) {
      this.source.disconnect();
    }
    this.analyser.disconnect();
    this.audioContext.close();
  }
}