/**
 * Centralized image configuration for the NUWI Play Commercial Landing Page.
 * 
 * You can easily replace any URL here with:
 * - Local static paths (e.g. '/assets/images/my-photo.png')
 * - Direct Base64 data URIs (e.g. 'data:image/png;base64,...')
 * - Hosted image URLs (AWS S3, Firebase Storage, Cloudinary, etc.)
 */

import psychImg from '../assets/images/psicologia_infantil_1788835461561.jpg';
import psychopedagogyImg from '../assets/images/psicopedagogia_neurodesarrollo_1788835476586.jpg';
import speechImg from '../assets/images/fonoaudiologia_1788835490446.jpg';
import occupationalImg from '../assets/images/terapia_ocupacional_1788835505497.jpg';
import clinicalTeamsImg from '../assets/images/equipos_clinicos_1788835520089.jpg';

export const LANDING_IMAGES = {
  // Official Brand Logo (WebP format with -rw)
  logo: "https://lh3.googleusercontent.com/pw/AP1GczPbB2_LebNbcZGWJbPLkXE_HJ9zKOzga-6_fMMWeK7AjTrs99E_pCumHzosxfX5XDPjPHeXcZn7x-XcQH6e_86yz1ZHiZ99BCMRjugcOsKPt90oAWJK_I5PAAjVjfE8192BHqD0ZaZUZPk4_BFVezb8=w370-h370-s-no-gm-rw",

  // Hero Section Media (Optimized WebP Delivery)
  hero: {
    // High-quality child psychology / therapeutic engagement session
    therapistSession: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&fm=webp&w=700&q=75",
    // Child interacting playfully with educational technology
    childInteraction: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&fm=webp&w=600&q=75",
    // Clinical setting with soft warmth
    clinicSetting: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&fm=webp&w=600&q=75"
  },

  // Clinical Specialties Photos (Optimized WebP Delivery)
  specialties: {
    psychology: psychImg,
    psychopedagogy: psychopedagogyImg,
    speechTherapy: speechImg,
    occupationalTherapy: occupationalImg,
    healthTeams: clinicalTeamsImg
  },

  // Key Activities Visuals (Optimized WebP Delivery)
  activities: {
    salarEspejo: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&fm=webp&w=500&q=75",
    ciberBosque: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&fm=webp&w=500&q=75",
    valleCircuitos: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&fm=webp&w=500&q=75",
    escanerEmocional: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&fm=webp&w=500&q=75",
    simuladorEscudos: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&fm=webp&w=500&q=75",
    holoCuentos: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&fm=webp&w=500&q=75"
  },

  // Escuadrón Rescate de Colores (Companions Meta)
  companions: {
    juku: {
      name: "Juku (Oso Jukumari)",
      avatar: "🐻‍❄️",
      image: "https://lh3.googleusercontent.com/pw/AP1GczO4x2PHxZ4IjmnoF1mbyr5ygGA_rYCpRql8WoaZtpg7xo6Qz9PH2ezquDIY_kgGd9nSWIySd2goXkzR1as7v0mDsa7gZziouomy_ZBaVQifzvE5-oLFgQ0AtIXxfJhn4pkH6MEtQ5Qo8GPSHnOjmF2y=w512-h512-s-no-gm-rw",
      role: "Calma y Presencia (Oso Jukumari)",
      focus: "Validación y Conexión Corporal"
    },
    quirqui: {
      name: "Quirqui",
      avatar: "🦔",
      image: "https://lh3.googleusercontent.com/pw/AP1GczPw1OBfDBsDpgZv6R_Vjz2065a0i4wpt_DA1-IKbO9Vx-DhJebl2yZBq5Mn3AnJpRnO58FMCJFcxm4FTCMbpU-SG2PLJC0N_PKbsHvanXpXv7UeISfX_tIULGEZBmHsy_imTItfR0G5xEqQapY269Wz=w512-h512-s-no-gm-rw",
      role: "Respiración y Calma (Quirquincho)",
      focus: "Regulación Somática y Ritmo Respiratorio"
    },
    pari: {
      name: "Pari (Paraba)",
      avatar: "🦜",
      image: "https://lh3.googleusercontent.com/pw/AP1GczN2_wWYyu-TB-4YDPSdaindNYvUXC8HHlgMZper7i45zaopv1ryzw6AaDFE1j_b7LjHv1RNJ4rF3KRClQCx3_6qWgk2pxuXEKjVsK8QOlpd1Uo8psKLmN8v_QbERp2l56fUHY02fl0HahAhyOFUrjjN=w512-h512-s-no-gm-rw",
      role: "Pensamiento Flexible (Paraba)",
      focus: "Reestructuración Cognitiva y Creatividad"
    },
    lama: {
      name: "Lama",
      avatar: "🦙",
      image: "https://lh3.googleusercontent.com/pw/AP1GczOkPAyNhVdGmMcR-9PZDnHC7G_pSWfc-NWICuSTk1JPhiaJZAcSysiO38w-Jo6wt_7EGuqcCr6DV0garw84DkjBnl9ZamHHwd0SJZxCHHkGG12UxjZnFZKJYgMLE5MXLkQoewHF-VRwJlPPnpLrQUWy=w512-h512-s-no-gm-rw",
      role: "Expresión y Límites (Llama Andina)",
      focus: "Límites Asertivos y Habilidades Sociales"
    },
    wayra: {
      name: "Wayra",
      avatar: "🦅",
      image: "https://lh3.googleusercontent.com/pw/AP1GczNiwkRu6F0p0wPBLzX_zIjW-EtYxCvI5uGmCG35B-u4902OJFY8nYDwzHvOUwBvAEHHQ0iHZgl2rNY_LWhfrCdgEVhkqzBoQkpNphA23viu7xVX4pux89RhR4pzYaJEF4ERcckf0gLiVylPLMXgOXpy=w512-h512-s-no-gm-rw",
      role: "Claridad y Perspectiva (Cóndor Andino)",
      focus: "Autoobservación Serena y Reflexión"
    }
  }
};
