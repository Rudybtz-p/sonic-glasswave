import React, { useEffect, useRef } from 'react';
import { AudioAnalyzer } from '../visualizer/AudioAnalyzer';

interface AudioControllerProps {
  onAudioData: (data: Uint8Array) => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({ onAudioData }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);

  useEffect(() => {
    console.log('Initializing audio controller');
    const audio = new Audio('/audio/sample-beat.mp3');
    audio.loop = true;
    audioRef.current = audio;

    const audioAnalyzer = new AudioAnalyzer();
    audioAnalyzerRef.current = audioAnalyzer;

    return () => {
      console.log('Cleaning up audio controller');
      if (audioAnalyzerRef.current) {
        audioAnalyzerRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && audioAnalyzerRef.current) {
      console.log('Connecting audio element to analyzer');
      audioAnalyzerRef.current.connectToAudio(audioRef.current);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioAnalyzerRef.current) {
        const audioData = audioAnalyzerRef.current.getAudioData();
        onAudioData(audioData);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onAudioData]);

  return null;
};