import React from 'react';
import { 
  Gamepad2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  MessageCircle,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';
import { LANDING_IMAGES } from '../../config/landingImages';
import { contactConfig } from '../../config/contactConfig';

interface FooterProps {
  onEnterApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onEnterApp }) => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#3B127A] via-[#2B0C5C] to-[#1D0642] text-slate-200 pt-16 pb-12 overflow-hidden border-t border-purple-400/30 shadow-2xl">
      {/* Visual Top Gradient Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#823CEB] via-[#AAE4EB] to-[#91D7B5]" />

      {/* Ambient background glows for dark contrast */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#823CEB]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#AAE4EB]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-[#91D7B5]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* High-Impact Closing CTA Banner with Deep Cyber Atmosphere */}
        <div className="rounded-3xl bg-gradient-to-r from-[#5926B6] via-[#481D98] to-[#2B5466] border border-purple-300/40 p-8 sm:p-12 text-center text-white shadow-2xl shadow-purple-900/50 mb-16 relative overflow-hidden">
          {/* Subtle decorative inner highlights */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#AAE4EB]/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              Evolución en la Práctica Terapéutica
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-6">
              Acompaña a la infancia con herramientas que inspiran y regulan
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
              Brinda a tus pacientes un espacio interactivo y seguro donde la regulación emocional, la reestructuración del pensamiento y el juego andino se encuentran.
            </p>

            <button
              id="footer-cta-btn"
              onClick={onEnterApp}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-indigo-950 font-black text-base shadow-xl shadow-purple-950/40 hover:scale-105 active:scale-95 transition-all cursor-pointer hover:bg-slate-100"
            >
              <Gamepad2 className="w-5 h-5 text-[#823CEB]" />
              <span>Acceder a la Plataforma <span className="text-[#823CEB]">NUWI Play</span></span>
              <ArrowRight className="w-4 h-4 text-[#823CEB]" />
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 text-slate-300 text-sm">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={LANDING_IMAGES.logo} 
                alt="NUWI Play" 
                loading="lazy"
                decoding="async"
                className="w-12 h-12 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-2xl font-black text-[#823CEB] tracking-tight">NUWI Play</span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-md">
              Plataforma de asistencia terapéutica infantil basada en el universo del Escuadrón Rescate de Colores. 
              Diseñada para enriquecer la intervención psicológica, psicopedagógica y del desarrollo.
            </p>
            
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Plataforma 100% Virtual · Acceso confidencial seguro</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Servicio online sin fronteras geográficas</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <button onClick={() => scrollTo('#inicio')} className="text-slate-300 hover:text-[#AAE4EB] transition-colors cursor-pointer">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#que-es')} className="text-slate-300 hover:text-[#AAE4EB] transition-colors cursor-pointer">
                  ¿Qué es <span className="text-[#823CEB] font-semibold">NUWI Play</span>?
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#profesionales')} className="text-slate-300 hover:text-[#AAE4EB] transition-colors cursor-pointer">
                  Especialistas Infantiles
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#actividades')} className="text-slate-300 hover:text-[#AAE4EB] transition-colors cursor-pointer">
                  Módulos y Actividades
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#contacto')} className="text-slate-300 hover:text-[#AAE4EB] transition-colors cursor-pointer">
                  Contacto y Consultas
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Social Information */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Canales de Contacto
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a 
                  href={`https://wa.me/${contactConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp: <strong className="text-emerald-300">{contactConfig.whatsapp}</strong></span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${contactConfig.email}`}
                  className="flex items-center gap-2 text-slate-200 hover:text-purple-300 font-semibold transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#823CEB] shrink-0" />
                  <span>Email: <strong className="text-purple-200">{contactConfig.email}</strong></span>
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2.5">
                Redes Sociales
              </span>
              <div className="flex items-center gap-2">
                <a 
                  href={contactConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de NUWI Play"
                  title="Instagram (@nuwi.play)"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-pink-400 hover:bg-gradient-to-tr hover:from-purple-900/40 hover:to-pink-600/30 text-slate-300 hover:text-pink-300 transition-all flex items-center justify-center hover:scale-105 active:scale-95 shadow-xs group"
                >
                  <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
                <a 
                  href={contactConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de NUWI Play"
                  title="Facebook (NUWI Play)"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400 hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 transition-all flex items-center justify-center hover:scale-105 active:scale-95 shadow-xs group"
                >
                  <Facebook className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
                <a 
                  href={contactConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn de NUWI Play"
                  title="LinkedIn (NUWI Play)"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-600/20 text-slate-300 hover:text-cyan-300 transition-all flex items-center justify-center hover:scale-105 active:scale-95 shadow-xs group"
                >
                  <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Gradient divider line */}
        <div className="h-px w-full bg-gradient-to-r from-[#823CEB]/40 via-[#AAE4EB]/30 to-[#91D7B5]/30 rounded-full" />

        {/* Legal Disclaimer & Deontological Note */}
        <div className="pt-6 text-xs text-slate-400 space-y-3">
          <p className="leading-relaxed text-[11px] sm:text-xs text-slate-400">
            <strong className="text-slate-200">Aviso Deontológico y Ético:</strong> <span className="text-[#823CEB] font-bold">NUWI Play</span> es una herramienta digital de mediación y soporte asistivo orientada a profesionales habilitados de la salud mental, psicología y el desarrollo infantil. No constituye por sí misma un servicio de psicoterapia automatizada, diagnóstico médico independiente ni reemplaza el criterio y supervisión clínica de un especialista.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-slate-400 text-[11px]">
            <span>© {new Date().getFullYear()} <span className="font-bold text-[#823CEB]">NUWI Play</span>. Todos los derechos reservados.</span>
            <span className="font-medium text-slate-400">Salud, Bienestar & Neurodesarrollo Infantil · Servicio Virtual</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
