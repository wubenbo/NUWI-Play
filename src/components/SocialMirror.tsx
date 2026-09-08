import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';
import { saveActivityProgress } from '../services/progressService';
import { LANDING_IMAGES } from '../config/landingImages';

interface SocialScenario {
  id: number;
  situation: string;
  contextIcon: string;
  shieldOptions: {
    name: string;
    phrase: string;
    shieldType: 'asertivo' | 'calma' | 'apoyo';
    isBest: boolean;
    feedback: string;
    color: string;
    icon: string;
  }[];
}

const SCENARIOS: SocialScenario[] = [
  {
    id: 1,
    situation: 'Un compañero te pide tu merienda de forma ruda y sin pedir por favor.',
    contextIcon: '🥪⚠️',
    shieldOptions: [
      {
        name: 'Escudo Verde Asertivo',
        phrase: 'No, esta es mi merienda. Si tienes hambre, podemos pedirle ayuda a la profesora.',
        shieldType: 'asertivo',
        isBest: true,
        feedback: '¡Excelente! Expresas tu límite con claridad y respeto, sin gritar ni ceder.',
        color: 'from-emerald-500 to-teal-600',
        icon: '🛡️'
      },
      {
        name: 'Escudo Rojo de Impulso',
        phrase: '¡Te voy a empujar si vuelves a mirarme!',
        shieldType: 'calma',
        isBest: false,
        feedback: 'Esa respuesta crea más conflicto. Lama recomienda mantener la firmeza con calma.',
        color: 'from-rose-500 to-amber-600',
        icon: '💥'
      },
      {
        name: 'Escudo Apagado Pasivo',
        phrase: 'Toma todo... (aunque te quedes con hambre triste)',
        shieldType: 'apoyo',
        isBest: false,
        feedback: 'Tus necesidades también importan. ¡Es seguro decir que no!',
        color: 'from-slate-400 to-slate-600',
        icon: '🌧️'
      }
    ]
  },
  {
    id: 2,
    situation: 'En un juego grupal, alguien dice que tus ideas no sirven.',
    contextIcon: '🎮💬',
    shieldOptions: [
      {
        name: 'Escudo Verde Asertivo',
        phrase: 'Mi opinión también cuenta. Podemos combinar nuestras ideas para ganar juntos.',
        shieldType: 'asertivo',
        isBest: true,
        feedback: '¡Magistral! Valoras tu aporte y promueves el trabajo en equipo.',
        color: 'from-emerald-500 to-teal-600',
        icon: '🛡️'
      },
      {
        name: 'Escudo Azul de Retiro Estratégico',
        phrase: 'Iré a jugar a otro lado y me guardo el dolor.',
        shieldType: 'calma',
        isBest: false,
        feedback: 'A veces es bueno tomar distancia, pero recuerda que tu voz merece ser escuchada.',
        color: 'from-sky-500 to-blue-600',
        icon: '🚪'
      }
    ]
  }
];

export default function SocialMirror({ onComplete }: { onComplete: () => void }) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selectedShield, setSelectedShield] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; isBest: boolean } | null>(null);

  const currentScenario = SCENARIOS[scenarioIdx];

  const handleSelectShield = (idx: number) => {
    const opt = currentScenario.shieldOptions[idx];
    setSelectedShield(idx);
    setFeedback({ text: opt.feedback, isBest: opt.isBest });

    if (opt.isBest) {
      soundFx.playShield();
      soundFx.playSparkle();

      setTimeout(() => {
        if (scenarioIdx < SCENARIOS.length - 1) {
          setScenarioIdx(prev => prev + 1);
          setSelectedShield(null);
          setFeedback(null);
        } else {
          setIsFinished(true);
          soundFx.playSuccess();
          confetti({ particleCount: 170, spread: 80, origin: { y: 0.6 } });
          saveActivityProgress('simulador_escudos', 150, 30);
          setTimeout(onComplete, 3200);
        }
      }, 2500);
    } else {
      soundFx.playPop(350);
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 text-center mx-auto my-4 sm:my-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/40 via-sky-50/50 to-blue-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="lama"
        message="¡A jugar!"
        actionHint={currentScenario.situation}
        reaction={isFinished ? 'cheering' : 'happy'}
      />

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={scenarioIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card bg-white/85 p-5 sm:p-7 rounded-[2.5rem] border border-blue-200 shadow-xl max-w-xl w-full flex flex-col items-center gap-4 my-auto"
          >
            {/* Situation Header */}
            <div className="w-full bg-blue-50/80 p-4 rounded-3xl border border-blue-200 text-left flex items-start gap-3">
              <span className="text-3xl filter drop-shadow">{currentScenario.contextIcon}</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-white px-2 py-0.5 rounded-full border border-blue-200">
                  Desafío Social {scenarioIdx + 1} de {SCENARIOS.length}
                </span>
                <p className="text-xs sm:text-sm font-black text-slate-800 mt-1 leading-snug">
                  "{currentScenario.situation}"
                </p>
              </div>
            </div>

            {/* Shield Options */}
            <div className="flex flex-col gap-2.5 w-full">
              <p className="text-xs font-bold text-blue-950 text-left px-1">
                ¿Qué Escudo Protector activarás?
              </p>
              {currentScenario.shieldOptions.map((shield, idx) => {
                const isSelected = selectedShield === idx;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectShield(idx)}
                    disabled={selectedShield !== null && shield.isBest}
                    className={`p-3.5 rounded-2xl text-left text-xs sm:text-sm font-bold transition-all border flex items-start gap-3 shadow-sm ${
                      isSelected && shield.isBest
                        ? 'bg-emerald-500 text-white border-emerald-400'
                        : isSelected && !shield.isBest
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-white hover:bg-blue-50/80 text-slate-800 border-blue-100 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-base ${
                      isSelected && shield.isBest ? 'bg-white text-emerald-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {shield.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-black block">{shield.name}</span>
                      <p className="text-[11px] font-semibold mt-0.5 opacity-90 leading-snug">"{shield.phrase}"</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback message */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-2xl text-xs font-bold w-full flex items-center gap-2 ${
                  feedback.isBest
                    ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                    : 'bg-amber-100 text-amber-950 border border-amber-300'
                }`}
              >
                {feedback.isBest ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Shield className="w-4 h-4 text-amber-600 shrink-0" />}
                <span>{feedback.text}</span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="finished"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card bg-white/90 p-8 rounded-[3rem] border-2 border-blue-300 shadow-2xl max-w-md w-full flex flex-col items-center gap-4 text-center my-auto"
          >
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-5xl shadow-inner overflow-hidden">
              <img src={LANDING_IMAGES.companions.lama.image} alt="Lama" loading="lazy" decoding="async" className="w-16 h-16 object-contain" />
            </div>
            <h2 className="text-3xl font-black text-blue-950 tracking-tight">
              ¡Escudos Calibrados con Éxito!
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Lama felicita tu capacidad de comunicarte con firmeza y amabilidad.
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
