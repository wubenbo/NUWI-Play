/**
 * Centralized contact configuration for NUWI Play.
 * 
 * Rules:
 * - Empty string ("") automatically hides or disables the respective contact button.
 * - Fill in values whenever you want to activate specific channels.
 */

export const contactConfig = {
  whatsapp: "+591 57389347",
  email: "nuwi.contacto@gmail.com",
  phone: "", // No hay teléfono de contacto
  demoUrl: "#contacto",
  location: "Servicio 100% Virtual · Atención y acceso online",
  isVirtual: true,
  social: {
    instagram: "https://instagram.com/nuwi.play",
    instagramHandle: "nuwi.play",
    facebook: "https://www.facebook.com/profile.php?id=61594002321479",
    facebookHandle: "NUWI Play",
    linkedin: "https://www.linkedin.com/company/numiplay/posts/",
    linkedinHandle: "NUWI Play"
  }
};
