import React, { useState } from 'react';
import { 
  FileCheck2, 
  Brain, 
  Award, 
  TrendingUp, 
  Zap, 
  Users, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { 
  THEORETICAL_FOUNDATIONS, 
  EMPIRICAL_EVIDENCE_BASE,
  ACTIVITY_CLINICAL_EVIDENCE_MAP
} from '../../constants/clinicalEvidence';
import { ScientificEvidenceModal } from '../ScientificEvidenceModal';

export const ScientificEvidenceSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<string>('salar');

  const openModalWithActivity = (actId: string) => {
    setSelectedActivityForModal(actId);
    setIsModalOpen(true);
  };

  const getIconForEvidence = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return Zap;
      case 'TrendingUp': return TrendingUp;
      case 'Brain': return Brain;
      case 'Award': return Award;
      case 'Users': return Users;
      default: return BookOpen;
    }
  };

  return (
    <section id="respaldo-cientifico" className="py-20 relative overflow-hidden bg-gradient-to-b from-purple-50/40 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100/90 border border-purple-200 text-purple-900 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
            <FileCheck2 className="w-3.5 h-3.5 text-purple-600" />
            Marco Clínico & Neuropsicológico Oficial
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-indigo-950 tracking-tight mb-5">
            Respaldo Científico de <span className="text-[#823CEB]">NUWI Play</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
            Sin ficciones ni promesas vacías: cada mecánica lúdica se sustenta rigurosamente en la 
            <strong> Teoría de la Autodeterminación (SDT)</strong>, la <strong>Terapia Cognitivo-Conductual Mejorada (TCC)</strong> y estudios empíricos indexados revisados por pares.
          </p>
        </div>

        {/* 2 Core Theoretical Foundations - Side by Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {THEORETICAL_FOUNDATIONS.map((theory) => (
            <div 
              key={theory.id}
              className="glass-card p-8 rounded-3xl bg-white border border-indigo-100 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Fundamento Teórico
                  </span>
                  <span className="text-xs font-black text-slate-400">
                    {theory.acronym}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-indigo-950 mb-3">
                  {theory.title}
                </h3>

                <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed mb-6">
                  {theory.summary}
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  {theory.principles.slice(0, 2).map((principle, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm">
                        <strong className="text-slate-900 font-black">{principle.title}: </strong>
                        <span className="text-slate-600 font-medium">{principle.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Integrado en todas las misiones
                </span>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
                >
                  <span>Ver detalles del marco</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empirical Evidence Grid (Exact Studies Cited) */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block mb-1">
                Base de Evidencia Empírica
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-indigo-950">
                Estudios Indexados y Hallazgos Cuantitativos
              </h3>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black transition-colors shadow-sm self-start sm:self-auto flex items-center gap-2"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Abrir Reporte Científico Completo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMPIRICAL_EVIDENCE_BASE.map((evidence) => {
              const Icon = getIconForEvidence(evidence.iconName);
              return (
                <div 
                  key={evidence.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-black border border-indigo-200">
                        {evidence.citation}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900 mb-2 leading-snug">
                      {evidence.domain}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-4">
                      "{evidence.finding}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-2">
                      <strong>Fuente:</strong> {evidence.source}
                    </p>
                    {evidence.metric && (
                      <div className="mt-2 text-[10px] font-black text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 inline-block">
                        ★ {evidence.metric}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Callout Card: Ethics & Clinical Co-responsibility */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-50/90 via-[#F0FBFD]/80 to-[#F2FBF7]/90 text-slate-800 shadow-lg border border-purple-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#823CEB]/10 border border-[#823CEB]/30 flex items-center justify-center text-[#823CEB] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-indigo-950">
                Corresponsabilidad Clínica Tripartita (Familia - Terapeuta - Paciente)
              </h4>
              <p className="text-sm text-slate-700 font-medium mt-1 max-w-2xl leading-relaxed">
                71% de aprobación de familias en intervenciones mediadas digitalmente (Academic Study, 2023). 
                <strong className="text-[#823CEB]"> NUWI Play</strong> no almacena identificadores estigmatizantes y facilita la entrega del informe metodológico a padres y colegios.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#823CEB] to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-purple-400/20 shrink-0 whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95"
          >
            Consultar Metodología y Papers
          </button>
        </div>

      </div>

      {/* Full Modal */}
      <ScientificEvidenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultActivityId={selectedActivityForModal}
      />
    </section>
  );
};
