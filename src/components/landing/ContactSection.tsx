import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Globe, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { contactConfig } from '../../config/contactConfig';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Psicólogo/a Infantil',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Helper to build WhatsApp URL safely
  const getWhatsAppUrl = () => {
    if (!contactConfig.whatsapp) return null;
    const cleanNumber = contactConfig.whatsapp.replace(/[^0-9+]/g, '');
    const message = encodeURIComponent("Hola, soy terapeuta infantil y me gustaría solicitar más información o una demostración de NUWI Play.");
    return `https://wa.me/${cleanNumber.replace('+', '')}?text=${message}`;
  };

  const whatsappUrl = getWhatsAppUrl();

  // Determine which contact items to render
  const hasWhatsapp = Boolean(contactConfig.whatsapp && contactConfig.whatsapp.trim().length > 0);
  const hasEmail = Boolean(contactConfig.email && contactConfig.email.trim().length > 0);
  const hasPhone = Boolean(contactConfig.phone && contactConfig.phone.trim().length > 0);
  const hasDemo = Boolean(contactConfig.demoUrl && contactConfig.demoUrl.trim().length > 0);

  return (
    <section id="contacto" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-100/70 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Contacto & Atención Profesional
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-950 tracking-tight mb-6">
            Conversemos sobre cómo potenciar tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-600">sesiones con infantes</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
            ¿Tienes dudas sobre los módulos, necesitas una demostración guiada para tu equipo o deseas conocer la plataforma? Estamos a tu disposición.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Active Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Direct Card */}
            {hasWhatsapp && (
              <a
                href={whatsappUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 rounded-3xl bg-emerald-50/80 border border-emerald-200 shadow-md hover:shadow-lg transition-all flex items-center justify-between group block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-200">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wide block">
                      Atención Directa por WhatsApp
                    </span>
                    <span className="text-lg font-black text-emerald-950">
                      {contactConfig.whatsapp}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold block mt-0.5">
                      Respuesta en el día para profesionales
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}

            {/* Email Card */}
            {hasEmail && (
              <a
                href={`mailto:${contactConfig.email}?subject=Consulta%20Profesional%20Nuwi%20Play`}
                className="glass-card p-6 rounded-3xl bg-white/80 border border-indigo-100 shadow-md hover:shadow-lg transition-all flex items-center justify-between group block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-wide block">
                      Correo Electrónico
                    </span>
                    <span className="text-base sm:text-lg font-bold text-indigo-950 break-all">
                      {contactConfig.email}
                    </span>
                    <span className="text-xs text-slate-500 font-medium block mt-0.5">
                      Consultas clínicas, institucionales y soporte
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}

            {/* Phone Card */}
            {hasPhone && (
              <a
                href={`tel:${contactConfig.phone.replace(/[^0-9+]/g, '')}`}
                className="glass-card p-6 rounded-3xl bg-white/80 border border-indigo-100 shadow-md hover:shadow-lg transition-all flex items-center justify-between group block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-md shadow-cyan-200">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-cyan-600 uppercase tracking-wide block">
                      Teléfono de Contacto
                    </span>
                    <span className="text-base sm:text-lg font-bold text-indigo-950">
                      {contactConfig.phone}
                    </span>
                    <span className="text-xs text-slate-500 font-medium block mt-0.5">
                      Lunes a Viernes · Horario de oficina
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-cyan-600 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}

            {/* Virtual Service Footprint */}
            <div className="glass-card p-6 rounded-3xl bg-white/70 border border-purple-100 text-slate-700 text-xs sm:text-sm font-medium flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#823CEB] flex items-center justify-center shrink-0 shadow-xs">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-indigo-950 block font-bold mb-0.5">Servicio 100% Virtual</strong>
                <p className="text-slate-600 leading-relaxed">
                  Plataforma digital en la nube accesible desde cualquier lugar y dispositivo. Sin requerir instalaciones ni traslados físicos.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 rounded-3xl bg-white/90 border border-indigo-100 shadow-xl">
              <div className="mb-6">
                <span className="text-xs font-extrabold text-[#823CEB] uppercase tracking-wider block mb-1">
                  Contacto Directo
                </span>
                <h3 className="text-2xl font-black text-indigo-950">
                  Envíanos tu consulta
                </h3>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-950 mb-2">¡Mensaje Recibido!</h4>
                  <p className="text-sm text-emerald-800 font-medium max-w-md mx-auto mb-6">
                    Gracias por contactarnos. Un especialista del equipo de <span className="text-[#823CEB] font-bold">NUWI Play</span> se pondrá en contacto contigo a la brevedad.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', role: 'Psicólogo/a Infantil', email: '', message: '' });
                    }}
                    className="text-xs font-bold text-emerald-700 underline cursor-pointer"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-indigo-950 uppercase tracking-wide mb-1.5">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Camila Vargas"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50/80 border border-indigo-100 rounded-xl p-3 text-sm text-indigo-950 font-medium outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-indigo-950 uppercase tracking-wide mb-1.5">
                        Especialidad / Rol
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-slate-50/80 border border-indigo-100 rounded-xl p-3 text-sm text-indigo-950 font-medium outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all"
                      >
                        <option value="Psicólogo/a Infantil">Psicólogo/a Infantil</option>
                        <option value="Psicoterapeuta">Psicoterapeuta Pediátrico</option>
                        <option value="Psicopedagogo/a">Psicopedagogo/a</option>
                        <option value="Fonoaudiólogo/a">Fonoaudiólogo/a</option>
                        <option value="Terapeuta Ocupacional">Terapeuta Ocupacional</option>
                        <option value="Director/a de Centro Infantil">Director/a de Centro Infantil</option>
                        <option value="Otro">Otro profesional de la salud o educación</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-indigo-950 uppercase tracking-wide mb-1.5">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nombre@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50/80 border border-indigo-100 rounded-xl p-3 text-sm text-indigo-950 font-medium outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-indigo-950 uppercase tracking-wide mb-1.5">
                      Mensaje o Consulta
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="¿Deseas implementar NUWI Play o solicitar una demostración guiada para tu equipo?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50/80 border border-indigo-100 rounded-xl p-3 text-sm text-indigo-950 font-medium outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-black text-sm shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4 text-cyan-200" />
                    <span>Enviar Consulta</span>
                  </button>

                  <p className="text-[11px] text-slate-500 text-center font-medium">
                    Tus datos se tratan bajo estricta confidencialidad profesional.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
