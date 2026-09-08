import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, AlertCircle } from 'lucide-react';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';
import { saveActivityProgress } from '../services/progressService';

const SCENARIOS = [
  {
    clue: "Se me cayó mi helado favorito al suelo justo antes de probarlo.",
    correct: "Tristeza",
    glitchName: "Glitch-Lag de Pena",
    transformedName: "Lágrima de Luz",
    hint: "¿Qué siente nuestro corazón cuando perdemos algo querido?"
  },
  {
    clue: "Alguien rompió mi torre de bloques a propósito mientras me reía.",
    correct: "Enojo",
    glitchName: "Volt-Furia Espinoso",
    transformedName: "Energía Protectora",
    hint: "¿Qué emoción enciende calor y ganas de poner un límite?"
  },
  {
    clue: "Mañana es la pijamada con mis mejores amigos y habrá juegos.",
    correct: "Alegría",
    glitchName: "Chispa Desbordada",
    transformedName: "Sol Brillante",
    hint: "¿Qué emoción nos hace saltar y sonreír de oreja a oreja?"
  },
  {
    clue: "Se apagó la luz de golpe en la noche y escuché un crujido extraño.",
    correct: "Miedo",
    glitchName: "Sombra-Alerta",
    transformedName: "Radar de Seguridad",
    hint: "¿Qué emoción nos pone en guardia ante lo desconocido?"
  }
];

const MONSTERS = [
  { id: "Enojo", emoji: "😡", label: "Enojo / Furia", color: "from-rose-500 to-amber-500", bg: "bg-rose-50 border-rose-300 text-rose-900" },
  { id: "Tristeza", emoji: "😢", label: "Tristeza / Pena", color: "from-blue-500 to-sky-500", bg: "bg-blue-50 border-blue-300 text-blue-900" },
  { id: "Alegría", emoji: "😄", label: "Alegría / Entusiasmo", color: "from-amber-400 to-yellow-500", bg: "bg-amber-50 border-amber-300 text-amber-900" },
  { id: "Miedo", emoji: "😨", label: "Miedo / Temor", color: "from-purple-500 to-indigo-600", bg: "bg-purple-50 border-purple-300 text-purple-900" },
];

export default function EmotionMonsters({ onComplete }: { onComplete: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'wrong'>('idle');
  const [isFinished, setIsFinished] = useState(false);

  const scenario = SCENARIOS[currentIdx];

  const handleSelect = (monsterId: string) => {
    if (monsterId === scenario.correct) {
      setFeedback('success');
      soundFx.playShield();
      soundFx.playSparkle();

      setTimeout(() => {
        if (currentIdx < SCENARIOS.length - 1) {
          setCurrentIdx(prev => prev + 1);
          setFeedback('idle');
        } else {
          setIsFinished(true);
          soundFx.playSuccess();
          confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 } });
          saveActivityProgress('emotion_monsters', 150, 30);
          setTimeout(onComplete, 3200);
        }
      }, 2000);
    } else {
      soundFx.playPop(300);
      setFeedback('wrong');
      setTimeout(() => setFeedback('idle'), 1500);
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 text-center mx-auto my-4 sm:my-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/40 via-sky-50/50 to-purple-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="juku"
        message="¡A jugar!"
        actionHint={scenario.hint}
        reaction={isFinished ? 'cheering' : feedback === 'success' ? 'happy' : 'thinking'}
      />

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card bg-white/85 p-5 sm:p-7 rounded-[2.5rem] border border-purple-200 shadow-xl max-w-xl w-full flex flex-col items-center gap-4 my-auto"
          >
            {/* Clue Panel */}
            <div className="w-full bg-purple-50/80 p-4 rounded-3xl border border-purple-200 text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-white px-2.5 py-0.5 rounded-full border border-purple-200">
                Pista del Escuadrón #{currentIdx + 1}
              </span>
              <p className="text-sm sm:text-base font-black text-slate-800 mt-2 leading-relaxed">
                "{scenario.clue}"
              </p>
            </div>

            {/* Glitch Animated Avatar */}
            <motion.div
              animate={feedback === 'success' ? { scale: [1, 1.3, 1], rotate: [0, 360] } : { y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: feedback === 'success' ? 0 : Infinity }}
              className={`w-24 h-24 rounded-3xl flex flex-col items-center justify-center text-4xl shadow-md border-2 ${
                feedback === 'success' ? 'bg-emerald-100 border-emerald-300 text-emerald-600' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              <span>{feedback === 'success' ? '✨' : '👾'}</span>
              <span className="text-[9px] font-black uppercase tracking-wider mt-1 text-slate-500">
                {feedback === 'success' ? scenario.transformedName : scenario.glitchName}
              </span>
            </motion.div>

            {/* Monster Choice Grid */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {MONSTERS.map(monster => (
                <motion.button
                  key={monster.id}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleSelect(monster.id)}
                  disabled={feedback === 'success'}
                  className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all shadow-sm ${monster.bg} hover:shadow-md`}
                >
                  <span className="text-3xl filter drop-shadow">{monster.emoji}</span>
                  <div className="text-left">
                    <span className="text-xs font-black block">{monster.label}</span>
                    <span className="text-[10px] font-bold opacity-75">Tocar para Sanar</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Status alerts */}
            {feedback === 'wrong' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 bg-rose-100 text-rose-900 border border-rose-300 rounded-2xl text-xs font-bold w-full flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Casi cerca... ¡Vuelve a leer la pista con calma!</span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="finished"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card bg-white/90 p-8 rounded-[3rem] border-2 border-purple-300 shadow-2xl max-w-md w-full flex flex-col items-center gap-4 text-center my-auto"
          >
            <div className="w-24 h-24 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-5xl shadow-inner">
              🌟
            </div>
            <h2 className="text-3xl font-black text-purple-950 tracking-tight">
              ¡Glitches Sanados!
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Juku te nombra Maestro Decodificador de Emociones.
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
