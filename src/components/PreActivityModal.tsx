import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, X, RotateCcw, FileCheck2, ChevronDown, ChevronUp } from 'lucide-react';
import { CompanionKey, CHARACTER_VOICE_PROFILES } from '../services/ttsService';
import { useAudioMode } from '../context/AudioContext';
import { AudioWaveIndicator } from './AudioWaveIndicator';
import { soundFx } from '../lib/soundFx';
import { ACTIVITY_CLINICAL_EVIDENCE_MAP } from '../constants/clinicalEvidence';
import { LANDING_IMAGES } from '../config/landingImages';

export interface PreActivityModalProps {
  isOpen: boolean;
  activityId: string;
  title: string;
  subtitle: string;
  icon: any;
  clinicalFocus: string;
  category: string;
  companionKey?: CompanionKey;
  onStart: () => void;
  onClose: () => void;
}

export const ACTIVITY_COMPANION_MAP: Record<string, CompanionKey> = {
  'salar': 'quirqui',
  'madidi': 'juku',
  'valle': 'pari',
  'traductor': 'juku',
  'cuentos': 'pari',
  'simulador': 'lama',
  'santuario': 'juku',
  'monstruos': 'juku',
  'memoria': 'pari',
  'detective': 'wayra',
  'respiracion': 'quirqui',
  'campamento': 'juku',
  'tesoros': 'lama'
};

export const PreActivityModal: React.FC<PreActivityModalProps> = ({
  isOpen,
  activityId,
  title,
  subtitle,
  icon: Icon,
  clinicalFocus,
  category,
  companionKey,
  onStart,
  onClose
}) => {
  const { audioMode, setAudioMode, isSpeaking, activeSpeaker, playTestVoice, stop } = useAudioMode();
  const [showClinicalEvidence, setShowClinicalEvidence] = useState(false);

  const companion: CompanionKey = companionKey || ACTIVITY_COMPANION_MAP[activityId] || 'juku';
  const voiceProfile = CHARACTER_VOICE_PROFILES[companion] || CHARACTER_VOICE_PROFILES.juku;
  const evidenceData = ACTIVITY_CLINICAL_EVIDENCE_MAP[activityId];

  const isCurrentVoiceTesting = isSpeaking && activeSpeaker === companion;

  const handleToggleAudioMode = () => {
    const nextState = !audioMode;
    setAudioMode(nextState);
    soundFx.enabled = nextState;
    if (nextState) {
      soundFx.playPop(700);
      playTestVoice(companion);
    } else {
      stop();
    }
  };

  const handleTestVoice = () => {
    if (isCurrentVoiceTesting) {
      stop();
    } else {
      if (!audioMode) {
        setAudioMode(true);
        soundFx.enabled = true;
      }
      playTestVoice(companion);
    }
  };

  const handleStart = () => {
    stop();
    soundFx.playSuccess();
    onStart();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl border-2 border-white/80 overflow-hidden flex flex-col p-6 sm:p-8 my-auto"
        >
          <button
            onClick={() => { stop(); onClose(); }}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4 mb-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#AAE4EB]/30 to-[#823CEB]/20 text-[#823CEB] flex items-center justify-center shadow-inner flex-shrink-0 border border-white">
              {Icon && <Icon className="w-7 h-7 sm:w-8 sm:h-8" />}
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#823CEB]/10 text-[#823CEB]">
                  {category}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-[#91D7B5] bg-[#91D7B5]/15 px-2.5 py-0.5 rounded-full truncate">
                  {clinicalFocus}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight leading-snug">{title}</h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5 leading-relaxed">{subtitle}</p>

              {evidenceData && (
                <button
                  onClick={() => setShowClinicalEvidence(!showClinicalEvidence)}
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#823CEB] hover:text-[#591cc2] bg-purple-50 hover:bg-purple-100/80 px-2.5 py-1 rounded-xl transition-all border border-purple-200/60"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Respaldo Científico ({evidenceData.empiricalCitation})</span>
                  {showClinicalEvidence ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>

          {/* Collapsible Scientific & Neuropsychological Card */}
          {showClinicalEvidence && evidenceData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-purple-50/90 to-indigo-50/90 border border-purple-200/80 mb-4 text-left overflow-hidden shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-900 bg-purple-200/60 px-2 py-0.5 rounded-md">
                  {evidenceData.primaryTheory === 'both' ? 'SDT & CBT / TCC' : evidenceData.primaryTheory.toUpperCase()}
                </span>
                <span className="text-[10px] font-black text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100">
                  {evidenceData.empiricalCitation}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 mb-1">
                {evidenceData.theoreticalFramework}
              </p>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {evidenceData.mechanismOfAction}
              </p>
            </motion.div>
          )}

          <div className={`p-4 rounded-3xl border transition-all mb-4 relative overflow-hidden ${isCurrentVoiceTesting ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-[#823CEB]/40 shadow-md ring-2 ring-[#823CEB]/20' : 'bg-slate-50/80 border-slate-200/80'}`}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex-shrink-0">
                  {isCurrentVoiceTesting && (
                    <motion.div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#823CEB] to-[#AAE4EB] opacity-75 blur-xs" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ repeat: Infinity, duration: 1.2 }} />
                  )}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${voiceProfile.color} flex items-center justify-center text-2xl shadow-sm border-2 border-white relative z-10 overflow-hidden`}>
                    {companionKey && LANDING_IMAGES.companions[companionKey as keyof typeof LANDING_IMAGES.companions]?.image ? (
                      <img src={LANDING_IMAGES.companions[companionKey as keyof typeof LANDING_IMAGES.companions].image} alt={voiceProfile.characterName} loading="lazy" decoding="async" className="w-8 h-8 object-contain" />
                    ) : (
                      voiceProfile.avatar
                    )}
                  </div>
                </div>
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-slate-800">{voiceProfile.characterName}</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">Guía</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{voiceProfile.personality}</p>
                </div>
              </div>
              <button onClick={handleTestVoice} className={`px-3 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm flex-shrink-0 ${isCurrentVoiceTesting ? 'bg-[#823CEB] text-white animate-pulse' : 'bg-white hover:bg-slate-100 text-[#823CEB] border border-[#823CEB]/30'}`}>
                {isCurrentVoiceTesting ? <><RotateCcw className="w-3.5 h-3.5 animate-spin" /><span>Detener</span></> : <><Volume2 className="w-3.5 h-3.5" /><span>Voz</span></>}
              </button>
            </div>
            {isCurrentVoiceTesting && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-2.5 border-t border-purple-200/50 flex items-center justify-between text-xs font-bold text-[#823CEB]">
                <div className="flex items-center gap-2"><AudioWaveIndicator isSpeaking={true} /><span className="text-[11px] font-extrabold">Hablando...</span></div>
              </motion.div>
            )}
          </div>

          <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/80 mb-6 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${audioMode ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                  {audioMode ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-slate-800">Voz Activa</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{audioMode ? 'Con voz.' : 'Silencioso.'}</p>
                </div>
              </div>
              <button role="switch" aria-checked={audioMode} onClick={handleToggleAudioMode} className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${audioMode ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${audioMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button onClick={handleStart} className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#823CEB] to-[#591cc2] hover:scale-[1.02] active:scale-[0.98] text-white font-black text-base shadow-lg flex items-center justify-center gap-2.5 transition-all">
              <Play className="w-5 h-5 fill-current" /><span>Iniciar Misión</span>
            </button>
            <button onClick={() => { stop(); onClose(); }} className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm transition-all">
              Volver
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default PreActivityModal;
