import React, { useEffect, useRef } from 'react';
import { AudioAnalyzer } from './AudioAnalyzer';

interface AudioControllerProps {
  isPlaying: boolean;
  onAudioData: (data: Uint8Array) => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({ isPlaying, onAudioData }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.src = '/audio/sample-beat.mp3';
    audio.loop = true;
    audioRef.current = audio;

    const audioAnalyzer = new AudioAnalyzer();
    audioAnalyzerRef.current = audioAnalyzer;

    return () => {
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
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioAnalyzerRef.current && isPlaying) {
        const audioData = audioAnalyzerRef.current.getAudioData();
        onAudioData(audioData);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isPlaying, onAudioData]);

  return null;
};