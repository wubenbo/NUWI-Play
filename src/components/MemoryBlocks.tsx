import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play, Sparkles, RotateCcw } from 'lucide-react';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';
import { saveActivityProgress } from '../services/progressService';

const RUNES = [
  { id: 'cyan', name: 'Runa Salar', note: 523.25, icon: '💎', color: 'from-cyan-400 to-sky-500', activeShadow: 'shadow-cyan-400/80' },
  { id: 'purple', name: 'Runa Amatista', note: 659.25, icon: '🔮', color: 'from-purple-500 to-[#823CEB]', activeShadow: 'shadow-purple-500/80' },
  { id: 'emerald', name: 'Runa Selva', note: 783.99, icon: '🌿', color: 'from-emerald-400 to-teal-500', activeShadow: 'shadow-emerald-400/80' },
  { id: 'amber', name: 'Runa Solar', note: 1046.5, icon: '☀️', color: 'from-amber-400 to-yellow-500', activeShadow: 'shadow-amber-400/80' }
];

export default function MemoryBlocks({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'showing' | 'playing' | 'win' | 'lose'>('idle');
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSeq, setPlayerSeq] = useState<string[]>([]);
  const [activeRune, setActiveRune] = useState<string | null>(null);
  const [level, setLevel] = useState(1);
  const maxLevels = 3;

  const startLevel = (lvl: number) => {
    setLevel(lvl);
    const length = lvl + 2; // Level 1 = 3, Level 2 = 4, Level 3 = 5
    const newSeq = Array.from({ length }, () => RUNES[Math.floor(Math.random() * RUNES.length)].id);
    setSequence(newSeq);
    setPlayerSeq([]);
    playSequence(newSeq);
  };

  const playSequence = async (seq: string[]) => {
    setPhase('showing');
    await new Promise(r => setTimeout(r, 600));

    for (let runeId of seq) {
      const rune = RUNES.find(r => r.id === runeId);
      if (rune) {
        setActiveRune(rune.id);
        soundFx.playNote(rune.note);
        await new Promise(r => setTimeout(r, 550));
        setActiveRune(null);
        await new Promise(r => setTimeout(r, 200));
      }
    }
    setPhase('playing');
  };

  const handleRuneTap = (runeId: string) => {
    if (phase !== 'playing') return;

    const rune = RUNES.find(r => r.id === runeId);
    if (rune) {
      setActiveRune(rune.id);
      soundFx.playNote(rune.note);
      setTimeout(() => setActiveRune(null), 250);
    }

    const currentStep = playerSeq.length;
    if (runeId === sequence[currentStep]) {
      const newPlayerSeq = [...playerSeq, runeId];
      setPlayerSeq(newPlayerSeq);

      // Check if sequence is finished
      if (newPlayerSeq.length === sequence.length) {
        soundFx.playSparkle();
        if (level < maxLevels) {
          setTimeout(() => startLevel(level + 1), 1000);
        } else {
          setPhase('win');
          soundFx.playSuccess();
          confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 } });
          saveActivityProgress('bloques_memoria', 120, 30);
          setTimeout(onComplete, 3200);
        }
      }
    } else {
      soundFx.playPop(250);
      setPhase('lose');
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 text-center mx-auto my-4 sm:my-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-100/40 via-cyan-50/50 to-teal-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="pari"
        message="¡A jugar!"
        actionHint={phase === 'showing' ? 'Observando...' : phase === 'playing' ? 'Tu turno' : undefined}
        reaction={phase === 'win' ? 'cheering' : phase === 'showing' ? 'thinking' : 'happy'}
      />

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card bg-white/85 p-6 sm:p-8 rounded-[2.5rem] border border-cyan-200 shadow-xl max-w-md w-full flex flex-col items-center gap-5 my-auto"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 to-[#823CEB] text-white flex items-center justify-center text-5xl shadow-lg border-4 border-white">
              🔮
            </div>
            <div>
              <h2 className="text-2xl font-black text-cyan-950">Matriz de Runas Andinas</h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Entrena tu concentración repitiendo los patrones de luz y sonido.
              </p>
            </div>
            <button
              onClick={() => startLevel(1)}
              className="bg-gradient-to-r from-cyan-500 via-[#823CEB] to-purple-600 text-white px-8 py-3 rounded-full font-black text-base shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" /> Iniciar Nivel 1
            </button>
          </motion.div>
        )}

        {(phase === 'showing' || phase === 'playing') && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card bg-white/85 p-6 sm:p-8 rounded-[2.5rem] border border-cyan-200 shadow-xl max-w-md w-full flex flex-col items-center gap-5 my-auto"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-black bg-cyan-100 text-cyan-900 px-3 py-1 rounded-full border border-cyan-300">
                Nivel {level} de {maxLevels}
              </span>
              <span className="text-xs font-bold text-slate-600">
                {phase === 'showing' ? '👀 Observa el patrón' : '🎮 Tu turno de tocar'}
              </span>
            </div>

            {/* 2x2 Chakana Rune Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {RUNES.map(rune => {
                const isActive = activeRune === rune.id;
                return (
                  <motion.button
                    key={rune.id}
                    whileHover={{ scale: phase === 'playing' ? 1.05 : 1 }}
                    whileTap={{ scale: phase === 'playing' ? 0.95 : 1 }}
                    onClick={() => handleRuneTap(rune.id)}
                    disabled={phase !== 'playing'}
                    className={`h-28 rounded-3xl bg-gradient-to-br ${rune.color} text-white flex flex-col items-center justify-center gap-1 shadow-lg border-4 border-white transition-all ${
                      isActive ? `${rune.activeShadow} scale-110 brightness-125 ring-4 ring-white` : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    <span className="text-4xl filter drop-shadow">{rune.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider">{rune.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {phase === 'lose' && (
          <motion.div
            key="lose"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card bg-white/85 p-6 sm:p-8 rounded-[2.5rem] border border-rose-200 shadow-xl max-w-md w-full flex flex-col items-center gap-4 my-auto"
          >
            <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-4xl">
              🌬️
            </div>
            <h3 className="text-xl font-black text-rose-950">¡Casi lo logras!</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              Un error es solo una oportunidad para que el cerebro aprenda. ¡Vamos de nuevo!
            </p>
            <button
              onClick={() => startLevel(1)}
              className="bg-[#823CEB] text-white px-6 py-2.5 rounded-full font-black text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reintentar Secuencia
            </button>
          </motion.div>
        )}

        {phase === 'win' && (
          <motion.div
            key="win"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card bg-white/90 p-8 rounded-[3rem] border-2 border-cyan-300 shadow-2xl max-w-md w-full flex flex-col items-center gap-4 text-center my-auto"
          >
            <div className="w-24 h-24 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-5xl shadow-inner">
              🏆
            </div>
            <h2 className="text-3xl font-black text-cyan-950 tracking-tight">
              ¡Sincronización Total!
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Has completado todos los niveles de memoria rúnica andina.
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
