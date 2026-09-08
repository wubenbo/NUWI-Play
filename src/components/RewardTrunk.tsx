import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, CheckCircle2, Trophy, Award } from 'lucide-react';
import { soundFx } from '../lib/soundFx';
import CompanionGuide from './CompanionGuide';

const RELICS = [
  { id: '1', req: 30, name: 'Cristal de Salar de Uyuni', emoji: '💎', color: 'bg-cyan-50 border-cyan-300', iconColor: 'text-cyan-600', desc: 'Concede serenidad infinita como el salar.' },
  { id: '2', req: 60, name: 'Pluma de Paraba Neón', emoji: '🪶', color: 'bg-pink-50 border-pink-300', iconColor: 'text-pink-600', desc: 'Ayuda a regular la velocidad turbo con destreza.' },
  { id: '3', req: 100, name: 'Flor Sagrada de Kantuta', emoji: '🌺', color: 'bg-rose-50 border-rose-300', iconColor: 'text-rose-600', desc: 'Simboliza la resiliencia y el coraje andino.' },
  { id: '4', req: 150, name: 'Escudo Quirquincho Solar', emoji: '🛡️', color: 'bg-teal-50 border-teal-300', iconColor: 'text-teal-600', desc: 'Protección hexagonal ante cualquier inquietud.' },
  { id: '5', req: 220, name: 'Chakana de Sabiduría', emoji: '🌟', color: 'bg-amber-50 border-amber-300', iconColor: 'text-amber-600', desc: 'El puente sagrado que une mente, cuerpo y corazón.' },
  { id: '6', req: 300, name: 'Corona del Guardián Mayor', emoji: '👑', color: 'bg-purple-50 border-purple-300', iconColor: 'text-purple-600', desc: 'Máximo honor del Escuadrón Rescate de Colores.' },
];

const RewardTrunk = React.memo(function RewardTrunk({ totalScore }: { totalScore: number }) {
  const nextPrize = RELICS.find(p => totalScore < p.req);
  const progressPercent = nextPrize ? Math.min(100, (totalScore / nextPrize.req) * 100) : 100;

  const handleTapRelic = (isUnlocked: boolean) => {
    if (isUnlocked) {
      soundFx.playSparkle();
    } else {
      soundFx.playPop(300);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center p-3 sm:p-6 text-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/30 via-slate-50/50 to-amber-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="lama"
        message="¡A jugar!"
      />

      <div className="glass-card bg-amber-500 text-white w-full max-w-lg mb-6 sm:mb-8 rounded-[2rem] p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Trophy className="w-24 h-24" />
        </div>
        <div className="flex flex-col items-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-3 text-amber-50">
            <Award className="w-4 h-4 text-amber-200" />
            <span className="text-xs font-bold uppercase tracking-wider">Tu Energía</span>
          </div>
          <div className="text-4xl sm:text-5xl font-black flex items-center gap-2 mb-2">
            {totalScore}
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-amber-100">Chispas de Luz acumuladas</p>
        </div>

        {nextPrize ? (
          <div className="mt-5 w-full bg-black/10 rounded-2xl p-4 border border-white/20">
            <div className="flex justify-between text-xs font-bold text-amber-50 mb-2">
              <span>Siguiente Reliquia</span>
              <span>{totalScore} / {nextPrize.req}</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-3 sm:h-4 overflow-hidden border border-white/10 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 relative"
              >
                <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
            <p className="text-[10px] sm:text-xs text-amber-100 mt-2 font-medium">
              Faltan {nextPrize.req - totalScore} chispas para {nextPrize.name}
            </p>
          </div>
        ) : (
          <div className="mt-5 w-full bg-white/20 rounded-2xl p-4 border border-white/40 text-center shadow-inner">
            <span className="text-sm font-black text-white">¡Has descubierto todas las reliquias!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full">
        {RELICS.map((relic, i) => {
          const isUnlocked = totalScore >= relic.req;
          return (
            <motion.button
              key={relic.id}
              whileHover={isUnlocked ? { scale: 1.03 } : {}}
              whileTap={isUnlocked ? { scale: 0.95 } : { scale: 1, x: [-2, 2, -2, 2, 0] }}
              onClick={() => handleTapRelic(isUnlocked)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col items-center p-3 sm:p-5 rounded-3xl border-2 transition-all ${
                isUnlocked 
                  ? `${relic.color} shadow-md hover:shadow-lg hover:border-b-4 bg-white/80` 
                  : 'bg-slate-100 border-slate-200 text-slate-400 opacity-80'
              }`}
            >
              {isUnlocked && (
                <div className="absolute top-3 right-3 text-emerald-500 bg-white rounded-full p-1 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}

              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-sm my-2">
                {isUnlocked ? relic.emoji : '🔒'}
              </div>

              <div>
                <h3 className={`text-xs sm:text-sm font-black leading-tight ${isUnlocked ? relic.iconColor : 'text-slate-500'}`}>
                  {relic.name}
                </h3>
                <p className="text-[10px] font-medium text-slate-500 mt-1 leading-snug">
                  {isUnlocked ? relic.desc : `Desbloquea con ${relic.req} ⭐`}
                </p>
              </div>

              <div className="mt-3 w-full">
                {isUnlocked ? (
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                    ¡Conseguido!
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <Lock className="w-3 h-3" /> {relic.req} ⭐
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
});
export default RewardTrunk;
