import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';
import { saveActivityProgress } from '../services/progressService';

interface CircuitPuzzle {
  glitchThought: string;
  glitchLabel: string;
  repairOptions: { text: string; isCorrect: boolean; explanation: string }[];
}

const CIRCUIT_PUZZLES: CircuitPuzzle[] = [
  {
    glitchThought: '¡No me sale el dibujo a la primera, soy malo en todo!',
    glitchLabel: 'Cortocircuito: Todo o Nada',
    repairOptions: [
      { text: 'Con práctica y paciencia mi dibujo irá mejorando poco a poco.', isCorrect: true, explanation: '¡Exacto! El cerebro aprende practicando paso a paso.' },
      { text: 'Nunca jamás volveré a intentar dibujar.', isCorrect: false, explanation: 'Ese cable sigue roto. ¡Tú tienes la capacidad de aprender!' },
      { text: 'Los demás nacen sabiendo y yo no.', isCorrect: false, explanation: 'Todos los guardianes entrenan para ser expertos.' }
    ]
  },
  {
    glitchThought: '¡Mi amigo no me saludó en el recreo, seguro ya no me quiere!',
    glitchLabel: 'Cortocircuito: Lectura Mental',
    repairOptions: [
      { text: 'Tal vez estaba distraído o no me vio; le preguntaré amablemente.', isCorrect: true, explanation: '¡Brillante! No podemos adivinar mentes sin preguntar con cariño.' },
      { text: 'Me enojaré con él y no le hablaré nunca más.', isCorrect: false, explanation: 'Eso aumenta el cortocircuito en el cañón.' },
      { text: 'Seguro todos están en mi contra hoy.', isCorrect: false, explanation: 'Un momento no define todo el día.' }
    ]
  },
  {
    glitchThought: '¡Tengo que apurarme y terminar ya o todo saldrá fatal!',
    glitchLabel: 'Cortocircuito: Modo Turbo Descontrolado',
    repairOptions: [
      { text: 'Pari respira profundo: ir con calma me ayuda a no equivocarme.', isCorrect: true, explanation: '¡Excelente conexión! La velocidad controlada es el superpoder de Pari.' },
      { text: 'Debo correr sin mirar para ganar siempre.', isCorrect: false, explanation: 'Correr sin mirar provoca tropiezos.' },
      { text: 'Si no es rápido no vale la pena.', isCorrect: false, explanation: 'Las mejores misiones se construyen con paciencia.' }
    ]
  }
];

export default function ValleCircuitos({ onComplete }: { onComplete: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isGlitching, setIsGlitching] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);

  const puzzle = CIRCUIT_PUZZLES[currentIdx];

  const handleSelect = (idx: number) => {
    const opt = puzzle.repairOptions[idx];
    setSelectedOption(idx);
    setFeedback({ text: opt.explanation, isCorrect: opt.isCorrect });

    if (opt.isCorrect) {
      soundFx.playShield();
      setIsGlitching(false);
      soundFx.playSparkle();

      setTimeout(() => {
        if (currentIdx < CIRCUIT_PUZZLES.length - 1) {
          setCurrentIdx(prev => prev + 1);
          setSelectedOption(null);
          setFeedback(null);
          setIsGlitching(true);
        } else {
          setIsFinished(true);
          soundFx.playSuccess();
          confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 } });
          saveActivityProgress('valle_circuitos', 180, 30);
          setTimeout(onComplete, 3200);
        }
      }, 2400);
    } else {
      soundFx.playPop(300);
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 text-center mx-auto my-4 sm:my-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/40 via-pink-50/50 to-purple-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="pari"
        message="¡A jugar!"
        actionHint={puzzle.glitchLabel}
        reaction={isFinished ? 'cheering' : isGlitching ? 'thinking' : 'happy'}
      />

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card bg-white/80 p-5 sm:p-7 rounded-[2.5rem] border border-purple-200/80 shadow-xl max-w-xl w-full flex flex-col items-center gap-4 my-auto"
          >
            {/* Corrupted Circuit Terminal Header */}
            <div className="w-full bg-slate-900 text-white p-4 sm:p-5 rounded-3xl relative overflow-hidden shadow-inner border border-purple-400">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-pink-400 uppercase tracking-widest">
                  <Cpu className="w-4 h-4 animate-pulse" /> {puzzle.glitchLabel}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${isGlitching ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'}`}>
                  {isGlitching ? '⚠️ CORTOCIRCUITO' : '✅ CONEXIÓN ESTABLE'}
                </span>
              </div>

              {/* Sparking Glitch Thought Box */}
              <motion.div
                animate={isGlitching ? { x: [-2, 2, -2, 2, 0] } : {}}
                transition={{ duration: 0.3, repeat: isGlitching ? Infinity : 0, repeatDelay: 2 }}
                className="text-base sm:text-lg font-black text-rose-200 bg-black/40 p-3 rounded-2xl border border-rose-500/30"
              >
                "{puzzle.glitchThought}"
              </motion.div>
            </div>

            {/* Repair Options (Nodes) */}
            <div className="flex flex-col gap-2.5 w-full">
              <p className="text-xs font-bold text-purple-900 text-left px-1">
                Selecciona el Nodo de Pensamiento Reparador:
              </p>
              {puzzle.repairOptions.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(idx)}
                    disabled={selectedOption !== null && option.isCorrect}
                    className={`p-3 sm:p-4 rounded-2xl text-left text-xs sm:text-sm font-bold transition-all border flex items-start gap-3 shadow-sm ${
                      isSelected && option.isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-200'
                        : isSelected && !option.isCorrect
                        ? 'bg-rose-100 text-rose-900 border-rose-300'
                        : 'bg-white/90 hover:bg-white text-slate-700 border-purple-100 hover:border-purple-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black ${
                      isSelected && option.isCorrect
                        ? 'bg-white text-emerald-600'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="flex-1 leading-snug">{option.text}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback alert */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-2xl text-xs font-bold w-full flex items-center gap-2 ${
                  feedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}
              >
                {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
                <span>{feedback.text}</span>
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
              ⚡
            </div>
            <h2 className="text-3xl font-black text-purple-950 tracking-tight">
              ¡Circuitos Restaurados!
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Pari aprendió a calmar su velocidad turbo y reconectar con pensamientos constructivos.
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
