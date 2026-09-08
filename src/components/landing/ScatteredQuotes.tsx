import React, { useState } from 'react';
import { Sparkles, Brain, Shield, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface InsightItem {
  id: string;
  icon: React.ElementType;
  badge: string;
  metric: string;
  metricLabel: string;
  title: string;
  keyIdea: string;
  source: string;
  accent: string;
  bgLight: string;
}

export const ScatteredQuotes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('autonomia');

  const insights: InsightItem[] = [
    {
      id: 'autonomia',
      icon: Brain,
      badge: 'Teoría de la Autodeterminación (SDT)',
      metric: '3 Necesidades',
      metricLabel: 'Autonomía · Competencia · Vinculación',
      title: 'Significado y Autoeficacia sin Ansiedad Evaluativa',
      keyIdea: 'Al conectar con avatares andinos y progresiones visibles, el niño experimenta agencia activa sobre su proceso en lugar de percibirlo como una exigencia clínica.',
      source: 'Deci & Ryan, Marco Neuroafectivo',
      accent: 'text-[#823CEB] border-[#823CEB]',
      bgLight: 'bg-purple-50/70'
    },
    {
      id: 'regulacion',
      icon: Shield,
      badge: 'TCC Mejorada con Gamificación',
      metric: 'Andamiaje',
      metricLabel: 'Exposición Gradual y Segura',
      title: 'Entornos Protegidos para Desensibilizar el Miedo',
      keyIdea: 'La simulación interactiva reduce drásticamente la percepción de amenaza cerebral al abordar pensamientos intrusivos o desregulaciones autonómicas.',
      source: 'Psicoterapia Cognitivo-Conductual Basada en Evidencia',
      accent: 'text-cyan-700 border-cyan-500',
      bgLight: 'bg-cyan-50/70'
    },
    {
      id: 'adherencia',
      icon: TrendingUp,
      badge: 'Evidencia Empírica Indexada',
      metric: '71% Favorabilidad',
      metricLabel: 'Compromiso y Continuidad Familiar',
      title: 'Mayor Participación entre Sesiones de Consulta',
      keyIdea: 'Estudios indexados demuestran que la mediación digital lúdica reduce el abandono terapéutico y facilita informes claros para padres y colegios.',
      source: 'JMIR Pediátrico & Redalyc (2023-2026)',
      accent: 'text-emerald-700 border-emerald-500',
      bgLight: 'bg-emerald-50/70'
    }
  ];

  const current = insights.find(i => i.id === activeTab) || insights[0];
  const CurrentIcon = current.icon;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white via-purple-50/30 to-white relative overflow-hidden border-y border-purple-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200 text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#823CEB]" />
              Fundamentos de la Mediación Digital
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo-950 tracking-tight">
              ¿Por qué la gamificación clínica funciona?
            </h2>
          </div>

          {/* Interactive switcher tabs */}
          <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 shrink-0">
            {insights.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-white text-indigo-950 shadow-sm'
                    : 'text-slate-600 hover:text-indigo-950'
                }`}
              >
                {item.id === 'autonomia' && '🧠 Autoeficacia'}
                {item.id === 'regulacion' && '🛡️ Regulación'}
                {item.id === 'adherencia' && '📈 Adherencia'}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Focus Area */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${current.bgLight} border-purple-200/80 transition-all duration-300 shadow-sm`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Col: Stat / Metric Badge */}
            <div className="lg:col-span-4 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-purple-200/70 pb-6 lg:pb-0 lg:pr-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-purple-200 text-xs font-bold text-slate-700 mb-3 w-fit">
                <CurrentIcon className="w-4 h-4 text-[#823CEB]" />
                <span>{current.badge}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-indigo-950 mb-1">
                {current.metric}
              </div>
              <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                {current.metricLabel}
              </div>
            </div>

            {/* Right Col: Clinical Narrative */}
            <div className="lg:col-span-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-indigo-950">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                "{current.keyIdea}"
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs font-bold text-[#823CEB]">
                <CheckCircle className="w-4 h-4" />
                <span>Fuente: {current.source}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
