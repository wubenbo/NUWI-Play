import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Sparkles, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';
import { saveActivityProgress } from '../services/progressService';
import { LANDING_IMAGES } from '../config/landingImages';

interface SalarEspejoProps {
  onComplete: () => void;
}

const GROUNDING_CRYSTALS = [1, 2, 3];

export default function SalarEspejo({ onComplete }: SalarEspejoProps) {
  const [phase, setPhase] = useState<'intro' | 'breathing' | 'success'>('intro');
  const [breathStage, setBreathStage] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [cycle, setCycle] = useState(0);
  const [collectedCrystals, setCollectedCrystals] = useState<number[]>([]);
  const targetCycles = 3;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'breathing') {
      if (breathStage === 'inhale') {
        soundFx.playInhale(4);
        timer = setTimeout(() => {
          setBreathStage('hold');
          soundFx.playChime();
        }, 4000);
      } else if (breathStage === 'hold') {
        timer = setTimeout(() => {
          setBreathStage('exhale');
          soundFx.playExhale(4);
        }, 4000);
      } else if (breathStage === 'exhale') {
        timer = setTimeout(() => {
          setBreathStage('rest');
          soundFx.playPop(500);
        }, 4000);
      } else if (breathStage === 'rest') {
        timer = setTimeout(() => {
          const nextCycle = cycle + 1;
          setCycle(nextCycle);
          if (nextCycle >= targetCycles) {
            setPhase('success');
            soundFx.playSuccess();
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
            saveActivityProgress('salar_espejo', 120, 25);
            setTimeout(onComplete, 3200);
          } else {
            setBreathStage('inhale');
          }
        }, 2000);
      }
    }
    return () => clearTimeout(timer);
  }, [phase, breathStage, cycle]);

  const handleCollectCrystal = (id: number) => {
    if (!collectedCrystals.includes(id)) {
      soundFx.playSparkle();
      setCollectedCrystals(prev => [...prev, id]);
    }
  };

  const getStageText = () => {
    switch (breathStage) {
      case 'inhale': return { text: 'Inhala Luz Andina...', sub: 'Llena tus pulmones con aire puro del Salar', color: 'text-sky-600', scale: 1.4, hexColor: 'from-sky-400 to-cyan-300' };
      case 'hold': return { text: 'Sostén la Energía...', sub: 'Siente la calma en tu escudo de cuarzo', color: 'text-purple-600', scale: 1.45, hexColor: 'from-indigo-400 to-purple-400' };
      case 'exhale': return { text: 'Exhala Suavemente...', sub: 'Suelta toda la tensión al espejo de sal', color: 'text-emerald-600', scale: 1.0, hexColor: 'from-emerald-400 to-teal-300' };
      case 'rest': return { text: 'Pausa y Sonríe ✨', sub: 'Observa cómo Quirqui abre su coraza', color: 'text-amber-600', scale: 1.05, hexColor: 'from-amber-300 to-yellow-200' };
    }
  };

  const stageInfo = getStageText();

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 text-center mx-auto my-4 sm:my-8 relative">
      {/* Background ambient reflection elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/40 via-white/50 to-cyan-100/30 -z-10 pointer-events-none rounded-[3rem]" />
      
      {/* Companion Guide header */}
      <CompanionGuide
        companion="quirqui"
        message="¡A jugar!"
        actionHint={phase === 'breathing' ? stageInfo.text : undefined}
        reaction={phase === 'success' ? 'cheering' : phase === 'breathing' ? 'happy' : 'thinking'}
      />

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card bg-white/70 p-6 sm:p-8 rounded-[2.5rem] border border-sky-200/80 shadow-xl max-w-xl w-full flex flex-col items-center gap-5"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-sky-400 via-cyan-300 to-indigo-400 rounded-3xl flex items-center justify-center text-6xl shadow-xl border-4 border-white overflow-hidden"
              >
                <img src={LANDING_IMAGES.companions.quirqui.image} alt="Quirqui" loading="lazy" decoding="async" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
              </motion.div>
              <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white p-2 rounded-full shadow">
                <Shield className="w-5 h-5" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-sky-950 tracking-tight">
                Salar Espejo de Uyuni
              </h2>
              <p className="text-sm sm:text-base font-semibold text-slate-600 mt-2 max-w-md">
                Cuando sentimos ansiedad, nuestro cuerpo se pone rígido como un armadillo. Respira con el pulso hexagonal para restaurar tu frecuencia serena.
              </p>
            </div>

            {/* Interactive Grounding Crystals */}
            <div className="w-full bg-sky-50/70 p-4 rounded-2xl border border-sky-200">
              <p className="text-xs font-bold text-sky-800 mb-2">
                Toca los 3 Cristales de Sal para calibrar tu sensor:
              </p>
              <div className="flex justify-center gap-4">
                {GROUNDING_CRYSTALS.map(cId => {
                  const collected = collectedCrystals.includes(cId);
                  return (
                    <motion.button
                      key={cId}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCollectCrystal(cId)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all shadow-md ${
                        collected
                          ? 'bg-emerald-400 text-white border-2 border-emerald-300 scale-105'
                          : 'bg-white text-sky-400 border-2 border-sky-300 hover:border-sky-500'
                      }`}
                    >
                      {collected ? '✨' : '💎'}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playShield();
                setPhase('breathing');
                setBreathStage('inhale');
              }}
              className="bg-gradient-to-r from-sky-500 via-cyan-500 to-[#823CEB] text-white px-8 py-3.5 rounded-full font-black text-base sm:text-lg shadow-lg hover:shadow-cyan-300/50 hover:scale-105 transition-all flex items-center gap-3"
            >
              <HeartPulse className="w-5 h-5 animate-pulse" /> Iniciar Escudo Espejo
            </button>
          </motion.div>
        )}

        {phase === 'breathing' && (
          <motion.div
            key="breathing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-6 w-full max-w-lg my-auto"
          >
            {/* Hexagonal Interactive Shield Sphere */}
            <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
              {/* Outer pulsing energy ripples */}
              <motion.div
                animate={{ scale: [1, stageInfo.scale * 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: breathStage === 'hold' ? 4 : 4, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/30 to-purple-300/30 blur-xl"
              />

              {/* Hexagon Shield Core */}
              <motion.div
                animate={{ scale: stageInfo.scale, rotate: breathStage === 'hold' ? [0, 10, -10, 0] : 0 }}
                transition={{ duration: breathStage === 'hold' ? 4 : 4, ease: "easeInOut" }}
                className={`w-44 h-44 sm:w-48 sm:h-48 rounded-[2.5rem] bg-gradient-to-br ${stageInfo.hexColor} shadow-2xl flex flex-col items-center justify-center text-white border-4 border-white/90 relative overflow-hidden backdrop-blur-md`}
              >
                {/* Floating internal reflection particles */}
                <span className="text-5xl sm:text-6xl mb-1 filter drop-shadow flex justify-center">
                  {breathStage === 'exhale' ? '✨' : breathStage === 'inhale' ? '🌬️' : <img src={LANDING_IMAGES.companions.quirqui.image} alt="Quirqui" loading="lazy" decoding="async" className="w-14 h-14 object-contain" />}
                </span>
                <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full border border-white/40">
                  {breathStage}
                </span>
              </motion.div>
            </div>

            {/* Instruction prompts */}
            <div className="glass-card bg-white/80 p-5 rounded-3xl border border-white shadow-md max-w-sm w-full">
              <h3 className={`text-xl sm:text-2xl font-black ${stageInfo.color} tracking-tight`}>
                {stageInfo.text}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                {stageInfo.sub}
              </p>

              {/* Progress dots */}
              <div className="flex justify-center items-center gap-2 mt-4">
                {Array.from({ length: targetCycles }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2.5 rounded-full transition-all ${
                      idx < cycle
                        ? 'w-8 bg-emerald-400'
                        : idx === cycle
                        ? 'w-10 bg-[#823CEB] animate-pulse'
                        : 'w-2.5 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'success' && (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card bg-white/90 p-8 rounded-[3rem] border-2 border-emerald-300 shadow-2xl max-w-md w-full flex flex-col items-center gap-4 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-5xl shadow-inner">
              ✨
            </div>
            <h2 className="text-3xl font-black text-emerald-900 tracking-tight">
              ¡Salar en Armonía!
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Quirqui ahora tiene su armadura recargada y relajada. ¡Tu pulso cardíaco ha vuelto a su equilibrio natural!
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
