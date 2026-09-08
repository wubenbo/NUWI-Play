import React, { useState } from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  Layers, 
  Ghost, 
  MessageCircle, 
  BookOpen, 
  Search, 
  ShieldCheck, 
  Clock, 
  Tag, 
  Gamepad2, 
  ArrowRight,
  FileCheck2
} from 'lucide-react';
import { LANDING_IMAGES } from '../../config/landingImages';
import { SafeImage } from './SafeImage';
import { ACTIVITY_CLINICAL_EVIDENCE_MAP } from '../../constants/clinicalEvidence';
import { ScientificEvidenceModal } from '../ScientificEvidenceModal';

interface ActivitiesShowcaseProps {
  onEnterApp: () => void;
}

export const ActivitiesShowcase: React.FC<ActivitiesShowcaseProps> = ({ onEnterApp }) => {
  const [filter, setFilter] = useState<'all' | 'regulacion' | 'cognitivo' | 'sensorial'>('all');
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<string | null>(null);

  const activities = [
    {
      id: 'salar',
      title: 'Salar Espejo',
      subtitle: 'Respiración Pacer con Quirqui frente al espejo de sal',
      category: 'regulacion',
      categoryLabel: 'Regulación Autonómica',
      companionId: 'quirqui',
      companionRole: 'Quirqui (Respiración y Calma)',
      clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.salar.clinicalFocus,
      citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.salar.empiricalCitation,
      framework: ACTIVITY_CLINICAL_EVIDENCE_MAP.salar.theoreticalFramework,
      duration: '3 a 5 min',
      image: LANDING_IMAGES.activities.salarEspejo,
      benefits: ACTIVITY_CLINICAL_EVIDENCE_MAP.salar.clinicalBenefits,
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    {
      id: 'madidi',
      title: 'Ciber-Bosque Madidi',
      subtitle: 'Rastreo sensorial bioluminiscente 5-4-3-2-1 con Juku',
      category: 'sensorial',
      categoryLabel: 'Funciones Ejecutivas & Foco',
      companionId: 'juku',
      companionRole: 'Juku (Calma y Presencia)',
      clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.madidi.clinicalFocus,
      citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.madidi.empiricalCitation,
      framework: ACTIVITY_CLINICAL_EVIDENCE_MAP.madidi.theoreticalFramework,
      duration: '4 a 6 min',
      image: LANDING_IMAGES.activities.ciberBosque,
      benefits: ACTIVITY_CLINICAL_EVIDENCE_MAP.madidi.clinicalBenefits,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'valle',
      title: 'Valle de los Circuitos',
      subtitle: 'Reparación de bloques de pensamiento corruptos con Pari',
      category: 'cognitivo',
      categoryLabel: 'Andamiaje TCC',
      companionId: 'pari',
      companionRole: 'Pari (Pensamiento Flexible)',
      clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.valle.clinicalFocus,
      citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.valle.empiricalCitation,
      framework: ACTIVITY_CLINICAL_EVIDENCE_MAP.valle.theoreticalFramework,
      duration: '5 a 8 min',
      image: LANDING_IMAGES.activities.valleCircuitos,
      benefits: ACTIVITY_CLINICAL_EVIDENCE_MAP.valle.clinicalBenefits,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'traductor',
      title: 'Escáner Ciber-Emocional',
      subtitle: 'Juku escanea señales corporales y receta kits de confort',
      category: 'regulacion',
      categoryLabel: 'Etiquetado Afectivo',
      companionId: 'juku',
      companionRole: 'Juku (Calma y Presencia)',
      clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.traductor.clinicalFocus,
      citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.traductor.empiricalCitation,
      framework: ACTIVITY_CLINICAL_EVIDENCE_MAP.traductor.theoreticalFramework,
      duration: '3 a 4 min',
      image: LANDING_IMAGES.activities.escanerEmocional,
      benefits: ACTIVITY_CLINICAL_EVIDENCE_MAP.traductor.clinicalBenefits,
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 'simulador',
      title: 'Simulador de Escudos',
      subtitle: 'Práctica de asertividad y límites sociales con Lama',
      category: 'sensorial',
      categoryLabel: 'Habilidades Sociales',
      companionId: 'lama',
      companionRole: 'Lama (Expresión y Límites)',
      clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.simulador.clinicalFocus,
      citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.simulador.empiricalCitation,
      framework: ACTIVITY_CLINICAL_EVIDENCE_MAP.simulador.theoreticalFramework,
      duration: '4 a 6 min',
      image: LANDING_IMAGES.activities.simuladorEscudos,
      benefits: ACTIVITY_CLINICAL_EVIDENCE_MAP.simulador.clinicalBenefits,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'cuentos',
      title: 'Holo-Cuentos Interactivos',
      subtitle: 'Aventuras narrativas con decisiones de coraje y empatía',
      category: 'cognitivo',
      categoryLabel: 'Desensibilización Narrativa',
      companionId: 'pari',
      companionRole: 'Pari & Aliados Andinos',
      clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.cuentos.clinicalFocus,
      citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.cuentos.empiricalCitation,
      framework: ACTIVITY_CLINICAL_EVIDENCE_MAP.cuentos.theoreticalFramework,
      duration: '6 a 10 min',
      image: LANDING_IMAGES.activities.holoCuentos,
      benefits: ACTIVITY_CLINICAL_EVIDENCE_MAP.cuentos.clinicalBenefits,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.category === filter);

  return (
    <section id="actividades" className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-purple-50/30 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-purple-900 border border-purple-200/80 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Catálogo Clínico Interactivo
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-950 tracking-tight">
              Herramientas gamificadas con <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-600">propósito terapéutico</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-indigo-950 text-white shadow-md'
                  : 'bg-white text-indigo-900 border border-indigo-100 hover:bg-indigo-50'
              }`}
            >
              Todas (6)
            </button>
            <button
              onClick={() => setFilter('regulacion')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'regulacion'
                  ? 'bg-indigo-950 text-white shadow-md'
                  : 'bg-white text-indigo-900 border border-indigo-100 hover:bg-indigo-50'
              }`}
            >
              Regulación Afectiva
            </button>
            <button
              onClick={() => setFilter('cognitivo')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'cognitivo'
                  ? 'bg-indigo-950 text-white shadow-md'
                  : 'bg-white text-indigo-900 border border-indigo-100 hover:bg-indigo-50'
              }`}
            >
              Reestructuración TCC
            </button>
            <button
              onClick={() => setFilter('sensorial')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'sensorial'
                  ? 'bg-indigo-950 text-white shadow-md'
                  : 'bg-white text-indigo-900 border border-indigo-100 hover:bg-indigo-50'
              }`}
            >
              Sensorial & Social
            </button>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="glass-card rounded-3xl overflow-hidden bg-white/80 border border-indigo-100/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Visual Image Banner */}
                <div className="relative">
                  <SafeImage
                    src={act.image}
                    alt={act.title}
                    aspectRatioClass="aspect-16/10"
                    fallbackText={act.title}
                  />
                  {/* Category Pill Over Image */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-sm border ${act.badgeColor} bg-white/90 backdrop-blur-md`}>
                      {act.categoryLabel}
                    </span>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/70 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-300" />
                    <span>{act.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Companion Header */}
                  <div className="text-xs font-bold text-indigo-600/90 mb-1 flex items-center gap-1.5">
                    <span>Guía:</span>
                    {LANDING_IMAGES.companions[act.companionId as keyof typeof LANDING_IMAGES.companions]?.image && (
                      <img src={LANDING_IMAGES.companions[act.companionId as keyof typeof LANDING_IMAGES.companions].image} alt={act.companionId} loading="lazy" decoding="async" className="w-5 h-5 object-contain" />
                    )}
                    <span className="text-indigo-950 font-extrabold">{act.companionRole}</span>
                  </div>

                  <h3 className="text-xl font-black text-indigo-950 mb-2 group-hover:text-indigo-600 transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                    {act.subtitle}
                  </p>

                  {/* Clinical Benefits & Scientific Evidence Citation */}
                  <div className="space-y-2 pt-3 border-t border-indigo-50">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-extrabold uppercase tracking-wide text-indigo-900 block">
                        Enfoque Clínico:
                      </span>
                      <span className="text-[10px] font-black text-indigo-800 bg-indigo-100/80 px-2 py-0.5 rounded-md border border-indigo-200">
                        {act.citation}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mb-2">
                      {act.clinicalFocus}
                    </p>
                    {act.benefits.map((b, bidx) => (
                      <div key={bidx} className="flex items-start gap-2 text-xs text-slate-700 font-medium leading-tight">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with CTA & Scientific Paper Button */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={onEnterApp}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:bg-indigo-600 group-hover:text-white"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Probar en Plataforma</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelectedActivityForModal(act.id)}
                  className="w-full py-1.5 px-3 rounded-lg text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/60 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Ver Ficha y Evidencia Científica ({act.citation})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Scientific Evidence Modal */}
      {selectedActivityForModal && (
        <ScientificEvidenceModal
          isOpen={!!selectedActivityForModal}
          onClose={() => setSelectedActivityForModal(null)}
          defaultActivityId={selectedActivityForModal}
        />
      )}
    </section>
  );
};
