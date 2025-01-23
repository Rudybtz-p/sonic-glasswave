export class AudioAnalyzer {
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;
  private source?: MediaElementAudioSourceNode;
  private isConnected: boolean = false;

  constructor() {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    
    console.log('Audio analyzer initialized with FFT size:', this.analyser.fftSize);
  }

  connectToAudio(audioElement: HTMLAudioElement) {
    if (this.isConnected) {
      console.log('Audio already connected, skipping reconnection');
      return;
    }

    try {
      this.source = this.audioContext.createMediaElementSource(audioElement);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      this.isConnected = true;
      
      console.log('Connected audio element to analyzer successfully');
    } catch (error) {
      console.error('Error connecting audio:', error);
    }
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
    this.isConnected = false;
    console.log('Audio analyzer disposed');
  }
}