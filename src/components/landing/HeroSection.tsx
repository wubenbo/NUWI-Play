import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  HeartPulse, 
  Play, 
  CheckCircle2, 
  Gamepad2, 
  Check, 
  Layers
} from 'lucide-react';
import { LANDING_IMAGES } from '../../config/landingImages';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onEnterApp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnterApp }) => {
  const [activeDemo, setActiveDemo] = useState<'salar' | 'grounding' | 'circuitos'>('salar');
  const [collectedCrystals, setCollectedCrystals] = useState<number[]>([1]);
  const [sensesChecked, setSensesChecked] = useState<number[]>([1]);

  const toggleCrystal = (id: number) => {
    setCollectedCrystals(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleSense = (id: number) => {
    setSensesChecked(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#como-funciona');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Clinical Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Top Micro-badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50/90 border border-purple-200/90 text-purple-900 text-xs font-bold mb-6 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#823CEB] animate-pulse" />
              <span><span className="text-[#823CEB] font-black">NUWI Play</span> · Asistencia Terapéutica Infantil</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-indigo-950 tracking-tight leading-[1.12] mb-6"
            >
              La tecnología interactiva al servicio del{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-600">
                vínculo terapéutico
              </span>
            </motion.h1>

            {/* Subheadline targeted to clinicians */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl mb-8"
            >
              Diseñada específicamente para psicólogos, psicopedagogos, fonoaudiólogos y terapeutas infantiles. 
              Transforma la intervención en consulta con regulación respiratoria, reestructuración cognitiva y anclaje sensorial dentro de una narrativa andina que conecta genuinamente con el infante.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
            >
              <button
                id="hero-primary-cta"
                onClick={onEnterApp}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800 text-white font-black text-base shadow-xl shadow-purple-300/60 hover:shadow-purple-400/80 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <Gamepad2 className="w-5 h-5 text-purple-200" />
                <span>Ingresar a NUWI Play</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={scrollToHowItWorks}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white/80 hover:bg-white text-indigo-950 font-bold text-sm border border-purple-200/80 hover:border-purple-300 shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-purple-600 fill-purple-600/20" />
                <span>¿Cómo funciona en sesión?</span>
              </button>
            </motion.div>

            {/* Clinical Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full border-t border-indigo-100/80 pt-6"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Basado en TCC y Regulación Vagal</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Privacidad Infantil (Alias + PIN)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Herramienta de Mediación Lúdica</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Light-Themed Tablet Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Soft Ambient Glow Rings */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-400/20 via-sky-300/20 to-[#91D7B5]/20 rounded-[40px] blur-2xl -z-10" />

            {/* Tablet Mockup Frame - Light, minimal, crisp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-lg bg-white p-3 sm:p-4 rounded-[32px] sm:rounded-[36px] shadow-[0_20px_50px_rgba(130,60,235,0.12)] border-2 border-purple-100 relative overflow-hidden"
            >
              {/* Tablet Camera dot */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-300" />

              {/* Tablet Screen Container - Clean Light Background identical to actual in-game tasks */}
              <div className="bg-gradient-to-b from-sky-50/60 via-white to-cyan-50/40 rounded-[24px] overflow-hidden text-slate-800 p-4 sm:p-5 flex flex-col gap-3.5 border border-sky-100 shadow-inner">
                
                {/* Header bar inside Tablet */}
                <div className="flex items-center justify-between border-b border-sky-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-extrabold text-indigo-950 uppercase tracking-wider">
                      Demostración en Vivo
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/80 text-[11px] font-bold text-amber-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>450 Chispas</span>
                  </div>
                </div>

                {/* Active Activity Stage - Switches according to activeDemo */}
                {activeDemo === 'salar' && (
                  <div className="bg-white/90 rounded-2xl border border-sky-200/80 p-3.5 shadow-sm space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-xl shadow-xs overflow-hidden">
                          <img src={LANDING_IMAGES.companions.quirqui.image} alt="Quirqui" loading="lazy" decoding="async" className="w-6 h-6 object-contain" />
                        </span>
                        <div>
                          <h3 className="text-xs sm:text-sm font-black text-sky-950">
                            Salar Espejo de Uyuni
                          </h3>
                          <span className="text-[10px] text-sky-700 font-semibold block">
                            Quirqui · Respiración Pacer 4-4-4
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold">
                        EN PROCESO
                      </span>
                    </div>

                    {/* Interactive Breathing Bubble */}
                    <div className="bg-sky-50/80 rounded-xl p-3 border border-sky-100 flex flex-col items-center justify-center gap-2 text-center">
                      <div className="relative flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.35, 1] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                          className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-300 via-cyan-200 to-indigo-200 opacity-60 absolute"
                        />
                        <motion.div
                          animate={{ scale: [0.9, 1.15, 0.9] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                          className="w-10 h-10 rounded-full bg-white border-2 border-sky-400 shadow-md flex items-center justify-center text-sky-800 font-black text-xs relative z-10"
                        >
                          4s
                        </motion.div>
                      </div>
                      <span className="text-[11px] font-bold text-sky-900">
                        Inhala profundamente... Siente tu calma
                      </span>
                    </div>

                    {/* Interactive Crystals Tap */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase text-slate-500">
                          Toca los Cristales de Sal para Calibrar:
                        </span>
                        <span className="text-[10px] font-bold text-sky-700">
                          {collectedCrystals.length}/3 activos
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        {[1, 2, 3].map(id => {
                          const collected = collectedCrystals.includes(id);
                          return (
                            <button
                              key={id}
                              onClick={() => toggleCrystal(id)}
                              className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                                collected 
                                  ? 'bg-emerald-500 text-white border-2 border-emerald-400 scale-105'
                                  : 'bg-white text-sky-500 border-2 border-sky-200 hover:border-sky-400'
                              }`}
                            >
                              {collected ? <Check className="w-4 h-4" /> : `💎 ${id}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeDemo === 'grounding' && (
                  <div className="bg-white/90 rounded-2xl border border-emerald-200/80 p-3.5 shadow-sm space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-xl shadow-xs overflow-hidden">
                          <img src={LANDING_IMAGES.companions.juku.image} alt="Juku" loading="lazy" decoding="async" className="w-6 h-6 object-contain" />
                        </span>
                        <div>
                          <h3 className="text-xs sm:text-sm font-black text-emerald-950">
                            Ciber-Bosque Madidi
                          </h3>
                          <span className="text-[10px] text-emerald-700 font-semibold block">
                            Juku · Grounding Sensorial 5-4-3-2-1
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold">
                        ACTIVO
                      </span>
                    </div>

                    <p className="text-[11px] font-medium text-slate-600">
                      Conecta con el aquí y ahora observando tu entorno real:
                    </p>

                    <div className="space-y-1.5">
                      {[
                        { id: 1, text: '5 cosas que puedes ver a tu alrededor' },
                        { id: 2, text: '4 texturas que puedes tocar con tus manos' },
                        { id: 3, text: '3 sonidos que puedes escuchar con calma' }
                      ].map((item) => {
                        const checked = sensesChecked.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => toggleSense(item.id)}
                            className={`w-full p-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                              checked 
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 font-bold ${
                              checked ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                            }`}>
                              {checked ? '✓' : item.id}
                            </span>
                            <span className="truncate">{item.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeDemo === 'circuitos' && (
                  <div className="bg-white/90 rounded-2xl border border-purple-200/80 p-3.5 shadow-sm space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-xl shadow-xs overflow-hidden">
                          <img src={LANDING_IMAGES.companions.pari.image} alt="Pari" loading="lazy" decoding="async" className="w-6 h-6 object-contain" />
                        </span>
                        <div>
                          <h3 className="text-xs sm:text-sm font-black text-indigo-950">
                            Valle de Circuitos
                          </h3>
                          <span className="text-[10px] text-[#823CEB] font-semibold block">
                            Pari · Reestructuración Cognitiva TCC
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#823CEB] border border-purple-200 text-[10px] font-extrabold">
                        FLEXIBLE
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                      <span className="text-[10px] font-extrabold text-rose-700 uppercase block mb-0.5">
                        Pensamiento Atrapado:
                      </span>
                      <p className="text-xs font-bold text-rose-950">
                        "¡Esto es muy difícil, seguro me va a salir todo mal!"
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
                      <span className="text-[10px] font-extrabold text-[#823CEB] uppercase block mb-0.5">
                        Circuito Reparado con Pari:
                      </span>
                      <p className="text-xs font-bold text-indigo-950">
                        "Puedo ir paso a paso. Cada error es solo una pista para aprender."
                      </p>
                    </div>
                  </div>
                )}

                {/* Interactive Tabs Selector */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={() => setActiveDemo('salar')}
                    className={`p-2 rounded-xl text-center transition-all cursor-pointer border flex flex-col items-center justify-center ${
                      activeDemo === 'salar'
                        ? 'bg-sky-100/80 border-sky-300 text-sky-950 shadow-xs scale-[1.02]'
                        : 'bg-white/80 border-slate-200/80 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base block mb-0.5"><img src={LANDING_IMAGES.companions.quirqui.image} alt="Quirqui" loading="lazy" decoding="async" className="w-5 h-5 mx-auto object-contain" /></span>
                    <span className="text-[10px] font-black block truncate w-full">Salar Espejo</span>
                    <span className="text-[9px] text-sky-700 font-semibold w-full">Respiración</span>
                  </button>

                  <button
                    onClick={() => setActiveDemo('grounding')}
                    className={`p-2 rounded-xl text-center transition-all cursor-pointer border flex flex-col items-center justify-center ${
                      activeDemo === 'grounding'
                        ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 shadow-xs scale-[1.02]'
                        : 'bg-white/80 border-slate-200/80 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base block mb-0.5"><img src={LANDING_IMAGES.companions.juku.image} alt="Juku" loading="lazy" decoding="async" className="w-5 h-5 mx-auto object-contain" /></span>
                    <span className="text-[10px] font-black block truncate w-full">Madidi</span>
                    <span className="text-[9px] text-emerald-700 font-semibold w-full">Grounding</span>
                  </button>

                  <button
                    onClick={() => setActiveDemo('circuitos')}
                    className={`p-2 rounded-xl text-center transition-all cursor-pointer border flex flex-col items-center justify-center ${
                      activeDemo === 'circuitos'
                        ? 'bg-purple-100/80 border-purple-300 text-purple-950 shadow-xs scale-[1.02]'
                        : 'bg-white/80 border-slate-200/80 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base block mb-0.5"><img src={LANDING_IMAGES.companions.pari.image} alt="Pari" loading="lazy" decoding="async" className="w-5 h-5 mx-auto object-contain" /></span>
                    <span className="text-[10px] font-black block truncate w-full">Valle Circuitos</span>
                    <span className="text-[9px] text-[#823CEB] font-semibold w-full">TCC Flexible</span>
                  </button>
                </div>

              </div>

              {/* Floating Badges */}
              <div className="absolute -top-3 -right-3 bg-white text-indigo-950 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-lg border border-purple-100 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                <span>Respiración Consciente</span>
              </div>

              <div className="absolute -bottom-3 -left-3 bg-white text-indigo-950 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-lg border border-purple-100 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>12 Módulos Terapéuticos</span>
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
