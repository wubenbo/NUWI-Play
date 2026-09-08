import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight, ShieldCheck, Gamepad2 } from 'lucide-react';
import { LANDING_IMAGES } from '../../config/landingImages';

interface NavbarProps {
  onEnterApp: () => void;
  hasActiveSession?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnterApp, hasActiveSession = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: '¿Qué es?', href: '#que-es' },
    { label: 'Respaldo Científico', shortLabel: 'Respaldo', href: '#respaldo-cientifico' },
    { label: 'Especialistas', href: '#profesionales' },
    { label: 'Actividades', href: '#actividades' },
    { label: 'Cómo Funciona', href: '#como-funciona' },
    { label: 'Contacto', href: '#contacto' }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 lg:px-8 pt-3 pb-2 transition-all">
      <nav className="max-w-7xl mx-auto backdrop-blur-xl bg-white/85 border border-purple-100/80 shadow-[0_8px_30px_rgba(147,51,234,0.04)] rounded-2xl sm:rounded-full px-3.5 sm:px-6 py-2.5 flex items-center justify-between transition-all gap-2">
        {/* Brand Logo & Name */}
        <a 
          href="#inicio" 
          onClick={(e) => handleScroll(e, '#inicio')}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          aria-label="Ir al inicio de Nuwi Play"
        >
          <img 
            src={LANDING_IMAGES.logo} 
            alt="NUWI Play Logo" 
            loading="lazy"
            decoding="async"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform shrink-0"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl sm:text-2xl font-black text-[#823CEB] tracking-tight shrink-0">
            NUWI Play
          </span>
        </a>

        {/* Desktop Navigation Links - Shown from lg breakpoint to prevent tablet overlap */}
        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-xs xl:text-sm font-bold text-indigo-950/80 hover:text-purple-700 px-2 xl:px-3 py-1.5 rounded-full hover:bg-purple-50/70 transition-all whitespace-nowrap shrink-0"
            >
              {link.shortLabel ? (
                <>
                  <span className="hidden xl:inline">{link.label}</span>
                  <span className="xl:hidden">{link.shortLabel}</span>
                </>
              ) : (
                link.label
              )}
            </a>
          ))}
        </div>

        {/* Action Button & Session Status */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-3 shrink-0">
          <button
            id="nav-cta-btn"
            onClick={onEnterApp}
            className="group relative inline-flex items-center gap-2 px-3.5 sm:px-4 xl:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800 text-white text-xs xl:text-sm font-extrabold shadow-md shadow-purple-300/60 hover:shadow-purple-400/80 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer overflow-hidden whitespace-nowrap shrink-0"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            {hasActiveSession ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="whitespace-nowrap">Ir a la Plataforma</span>
              </>
            ) : (
              <>
                <Gamepad2 className="w-4 h-4 text-purple-200 shrink-0" />
                <span className="hidden xl:inline whitespace-nowrap">Acceso Terapeutas / Pacientes</span>
                <span className="xl:hidden whitespace-nowrap">Acceso Plataforma</span>
              </>
            )}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        </div>

        {/* Mobile & Tablet Hamburger Button - Visible on screens below lg */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <button
            onClick={onEnterApp}
            className="sm:hidden text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm shrink-0"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Acceso</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center hover:bg-purple-100 transition-colors shrink-0"
            aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile & Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 sm:p-6 bg-white/95 backdrop-blur-2xl border border-purple-100/90 rounded-3xl shadow-2xl flex flex-col gap-3 transition-all animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="flex items-center justify-between text-sm font-bold text-indigo-950 p-3 rounded-2xl hover:bg-purple-50/80 hover:text-purple-700 transition-colors"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400 opacity-60" />
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-purple-100/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onEnterApp();
              }}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-purple-200/60"
            >
              <Gamepad2 className="w-4 h-4 text-cyan-300" />
              <span>{hasActiveSession ? 'Ir a Mi Plataforma' : 'Acceso Terapeutas / Pacientes'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-indigo-400 font-semibold py-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Privacidad Clínica y Acceso Seguro</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
