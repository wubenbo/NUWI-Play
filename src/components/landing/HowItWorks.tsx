import React from 'react';
import { 
  UserPlus, 
  Layers, 
  Gamepad2, 
  LineChart, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface HowItWorksProps {
  onEnterApp: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onEnterApp }) => {
  const steps = [
    {
      step: '01',
      title: 'El profesional accede y configura',
      subtitle: 'Alta en segundos sin fricción',
      description: 'Ingresa con tu cuenta profesional de Google. Registra al paciente con un Alias de fantasía (ej. "ZorroEstelar") y un PIN secreto de 4 dígitos. Cero recolección de datos sensibles.',
      icon: UserPlus,
      color: 'from-purple-600 to-indigo-700',
      badgeBg: 'bg-purple-50 text-purple-700'
    },
    {
      step: '02',
      title: 'Selecciona la experiencia clínica',
      subtitle: 'Prescripción según objetivos',
      description: 'Elige las actividades correspondientes a la meta terapéutica de la jornada: regulación respiratoria en Salar Espejo, anclaje sensorial en Madidi o reestructuración en Valle de los Circuitos.',
      icon: Layers,
      color: 'from-cyan-500 to-teal-600',
      badgeBg: 'bg-cyan-50 text-cyan-700'
    },
    {
      step: '03',
      title: 'Integra en sesión o como tarea',
      subtitle: 'Uso en tablet o remoto',
      description: 'Abre la plataforma en la tablet del consultorio como un tercer objeto transicional, o proporciona el Alias + PIN a la familia para que practiquen breves misiones de regulación en casa.',
      icon: Gamepad2,
      color: 'from-emerald-500 to-green-600',
      badgeBg: 'bg-emerald-50 text-emerald-700'
    },
    {
      step: '04',
      title: 'Monitorea métricas y refuerza',
      subtitle: 'Adherencia y autoeficacia',
      description: 'Revisa en tu Dashboard el historial de actividades completadas, la calibración respiratoria y las Chispas de Luz ganadas para el Baúl de Tesoros y el Campamento Base.',
      icon: LineChart,
      color: 'from-purple-500 to-indigo-700',
      badgeBg: 'bg-purple-50 text-purple-700'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-gradient-to-b from-transparent via-purple-50/40 to-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-purple-900 border border-purple-200/80 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            Flujo Clínico Simple & Fluido
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-950 tracking-tight mb-6">
            ¿Cómo funciona en tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-600">práctica diaria</span>?
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
            Sin instalaciones complejas ni curvas de aprendizaje empinadas. Diseñado para integrarse en menos de 2 minutos a tu consulta presencial o virtual.
          </p>
        </div>

        {/* 4 Steps Grid with Sequential Connecting Line */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-16">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-3xl p-7 bg-white/85 border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Step Number Watermark */}
                <span className="absolute -top-3 -right-2 text-6xl font-black text-indigo-50/70 select-none pointer-events-none group-hover:text-indigo-100/80 transition-colors">
                  {item.step}
                </span>

                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} p-0.5 shadow-md flex items-center justify-center`}>
                      <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-indigo-950" />
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${item.badgeBg}`}>
                      Paso {item.step}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="text-lg font-black text-indigo-950 mb-3 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-indigo-50 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Seguro & Confidencial</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Activation CTA Box */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-cyan-50 border border-indigo-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mb-2">
              ¿Listo para probar una experiencia interactiva en tu próxima sesión?
            </h3>
            <p className="text-sm font-semibold text-slate-600">
              Accede directamente al portal de terapeuta con tu cuenta de Google o prueba el modo paciente.
            </p>
          </div>

          <button
            onClick={onEnterApp}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-indigo-900 hover:bg-indigo-950 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
          >
            <span>Iniciar Sesión Ahora</span>
            <ArrowRight className="w-4 h-4 text-cyan-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
