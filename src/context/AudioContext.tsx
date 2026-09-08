import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { ttsService, CompanionKey, AudioState } from '../services/ttsService';

export interface AudioContextType extends AudioState {
  setAudioMode: (enabled: boolean) => void;
  toggleAudioMode: () => boolean;
  speak: (text: string, companion?: CompanionKey) => Promise<void>;
  stop: () => void;
  playTestVoice: (companion: CompanionKey) => Promise<void>;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AudioState>(() => ttsService.getState());

  useEffect(() => {
    const unsubscribe = ttsService.subscribe((newState) => {
      setState(newState);
    });
    return () => {
      unsubscribe();
      ttsService.stop();
    };
  }, []);

  const setAudioMode = useCallback((enabled: boolean) => {
    ttsService.setAudioMode(enabled);
  }, []);

  const toggleAudioMode = useCallback(() => {
    return ttsService.toggleAudioMode();
  }, []);

  const speak = useCallback(async (text: string, companion?: CompanionKey) => {
    await ttsService.speak(text, companion);
  }, []);

  const stop = useCallback(() => {
    ttsService.stop();
  }, []);

  const playTestVoice = useCallback(async (companion: CompanionKey) => {
    await ttsService.playTestVoice(companion);
  }, []);

  const value = useMemo<AudioContextType>(() => ({
    ...state,
    setAudioMode,
    toggleAudioMode,
    speak,
    stop,
    playTestVoice
  }), [state, setAudioMode, toggleAudioMode, speak, stop, playTestVoice]);

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export function useAudioMode(): AudioContextType {
  const context = useContext(AudioContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      audioMode: ttsService.isAudioModeEnabled(),
      isSpeaking: false,
      activeSpeaker: null,
      currentText: null,
      setAudioMode: (enabled) => ttsService.setAudioMode(enabled),
      toggleAudioMode: () => ttsService.toggleAudioMode(),
      speak: (text, comp) => ttsService.speak(text, comp),
      stop: () => ttsService.stop(),
      playTestVoice: (comp) => ttsService.playTestVoice(comp)
    };
  }
  return context;
}
