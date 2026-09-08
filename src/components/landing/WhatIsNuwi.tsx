import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  BrainCircuit, 
  Compass, 
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { LANDING_IMAGES } from '../../config/landingImages';
import { SafeImage } from './SafeImage';

export const WhatIsNuwi: React.FC = () => {
  const [selectedGuardian, setSelectedGuardian] = useState<number>(0);

  const pillars = [
    {
      icon: HeartHandshake,
      title: "El Terapeuta en el Centro del Vínculo",
      subtitle: "Objeto Transicional Digital",
      highlight: "No sustituye al profesional: amplifica su alcance",
      description: "Funciona como un puente empático que el terapeuta modula en tiempo real para observar defensas, graduar la exposición y abrir conversaciones significativas sin confrontación directa.",
      color: "from-indigo-500 to-sky-500",
      accentBg: "bg-indigo-50 border-indigo-100",
      accentText: "text-indigo-600"
    },
    {
      icon: Compass,
      title: "Narrativa Andina Eco-Cyber",
      subtitle: "Escuadrón Rescate de Colores",
      highlight: "Biodiversidad de los Andes y Amazonía",
      description: "Cinco guardianes (Juku, Quirqui, Pari, Lama y Wayra) encarnan arquetipos neuroafectivos para que los niños externalicen emociones difíciles en un marco lúdico respetuoso.",
      color: "from-[#823CEB] to-indigo-500",
      accentBg: "bg-purple-50 border-purple-100",
      accentText: "text-[#823CEB]"
    },
    {
      icon: BrainCircuit,
      title: "Evidencia en TCC y Regulación Vagal",
      subtitle: "Protocolos Clínicos Integrados",
      highlight: "Respiración 4-4-4 & Grounding 5-4-3-2-1",
      description: "Módulos rigurosos de respiración pacer diafragmática, anclaje sensorial y reestructuración de pensamientos distorsionados en entornos interactivos de baja sobrecarga cognitiva.",
      color: "from-[#823CEB] to-pink-500",
      accentBg: "bg-purple-50 border-purple-100",
      accentText: "text-[#823CEB]"
    },
    {
      icon: Lock,
      title: "Privacidad Infantil y Ética Pediátrica",
      subtitle: "Acceso Seguro por Alias + PIN",
      highlight: "Cero datos biométricos o diagnósticos expuestos",
      description: "Cada paciente ingresa únicamente con un alias de fantasía y un PIN de 4 dígitos generado por su terapeuta, garantizando absoluta confidencialidad y tranquilidad familiar.",
      color: "from-emerald-500 to-teal-500",
      accentBg: "bg-emerald-50 border-emerald-100",
      accentText: "text-emerald-600"
    }
  ];

  const guardians = [
    {
      id: 0,
      emoji: LANDING_IMAGES.companions.juku.avatar,
      image: LANDING_IMAGES.companions.juku.image,
      name: "Juku",
      animal: "Oso de Anteojos",
      biome: "Ciber-Bosque Madidi",
      role: "Calma & Reconocimiento Emocional",
      benefit: "Anclaje sensorial (Grounding 5-4-3-2-1) y conexión con sensaciones corporales presentes.",
      accent: "border-emerald-200 bg-emerald-50/70 text-emerald-900"
    },
    {
      id: 1,
      emoji: LANDING_IMAGES.companions.quirqui.avatar,
      image: LANDING_IMAGES.companions.quirqui.image,
      name: "Quirqui",
      animal: "Quirquincho",
      biome: "Salar Espejo de Uyuni",
      role: "Respiración Pacer & Seguridad",
      benefit: "Regulación diafragmática pausada y disminución rápida de la hiperactivación autonómica.",
      accent: "border-sky-200 bg-sky-50/70 text-sky-900"
    },
    {
      id: 2,
      emoji: LANDING_IMAGES.companions.pari.avatar,
      image: LANDING_IMAGES.companions.pari.image,
      name: "Pari",
      animal: "Paraba Andina",
      biome: "Valle de Circuitos",
      role: "Flexibilidad Cognitiva & TCC",
      benefit: "Detección de pensamientos automáticos negativos y formulación de alternativas compasivas.",
      accent: "border-purple-200 bg-purple-50/70 text-purple-900"
    },
    {
      id: 3,
      emoji: LANDING_IMAGES.companions.lama.avatar,
      image: LANDING_IMAGES.companions.lama.image,
      name: "Lama",
      animal: "Llama Andina",
      biome: "Meseta de Límites",
      role: "Expresión Asertiva",
      benefit: "Práctica segura para decir 'no', pedir ayuda y establecer límites personales saludables.",
      accent: "border-amber-200 bg-amber-50/70 text-amber-900"
    },
    {
      id: 4,
      emoji: LANDING_IMAGES.companions.wayra.avatar,
      image: LANDING_IMAGES.companions.wayra.image,
      name: "Wayra",
      animal: "Cóndor Andino",
      biome: "Cumbre de la Calma",
      role: "Perspectiva & Altura",
      benefit: "Autoobservación serena para desescalar conflictos y comprender desafíos con claridad.",
      accent: "border-indigo-200 bg-indigo-50/70 text-indigo-900"
    }
  ];

  return (
    <section id="que-es" className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-purple-50/30 to-transparent">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#823CEB]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#823CEB]" />
            Asistencia Tecnológica en Salud Infantil
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-950 tracking-tight mb-5">
            ¿Qué es <span className="text-[#823CEB]">NUWI Play</span>?
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">
            Una suite clínica interactiva para psicólogos y terapeutas infantiles que convierte tareas de autorregulación en estimulantes expediciones andinas.
          </p>
        </div>

        {/* 4 Pillars Grid - Dynamic, high contrast, clean typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100/80 shadow-md hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${pillar.color} p-0.5 shadow-sm flex items-center justify-center shrink-0`}>
                      <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${pillar.accentText}`} />
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {pillar.subtitle}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-indigo-950 group-hover:text-[#823CEB] transition-colors">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  <div className="inline-block px-2.5 py-1 rounded-lg bg-purple-50 text-[#823CEB] text-xs font-bold mb-3 border border-purple-100">
                    ✨ {pillar.highlight}
                  </div>

                  <p className="text-slate-700 text-sm font-medium leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-purple-50 flex items-center gap-2 text-xs font-bold text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Compatible con tablets, computadoras y laptops de consultorio</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Andean Guardians Section - Redesigned as a Clean, Light-Themed Interactive Explorer */}
        <div className="rounded-3xl bg-gradient-to-br from-purple-50/90 via-white to-cyan-50/70 border border-purple-200/80 p-6 sm:p-10 shadow-lg relative overflow-hidden">
          
          <div className="max-w-3xl mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#823CEB] text-xs font-black uppercase tracking-wider mb-3 border border-purple-200">
              Arquetipos Terapéuticos
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 mb-3">
              Cinco Guardianes Andinos como Aliados del Proceso
            </h3>
            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              En lugar de enfrentarse a emociones difíciles de forma intimidante, el infante colabora con animales nativos que simbolizan recursos internos de regulación y resiliencia.
            </p>
          </div>

          {/* Guardian Selector Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
            {guardians.map((g) => {
              const isSelected = selectedGuardian === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setSelectedGuardian(g.id)}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer border flex flex-col items-start ${
                    isSelected
                      ? 'bg-white shadow-md border-[#823CEB] scale-[1.02] ring-2 ring-purple-300/40'
                      : 'bg-white/70 border-purple-100 hover:bg-white hover:border-purple-200'
                  }`}
                >
                  {g.image ? (
                    <img src={g.image} alt={g.name} loading="lazy" decoding="async" className="w-8 h-8 object-contain mb-1.5" />
                  ) : (
                    <span className="text-2xl block mb-1">{g.emoji}</span>
                  )}
                  <strong className="text-xs sm:text-sm font-black text-indigo-950 block">
                    {g.name}
                  </strong>
                  <span className="text-[10px] text-slate-500 font-medium block truncate">
                    {g.animal}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Guardian Showcase Detail */}
          {guardians[selectedGuardian] && (
            <div className={`p-5 sm:p-6 rounded-2xl border ${guardians[selectedGuardian].accent} bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in`}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-3xl shrink-0 overflow-hidden">
                  {guardians[selectedGuardian].image ? (
                    <img src={guardians[selectedGuardian].image} alt={guardians[selectedGuardian].name} loading="lazy" decoding="async" className="w-10 h-10 object-contain" />
                  ) : (
                    guardians[selectedGuardian].emoji
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="text-base sm:text-lg font-black text-indigo-950">
                      {guardians[selectedGuardian].name} ({guardians[selectedGuardian].animal})
                    </h4>
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-[#823CEB] text-[11px] font-bold">
                      {guardians[selectedGuardian].biome}
                    </span>
                  </div>
                  <strong className="text-xs text-indigo-900 block mb-1">
                    Enfoque: {guardians[selectedGuardian].role}
                  </strong>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-2xl">
                    {guardians[selectedGuardian].benefit}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
