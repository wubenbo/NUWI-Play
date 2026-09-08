import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Sparkles, CheckCircle2, Flame, Tent, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../lib/soundFx';
import CompanionGuide, { COMPANIONS, CompanionKey } from './CompanionGuide';

interface GearItem {
  id: string;
  name: string;
  companionKey: CompanionKey;
  cost: number;
  icon: string;
  desc: string;
  power: string;
}

const GEAR_CATALOG: GearItem[] = [
  {
    id: 'juku-goggles',
    name: 'Gafas de Escaneo Holográfico',
    companionKey: 'juku',
    cost: 20,
    icon: '🥽',
    desc: 'Permite a Juku detectar y validar emociones sutiles con amor.',
    power: '+10% Detección de Calma'
  },
  {
    id: 'quirqui-diamond',
    name: 'Placas de Diamante Uyuni',
    companionKey: 'quirqui',
    cost: 30,
    icon: '💎',
    desc: 'Refuerza el escudo de armadillo con destellos relajantes.',
    power: '+15% Protección Anti-Ansiedad'
  },
  {
    id: 'pari-wings',
    name: 'Alas Turbo Neón de Paraba',
    companionKey: 'pari',
    cost: 40,
    icon: '🪶',
    desc: 'Estabilizadores de vuelo para controlar impulsos y velocidad.',
    power: '+20% Enfoque y Paciencia'
  },
  {
    id: 'lama-poncho',
    name: 'Poncho Solar Tejido con Circuitos',
    companionKey: 'lama',
    cost: 50,
    icon: '🧣',
    desc: 'Concede voz clara, amable y asertiva a la capitana Lama.',
    power: '+25% Límite Asertivo'
  },
  {
    id: 'wayra-lenses',
    name: 'Lentes de Visión Cóndor 360°',
    companionKey: 'wayra',
    cost: 60,
    icon: '🦅',
    desc: 'Permite a Wayra observar desde las nubes para reencuadrar cualquier pensamiento.',
    power: '+30% Perspectiva Positiva'
  },
  {
    id: 'camp-hearth',
    name: 'Fogata Bioluminiscente Andina',
    companionKey: 'juku',
    cost: 75,
    icon: '🔥',
    desc: 'Calienta a todo el Escuadrón con chispas de tranquilidad.',
    power: 'Aura de Paz Grupal'
  }
];

const CampamentoBase = React.memo(function CampamentoBase({ totalScore }: { totalScore: number }) {
  const [unlocked, setUnlocked] = useState<string[]>(['juku-goggles']);
  const [activeCompanionFilter, setActiveCompanionFilter] = useState<CompanionKey | 'all'>('all');

  const handleUnlock = (item: GearItem) => {
    if (totalScore >= item.cost && !unlocked.includes(item.id)) {
      soundFx.playShield();
      soundFx.playSparkle();
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.7 } });
      setUnlocked(prev => [...prev, item.id]);
    }
  };

  const filteredGear = useMemo(() => {
    return activeCompanionFilter === 'all'
      ? GEAR_CATALOG
      : GEAR_CATALOG.filter(g => g.companionKey === activeCompanionFilter);
  }, [activeCompanionFilter]);

  return (
    <div className="flex flex-col items-center p-3 sm:p-6 w-full max-w-4xl text-center mx-auto relative">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-100/30 via-slate-50/50 to-indigo-100/30 -z-10 pointer-events-none rounded-[3rem]" />

      <CompanionGuide
        companion="juku"
        message="¡A jugar!"
      />

      <div className="glass-card bg-indigo-900 text-white w-full max-w-lg mb-6 sm:mb-8 rounded-[2rem] p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Tent className="w-24 h-24" />
        </div>
        <div className="flex flex-col items-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-3 text-indigo-200">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Tu Energía</span>
          </div>
          <div className="text-4xl sm:text-5xl font-black flex items-center gap-2 mb-2">
            {totalScore}
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-indigo-200">Chispas de Luz disponibles</p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCompanionFilter('all')}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
              activeCompanionFilter === 'all' ? 'bg-white/30 ring-2 ring-cyan-300 scale-105' : 'hover:bg-white/10 opacity-85'
            }`}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg border-2 border-white/40">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-200">Todos</span>
          </motion.button>

          {Object.entries(COMPANIONS).map(([key, comp]) => {
            const isSelected = activeCompanionFilter === key;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCompanionFilter(key as CompanionKey)}
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
                  isSelected ? 'bg-white/30 ring-2 ring-cyan-300 scale-105' : 'hover:bg-white/10 opacity-85'
                }`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${comp.color} flex items-center justify-center text-2xl sm:text-3xl shadow-lg border-2 border-white overflow-hidden`}>
                  {comp.image ? <img src={comp.image} alt={comp.name} loading="lazy" decoding="async" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" /> : comp.avatar}
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-200">{comp.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Catalog of Gear */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {filteredGear.map(item => {
          const isUnlocked = unlocked.includes(item.id);
          const canAfford = totalScore >= item.cost;
          const comp = COMPANIONS[item.companionKey];

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className={`glass-card p-5 rounded-3xl border-2 flex flex-col justify-between text-left transition-all shadow-md ${
                isUnlocked
                  ? 'border-emerald-300 bg-emerald-50/70'
                  : canAfford
                  ? 'border-indigo-200 bg-white/85 hover:border-indigo-400'
                  : 'border-slate-200 bg-white/50 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm border border-slate-100 relative">
                      {item.icon}
                      <span className="absolute -bottom-1 -right-1 text-xs">
                        {comp.image ? <img src={comp.image} alt={comp.name} loading="lazy" decoding="async" className="w-4 h-4 object-contain inline-block" /> : comp.avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-bold text-[#823CEB]">{comp.name}</span>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-600">
                      <Unlock className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-xl bg-slate-100 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <p className="text-[11px] font-medium text-slate-600 leading-snug">
                  {item.desc}
                </p>

                <div className="mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-lg inline-block">
                  ⚡ {item.power}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                {isUnlocked ? (
                  <div className="w-full py-2 bg-emerald-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Equipado en Base
                  </div>
                ) : (
                  <button
                    onClick={() => handleUnlock(item)}
                    disabled={!canAfford}
                    className={`w-full py-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 ${
                      canAfford
                        ? 'bg-gradient-to-r from-indigo-600 to-[#823CEB] text-white hover:scale-102 shadow-md'
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" /> {item.cost} Chispas • Desbloquear
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});
export default CampamentoBase;
