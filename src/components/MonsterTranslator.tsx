import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Sparkles, Coffee, Shield, BookOpen, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';
import { saveActivityProgress } from '../services/progressService';
import { LANDING_IMAGES } from '../config/landingImages';

const BODY_ZONES = [
  { id: 'cabeza', label: 'Cabeza / Pensamientos', icon: '🧠', desc: 'Mente llena de ruidos o ideas rápidas' },
  { id: 'pecho', label: 'Pecho / Corazón', icon: '💓', desc: 'Latidos acelerados o sensación de nudo' },
  { id: 'estomago', label: 'Estómago / Panza', icon: '🌀', desc: 'Cosquilleo, mariposas o pesadez' },
  { id: 'musculos', label: 'Hombros y Manos', icon: '💪', desc: 'Tensión, puños cerrados o rigidez' }
];

const EMOTION_ORBS = [
  { id: 'furia', name: 'Furia-Volt', emoji: '⚡', color: 'from-rose-500 to-amber-500', title: 'Energía Intensa / Enojo', message: 'Tu cuerpo tiene mucha energía que necesita salir sin lastimar a nadie.' },
  { id: 'tristeza', name: 'Tristeza-Nube', emoji: '🌧️', color: 'from-sky-500 to-indigo-500', title: 'Sensación de Nube / Pena', message: 'Sentir ganas de llorar o descansar es normal y limpia tu corazón.' },
  { id: 'miedo', name: 'Miedo-Alerta', emoji: '🌪️', color: 'from-purple-500 to-indigo-600', title: 'Sensor de Alerta / Temor', message: 'Tu cuerpo intenta protegerte, pero aquí estás seguro con el Escuadrón.' },
  { id: 'agobio', name: 'Bucle-Turbo', emoji: '🔄', color: 'from-amber-500 to-rose-400', title: 'Demasiadas Cosas a la Vez', message: 'Vamos a poner pausa para ordenar las señales una por una.' }
];

const RESTORATIVE_TOOLS = [
  { id: 'te', name: 'Ciber-Té de Muña Calientito', icon: Coffee, desc: 'Infusión andina virtual para relajar tu estómago y garganta.', sound: 600 },
  { id: 'orbe', name: 'Orbe de Burbujas Suaves', icon: Wind, desc: 'Micro-respiración guiada para disminuir pulsaciones.', sound: 750 },
  { id: 'manta', name: 'Manta Térmica Holográfica', icon: Shield, desc: 'Un abrazo protector que envuelve tus hombros.', sound: 520 },
  { id: 'bitacora', name: 'Bitácora de Luz', icon: BookOpen, desc: 'Guardar el pensamiento en un archivo seguro.', sound: 850 }
];

export default function MonsterTranslator({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<'zone' | 'emotion' | 'tools' | 'activating' | 'success'>('zone');
  const [selectedEmotion, setSelectedEmotion] = useState<typeof EMOTION_ORBS[0] | null>(null);
  const [selectedTool, setSelectedTool] = useState<typeof RESTORATIVE_TOOLS[0] | null>(null);

  const handleSelectZone = () => {
    soundFx.playScan();
    setStep('emotion');
  };

  const handleSelectEmotion = (emotion: typeof EMOTION_ORBS[0]) => {
    soundFx.playSparkle();
    setSelectedEmotion(emotion);
    setStep('tools');
  };

  const handleSelectTool = (tool: typeof RESTORATIVE_TOOLS[0]) => {
    soundFx.playPop(tool.sound);
    setSelectedTool(tool);
    setStep('activating');
    soundFx.playShield();

    setTimeout(() => {
      setStep('success');
      soundFx.playSuccess();
      confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
      saveActivityProgress('scanner_emocional', 150, 30);
      setTimeout(onComplete, 3200);
    }, 2800);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 text-center mx-auto my-4 sm:my-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-100/40 via-sky-50/50 to-indigo-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="juku"
        message="¡A jugar!"
        actionHint={
          step === 'zone'
            ? 'Toca la zona de tu cuerpo'
            : step === 'emotion'
            ? 'Selecciona el avatar'
            : step === 'tools'
            ? 'Elige tu kit restaurador'
            : undefined
        }
        reaction={step === 'success' ? 'cheering' : 'happy'}
      />

      <AnimatePresence mode="wait">
        {step === 'zone' && (
          <motion.div
            key="zone"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="glass-card bg-white/80 p-5 sm:p-7 rounded-[2.5rem] border border-indigo-200 shadow-xl max-w-xl w-full flex flex-col items-center gap-4 my-auto"
          >
            <div className="flex items-center gap-2 text-indigo-900 font-black text-lg">
              <ScanLine className="w-5 h-5 text-indigo-600 animate-pulse" /> Escáner de Señales Corporales
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              ¿En qué parte de tu cuerpo notas más energía, tensión o movimiento?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {BODY_ZONES.map(zone => (
                <motion.button
                  key={zone.id}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSelectZone}
                  className="p-4 rounded-2xl bg-white hover:bg-indigo-50/80 border border-indigo-100 hover:border-indigo-300 text-left flex items-start gap-3 shadow-sm transition-all"
                >
                  <span className="text-3xl filter drop-shadow">{zone.icon}</span>
                  <div>
                    <h4 className="text-sm font-black text-indigo-950 leading-tight">{zone.label}</h4>
                    <p className="text-[11px] font-medium text-slate-500 mt-1 leading-snug">{zone.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'emotion' && (
          <motion.div
            key="emotion"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card bg-white/80 p-5 sm:p-7 rounded-[2.5rem] border border-indigo-200 shadow-xl max-w-xl w-full flex flex-col items-center gap-4 my-auto"
          >
            <h3 className="text-lg font-black text-indigo-950">
              ¿Qué tipo de señal emocional es?
            </h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              {EMOTION_ORBS.map(orb => (
                <motion.button
                  key={orb.id}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleSelectEmotion(orb)}
                  className={`p-4 rounded-2xl bg-gradient-to-br ${orb.color} text-white shadow-md flex flex-col items-center gap-2 text-center border-2 border-white/80`}
                >
                  <span className="text-4xl filter drop-shadow">{orb.emoji}</span>
                  <span className="text-xs font-black leading-tight">{orb.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'tools' && selectedEmotion && (
          <motion.div
            key="tools"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card bg-white/80 p-5 sm:p-7 rounded-[2.5rem] border border-indigo-200 shadow-xl max-w-xl w-full flex flex-col items-center gap-4 my-auto"
          >
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-left w-full">
              <div className="flex items-center gap-2 text-indigo-900 font-black text-sm">
                <span>{selectedEmotion.emoji}</span>
                <span>{selectedEmotion.title}</span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                "{selectedEmotion.message}"
              </p>
            </div>

            <p className="text-xs font-bold text-indigo-900 self-start px-1">
              Elige tu Herramienta de Confort Eco-Cyber:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {RESTORATIVE_TOOLS.map(tool => {
                const Icon = tool.icon;
                return (
                  <motion.button
                    key={tool.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelectTool(tool)}
                    className="p-3.5 rounded-2xl bg-white hover:bg-indigo-50 border border-indigo-100 hover:border-indigo-300 text-left flex items-start gap-3 shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-indigo-950 leading-tight">{tool.name}</h4>
                      <p className="text-[10px] font-medium text-slate-500 mt-0.5 leading-snug">{tool.desc}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 'activating' && selectedTool && (
          <motion.div
            key="activating"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-4 my-auto"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 text-white flex items-center justify-center shadow-xl text-4xl border-4 border-white"
            >
              ✨
            </motion.div>
            <h3 className="text-xl font-black text-indigo-950">
              Canalizando {selectedTool.name}...
            </h3>
            <p className="text-xs font-bold text-indigo-600">
              Siente la calma inundar tu cuerpo.
            </p>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card bg-white/90 p-8 rounded-[3rem] border-2 border-indigo-300 shadow-2xl max-w-md w-full flex flex-col items-center gap-4 text-center my-auto"
          >
            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-5xl shadow-inner overflow-hidden">
              <img src={LANDING_IMAGES.companions.juku.image} alt="Juku" loading="lazy" decoding="async" className="w-16 h-16 object-contain" />
            </div>
            <h2 className="text-3xl font-black text-indigo-950 tracking-tight">
              ¡Señal Atendida con Éxito!
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Juku ha registrado tu estado emocional. Cuidar de ti mismo te hace un verdadero Guardián de Colores.
            </p>
            <div className="bg-amber-100 text-amber-900 px-6 py-2 rounded-full font-black text-sm flex items-center gap-2 border border-amber-300 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" /> +30 Chispas de Luz
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
