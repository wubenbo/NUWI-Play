import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Volume2, Hand, Wind, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';
import { saveActivityProgress } from '../services/progressService';

interface SensoryItem {
  id: string;
  name: string;
  icon: string;
  category: 'see' | 'hear' | 'touch' | 'smell' | 'anchor';
  soundFreq?: number;
}

const SENSORY_LEVELS = [
  {
    step: 5,
    title: '5 Cosas que puedes VER',
    icon: Eye,
    color: 'emerald',
    sub: 'Toca las 5 plantas y criaturas bioluminiscentes de la selva',
    items: [
      { id: 'v1', name: 'Mariposa Neón', icon: '🦋', category: 'see', soundFreq: 800 },
      { id: 'v2', name: 'Flor Kantuta Lanza-Luz', icon: '🌺', category: 'see', soundFreq: 850 },
      { id: 'v3', name: 'Hongo Fluorescente', icon: '🍄', category: 'see', soundFreq: 900 },
      { id: 'v4', name: 'Río de Cristal', icon: '💧', category: 'see', soundFreq: 950 },
      { id: 'v5', name: 'Luciérnaga Solar', icon: '✨', category: 'see', soundFreq: 1000 }
    ] as SensoryItem[]
  },
  {
    step: 4,
    title: '4 Sonidos que puedes ESCUCHAR',
    icon: Volume2,
    color: 'sky',
    sub: 'Toca cada emisor para sintonizar las frecuencias del Madidi',
    items: [
      { id: 'h1', name: 'Canto de Paraba', icon: '🦜', category: 'hear', soundFreq: 650 },
      { id: 'h2', name: 'Viento en los Helechos', icon: '🍃', category: 'hear', soundFreq: 500 },
      { id: 'h3', name: 'Gotas de Lluvia Digital', icon: '🌧️', category: 'hear', soundFreq: 700 },
      { id: 'h4', name: 'Grillo Cibernético', icon: '🦗', category: 'hear', soundFreq: 850 }
    ] as SensoryItem[]
  },
  {
    step: 3,
    title: '3 Texturas que puedes TOCAR',
    icon: Hand,
    color: 'purple',
    sub: 'Siente la textura suave en tus dedos',
    items: [
      { id: 't1', name: 'Corteza Suave', icon: '🪵', category: 'touch', soundFreq: 450 },
      { id: 't2', name: 'Piedra de Río Fresca', icon: '🪨', category: 'touch', soundFreq: 520 },
      { id: 't3', name: 'Pluma Acolchada', icon: '🪶', category: 'touch', soundFreq: 600 }
    ] as SensoryItem[]
  },
  {
    step: 2,
    title: '2 Aromas de la Naturaleza',
    icon: Wind,
    color: 'amber',
    sub: 'Inhala e imagina el perfume fresco del bosque',
    items: [
      { id: 's1', name: 'Eucalipto de Montaña', icon: '🌿', category: 'smell', soundFreq: 580 },
      { id: 's2', name: 'Orquídea Silvestre', icon: '🌸', category: 'smell', soundFreq: 620 }
    ] as SensoryItem[]
  },
  {
    step: 1,
    title: '1 Anclaje Positivo a tu Corazón',
    icon: Heart,
    color: 'rose',
    sub: 'Pon tu mano en tu pecho y pulsa el sensor central',
    items: [
      { id: 'a1', name: '¡Estoy a salvo aquí y ahora!', icon: '💖', category: 'anchor', soundFreq: 523 }
    ] as SensoryItem[]
  }
];

export default function CiberBosque({ onComplete }: { onComplete: () => void }) {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [discoveredItems, setDiscoveredItems] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentLevel = SENSORY_LEVELS[currentLevelIdx];

  const handleTouchItem = (item: SensoryItem) => {
    if (discoveredItems.includes(item.id)) return;

    soundFx.playPop(item.soundFreq || 700);
    const updated = [...discoveredItems, item.id];
    setDiscoveredItems(updated);

    // Check if current level is completed
    const levelItemIds = currentLevel.items.map(i => i.id);
    const allLevelFound = levelItemIds.every(id => updated.includes(id));

    if (allLevelFound) {
      soundFx.playSparkle();
      setTimeout(() => {
        if (currentLevelIdx < SENSORY_LEVELS.length - 1) {
          setCurrentLevelIdx(prev => prev + 1);
        } else {
          setIsFinished(true);
          soundFx.playSuccess();
          confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
          saveActivityProgress('ciber_bosque_madidi', 150, 30);
          setTimeout(onComplete, 3200);
        }
      }, 700);
    }
  };

  const IconHeader = currentLevel?.icon || Sparkles;

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 text-center mx-auto my-4 sm:my-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/40 via-teal-50/50 to-emerald-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="juku"
        message="¡A jugar!"
        actionHint={currentLevel.sub}
        reaction={isFinished ? 'cheering' : 'happy'}
      />

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentLevelIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card bg-white/80 p-5 sm:p-8 rounded-[2.5rem] border border-emerald-200/80 shadow-xl max-w-xl w-full flex flex-col items-center gap-5 my-auto"
          >
            {/* Step Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md text-xl font-black">
                {currentLevel.step}
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black text-emerald-950 tracking-tight flex items-center gap-2">
                  <IconHeader className="w-5 h-5 text-emerald-600" /> {currentLevel.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500">{currentLevel.sub}</p>
              </div>
            </div>

            {/* Interactive Grid of Sensory Items */}
            <div className={`grid ${currentLevel.items.length === 1 ? 'grid-cols-1' : currentLevel.items.length === 2 ? 'grid-cols-2' : currentLevel.items.length <= 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3 sm:grid-cols-5'} gap-3 w-full my-2`}>
              {currentLevel.items.map(item => {
                const isFound = discoveredItems.includes(item.id);
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: isFound ? 1 : 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTouchItem(item)}
                    className={`p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border shadow-sm relative overflow-hidden ${
                      isFound
                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-200'
                        : 'bg-white/80 hover:bg-white text-slate-700 border-emerald-100 hover:border-emerald-300'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl filter drop-shadow">{item.icon}</span>
                    <span className="text-[11px] font-bold leading-tight line-clamp-2">
                      {item.name}
                    </span>
                    {isFound && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 right-1 bg-white text-emerald-600 rounded-full p-0.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Overall Progress Pills */}
            <div className="flex justify-center items-center gap-2 w-full pt-2 border-t border-slate-100">
              {SENSORY_LEVELS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx < currentLevelIdx
                      ? 'w-8 bg-emerald-500'
                      : idx === currentLevelIdx
                      ? 'w-10 bg-[#823CEB] animate-pulse'
                      : 'w-2.5 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="finished"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card bg-white/90 p-8 rounded-[3rem] border-2 border-emerald-300 shadow-2xl max-w-md w-full flex flex-col items-center gap-4 text-center my-auto"
          >
            <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-5xl shadow-inner">
              🌿
            </div>
            <h2 className="text-3xl font-black text-emerald-950 tracking-tight">
              ¡Mente Anclada en el Madidi!
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Has reconectado tus 5 sentidos con el presente. La selva andina brilla en paz.
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
