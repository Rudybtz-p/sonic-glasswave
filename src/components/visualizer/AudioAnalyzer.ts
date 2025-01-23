export class AudioAnalyzer {
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;

  constructor() {
    console.log('Audio analyzer initialized with FFT size: 256');
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  }

  connectToAudio(audioElement: HTMLAudioElement) {
    const source = this.audioContext.createMediaElementSource(audioElement);
    source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    console.log('Connected audio element to analyzer successfully');
  }

  getAudioData(): Uint8Array {
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }

  dispose() {
    console.log('Audio analyzer disposed');
    this.audioContext.close();
  }
}