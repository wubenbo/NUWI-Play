export type CompanionKey = 'juku' | 'quirqui' | 'pari' | 'lama' | 'wayra';

export interface VoiceProfile {
  characterName: string;
  role: string;
  avatar: string;
  personality: string;
  color: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  
  // Google TTS specific
  languageCode: string;
  voiceName: string;
  ssmlGender: 'MALE' | 'FEMALE' | 'NEUTRAL';
  pitch: number;
  speakingRate: number;
  
  // Browser fallback specific
  fallbackPitch: number;
  fallbackRate: number;
  
  testPhrase: string;
}

export const CHARACTER_VOICE_PROFILES: Record<CompanionKey, VoiceProfile> = {
  juku: {
    characterName: 'Juku',
    role: 'El Operador / Oso Jukumari',
    avatar: '🐻‍❄️',
    personality: 'Voz profunda, paciente y reflexiva. Transmite seguridad y calma.',
    color: 'from-indigo-500 to-sky-500',
    badgeBg: 'bg-indigo-50 border-indigo-200',
    textColor: 'text-indigo-900',
    borderColor: 'border-indigo-400',
    languageCode: 'es-ES',
    voiceName: 'es-ES-Neural2-B', // Very deep Spanish voice
    ssmlGender: 'MALE',
    pitch: -8.0,
    speakingRate: 0.85,
    fallbackPitch: 0.3,
    fallbackRate: 0.80,
    testPhrase: 'Hola, soy Juku. Respira profundo. Estoy aquí para escucharte y ayudarte a encontrar la calma.'
  },
  quirqui: {
    characterName: 'Quirqui',
    role: 'El Escudo / Quirquincho',
    avatar: '🦔',
    personality: 'Voz cálida, amigable y un poco aguda. Ideal para técnicas de respiración.',
    color: 'from-sky-400 to-teal-500',
    badgeBg: 'bg-sky-50 border-sky-200',
    textColor: 'text-sky-900',
    borderColor: 'border-sky-400',
    languageCode: 'es-MX',
    voiceName: 'es-MX-Neural2-D', // Mexican male voice
    ssmlGender: 'MALE',
    pitch: 5.0,
    speakingRate: 1.1,
    fallbackPitch: 1.6,
    fallbackRate: 1.15,
    testPhrase: '¡Hola! Soy Quirqui. Construiremos un caparazón de pensamientos positivos para protegerte.'
  },
  pari: {
    characterName: 'Pari',
    role: 'Modo Turbo / Paraba',
    avatar: '🦜',
    personality: 'Voz muy enérgica, alegre y motivadora. Ritmo dinámico para desafíos.',
    color: 'from-pink-500 to-purple-500',
    badgeBg: 'bg-pink-50 border-pink-200',
    textColor: 'text-pink-900',
    borderColor: 'border-pink-400',
    languageCode: 'es-US',
    voiceName: 'es-US-Neural2-A', // Energetic female
    ssmlGender: 'FEMALE',
    pitch: 12.0,
    speakingRate: 1.25,
    fallbackPitch: 2.0,
    fallbackRate: 1.3,
    testPhrase: '¡A volar, equipo! ¡Soy Pari! Vamos a ponerle turbo a esta misión y demostrar nuestra valentía.'
  },
  lama: {
    characterName: 'Lama',
    role: 'La Capitana / Llama Asertiva',
    avatar: '🦙',
    personality: 'Voz clara, segura y empática. Excelente para escenarios sociales.',
    color: 'from-amber-400 to-orange-500',
    badgeBg: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-900',
    borderColor: 'border-amber-400',
    languageCode: 'es-ES',
    voiceName: 'es-ES-Neural2-C', // Calm Spanish female
    ssmlGender: 'FEMALE',
    pitch: 0.0,
    speakingRate: 1.0,
    fallbackPitch: 1.0,
    fallbackRate: 1.0,
    testPhrase: 'Saludos. Soy Lama. Juntos aprenderemos a expresar lo que sentimos con claridad y respeto.'
  },
  wayra: {
    characterName: 'Wayra',
    role: 'El Observador / Cóndor Andino',
    avatar: '🦅',
    personality: 'Voz analítica, serena y curiosa. Pensada para reestructuración cognitiva.',
    color: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-cyan-50 border-cyan-200',
    textColor: 'text-cyan-900',
    borderColor: 'border-cyan-400',
    languageCode: 'es-US',
    voiceName: 'es-US-Neural2-C', // Normal US male
    ssmlGender: 'MALE',
    pitch: -2.0,
    speakingRate: 0.95,
    fallbackPitch: 0.8,
    fallbackRate: 0.95,
    testPhrase: 'Soy Wayra. Desde las alturas, podemos observar nuestros pensamientos como nubes pasajeras.'
  }
};

export interface AudioState {
  audioMode: boolean;
  isSpeaking: boolean;
  activeSpeaker: CompanionKey | null;
  currentText: string | null;
}

type Listener = (state: AudioState) => void;

class TTSService {
  private audioMode = false;
  private isSpeaking = false;
  private activeSpeaker: CompanionKey | null = null;
  private currentText: string | null = null;
  
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentSpeechUtterance: SpeechSynthesisUtterance | null = null;
  private abortController: AbortController | null = null;
  
  private listeners = new Set<Listener>();

  constructor() {
    // Basic state management
  }

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach(l => l(state));
  }

  public getState(): AudioState {
    return {
      audioMode: this.audioMode,
      isSpeaking: this.isSpeaking,
      activeSpeaker: this.activeSpeaker,
      currentText: this.currentText
    };
  }

  public setAudioMode(enabled: boolean) {
    this.audioMode = enabled;
    if (!enabled) {
      this.stop();
    }
    this.notify();
  }

  public toggleAudioMode() {
    this.setAudioMode(!this.audioMode);
    return this.audioMode;
  }

  public isAudioModeEnabled() {
    return this.audioMode;
  }

  public stop() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
    if (this.currentSpeechUtterance) {
      window.speechSynthesis.cancel();
      this.currentSpeechUtterance = null;
    }
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    
    this.isSpeaking = false;
    this.activeSpeaker = null;
    this.currentText = null;
    this.notify();
  }

  public async speak(text: string, companionKey: CompanionKey = 'juku') {
    if (!this.audioMode) return;
    
    this.stop();
    
    this.isSpeaking = true;
    this.activeSpeaker = companionKey;
    this.currentText = text;
    this.notify();

    const profile = CHARACTER_VOICE_PROFILES[companionKey];

    // Try Google Cloud TTS via our proxy endpoint
    try {
      this.abortController = new AbortController();
      
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voiceName: profile.voiceName,
          languageCode: profile.languageCode,
          ssmlGender: profile.ssmlGender,
          pitch: profile.pitch,
          speakingRate: profile.speakingRate
        }),
        signal: this.abortController.signal
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audioContent) {
          const audioUrl = `data:audio/mp3;base64,${data.audioContent}`;
          const audio = new Audio(audioUrl);
          this.currentAudioElement = audio;
          
          return new Promise<void>((resolve) => {
            audio.onended = () => {
              this.isSpeaking = false;
              this.activeSpeaker = null;
              this.notify();
              resolve();
            };
            audio.onerror = () => {
              this.isSpeaking = false;
              this.activeSpeaker = null;
              this.notify();
              resolve();
            };
            audio.play().catch(e => {
              console.warn("Audio play blocked", e);
              this.fallbackSpeak(text, profile);
              resolve();
            });
          });
        }
      }
    } catch (e: any) {
      if (e.name === 'AbortError') return;
      console.warn("TTS API failed, falling back to browser synthesis", e);
    }

    // Fallback to browser SpeechSynthesis
    await this.fallbackSpeak(text, profile);
  }

  private fallbackSpeak(text: string, profile: VoiceProfile): Promise<void> {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        this.isSpeaking = false;
        this.activeSpeaker = null;
        this.notify();
        return resolve();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES'; // Generic fallback
      
      // Try to find a diverse voice
      const voices = window.speechSynthesis.getVoices();
      const spanishVoices = voices.filter(v => v.lang.startsWith('es'));
      
      if (spanishVoices.length > 0) {
        // Simple heuristic: Try to match Mexico for Quirqui, Spain for Lama, etc if available
        let voice = spanishVoices.find(v => v.lang === profile.languageCode);
        if (!voice && profile.ssmlGender === 'FEMALE') {
           voice = spanishVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('mujer') || v.name.toLowerCase().includes('helena') || v.name.toLowerCase().includes('sabina') || v.name.toLowerCase().includes('paulina'));
        }
        if (!voice && profile.ssmlGender === 'MALE') {
           voice = spanishVoices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('hombre') || v.name.toLowerCase().includes('pablo') || v.name.toLowerCase().includes('jorge'));
        }
        utterance.voice = voice || spanishVoices[0];
      }

      utterance.pitch = profile.fallbackPitch;
      utterance.rate = profile.fallbackRate;
      
      utterance.onend = () => {
        this.isSpeaking = false;
        this.activeSpeaker = null;
        this.notify();
        resolve();
      };
      
      utterance.onerror = () => {
        this.isSpeaking = false;
        this.activeSpeaker = null;
        this.notify();
        resolve();
      };

      this.currentSpeechUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    });
  }

  public async playTestVoice(companionKey: CompanionKey) {
    const profile = CHARACTER_VOICE_PROFILES[companionKey];
    await this.speak(profile.testPhrase, companionKey);
  }
}

export const ttsService = new TTSService();

// Pre-load browser voices
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
