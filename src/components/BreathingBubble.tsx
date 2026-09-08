import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';
import { saveActivityProgress } from '../services/progressService';

export default function BreathingBubble({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [cycleCount, setCycleCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const targetCycles = 3;

  useEffect(() => {
    if (phase === 'idle' || isFinished) return;
    let timer: NodeJS.Timeout;

    if (phase === 'inhale') {
      soundFx.playInhale(4);
      timer = setTimeout(() => {
        setPhase('hold');
        soundFx.playChime();
      }, 4000);
    } else if (phase === 'hold') {
      timer = setTimeout(() => {
        setPhase('exhale');
        soundFx.playExhale(8);
      }, 7000);
    } else if (phase === 'exhale') {
      timer = setTimeout(() => {
        const newCount = cycleCount + 1;
        setCycleCount(newCount);
        if (newCount >= targetCycles) {
          setPhase('idle');
          setIsFinished(true);
          soundFx.playSuccess();
          confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 } });
          saveActivityProgress('burbuja_respiracion', 120, 25);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 3200);
        } else {
          setPhase('inhale');
        }
      }, 8000);
    }

    return () => clearTimeout(timer);
  }, [phase, cycleCount, isFinished]);

  const getStageInfo = () => {
    switch (phase) {
      case 'inhale': return { text: 'Inhala Suave (4s)', desc: 'Imagina que la burbuja se llena de aire andino puro', color: 'text-cyan-600', scale: 1.5, bg: 'from-cyan-300 to-sky-400' };
      case 'hold': return { text: 'Sostén el Aire (7s)', desc: 'Mantén la calma en tu pecho como un lago en silencio', color: 'text-purple-600', scale: 1.55, bg: 'from-purple-400 to-indigo-500' };
      case 'exhale': return { text: 'Exhala Despacio (8s)', desc: 'Sopla como una brisa tibia que desinfla la burbuja', color: 'text-emerald-600', scale: 1.0, bg: 'from-emerald-300 to-teal-400' };
      default: return { text: 'Burbuja Lista', desc: 'Pulsa iniciar para sincronizar tu respiración', color: 'text-slate-600', scale: 1.1, bg: 'from-sky-200 to-indigo-200' };
    }
  };

  const stage = getStageInfo();

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 text-center mx-auto my-4 sm:my-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/40 via-purple-50/50 to-sky-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="quirqui"
        message="¡A jugar!"
        actionHint={phase !== 'idle' ? stage.desc : undefined}
        reaction={isFinished ? 'cheering' : phase !== 'idle' ? 'happy' : 'neutral'}
      />

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md my-auto">
            {/* Interactive Breathing Sphere */}
            <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
              <motion.div
                animate={{
                  scale: phase === 'idle' ? [1, 1.05, 1] : stage.scale,
                  rotate: phase === 'hold' ? [0, 5, -5, 0] : 0
                }}
                transition={{
                  duration: phase === 'inhale' ? 4 : phase === 'hold' ? 7 : phase === 'exhale' ? 8 : 3,
                  ease: 'easeInOut',
                  repeat: phase === 'idle' ? Infinity : 0
                }}
                className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br ${stage.bg} shadow-2xl flex flex-col items-center justify-center text-white border-4 border-white/90 relative backdrop-blur-md`}
              >
                <span className="text-5xl filter drop-shadow">
                  {phase === 'exhale' ? '🍃' : phase === 'inhale' ? '🌬️' : phase === 'hold' ? '✨' : '🫧'}
                </span>
                <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full mt-1">
                  {phase === 'idle' ? '4-7-8' : phase}
                </span>
              </motion.div>
            </div>

            {/* Subtitle & Controls */}
            <div className="glass-card bg-white/80 p-5 rounded-3xl border border-white shadow-md w-full">
              <h3 className={`text-xl font-black ${stage.color} tracking-tight`}>
                {stage.text}
              </h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                {stage.desc}
              </p>

              {/* Progress Dots */}
              <div className="flex justify-center items-center gap-2 my-3">
                {Array.from({ length: targetCycles }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2.5 rounded-full transition-all ${
                      idx < cycleCount
                        ? 'w-8 bg-emerald-500'
                        : idx === cycleCount && phase !== 'idle'
                        ? 'w-10 bg-[#823CEB] animate-pulse'
                        : 'w-2.5 bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-3 mt-2">
                {phase === 'idle' ? (
                  <button
                    onClick={() => {
                      soundFx.playShield();
                      setCycleCount(0);
                      setPhase('inhale');
                    }}
                    className="bg-gradient-to-r from-sky-500 via-[#823CEB] to-purple-600 text-white px-8 py-3 rounded-full font-black text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" /> Iniciar Respiración 4-7-8
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      soundFx.playPop(400);
                      setPhase('idle');
                    }}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Pausar
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            key="finished"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card bg-white/90 p-8 rounded-[3rem] border-2 border-sky-300 shadow-2xl max-w-md w-full flex flex-col items-center gap-4 text-center my-auto"
          >
            <div className="w-24 h-24 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-5xl shadow-inner">
              🫧
            </div>
            <h2 className="text-3xl font-black text-sky-950 tracking-tight">
              ¡Respiración Completada!
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Quirqui y tú han sincronizado sus escudos en modo de paz total.
            </p>
            <div className="bg-amber-100 text-amber-900 px-6 py-2 rounded-full font-black text-sm flex items-center gap-2 border border-amber-300 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" /> +25 Chispas de Luz
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
