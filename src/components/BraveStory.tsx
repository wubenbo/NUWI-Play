import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';
import { saveActivityProgress } from '../services/progressService';

interface StoryScene {
  id: number;
  badge: string;
  illustration: string;
  title: string;
  text: string;
  companionTip: string;
  choices: { text: string; outcome: string; isBrave: boolean; icon: string }[];
}

const STORY_DATA: StoryScene[] = [
  {
    id: 1,
    badge: 'Capítulo 1: El Nevado Illimani',
    illustration: '🏔️⚡',
    title: 'La Niebla de las Dudas',
    text: 'Pari y tú están volando hacia la cumbre del Illimani, pero de repente una niebla cibernética oculta el camino. Pari empieza a aletear con nerviosismo.',
    companionTip: '¡Siento que no podré lograrlo si no veo todo el camino!',
    choices: [
      {
        text: 'Poner pausa, respirar con el viento y avanzar paso a pasito.',
        outcome: '¡La niebla se disipa con tu calma! Encuentran un sendero seguro.',
        isBrave: true,
        icon: '🌬️'
      },
      {
        text: 'Acelerar en modo turbo con los ojos cerrados.',
        outcome: 'Casi chocan con una roca. Pari recuerda que la paciencia es mejor.',
        isBrave: false,
        icon: '🚀'
      }
    ]
  },
  {
    id: 2,
    badge: 'Capítulo 2: El Puente de Cristal',
    illustration: '🌉✨',
    title: 'El Desafío del Abismo',
    text: 'Llegan a un puente de energía donde Quirqui tiene miedo de cruzar porque las placas parpadean.',
    companionTip: '¿Y si me equivoco de paso y caigo?',
    choices: [
      {
        text: 'Darle la mano a Quirqui y recordarle que juntos se apoyan.',
        outcome: '¡Quirqui activa su escudo y cruzan con valentía!',
        isBrave: true,
        icon: '🤝'
      },
      {
        text: 'Decirle que se quede atrás solo.',
        outcome: 'El Escuadrón nunca deja a nadie atrás. Deciden acompañarlo.',
        isBrave: false,
        icon: '🚪'
      }
    ]
  },
  {
    id: 3,
    badge: 'Capítulo 3: El Faro de la Luz',
    illustration: '💎🌟',
    title: 'La Chispa de la Victoria',
    text: 'En la cumbre, activan el Prisma de los Andes y una lluvia de colores ilumina todo el Altiplano.',
    companionTip: '¡Lo logramos siendo valientes y compasivos!',
    choices: [
      {
        text: 'Celebrar el esfuerzo de todo el Escuadrón.',
        outcome: '¡Misión cumplida con honores de Guardián!',
        isBrave: true,
        icon: '🎉'
      }
    ]
  }
];

export default function BraveStory({ onComplete }: { onComplete: () => void }) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const scene = STORY_DATA[sceneIdx];

  const handleChoice = (choice: typeof scene.choices[0]) => {
    soundFx.playSparkle();
    setSelectedOutcome(choice.outcome);

    setTimeout(() => {
      if (sceneIdx < STORY_DATA.length - 1) {
        setSceneIdx(prev => prev + 1);
        setSelectedOutcome(null);
      } else {
        setIsFinished(true);
        soundFx.playSuccess();
        confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 } });
        saveActivityProgress('holo_cuentos', 200, 30);
        setTimeout(onComplete, 3200);
      }
    }, 2200);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-3 sm:p-6 text-center mx-auto my-4 sm:my-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/40 via-orange-50/50 to-amber-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="pari"
        message="¡A jugar!"
        actionHint={selectedOutcome || 'Elige la decisión de tu historia'}
        reaction={isFinished ? 'cheering' : 'happy'}
      />

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={sceneIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card bg-white/85 p-5 sm:p-8 rounded-[2.5rem] border border-amber-200 shadow-xl max-w-xl w-full flex flex-col items-center gap-4 my-auto"
          >
            {/* Story Panel Card */}
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
                {scene.badge}
              </span>
              <span className="text-2xl filter drop-shadow">{scene.illustration}</span>
            </div>

            <div className="text-left w-full">
              <h3 className="text-xl font-black text-amber-950 tracking-tight">
                {scene.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-2 leading-relaxed bg-amber-50/60 p-3.5 rounded-2xl border border-amber-100">
                {scene.text}
              </p>
            </div>

            {/* Choices */}
            <div className="flex flex-col gap-2.5 w-full mt-2">
              <p className="text-xs font-bold text-amber-950 text-left px-1">
                ¿Qué decisión tomará el Guardián?
              </p>
              {scene.choices.map((choice, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice(choice)}
                  disabled={selectedOutcome !== null}
                  className={`p-3.5 rounded-2xl text-left text-xs sm:text-sm font-bold transition-all border flex items-center gap-3 shadow-sm ${
                    selectedOutcome
                      ? 'bg-emerald-500 text-white border-emerald-400'
                      : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <span className="text-2xl filter drop-shadow">{choice.icon}</span>
                  <span className="flex-1 leading-snug">{choice.text}</span>
                  <ChevronRight className="w-4 h-4 text-amber-500 shrink-0" />
                </motion.button>
              ))}
            </div>

            {/* Outcome banner */}
            {selectedOutcome && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-emerald-100 text-emerald-950 rounded-2xl text-xs font-bold w-full border border-emerald-300 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{selectedOutcome}</span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="finished"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card bg-white/90 p-8 rounded-[3rem] border-2 border-amber-300 shadow-2xl max-w-md w-full flex flex-col items-center gap-4 text-center my-auto"
          >
            <div className="w-24 h-24 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-5xl shadow-inner">
              📖
            </div>
            <h2 className="text-3xl font-black text-amber-950 tracking-tight">
              ¡Holo-Cuento Completado!
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Has demostrado que el coraje y la empatía son las mejores herramientas ante cualquier desafío.
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
