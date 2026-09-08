import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BookOpen, 
  Brain, 
  Award, 
  TrendingUp, 
  Zap, 
  Users, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Filter,
  FileCheck2
} from 'lucide-react';
import { 
  THEORETICAL_FOUNDATIONS, 
  EMPIRICAL_EVIDENCE_BASE, 
  ACTIVITY_CLINICAL_EVIDENCE_MAP,
  TheoreticalFoundation,
  EmpiricalEvidenceItem
} from '../constants/clinicalEvidence';

interface ScientificEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultActivityId?: string;
}

export const ScientificEvidenceModal: React.FC<ScientificEvidenceModalProps> = ({
  isOpen,
  onClose,
  defaultActivityId
}) => {
  const [activeTab, setActiveTab] = useState<'theories' | 'evidence' | 'activities'>('theories');
  const [selectedActivityKey, setSelectedActivityKey] = useState<string>(defaultActivityId || 'salar');
  const [selectedTheoryId, setSelectedTheoryId] = useState<'sdt' | 'cbt'>('sdt');

  if (!isOpen) return null;

  const currentActivityEvidence = ACTIVITY_CLINICAL_EVIDENCE_MAP[selectedActivityKey] || ACTIVITY_CLINICAL_EVIDENCE_MAP['salar'];

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
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-indigo-100 flex flex-col overflow-hidden my-auto"
        >
          {/* Top Header */}
          <div className="p-5 sm:p-7 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between relative shrink-0">
            <div className="flex items-center gap-3.5 pr-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center shrink-0 text-cyan-300 shadow-inner">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-cyan-400/30">
                    Marco Clínico Oficial
                  </span>
                  <span className="text-xs text-indigo-300 font-medium">
                    Evidencia Neuropsicológica & Pediátrica
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                  Respaldo Científico & Neuropsicológico
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors absolute top-5 right-5"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-4 pb-3 border-b border-slate-100 bg-slate-50/80 overflow-x-auto shrink-0 hide-scrollbar">
            <button
              onClick={() => setActiveTab('theories')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'theories'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-indigo-900'
              }`}
            >
              <Brain className="w-4 h-4" />
              1. Fundamentos Teóricos (SDT & TCC)
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'evidence'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-indigo-900'
              }`}
            >
              <Award className="w-4 h-4" />
              2. Evidencia Empírica & Estudios
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'activities'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-indigo-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              3. Mapeo por Actividad Clínica
            </button>
          </div>

          {/* Tab Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 min-h-0 bg-slate-50/40">
            {/* TAB 1: THEORIES */}
            {activeTab === 'theories' && (
              <div className="space-y-6">
                <div className="flex gap-3 p-1.5 bg-slate-200/60 rounded-2xl w-fit">
                  {THEORETICAL_FOUNDATIONS.map(theory => (
                    <button
                      key={theory.id}
                      onClick={() => setSelectedTheoryId(theory.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                        selectedTheoryId === theory.id
                          ? 'bg-white text-indigo-950 shadow-sm'
                          : 'text-slate-600 hover:text-indigo-900'
                      }`}
                    >
                      {theory.acronym}: {theory.title}
                    </button>
                  ))}
                </div>

                {THEORETICAL_FOUNDATIONS.filter(t => t.id === selectedTheoryId).map(theory => (
                  <div key={theory.id} className="space-y-5">
                    <div className="p-5 sm:p-6 rounded-3xl bg-indigo-50/70 border border-indigo-100">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-600 text-white">
                          Marco Teórico Primario
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-indigo-950">
                          {theory.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                        {theory.summary}
                      </p>
                    </div>

                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mt-4">
                      Pilares Clínicos & Mecanismos Operacionales
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {theory.principles.map((principle, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <h5 className="text-sm font-black text-slate-900 leading-snug">
                                {principle.title}
                              </h5>
                            </div>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                              {principle.description}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-100">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 block mb-0.5">
                              Aplicación en NUWI Play
                            </span>
                            <p className="text-[11px] text-slate-700 font-semibold leading-normal">
                              {principle.clinicalApplication}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: EMPIRICAL EVIDENCE */}
            {activeTab === 'evidence' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-emerald-900 font-medium leading-relaxed">
                    Toda métrica, porcentaje y afirmación metodológica dentro de NUWI Play se desprende directamente de estudios indexados revisados por pares.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {EMPIRICAL_EVIDENCE_BASE.map(item => {
                    const Icon = getIconForEvidence(item.iconName);
                    return (
                      <div
                        key={item.id}
                        className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs sm:text-sm font-black text-slate-900">
                                {item.domain}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-black border border-indigo-200">
                                {item.citation}
                              </span>
                              {item.metric && (
                                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                                  {item.metric}
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-2">
                              "{item.finding}"
                            </p>
                            <p className="text-[11px] text-slate-500 font-normal">
                              <strong>Fuente indexada:</strong> {item.source}
                            </p>
                          </div>
                        </div>

                        <div className="sm:text-right shrink-0 sm:border-l sm:border-slate-100 sm:pl-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                            Implicancia Clínica
                          </span>
                          <p className="text-xs font-semibold text-indigo-900 max-w-xs">
                            {item.clinicalImplication}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: ACTIVITY MAPPING */}
            {activeTab === 'activities' && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-2">
                    Selecciona una Misión / Minijuego para ver su Respaldo Académico
                  </label>
                  <select
                    value={selectedActivityKey}
                    onChange={(e) => setSelectedActivityKey(e.target.value)}
                    className="w-full sm:max-w-md p-3 rounded-2xl bg-white border border-slate-300 text-slate-800 font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                  >
                    {Object.values(ACTIVITY_CLINICAL_EVIDENCE_MAP).map(act => (
                      <option key={act.activityId} value={act.activityId}>
                        {act.activityName} ({act.companion})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-indigo-100 shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {currentActivityEvidence.companion}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">
                        {currentActivityEvidence.activityName}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">
                        {currentActivityEvidence.clinicalFocus}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Cita Evidencia
                      </span>
                      <span className="inline-block px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-black mt-0.5">
                        {currentActivityEvidence.empiricalCitation}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                      Marco Teórico Directo
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                      {currentActivityEvidence.theoreticalFramework}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                      Mecanismo de Acción Neuroafectivo
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-indigo-50/50 p-3.5 rounded-2xl border border-indigo-100">
                      {currentActivityEvidence.mechanismOfAction}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                      Beneficios Clínicos Especificados
                    </h4>
                    <div className="space-y-2">
                      {currentActivityEvidence.clinicalBenefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Conforme a protocolos éticos TCC y Teoría de la Autodeterminación (SDT).</span>
            </div>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
            >
              Cerrar Reporte
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
