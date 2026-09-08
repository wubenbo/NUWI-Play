import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';
import { saveActivityProgress } from '../services/progressService';
import { LANDING_IMAGES } from '../config/landingImages';

interface SanctuaryItem {
  id: string;
  name: string;
  emoji: string;
  image?: string;
  soundFreq: number;
  message: string;
}

const SANCTUARY_BIOMES = [
  { id: 'illimani', name: 'Nevado Illimani', skyColor: 'from-sky-300 via-indigo-200 to-pink-100', icon: '🏔️' },
  { id: 'titicaca', name: 'Lago Titicaca', skyColor: 'from-cyan-300 via-teal-200 to-blue-200', icon: '🌊' },
  { id: 'chakana', name: 'Noche de la Chakana', skyColor: 'from-slate-900 via-indigo-950 to-purple-900', icon: '🌌' }
];

const SANCTUARY_ELEMENTS: SanctuaryItem[] = [
  { id: 'condor', name: 'Cóndor Guía', emoji: '🦅', image: LANDING_IMAGES.companions.wayra.image, soundFreq: 600, message: 'El cóndor vuela alto y te recuerda ver las cosas con perspectiva.' },
  { id: 'fogata', name: 'Fogata Andina', emoji: '🔥', soundFreq: 450, message: 'El calor de la fogata reconforta tu corazón.' },
  { id: 'kantuta', name: 'Flor Kantuta', emoji: '🌺', soundFreq: 750, message: 'La flor de luz florece con cada una de tus respiraciones.' },
  { id: 'te', name: 'Ciber-Té Caliente', emoji: '🍵', soundFreq: 520, message: 'Un sorbo tibio que calma cualquier nudo en la panza.' },
  { id: 'llama', name: 'Llama Guardiana', emoji: '🦙', image: LANDING_IMAGES.companions.lama.image, soundFreq: 680, message: 'Tu amiga llama te acompaña siempre con cariño.' }
];

export default function CalmWorld({ onComplete }: { onComplete: () => void }) {
  const [selectedBiome, setSelectedBiome] = useState(SANCTUARY_BIOMES[0]);
  const [activeItems, setActiveItems] = useState<string[]>(['condor', 'fogata']);
  const [tappedItem, setTappedItem] = useState<SanctuaryItem | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleToggleItem = (item: SanctuaryItem) => {
    soundFx.playPop(item.soundFreq);
    setTappedItem(item);

    if (!activeItems.includes(item.id)) {
      setActiveItems(prev => [...prev, item.id]);
    }
  };

  const handleFinishSanctuary = () => {
    setIsFinished(true);
    soundFx.playSuccess();
    confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 } });
    saveActivityProgress('santuario_holografico', 150, 30);
    setTimeout(onComplete, 3200);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 text-center mx-auto my-4 sm:my-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100/40 via-purple-50/50 to-pink-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="juku"
        message="¡A jugar!"
        actionHint={tappedItem ? tappedItem.name : 'Toca los elementos del santuario'}
        reaction={isFinished ? 'cheering' : 'happy'}
      />

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="builder"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card bg-white/80 p-5 sm:p-7 rounded-[2.5rem] border border-pink-200 shadow-xl max-w-xl w-full flex flex-col items-center gap-4 my-auto"
          >
            {/* Biome Selector Tabs */}
            <div className="flex items-center justify-center gap-2 w-full">
              {SANCTUARY_BIOMES.map(b => (
                <button
                  key={b.id}
                  onClick={() => {
                    soundFx.playPop(700);
                    setSelectedBiome(b);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                    selectedBiome.id === b.id
                      ? 'bg-[#823CEB] text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{b.icon}</span>
                  <span>{b.name}</span>
                </button>
              ))}
            </div>

            {/* Holographic Sanctuary Stage */}
            <div className={`w-full h-52 sm:h-60 rounded-3xl bg-gradient-to-b ${selectedBiome.skyColor} p-4 relative overflow-hidden shadow-inner flex flex-col justify-between border-2 border-white`}>
              {/* Sky ambient particles */}
              <div className="flex justify-between items-center text-2xl">
                <span>{selectedBiome.id === 'chakana' ? '✨' : '☀️'}</span>
                <span className="text-sm font-black bg-white/40 backdrop-blur px-3 py-1 rounded-full text-slate-800">
                  {selectedBiome.name}
                </span>
              </div>

              {/* Floating Active Elements Canvas */}
              <div className="flex flex-wrap items-center justify-center gap-4 my-auto">
                {activeItems.map(itemId => {
                  const el = SANCTUARY_ELEMENTS.find(e => e.id === itemId);
                  if (!el) return null;
                  return (
                    <motion.button
                      key={el.id}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleItem(el)}
                      className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur shadow-lg border-2 border-white flex items-center justify-center text-3xl cursor-pointer hover:shadow-cyan-200 transition-all overflow-hidden"
                    >
                      {el.image ? <img src={el.image} alt={el.name} loading="lazy" decoding="async" className="w-12 h-12 object-contain" /> : el.emoji}
                    </motion.button>
                  );
                })}
              </div>

              {/* Floor Landscape */}
              <div className="w-full h-8 bg-white/30 backdrop-blur rounded-2xl flex items-center justify-center text-xs font-bold text-slate-700">
                🌱 Suelo Sagrado Andino
              </div>
            </div>

            {/* Interactive Element Buttons Bar */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-xs font-bold text-slate-600 text-left px-1">
                Toca para añadir o activar elementos de relajación:
              </p>
              <div className="flex justify-center flex-wrap gap-2">
                {SANCTUARY_ELEMENTS.map(el => (
                  <button
                    key={el.id}
                    onClick={() => handleToggleItem(el)}
                    className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all border flex items-center gap-1.5 overflow-hidden ${
                      activeItems.includes(el.id)
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    <span>{el.image ? <img src={el.image} alt={el.name} loading="lazy" decoding="async" className="w-4 h-4 object-contain inline-block" /> : el.emoji}</span>
                    <span>{el.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mindful inspection message */}
            {tappedItem && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-pink-50 border border-pink-200 rounded-2xl text-xs font-bold text-pink-950 w-full flex items-center gap-2 text-left"
              >
                <span className="text-xl">{tappedItem.emoji}</span>
                <span>{tappedItem.message}</span>
              </motion.div>
            )}

            <button
              onClick={handleFinishSanctuary}
              className="mt-2 bg-gradient-to-r from-pink-500 via-[#823CEB] to-cyan-500 text-white px-8 py-3 rounded-full font-black text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Guardar Santuario de Paz
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="finished"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card bg-white/90 p-8 rounded-[3rem] border-2 border-pink-300 shadow-2xl max-w-md w-full flex flex-col items-center gap-4 text-center my-auto"
          >
            <div className="w-24 h-24 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-5xl shadow-inner">
              ✨
            </div>
            <h2 className="text-3xl font-black text-pink-950 tracking-tight">
              ¡Santuario Guardado!
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Juku ha guardado este refugio de paz en tu chip de memoria holográfica.
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
