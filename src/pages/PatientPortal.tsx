import { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LANDING_IMAGES } from '../config/landingImages';

const SalarEspejo = lazy(() => import('../components/SalarEspejo'));
const CiberBosque = lazy(() => import('../components/CiberBosque'));
const ValleCircuitos = lazy(() => import('../components/ValleCircuitos'));
const CampamentoBase = lazy(() => import('../components/CampamentoBase'));
const MonsterTranslator = lazy(() => import('../components/MonsterTranslator'));
const BraveStory = lazy(() => import('../components/BraveStory'));
const SocialMirror = lazy(() => import('../components/SocialMirror'));
const CalmWorld = lazy(() => import('../components/CalmWorld'));
const EmotionMonsters = lazy(() => import('../components/EmotionMonsters'));
const MemoryBlocks = lazy(() => import('../components/MemoryBlocks'));
const ThoughtDetective = lazy(() => import('../components/ThoughtDetective'));
const BreathingBubble = lazy(() => import('../components/BreathingBubble'));
const RewardTrunk = lazy(() => import('../components/RewardTrunk'));

import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Gamepad2, 
  HeartPulse, 
  Trophy, 
  Sparkles, 
  BookOpen, 
  Ghost, 
  MessageCircle, 
  Search, 
  Layers, 
  CheckCircle2, 
  BatteryLow, 
  BatteryFull, 
  PlayCircle,
  Wind,
  Gift,
  Stethoscope,
  Filter,
  Volume2,
  VolumeX,
  FileCheck2
} from 'lucide-react';
import { getPatientProfile, getPatientPortalAssignments, completeAssignment, Patient, Assignment } from '../services/therapistService';
import { updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { ACTIVITY_CLINICAL_EVIDENCE_MAP } from '../constants/clinicalEvidence';
import { ScientificEvidenceModal } from '../components/ScientificEvidenceModal';

import { useAudioMode } from '../context/AudioContext';
import PreActivityModal from '../components/PreActivityModal';

// Comprehensive activity dictionary with all available games & exercises
export interface ActivityMeta {
  title: string;
  subtitle: string;
  icon: any;
  colorId: string;
  category: 'regulacion' | 'cognitivo' | 'atencion' | 'emocional' | 'gamificacion';
  character?: string;
  characterId?: string;
  clinicalFocus: string;
  citation?: string;
}

export const ALL_ACTIVITIES: Record<string, ActivityMeta> = {
  'salar': { 
    title: 'Salar Espejo', 
    subtitle: 'Respira con Quirqui frente al espejo del Salar de Uyuni', 
    icon: HeartPulse, 
    colorId: 'sky',
    category: 'regulacion',
    character: 'Quirqui',
    characterId: 'quirqui',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.salar.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.salar.empiricalCitation
  },
  'madidi': { 
    title: 'Ciber-Bosque Madidi', 
    subtitle: 'Rastreo sensorial 5-4-3-2-1 en la selva bioluminiscente', 
    icon: Sparkles, 
    colorId: 'emerald',
    category: 'atencion',
    character: 'Juku',
    characterId: 'juku',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.madidi.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.madidi.empiricalCitation
  },
  'valle': { 
    title: 'Valle de los Circuitos', 
    subtitle: 'Repara los bloques de pensamiento corruptos con Pari', 
    icon: Layers, 
    colorId: 'purple',
    category: 'cognitivo',
    character: 'Pari',
    characterId: 'pari',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.valle.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.valle.empiricalCitation
  },
  'traductor': { 
    title: 'Escáner Ciber-Emocional', 
    subtitle: 'Juku escanea señales corporales y receta kits de confort', 
    icon: Ghost, 
    colorId: 'indigo',
    category: 'emocional',
    character: 'Juku',
    characterId: 'juku',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.traductor.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.traductor.empiricalCitation
  },
  'cuentos': { 
    title: 'Holo-Cuentos', 
    subtitle: 'Aventuras interactivas con decisiones de coraje y empatía', 
    icon: BookOpen, 
    colorId: 'orange',
    category: 'cognitivo',
    character: 'Pari',
    characterId: 'pari',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.cuentos.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.cuentos.empiricalCitation
  },
  'simulador': { 
    title: 'Simulador de Escudos', 
    subtitle: 'Práctica de asertividad y límites sociales con la capitana Lama', 
    icon: MessageCircle, 
    colorId: 'blue',
    category: 'emocional',
    character: 'Lama',
    characterId: 'lama',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.simulador.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.simulador.empiricalCitation
  },
  'santuario': { 
    title: 'Santuario Holográfico', 
    subtitle: 'Construye y explora tu refugio andino de serenidad', 
    icon: Sparkles, 
    colorId: 'pink',
    category: 'regulacion',
    character: 'Juku',
    characterId: 'juku',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.santuario.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.santuario.empiricalCitation
  },
  'monstruos': { 
    title: 'Adivina el Monstruo', 
    subtitle: 'Decodifica glitches emocionales y transfórmalos en amigos de luz', 
    icon: Ghost, 
    colorId: 'rose',
    category: 'emocional',
    character: 'Juku',
    characterId: 'juku',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.monstruos.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.monstruos.empiricalCitation
  },
  'memoria': { 
    title: 'Bloques de Memoria', 
    subtitle: 'Secuencias de runas andinas musicales para entrenar atención', 
    icon: Layers, 
    colorId: 'teal',
    category: 'atencion',
    character: 'Pari',
    characterId: 'pari',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.memoria.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.memoria.empiricalCitation
  },
  'detective': { 
    title: 'Detective de Pensamientos', 
    subtitle: 'Wayra te enseña a volar alto para reencuadrar trampas mentales', 
    icon: Search, 
    colorId: 'amber',
    category: 'cognitivo',
    character: 'Wayra',
    characterId: 'wayra',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.detective.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.detective.empiricalCitation
  },
  'respiracion': { 
    title: 'Burbuja de Respiración 4-7-8', 
    subtitle: 'Inhala, retén y exhala siguiendo el pulso de la burbuja cuántica', 
    icon: Wind, 
    colorId: 'cyan',
    category: 'regulacion',
    character: 'Quirqui',
    characterId: 'quirqui',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.respiracion.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.respiracion.empiricalCitation
  },
  'campamento': { 
    title: 'Campamento Base', 
    subtitle: 'Equipa a los 5 compañeros del Escuadrón con Chispas de Luz', 
    icon: Trophy, 
    colorId: 'indigo',
    category: 'gamificacion',
    character: '🏕️ Escuadrón',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.campamento.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.campamento.empiricalCitation
  },
  'tesoros': { 
    title: 'Baúl de Tesoros', 
    subtitle: 'Bóveda de reliquias andinas legendarias desbloqueadas', 
    icon: Gift, 
    colorId: 'yellow',
    category: 'gamificacion',
    character: '🎁 Reliquias',
    clinicalFocus: ACTIVITY_CLINICAL_EVIDENCE_MAP.tesoros.clinicalFocus,
    citation: ACTIVITY_CLINICAL_EVIDENCE_MAP.tesoros.empiricalCitation
  }
};

export default function PatientPortal() {
  const [activeActivity, setActiveActivity] = useState<{ id: string, componentId: string } | null>(null);
  const [preActivityModal, setPreActivityModal] = useState<{ id: string, componentId: string } | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [celebrating, setCelebrating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const { audioMode, toggleAudioMode, stop: stopAudio } = useAudioMode();

  const [batteryLevel, setBatteryLevel] = useState<number>(65);
  const [batteryCheckedIn, setBatteryCheckedIn] = useState<boolean>(false);
  const [showScientificModal, setShowScientificModal] = useState<boolean>(false);
  const [scientificModalActivityId, setScientificModalActivityId] = useState<string | undefined>(undefined);

  const isTherapist = Boolean(auth.currentUser && !auth.currentUser.isAnonymous);

  // Filter activities in Therapist Mode
  const activityList = useMemo(() => {
    return Object.entries(ALL_ACTIVITIES).filter(([_, act]) => {
      if (selectedCategory === 'all') return true;
      return act.category === selectedCategory;
    });
  }, [selectedCategory]);

  useEffect(() => {
    fetchData();
  }, [activeActivity]);

  const fetchData = async () => {
    try {
      if (isTherapist) {
        // Therapist test/exploration profile
        setPatient({
          id: 'therapist-preview',
          therapistId: auth.currentUser?.uid || 'therapist',
          name: auth.currentUser?.displayName || 'Terapeuta (Test)',
          age: 9,
          primaryDiagnosis: 'Modo de Exploración y Evaluación Clínica',
          stars: 120,
          batteryLevel: batteryLevel
        });
        setBatteryCheckedIn(true);
      } else {
        const p = await getPatientProfile();
        if (p) {
          setPatient(p);
          if (p.batteryLevel !== undefined) {
            setBatteryLevel(p.batteryLevel);
          }
          const a = await getPatientPortalAssignments(p.id);
          const sorted = a.sort((a, b) => {
            if (a.status === 'pending' && b.status === 'completed') return -1;
            if (a.status === 'completed' && b.status === 'pending') return 1;
            return (a.createdAt || 0) - (b.createdAt || 0);
          });
          setAssignments(sorted);
        }
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleCompleteActivity = async () => {
    if (activeActivity && patient && !isTherapist) {
      setCelebrating(true);
      await completeAssignment(activeActivity.id, patient.id);
      setTimeout(() => {
        setCelebrating(false);
        setActiveActivity(null);
      }, 2200);
    } else if (activeActivity) {
      // In therapist exploration mode, celebrate briefly
      setCelebrating(true);
      setPatient(prev => prev ? { ...prev, stars: (prev.stars || 0) + 10 } : null);
      setTimeout(() => {
        setCelebrating(false);
        setActiveActivity(null);
      }, 1800);
    } else {
      setActiveActivity(null);
    }
  };

  const handleBatteryCheckIn = async () => {
    setBatteryCheckedIn(true);
    if (patient && !isTherapist) {
      try {
        await updateDoc(doc(db, 'patients', patient.id), {
          batteryLevel: batteryLevel
        });
      } catch (e) {
        console.error("Failed to update battery level", e);
      }
    }
  };

  const renderActiveActivity = () => {
    if (!activeActivity) return null;
    const cid = activeActivity.componentId;
    let Component = null;
    switch (cid) {
      case 'salar': Component = <SalarEspejo onComplete={handleCompleteActivity} />; break;
      case 'madidi': Component = <CiberBosque onComplete={handleCompleteActivity} />; break;
      case 'valle': Component = <ValleCircuitos onComplete={handleCompleteActivity} />; break;
      case 'traductor': Component = <MonsterTranslator onComplete={handleCompleteActivity} />; break;
      case 'cuentos': Component = <BraveStory onComplete={handleCompleteActivity} />; break;
      case 'simulador': Component = <SocialMirror onComplete={handleCompleteActivity} />; break;
      case 'santuario': Component = <CalmWorld onComplete={handleCompleteActivity} />; break;
      case 'monstruos': Component = <EmotionMonsters onComplete={handleCompleteActivity} />; break;
      case 'memoria': Component = <MemoryBlocks onComplete={handleCompleteActivity} />; break;
      case 'detective': Component = <ThoughtDetective onComplete={handleCompleteActivity} />; break;
      case 'respiracion': Component = <BreathingBubble onComplete={handleCompleteActivity} />; break;
      case 'campamento': Component = <CampamentoBase totalScore={patient?.stars || 120} />; break;
      case 'tesoros': Component = <RewardTrunk totalScore={patient?.stars || 120} />; break;
      default: return null;
    }
    
    return (
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-t-[#823CEB] border-[#AAE4EB] rounded-full animate-spin shadow-lg"></div>
        </div>
      }>
        {Component}
      </Suspense>
    );
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-indigo-900">Cargando tu espacio...</div>;
  }

  if (celebrating) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-[#F8F9FA]/90 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-6 text-center"
      >
        <motion.div 
           initial={{ scale: 0.5, opacity: 0 }} 
           animate={{ scale: 1, opacity: 1 }}
           transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
           className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(130,60,235,0.15)] flex flex-col items-center border border-[#AAE4EB]/50"
        >
           {/* Lottie-style CSS Animated Checkmark */}
           <div className="w-24 h-24 rounded-full bg-[#91D7B5]/20 flex items-center justify-center mb-6 relative">
             <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
             >
                <svg className="w-12 h-12 text-[#91D7B5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
             </motion.div>
             <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full border-4 border-[#91D7B5]/40"
             />
           </div>
           
           <h2 className="text-3xl md:text-4xl font-black text-[#823CEB] tracking-tight mb-2">¡Guardado Exitosamente!</h2>
           <p className="text-lg md:text-xl text-slate-500 font-bold mb-4">Actividad Completada</p>
           
           <div className="bg-[#823CEB]/10 px-6 py-2 rounded-full flex items-center gap-2 mt-2">
             <span className="text-2xl">✨</span>
             <span className="text-xl font-black text-[#823CEB]">+10 Chispas</span>
           </div>
        </motion.div>
      </motion.div>
    );
  }

  if (activeActivity) {
    return (
      <div className="h-[100dvh] min-h-[100dvh] outline-none flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 relative text-indigo-900 w-full overflow-hidden">
        <div className="absolute top-3 left-3 right-3 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-50 pointer-events-none">
          <button 
             onClick={() => {
               stopAudio();
               setActiveActivity(null);
             }} 
             className="pointer-events-auto px-3.5 py-1.5 sm:px-4 sm:py-2 glass-card rounded-full font-bold flex items-center gap-2 nav-item text-xs sm:text-sm md:text-base border-none shadow-sm hover:bg-white/80"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Volver al Reloj
          </button>
          
          <button
             onClick={toggleAudioMode}
             title={audioMode ? 'Modo Audio Activo (Clic para silenciar)' : 'Modo Silencioso (Clic para activar voz)'}
             className={`pointer-events-auto px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold flex items-center gap-2 text-xs sm:text-sm shadow-sm transition-all border ${
               audioMode 
                 ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' 
                 : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
             }`}
          >
             {audioMode ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
             <span className="hidden sm:inline font-extrabold">{audioMode ? 'Audio ON' : 'Audio OFF'}</span>
          </button>
        </div>
        <div className="w-full flex-1 flex flex-col items-center justify-start overflow-y-auto max-h-[100dvh] pt-14 pb-4 min-h-0">
          {renderActiveActivity()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">
      {/* Header Bar */}
      <header className="flex w-full items-center justify-between mb-4 sm:mb-6 shrink-0 gap-3">
        <div className="flex items-center gap-2">
          <Link 
            to={isTherapist ? "/therapist" : "/app"} 
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 glass-card rounded-full font-bold text-[#823CEB] hover:text-white hover:bg-[#823CEB] nav-item flex items-center gap-2 text-xs sm:text-sm md:text-base transition-colors border border-[#823CEB]/20"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> 
            {isTherapist ? "Panel Terapeuta" : "Salir"}
          </Link>
          {isTherapist && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#823CEB]/10 text-[#823CEB] text-xs font-bold rounded-full border border-[#823CEB]/30">
              <Stethoscope className="w-3.5 h-3.5" /> Modo Exploración Terapeuta
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <motion.div key={patient?.stars || 0} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="glass-card py-1.5 px-3.5 sm:py-2 sm:px-4 rounded-full flex items-center gap-2 border-none bg-white/70 shadow-[0_4px_15px_rgba(170,228,235,0.3)]">
            <span className="text-lg sm:text-xl">✨</span>
            <span className="font-extrabold text-[#823CEB] text-xs sm:text-sm md:text-base">{patient?.stars || 0} <span className="hidden sm:inline">Chispas</span></span>
          </motion.div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#823CEB] to-[#AAE4EB] rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-white shadow-md border-2 border-white">
            {isTherapist ? '🩺' : (patient?.name ? patient.name.charAt(0).toUpperCase() : '👦🏻')}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center w-full min-h-0">
        {!batteryCheckedIn && !isTherapist ? (
          <div className="flex-1 flex flex-col items-center justify-center w-full my-auto py-2">
            <section className="w-full max-w-2xl text-center glass-card p-6 sm:p-8 rounded-3xl border-none">
              <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                 <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-100 rounded-full flex items-center justify-center text-4xl sm:text-5xl overflow-hidden">
                   <img src={LANDING_IMAGES.companions.juku.image} alt="Juku" loading="lazy" decoding="async" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
                 </div>
                 <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-1.5">¡Hola, {patient?.name?.split(' ')[0] || 'Guardián'}! Soy Juku.</h1>
                    <p className="text-indigo-700/80 font-semibold text-base sm:text-lg">Antes de empezar las misiones de rescate, ¿cómo está tu Batería Emocional hoy?</p>
                 </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 my-6 sm:my-8">
                <BatteryLow className="w-7 h-7 sm:w-8 sm:h-8 text-rose-500 flex-shrink-0" />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={batteryLevel} 
                  onChange={(e) => setBatteryLevel(parseInt(e.target.value))} 
                  className="w-full h-3.5 sm:h-4 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <BatteryFull className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500 flex-shrink-0" />
              </div>
              
              <p className="text-xs sm:text-sm font-bold text-indigo-900 mb-6 uppercase tracking-widest">
                Nivel actual: {batteryLevel}%
              </p>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBatteryCheckIn}
                className="bg-indigo-600 text-white font-black py-3.5 sm:py-4 px-8 sm:px-10 rounded-full hover:bg-indigo-700 transition shadow-xl text-base sm:text-lg md:text-xl w-full md:w-auto"
              >
                ¡Sincronizar Reloj Guardián!
              </motion.button>
            </section>
          </div>
        ) : (
          <div className="flex-1 flex flex-col w-full pb-4">
            
            {/* Guardian & Mascot Banner */}
            <section className={`w-full mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 glass-card p-5 sm:p-7 rounded-[2rem] border-white/60 shrink-0 ${isTherapist ? 'bg-gradient-to-r from-[#823CEB]/10 to-[#AAE4EB]/10 border-[#823CEB]/20' : 'bg-white/40 shadow-xl'}`}>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white to-[#AAE4EB]/30 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0 shadow-[0_0_15px_rgba(170,228,235,0.5)] border-2 border-white -rotate-6 overflow-hidden">
                 <img src={LANDING_IMAGES.companions.juku.image} alt="Juku" loading="lazy" decoding="async" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              </motion.div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#823CEB] tracking-tight">
                    {isTherapist ? "Módulo de Exploración Clínica" : "¡Terminal de Misiones Activa!"}
                  </h1>
                  {isTherapist && (
                    <span className="text-[10px] sm:text-xs px-3 py-1 rounded-full bg-[#823CEB] text-white font-bold tracking-wider uppercase">
                      {activityList.length} Actividades
                    </span>
                  )}
                </div>
                <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl">
                  {isTherapist 
                    ? "Acceso maestro al catálogo de dinámicas con IA. Puedes simular y probar las herramientas tal cual como las experimentarán los pacientes."
                    : `Enlace establecido. "${
                        batteryLevel < 30 
                          ? 'Tu energía está baja, ¡pero estamos a salvo! Estas pequeñas misiones están diseñadas para recargar tu núcleo poquito a poco.'
                          : batteryLevel < 70
                          ? 'Nivel de energía estable. ¡Perfecto para explorar nuevos mundos y completar las misiones de rescate!'
                          : '¡Sistemas a máxima capacidad! Estás listo para liderar el escuadrón y conquistar cualquier desafío hoy.'
                      }"`
                  }
                </p>

                {isTherapist && (
                  <button
                    onClick={() => {
                      setScientificModalActivityId(undefined);
                      setShowScientificModal(true);
                    }}
                    className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#823CEB] text-xs font-extrabold border border-[#823CEB]/30 shadow-xs hover:shadow-sm transition-all"
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-[#823CEB]" />
                    <span>Ver Respaldo Neuropsicológico (SDT, TCC & Evidencia)</span>
                  </button>
                )}
              </div>

              {/* Energy Level Tester for Therapist */}
              {isTherapist && (
                <div className="bg-white/70 p-4 rounded-2xl border border-white/80 flex flex-col items-center gap-2 w-full sm:w-auto shrink-0 shadow-sm">
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#823CEB]">Simulador de Núcleo</span>
                  <div className="flex items-center gap-2.5">
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={batteryLevel} 
                      onChange={(e) => setBatteryLevel(parseInt(e.target.value))} 
                      className="w-24 h-2.5 bg-[#AAE4EB]/40 rounded-full accent-[#823CEB] cursor-pointer"
                    />
                    <span className="text-sm font-black text-[#823CEB] w-10 text-right">{batteryLevel}%</span>
                  </div>
                </div>
              )}
            </section>

            {/* Category Filter for Therapist Mode */}
            {isTherapist && (
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 shrink-0 hide-scrollbar">
                <span className="text-xs font-bold text-[#823CEB] uppercase tracking-widest flex items-center gap-1 pr-2">
                  <Filter className="w-3.5 h-3.5" /> Categorías:
                </span>
                {[
                  { id: 'all', label: 'Ver Todo' },
                  { id: 'regulacion', label: '🌬️ Regulación & Paz' },
                  { id: 'cognitivo', label: '🧠 Lógica (IA)' },
                  { id: 'atencion', label: '🌿 Foco & Sentidos' },
                  { id: 'emocional', label: '❤️ Social' },
                  { id: 'gamificacion', label: '🏆 Recompensas' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-sm border ${
                      selectedCategory === cat.id 
                        ? 'bg-[#823CEB] text-white border-[#823CEB] shadow-[0_4px_12px_rgba(130,60,235,0.3)]' 
                        : 'bg-white/80 text-slate-600 hover:bg-white hover:text-[#823CEB] border-white/80 hover:border-[#823CEB]/30'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}

            {/* Grid of Activities */}
            {isTherapist ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full pb-8">
                {activityList.map(([key, act]) => {
                  const Icon = act.icon;
                  return (
                    <motion.div
                      key={key}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPreActivityModal({ id: `test-${key}`, componentId: key })}
                      className="glass-card p-5 sm:p-6 flex flex-col justify-between gap-4 border border-white/60 cursor-pointer hover:shadow-[0_15px_30px_rgba(170,228,235,0.4)] transition-all bg-white/50 hover:bg-white/80 group relative overflow-hidden rounded-[2rem]"
                    >
                      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-[#AAE4EB]/20 to-transparent rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F8F9FA] to-[#AAE4EB]/30 text-[#823CEB] flex items-center justify-center shadow-inner flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform border border-white/80">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="text-base font-black text-slate-800 truncate leading-tight">{act.title}</h3>
                            {act.character && (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-[#823CEB] bg-[#823CEB]/10 px-2 py-0.5 rounded-full shrink-0 border border-[#823CEB]/20">
                                {act.characterId && LANDING_IMAGES.companions[act.characterId as keyof typeof LANDING_IMAGES.companions]?.image && (
                                  <img src={LANDING_IMAGES.companions[act.characterId as keyof typeof LANDING_IMAGES.companions].image} alt={act.character} loading="lazy" decoding="async" className="w-3.5 h-3.5 object-contain" />
                                )}
                                {act.character}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">{act.subtitle}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/50 flex flex-col gap-2 text-xs relative z-10">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-[#823CEB] text-[10px] uppercase tracking-wider truncate bg-[#823CEB]/10 px-2 py-0.5 rounded-full">
                            {act.clinicalFocus}
                          </span>
                          {act.citation && (
                            <span 
                              onClick={(e) => {
                                e.stopPropagation();
                                setScientificModalActivityId(key);
                                setShowScientificModal(true);
                              }}
                              title="Ver evidencia científica"
                              className="text-[9px] font-black text-slate-600 bg-white/90 hover:bg-purple-100 hover:text-[#823CEB] px-1.5 py-0.5 rounded border border-slate-200 transition-colors"
                            >
                              {act.citation}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-end">
                          <span className="font-extrabold text-[#823CEB] text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                            Probar <PlayCircle className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* Patient Assigned Tasks Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full pb-8">
                {assignments.length === 0 ? (
                   <div className="glass-card border-none bg-white/40 p-8 text-center md:col-span-4 rounded-3xl">
                      <span className="text-4xl mb-4 block">🎉</span>
                      <h3 className="text-xl font-bold text-indigo-900">¡No hay misiones de rescate!</h3>
                      <p className="text-indigo-600 font-medium mt-1">Has salvado el día. Tu escuadrón te avisará pronto.</p>
                   </div>
                ) : assignments.map(a => {
                   const mapData = ALL_ACTIVITIES[a.activityId];
                   if (!mapData) return null;
                   const Icon = mapData.icon;
                   const isCompleted = a.status === 'completed';
                   const bgClass = "bg-white/50";
                   const iconBgClass = "bg-gradient-to-br from-white to-[#AAE4EB]/40";
                   const iconTextClass = "text-[#823CEB]";

                   return (
                     <motion.div 
                        key={a.id}
                        whileHover={!isCompleted ? { y: -5 } : {}} 
                        whileTap={!isCompleted ? { scale: 0.95 } : {}}
                        onClick={() => !isCompleted && setPreActivityModal({ id: a.id, componentId: a.activityId })} 
                        className={`glass-card p-5 sm:p-6 flex flex-col gap-4 border-none transition-all relative
                          ${isCompleted ? 'opacity-50 grayscale cursor-not-allowed bg-slate-100/50' : `${bgClass} cursor-pointer hover:shadow-xl`}
                          
                        `}
                     >
                        {isCompleted && (
                          <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg z-10">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                        <div className={`flex gap-4 ${mapData.subtitle ? 'items-center' : 'flex-col'}`}>
                          <div className={`w-14 h-14 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0 ${isCompleted ? 'bg-slate-200 text-slate-400' : `${iconBgClass} ${iconTextClass}`}`}>
                            <Icon className="w-7 h-7 md:w-7 md:h-7" />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl md:text-lg font-bold text-indigo-900">{mapData.title}</h3>
                            {mapData.subtitle && <p className="text-xs sm:text-sm font-medium text-indigo-700/70 leading-snug mt-1">{mapData.subtitle}</p>}
                          </div>
                        </div>
                     </motion.div>
                   );
                })}

                {/* Campamento Base */}
                <motion.div whileHover={{ y: -5, scale: 1.01 }} onClick={() => setPreActivityModal({ id: 'campamento', componentId: 'campamento'})} className="glass-card bg-white/60 backdrop-blur-md p-6 sm:p-8 md:col-span-full cursor-pointer flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8 border border-white/60 shadow-lg hover:shadow-2xl transition-all group mt-2 rounded-[2rem]">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#AAE4EB]/30 to-[#823CEB]/10 rounded-2xl border border-white/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner text-3xl sm:text-4xl">
                       🏕️
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#823CEB] tracking-tight">Campamento Base</h3>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-[#823CEB] mt-1">Usa tus Chispas para equipar al Escuadrón</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#823CEB] to-[#AAE4EB] px-6 py-3 rounded-full text-white font-extrabold flex items-center gap-2 text-sm sm:text-base shadow-[0_4px_15px_rgba(130,60,235,0.3)]">
                    Ingresar <ArrowLeft className="w-5 h-5 rotate-180" />
                  </div>
                </motion.div>

              </div>
            )}
          </div>
        )}
      </main>

      {/* Pre-Activity Configuration Modal */}
      {preActivityModal && (
        <PreActivityModal
          isOpen={Boolean(preActivityModal)}
          activityId={preActivityModal.componentId}
          title={ALL_ACTIVITIES[preActivityModal.componentId]?.title || 'Misión del Escuadrón'}
          subtitle={ALL_ACTIVITIES[preActivityModal.componentId]?.subtitle || 'Aventura Terapéutica'}
          icon={ALL_ACTIVITIES[preActivityModal.componentId]?.icon || Gamepad2}
          clinicalFocus={ALL_ACTIVITIES[preActivityModal.componentId]?.clinicalFocus || 'Dinámica Terapéutica'}
          category={ALL_ACTIVITIES[preActivityModal.componentId]?.category || 'General'}
          onStart={() => {
            setActiveActivity(preActivityModal);
            setPreActivityModal(null);
          }}
          onClose={() => setPreActivityModal(null)}
        />
      )}
      {/* Scientific Evidence & Framework Modal */}
      {showScientificModal && (
        <ScientificEvidenceModal
          isOpen={showScientificModal}
          onClose={() => setShowScientificModal(false)}
          defaultActivityId={scientificModalActivityId}
        />
      )}
    </div>
  );
}

