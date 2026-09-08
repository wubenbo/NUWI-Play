import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, CloudRain, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';
import { saveActivityProgress } from '../services/progressService';
import { LANDING_IMAGES } from '../config/landingImages';

interface DetectiveCase {
  id: number;
  stormTrap: string;
  trapType: string;
  icon: string;
  options: {
    text: string;
    isBright: boolean;
    explanation: string;
  }[];
}

const CASES: DetectiveCase[] = [
  {
    id: 1,
    stormTrap: 'Saqué una nota regular en matemáticas... ¡Soy el peor estudiante del colegio!',
    trapType: 'Trampa: Filtro Oscuro (Todo o Nada)',
    icon: '🌩️',
    options: [
      {
        text: 'Solo fue una prueba. Si le pido ayuda al profe y repaso, me irá mucho mejor la próxima.',
        isBright: true,
        explanation: '¡Magistral reencuadre! Una nota no define tu inteligencia ni tu futuro.'
      },
      {
        text: 'Mejor nunca más estudio matemáticas.',
        isBright: false,
        explanation: 'Esa nube sigue atrapando a Wayra. ¡Busca una opción constructiva!'
      }
    ]
  },
  {
    id: 2,
    stormTrap: 'Nadie se sentó a mi lado en el almuerzo... ¡A nadie le caigo bien!',
    trapType: 'Trampa: Lectura de Pensamiento',
    icon: '🌧️',
    options: [
      {
        text: 'Tal vez cada uno tenía prisa o no se dieron cuenta. Mañana puedo invitar a alguien a sentarse.',
        isBright: true,
        explanation: '¡Excelente! No podemos adivinar lo que otros piensan sin preguntar.'
      },
      {
        text: 'Seguro todos hablaron de mí en secreto.',
        isBright: false,
        explanation: 'Ese pensamiento nubla la realidad con miedos infundados.'
      }
    ]
  }
];

export default function ThoughtDetective({ onComplete }: { onComplete: () => void }) {
  const [caseIdx, setCaseIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; isBright: boolean } | null>(null);

  const currentCase = CASES[caseIdx];

  const handleSelect = (idx: number) => {
    const opt = currentCase.options[idx];
    setSelectedOption(idx);
    setFeedback({ text: opt.explanation, isBright: opt.isBright });

    if (opt.isBright) {
      soundFx.playShield();
      soundFx.playSparkle();

      setTimeout(() => {
        if (caseIdx < CASES.length - 1) {
          setCaseIdx(prev => prev + 1);
          setSelectedOption(null);
          setFeedback(null);
        } else {
          setIsFinished(true);
          soundFx.playSuccess();
          confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 } });
          saveActivityProgress('detective_pensamientos', 150, 30);
          setTimeout(onComplete, 3200);
        }
      }, 2500);
    } else {
      soundFx.playPop(300);
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 text-center mx-auto my-4 sm:my-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/40 via-sky-50/50 to-blue-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="wayra"
        message="¡A jugar!"
        actionHint={currentCase.trapType}
        reaction={isFinished ? 'cheering' : 'happy'}
      />

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={caseIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card bg-white/85 p-5 sm:p-7 rounded-[2.5rem] border border-cyan-200 shadow-xl max-w-xl w-full flex flex-col items-center gap-4 my-auto"
          >
            {/* Storm Trap Box */}
            <div className="w-full bg-slate-800 text-white p-4 sm:p-5 rounded-3xl border border-slate-700 text-left shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
                  {currentCase.trapType}
                </span>
                <span className="text-2xl">{currentCase.icon}</span>
              </div>
              <p className="text-sm sm:text-base font-black text-rose-200 leading-snug">
                "{currentCase.stormTrap}"
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2.5 w-full">
              <p className="text-xs font-bold text-cyan-950 text-left px-1 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-cyan-600" /> Elige el Pensamiento Chispa Reencuadrado:
              </p>
              {currentCase.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(idx)}
                    disabled={selectedOption !== null && opt.isBright}
                    className={`p-3.5 rounded-2xl text-left text-xs sm:text-sm font-bold transition-all border flex items-start gap-3 shadow-sm ${
                      isSelected && opt.isBright
                        ? 'bg-emerald-500 text-white border-emerald-400'
                        : isSelected && !opt.isBright
                        ? 'bg-rose-100 text-rose-900 border-rose-300'
                        : 'bg-white hover:bg-cyan-50/80 text-slate-800 border-cyan-100 hover:border-cyan-300'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-sm ${
                      isSelected && opt.isBright ? 'bg-white text-emerald-600' : 'bg-cyan-100 text-cyan-700'
                    }`}>
                      {opt.isBright ? '☀️' : '🌧️'}
                    </div>
                    <span className="flex-1 leading-snug">{opt.text}</span>
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
                  feedback.isBright ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}
              >
                {feedback.isBright ? <Sun className="w-4 h-4 text-emerald-600 shrink-0" /> : <CloudRain className="w-4 h-4 text-rose-600 shrink-0" />}
                <span>{feedback.text}</span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="finished"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card bg-white/90 p-8 rounded-[3rem] border-2 border-cyan-300 shadow-2xl max-w-md w-full flex flex-col items-center gap-4 text-center my-auto"
          >
            <div className="w-24 h-24 rounded-full bg-cyan-100 flex items-center justify-center text-5xl shadow-inner overflow-hidden">
              <img src={LANDING_IMAGES.companions.wayra.image} alt="Wayra" loading="lazy" decoding="async" className="w-16 h-16 object-contain" />
            </div>
            <h2 className="text-3xl font-black text-cyan-950 tracking-tight">
              ¡Perspectiva de Cóndor Ganada!
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Wayra te entrega las alas de la sabiduría para transformar nubes en rayos de sol.
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
