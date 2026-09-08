import React, { useState } from 'react';
import { 
  Brain, 
  BookOpenCheck, 
  MessageSquareHeart, 
  Activity, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { LANDING_IMAGES } from '../../config/landingImages';
import { SafeImage } from './SafeImage';

export const SpecialtiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const specialties = [
    {
      id: "psicologia",
      title: "Psicología Infantil & Psicoterapia",
      shortTitle: "Psicología Infantil",
      icon: Brain,
      color: "from-indigo-600 to-purple-600",
      accentBg: "bg-indigo-50",
      accentBorder: "border-indigo-200",
      accentText: "text-indigo-700",
      image: LANDING_IMAGES.specialties.psychology,
      headline: "Desarma la resistencia y fortalece la reestructuración cognitiva",
      description: "Ideal para abordar sintomatología ansiosa, dificultades de regulación afectiva, miedos evolutivos y baja tolerancia a la frustración.",
      clinicalTargets: [
        "Externalización de distorsiones de pensamiento (Valle de los Circuitos)",
        "Desensibilización narrativa gradual con toma de decisiones (Holo-Cuentos)",
        "Regulación respiratoria guiada para calmar la activación simpática (Salar Espejo)",
        "Validación afectiva sin culpa a través del Escáner Ciber-Emocional"
      ],
      recommendedModules: ["Valle de los Circuitos", "Holo-Cuentos", "Salar Espejo"]
    },
    {
      id: "psicopedagogia",
      title: "Psicopedagogía & Neurodesarrollo",
      shortTitle: "Psicopedagogía",
      icon: BookOpenCheck,
      color: "from-cyan-600 to-teal-600",
      accentBg: "bg-cyan-50",
      accentBorder: "border-cyan-200",
      accentText: "text-cyan-700",
      image: LANDING_IMAGES.specialties.psychopedagogy,
      headline: "Entrenamiento lúdico de funciones ejecutivas y memoria de trabajo",
      description: "Permite intervenir en dificultades atencionales (TDAH), memoria de trabajo, impulsividad y autorregulación del esfuerzo sostenido.",
      clinicalTargets: [
        "Retención secuencial y control inhibitorio (Bloques de Memoria)",
        "Tolerancia al error sin bloqueo cognitivo mediante feedback constructivo",
        "Refuerzo contingente mediante economía de Chispas de Luz",
        "Claridad reflexiva y toma de perspectiva con la guía de Wayra"
      ],
      recommendedModules: ["Bloques de Memoria", "Campamento Base", "Detective de Pensamientos"]
    },
    {
      id: "fonoaudiologia",
      title: "Fonoaudiología & Habilidades Sociales",
      shortTitle: "Fonoaudiología",
      icon: MessageSquareHeart,
      color: "from-pink-600 to-rose-600",
      accentBg: "bg-pink-50",
      accentBorder: "border-pink-200",
      accentText: "text-pink-700",
      image: LANDING_IMAGES.specialties.speechTherapy,
      headline: "Comunicación asertiva, prosodia y expresión socioemocional",
      description: "Acompaña a infantes y pacientes con mutismo selectivo, timidez extrema, dificultades pragmáticas del lenguaje y entrenamiento en habilidades sociales.",
      clinicalTargets: [
        "Práctica de límites seguros y expresión asertiva con Lama",
        "Estimulación del feedback auditivo con modulación de voces personalizadas",
        "Interpretación de señales corporales y entonación afectiva",
        "Construcción de narrativas coherentes y resolución pacífica de conflictos"
      ],
      recommendedModules: ["Simulador de Escudos", "Escáner Ciber-Emocional", "Adivina el Monstruo"]
    },
    {
      id: "terapia-ocupacional",
      title: "Terapia Ocupacional & Integración Sensorial",
      shortTitle: "Terapia Ocupacional",
      icon: Activity,
      color: "from-emerald-600 to-green-600",
      accentBg: "bg-emerald-50",
      accentBorder: "border-emerald-200",
      accentText: "text-emerald-700",
      image: LANDING_IMAGES.specialties.occupationalTherapy,
      headline: "Modulación del estado de alerta y anclaje propioceptivo",
      description: "Facilita la transición entre estados de sobreexcitación (hiperalerta) e hipoalerta mediante técnicas de grounding y calma somatosensorial.",
      clinicalTargets: [
        "Protocolo sensorial 5-4-3-2-1 en el Ciber-Bosque Madidi",
        "Pausas activas y autorregulación respiratoria 4-7-8",
        "Conciencia corporal e identificación de zonas de energía interna",
        "Disminución de conductas desreguladoras en la sesión clínica"
      ],
      recommendedModules: ["Ciber-Bosque Madidi", "Burbuja de Respiración", "Santuario Holográfico"]
    },
    {
      id: "clinicas",
      title: "Centros de Atención Infantil & Clínicas",
      shortTitle: "Centros & Clínicas",
      icon: Building2,
      color: "from-amber-600 to-orange-600",
      accentBg: "bg-amber-50",
      accentBorder: "border-amber-200",
      accentText: "text-amber-700",
      image: LANDING_IMAGES.specialties.healthTeams,
      headline: "Unificación de expedientes, tareas y seguimiento interdisciplinario",
      description: "Optimiza la gestión clínica de consultorios privados, gabinetes psicopedagógicos e instituciones de salud mental infantil.",
      clinicalTargets: [
        "Gestión unificada de pacientes con claves de acceso sin fricción",
        "Monitoreo visual del historial de actividades y estrellas acumuladas",
        "Notas clínicas confidenciales visibles solo por el equipo profesional",
        "Flexibilidad de uso tanto presencial en consulta como en casa"
      ],
      recommendedModules: ["Dashboard del Guardián", "Historial de Progreso", "Control de Asignaciones"]
    }
  ];

  const current = specialties[activeTab];
  const CurrentIcon = current.icon;

  return (
    <section id="profesionales" className="py-20 bg-gradient-to-b from-transparent via-purple-50/35 to-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-purple-900 border border-purple-200/80 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            Adaptabilidad a tu Práctica Clínica
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-950 tracking-tight mb-6">
            Diseñado para <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-600">profesionales de la infancia</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
            Cada disciplina encuentra en <strong className="text-[#823CEB]">NUWI Play</strong> módulos específicos que se acoplan naturalmente a su marco de trabajo teórico y objetivos de intervención.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {specialties.map((spec, idx) => {
            const Icon = spec.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={spec.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950 text-white shadow-lg shadow-indigo-300/40 scale-105'
                    : 'bg-white/80 text-indigo-900/80 hover:bg-white border border-indigo-100/80 hover:text-indigo-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-indigo-400'}`} />
                <span>{spec.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Active Specialty Detail Showcase Card */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl bg-white/90 border border-indigo-100 shadow-xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${current.accentBg} ${current.accentBorder} border flex items-center justify-center`}>
                    <CurrentIcon className={`w-6 h-6 ${current.accentText}`} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Aplicación Clínica Especializada
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-indigo-950">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-indigo-900 mb-3">
                  {current.headline}
                </h4>

                <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed mb-6">
                  {current.description}
                </p>

                {/* Targets Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide block">
                    Objetivos Clínicos Alcanzados:
                  </span>
                  {current.clinicalTargets.map((target, tidx) => (
                    <div key={tidx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-700 leading-snug">
                        {target}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Modules Tags */}
              <div className="pt-6 border-t border-indigo-50 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-2">Módulos sugeridos:</span>
                {current.recommendedModules.map((mod, midx) => (
                  <span
                    key={midx}
                    className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700"
                  >
                    ★ {mod}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Visual / Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <SafeImage
                  src={current.image}
                  alt={current.title}
                  aspectRatioClass="aspect-4/3"
                  fallbackText={`${current.title} · Asistencia Nuwi Play`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider block mb-1">
                      Enfoque Terapéutico
                    </span>
                    <p className="text-sm font-bold text-slate-100">
                      Integración guiada por el profesional durante la sesión clínica.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
