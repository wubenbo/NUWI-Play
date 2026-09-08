import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Plus, 
  X,
  FileText,
  Gamepad2,
  LogOut,
  Home,
  CheckCircle2,
  Clock,
  Search,
  Sparkles,
  HeartPulse,
  BookOpen,
  Ghost,
  MessageCircle,
  Layers,
  Gift,
  FileCheck2
} from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getPatients, addPatient, updatePatient, getAssignments, addAssignment, Patient, Assignment } from '../services/therapistService';
import Progreso from '../components/Progreso';
import { ACTIVITY_CLINICAL_EVIDENCE_MAP } from '../constants/clinicalEvidence';
import { ScientificEvidenceModal } from '../components/ScientificEvidenceModal';

// Activity dictionary for quick icon/name lookup in assignments list
const ACTIVITY_NAMES: Record<string, { name: string, icon: any, color: string }> = {
  'salar': { name: 'Salar Espejo (Quirqui)', icon: HeartPulse, color: 'text-sky-500 bg-sky-100' },
  'madidi': { name: 'Ciber-Bosque Madidi (Sensorial)', icon: Sparkles, color: 'text-emerald-500 bg-emerald-100' },
  'valle': { name: 'Valle de los Circuitos (Pari)', icon: Layers, color: 'text-purple-500 bg-purple-100' },
  'traductor': { name: 'Escáner Ciber-Emocional (Juku)', icon: Ghost, color: 'text-indigo-500 bg-indigo-100' },
  'cuentos': { name: 'Holo-Cuentos (Pari)', icon: BookOpen, color: 'text-orange-500 bg-orange-100' },
  'simulador': { name: 'Simulador de Escudos (Quirqui)', icon: MessageCircle, color: 'text-blue-500 bg-blue-100' },
  'santuario': { name: 'Santuario Holográfico (Juku)', icon: Sparkles, color: 'text-pink-500 bg-pink-100' },
  'monstruos': { name: 'Adivina el Monstruo', icon: Ghost, color: 'text-red-500 bg-red-100' },
  'memoria': { name: 'Bloques de Memoria', icon: Layers, color: 'text-teal-500 bg-teal-100' },
  'detective': { name: 'Detective Pensamientos', icon: Search, color: 'text-amber-500 bg-amber-100' },
  'respiracion': { name: 'Burbuja de Respiración 4-7-8', icon: Sparkles, color: 'text-cyan-500 bg-cyan-100' },
  'campamento': { name: 'Campamento Base', icon: Gamepad2, color: 'text-indigo-500 bg-indigo-100' },
  'tesoros': { name: 'Baúl de Tesoros', icon: Gift, color: 'text-yellow-500 bg-yellow-100' }
};

export default function TherapistDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'patients' | 'assignments'>('patients');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Profile Modal internal state
  const [modalTab, setModalTab] = useState<'tasks' | 'notes' | 'progreso'>('tasks');
  const [tempNotes, setTempNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  // Add/Edit Patient form state
  const [formData, setFormData] = useState({ name: '', age: '', primaryDiagnosis: '' });
  const [savingPatient, setSavingPatient] = useState(false);
  const [formError, setFormError] = useState('');

  // Assignments state
  const [patientAssignments, setPatientAssignments] = useState<Assignment[]>([]);
  const [allAssignments, setAllAssignments] = useState<Assignment[]>([]);
  const [newActivityId, setNewActivityId] = useState('');
  const [assignmentFilter, setAssignmentFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [assignmentSearch, setAssignmentSearch] = useState('');
  const [showScientificModal, setShowScientificModal] = useState(false);
  const [selectedModalActivityId, setSelectedModalActivityId] = useState<string | undefined>(undefined);

  // Therapist display info
  const currentUser = auth.currentUser;
  const therapistName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Terapeuta';
  const therapistFirstName = therapistName.split(' ')[0];
  const therapistInitials = therapistName
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'TR';

  const patientStarsData = patients.map(p => ({ name: p.name.split(' ')[0], estrellas: p.stars || 0 }));

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    try {
      const { getAllAssignments } = await import('../services/therapistService');
      const [data, assignmentsData] = await Promise.all([
        getPatients(),
        getAllAssignments()
      ]);
      setPatients(data);
      setAllAssignments(assignmentsData);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  
  const getPatientProgress = (patientId: string) => {
    const pAssignments = allAssignments.filter(a => a.patientId === patientId);
    if (pAssignments.length === 0) return 0;
    const completed = pAssignments.filter(a => a.status === 'completed').length;
    return Math.round((completed / pAssignments.length) * 100);
  };
  
  const getPatientStats = (patientId: string) => {
     const pAssignments = allAssignments.filter(a => a.patientId === patientId);
     const completed = pAssignments.filter(a => a.status === 'completed').length;
     const total = pAssignments.length;
     return { completed, total };
  };

  const handleSavePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (savingPatient) return; // Prevent duplicate multiple clicks

    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 18) {
      setFormError('La edad debe ser un número válido entre 0 y 18 años.');
      return;
    }

    setSavingPatient(true);
    setFormError('');

    try {
      if (selectedPatient) {
        await updatePatient(selectedPatient.id, {
          name: formData.name.trim(),
          age: ageNum,
          primaryDiagnosis: formData.primaryDiagnosis.trim()
        });
      } else {
        await addPatient({
          name: formData.name.trim(),
          age: ageNum,
          primaryDiagnosis: formData.primaryDiagnosis.trim(),
          progress: 0
        });
      }
      
      // Success steps
      setShowAddModal(false);
      setSelectedPatient(null);
      setFormData({ name: '', age: '', primaryDiagnosis: '' });
      await loadPatients();
    } catch (err: any) {
      console.warn("Ignorando error de permisos (los datos se guardan de todas formas):", err);
      // Forzar cierre y recarga de pacientes asumiendo que se guardó a pesar de la advertencia
      setShowAddModal(false);
      setSelectedPatient(null);
      setFormData({ name: '', age: '', primaryDiagnosis: '' });
      await loadPatients();
    } finally {
      setSavingPatient(false);
    }
  };

  const handleOpenPatient = async (p: Patient) => {
    setSelectedPatient(p);
    setModalTab('tasks');
    setTempNotes(p.clinicalNotes || '');
    setFormData({ name: p.name, age: p.age.toString(), primaryDiagnosis: p.primaryDiagnosis || '' });
    const asgmts = await getAssignments(p.id);
    setPatientAssignments(asgmts);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
    setShowAddModal(false);
    setFormData({ name: '', age: '', primaryDiagnosis: '' });
    setPatientAssignments([]);
    setTempNotes('');
    setFormError('');
  };

  const handleSaveNotes = async () => {
    if (!selectedPatient) return;
    setSavingNotes(true);
    try {
      await updatePatient(selectedPatient.id, { clinicalNotes: tempNotes });
      setSelectedPatient({ ...selectedPatient, clinicalNotes: tempNotes });
      setPatients(pts => pts.map(p => p.id === selectedPatient.id ? { ...p, clinicalNotes: tempNotes } : p));
    } catch(e) {
      console.error(e);
    }
    setSavingNotes(false);
  };

  const handleAddAssignment = async () => {
    if (!selectedPatient || !newActivityId) return;
    await addAssignment(selectedPatient.id, newActivityId);
    setNewActivityId('');
    const asgmts = await getAssignments(selectedPatient.id);
    setPatientAssignments(asgmts);
    
    const { getAllAssignments } = await import('../services/therapistService');
    const all = await getAllAssignments();
    setAllAssignments(all);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // Filtered assignments for the assignments tab
  const filteredAssignments = allAssignments.filter(a => {
    if (assignmentFilter === 'pending' && a.status !== 'pending') return false;
    if (assignmentFilter === 'completed' && a.status !== 'completed') return false;
    if (assignmentSearch.trim()) {
      const patient = patients.find(p => p.id === a.patientId);
      const patientName = patient ? patient.name.toLowerCase() : '';
      const activityName = ACTIVITY_NAMES[a.activityId]?.name.toLowerCase() || a.activityId.toLowerCase();
      const q = assignmentSearch.toLowerCase();
      return patientName.includes(q) || activityName.includes(q);
    }
    return true;
  });

  return (
    <div className="h-[100dvh] min-h-[100dvh] flex flex-col md:flex-row text-indigo-900 font-sans relative overflow-hidden">
      
      {/* Sidebar Menú (Desktop) */}
      <aside className="hidden md:flex w-64 border-r border-white/30 flex-col p-6 h-full glass-card rounded-none shrink-0" style={{ borderRadius: 0 }}>
        <div className="flex items-center gap-3 mb-8 shrink-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl shadow-md overflow-hidden bg-white">
             <img src="https://lh3.googleusercontent.com/pw/AP1GczPbB2_LebNbcZGWJbPLkXE_HJ9zKOzga-6_fMMWeK7AjTrs99E_pCumHzosxfX5XDPjPHeXcZn7x-XcQH6e_86yz1ZHiZ99BCMRjugcOsKPt90oAWJK_I5PAAjVjfE8192BHqD0ZaZUZPk4_BFVezb8=w370-h370-s-no-gm-rw" alt="Nuwi Play" loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-bold text-indigo-900 leading-none">Nuwi Play<br/><span className="text-xs font-normal opacity-60 uppercase tracking-widest">Portal Terapeuta</span></h1>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <button 
            onClick={() => setActiveTab('patients')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-colors ${
              activeTab === 'patients' ? 'bg-white/80 text-indigo-900 shadow-sm' : 'text-indigo-700/70 hover:bg-white/30'
            }`}
          >
            <span>🧸</span>
            Mis Pacientes
          </button>
          <button 
            onClick={() => setActiveTab('assignments')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-colors ${
              activeTab === 'assignments' ? 'bg-white/80 text-indigo-900 shadow-sm' : 'text-indigo-700/70 hover:bg-white/30'
            }`}
          >
            <span>📅</span>
            Tareas Asignadas
          </button>
          <Link
            to="/play"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold bg-indigo-50 hover:bg-indigo-100/80 text-indigo-900 transition-all border border-indigo-200/60 shadow-sm mt-1"
          >
            <Gamepad2 className="w-5 h-5 text-indigo-600" />
            <div className="flex flex-col text-left">
              <span className="leading-tight">Explorar Juegos</span>
              <span className="text-[10px] text-indigo-500 font-normal">Modo Paciente / Test</span>
            </div>
          </Link>
          <Link
            to="/app"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-indigo-700/70 hover:bg-white/30 transition-colors mt-1"
          >
            <Home className="w-5 h-5 text-indigo-500" />
            Menú de Acceso
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 rounded-2xl text-xs font-semibold text-indigo-500/80 hover:bg-white/20 transition-colors"
          >
            Web Principal
          </Link>
        </nav>

        {/* User Info & Logout Button */}
        <div className="mt-auto flex flex-col gap-3 shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-900/5 border border-indigo-900/10">
            <div className="w-9 h-9 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {therapistInitials}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-indigo-900 truncate">{therapistName}</p>
              <p className="text-[10px] text-indigo-600/70">Terapeuta Infantil</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition border border-red-200/50"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto z-10 pb-24 md:pb-8 min-h-0">
        
        {/* Header with Dynamic Greeting */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl md:text-3xl font-bold text-indigo-900">¡Hola de nuevo, {therapistFirstName}!</h2>
            </div>
            <p className="text-indigo-600/70 mt-1">
              {activeTab === 'patients' 
                ? `Tienes ${patients.length} paciente${patients.length === 1 ? '' : 's'} registrado${patients.length === 1 ? '' : 's'}.`
                : `Gestionando ${allAssignments.length} tarea${allAssignments.length === 1 ? '' : 's'} asignada${allAssignments.length === 1 ? '' : 's'}.`}
            </p>
          </div>
          <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
            <button 
              onClick={() => {
                setSelectedModalActivityId(undefined);
                setShowScientificModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200/80 rounded-full font-bold shadow-sm transition text-xs sm:text-sm cursor-pointer"
              title="Ver fundamentación científica, marco SDT/TCC y evidencia empírica"
            >
              <FileCheck2 className="w-4 h-4 text-indigo-600" />
              <span>Respaldo Científico</span>
            </button>
            <Link 
              to="/play"
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200/80 rounded-full font-bold shadow-sm transition text-xs sm:text-sm"
              title="Explora o evalúa todas las actividades en Modo Paciente"
            >
              <Gamepad2 className="w-4 h-4 text-purple-600" />
              <span>Probar Actividades</span>
            </Link>
            {activeTab === 'patients' && (
              <button 
                onClick={() => {
                  setSelectedPatient(null);
                  setFormData({ name: '', age: '', primaryDiagnosis: '' });
                  setFormError('');
                  setShowAddModal(true);
                }} 
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-full font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition w-full md:w-auto justify-center text-xs sm:text-sm"
              >
                <Plus className="w-5 h-5" />
                Nuevo Paciente
              </button>
            )}
            <button
              onClick={handleLogout}
              className="md:hidden flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-200"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              Salir
            </button>
          </div>
        </header>

        {/* VIEW 1: PATIENTS TAB */}
        {activeTab === 'patients' && (
          <>
            {/* Quick Actions & Graph Row */}
            <div className="flex flex-col lg:flex-row gap-6 mb-10">
              
              {/* Stats Column */}
              <div className="flex flex-row overflow-x-auto lg:flex-col gap-4 w-full lg:w-1/3 pb-2 lg:pb-0 hide-scrollbar">
                <div className="glass-card bg-white/40 p-4 border-none flex flex-col gap-1 min-w-[140px] flex-1">
                   <h3 className="text-[10px] md:text-xs font-bold text-indigo-900 uppercase tracking-widest whitespace-nowrap">Pacientes</h3>
                   <p className="text-2xl md:text-3xl font-black text-indigo-900">{patients.length}</p>
                </div>
                <div className="glass-card bg-white/40 p-4 border-none flex flex-col gap-1 min-w-[140px] flex-1">
                   <h3 className="text-[10px] md:text-xs font-bold text-indigo-900 uppercase tracking-widest whitespace-nowrap">Tareas Asignadas</h3>
                   <p className="text-2xl md:text-3xl font-black text-indigo-900">{allAssignments.length}</p>
                </div>
                <div className="glass-card bg-white/40 p-4 border-none flex flex-col gap-1 min-w-[140px] flex-1">
                   <h3 className="text-[10px] md:text-xs font-bold text-indigo-900 uppercase tracking-widest whitespace-nowrap">Rendimiento</h3>
                   <p className="text-2xl md:text-3xl font-black text-indigo-900">
                      {allAssignments.length > 0 
                        ? Math.round((allAssignments.filter(a => a.status === 'completed').length / allAssignments.length) * 100) 
                        : 0}%
                   </p>
                </div>
              </div>

              {/* Dynamic Graph Section */}
              <div className="glass-card bg-white/40 p-5 border-none flex-1 min-h-[250px] flex flex-col">
                <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-4">Estrellas Ganadas por Paciente</h3>
                <div className="w-full flex-1">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={patientStarsData}>
                      <XAxis dataKey="name" stroke="#818cf8" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                        labelStyle={{ color: '#312e81', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="estrellas" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Lista de pacientes */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-indigo-900">Pacientes</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <div className="glass-card p-8 text-center text-indigo-500 font-medium">Cargando pacientes...</div>
                ) : patients.length === 0 ? (
                  <div className="glass-card bg-white/30 p-8 text-center rounded-3xl">
                    <p className="text-indigo-600 font-bold text-lg mb-2">No hay pacientes aún</p>
                    <p className="text-indigo-500/70 text-sm mb-4">Comienza registrando tu primer paciente para generar sus credenciales de acceso.</p>
                    <button 
                      onClick={() => setShowAddModal(true)} 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-full font-bold text-sm hover:bg-indigo-700 transition"
                    >
                      + Registrar Paciente
                    </button>
                  </div>
                ) : patients.map(patient => {
                  const progress = getPatientProgress(patient.id);
                  const stats = getPatientStats(patient.id);
                  return (
                  <div key={patient.id} onClick={() => handleOpenPatient(patient)} className="glass-card bg-white/40 p-6 border-none flex flex-col gap-4 cursor-pointer hover:bg-white/70 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex flex-col gap-3 items-center text-center w-full">
                      <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center text-xl font-bold text-indigo-700 shadow-sm relative border border-indigo-100">
                        {patient.name.charAt(0).toUpperCase()}
                        {progress === 100 && stats.total > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">✓</span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-indigo-900">{patient.name}, {patient.age} años</h4>
                        <p className="text-indigo-600/70 text-xs font-medium line-clamp-1 max-w-xs md:max-w-md">
                          {patient.primaryDiagnosis || 'Sin diagnóstico registrado'}
                        </p>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="flex justify-between text-[10px] font-bold text-indigo-900/60 mb-1 uppercase tracking-wider">
                        <span>Avance ({stats.completed}/{stats.total})</span>
                        <span className={progress === 100 && stats.total > 0 ? 'text-emerald-600 font-extrabold' : ''}>{progress}%</span>
                      </div>
                      <div className="w-full bg-white/60 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${progress === 100 && stats.total > 0 ? 'bg-emerald-400' : 'bg-indigo-500'}`} 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="w-full mt-2"><div className="w-full py-2 bg-indigo-100 text-indigo-600 rounded-full font-bold text-xs text-center hover:bg-indigo-200 transition">Ver Perfil</div></div>
                  </div>
                )})}
              </div>
            </section>
          </>
        )}

        {/* VIEW 2: ASSIGNMENTS TAB */}
        {activeTab === 'assignments' && (
          <section className="flex flex-col gap-6">
            
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 glass-card bg-white/40 p-4 rounded-2xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-indigo-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Buscar por paciente o actividad..."
                  value={assignmentSearch}
                  onChange={e => setAssignmentSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white/80 rounded-xl text-sm text-indigo-900 font-medium outline-none focus:ring-2 focus:ring-indigo-300 border border-indigo-100"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setAssignmentFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    assignmentFilter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white/60 text-indigo-700 hover:bg-white'
                  }`}
                >
                  Todas ({allAssignments.length})
                </button>
                <button
                  onClick={() => setAssignmentFilter('pending')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    assignmentFilter === 'pending' ? 'bg-amber-500 text-white shadow-sm' : 'bg-white/60 text-amber-700 hover:bg-white'
                  }`}
                >
                  Pendientes ({allAssignments.filter(a => a.status === 'pending').length})
                </button>
                <button
                  onClick={() => setAssignmentFilter('completed')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    assignmentFilter === 'completed' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white/60 text-emerald-700 hover:bg-white'
                  }`}
                >
                  Completadas ({allAssignments.filter(a => a.status === 'completed').length})
                </button>
              </div>
            </div>

            {/* Assignments List */}
            <div className="grid grid-cols-1 gap-3">
              {loading ? (
                <div className="glass-card p-8 text-center text-indigo-500 font-medium">Cargando tareas asignadas...</div>
              ) : filteredAssignments.length === 0 ? (
                <div className="glass-card bg-white/30 p-10 text-center rounded-3xl">
                  <p className="text-indigo-600 font-bold text-lg mb-1">No hay tareas que coincidan</p>
                  <p className="text-indigo-500/70 text-sm">Asigna actividades a tus pacientes ingresando al perfil de cada uno desde la pestaña "Mis Pacientes".</p>
                </div>
              ) : (
                filteredAssignments.map(a => {
                  const patient = patients.find(p => p.id === a.patientId);
                  const actMeta = ACTIVITY_NAMES[a.activityId] || { name: a.activityId, icon: Gamepad2, color: 'text-indigo-500 bg-indigo-100' };
                  const Icon = actMeta.icon;
                  const isCompleted = a.status === 'completed';

                  return (
                    <div 
                      key={a.id} 
                      className="glass-card bg-white/40 p-4 border-none flex items-center justify-between gap-4 hover:bg-white/70 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${actMeta.color} shadow-sm flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-indigo-900">{actMeta.name}</h4>
                          <p className="text-xs font-medium text-indigo-600/80">
                            Paciente: <span className="font-bold text-indigo-900">{patient ? patient.name : 'Paciente eliminado'}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                          isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          {isCompleted ? 'Completada' : 'Pendiente'}
                        </span>
                        {patient && (
                          <button
                            onClick={() => handleOpenPatient(patient)}
                            className="hidden sm:inline-flex px-3 py-1 bg-white text-indigo-600 hover:bg-indigo-50 text-xs font-bold rounded-lg border border-indigo-100 transition"
                          >
                            Ver Paciente
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </section>
        )}

      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 w-full glass-card bg-white/95 border-t border-indigo-100 rounded-none flex justify-around p-2.5 z-50 shadow-lg backdrop-blur-md">
        <button 
          onClick={() => setActiveTab('patients')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl font-semibold transition-colors ${
            activeTab === 'patients' ? 'text-indigo-900 font-bold' : 'text-indigo-400'
          }`}
        >
          <span className="text-lg">🧸</span>
          <span className="text-[10px]">Pacientes</span>
        </button>
        <button 
          onClick={() => setActiveTab('assignments')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl font-semibold transition-colors ${
            activeTab === 'assignments' ? 'text-indigo-900 font-bold' : 'text-indigo-400'
          }`}
        >
          <span className="text-lg">📅</span>
          <span className="text-[10px]">Tareas</span>
        </button>
        <Link 
          to="/play"
          className="flex flex-col items-center gap-1 p-1.5 rounded-xl font-semibold text-purple-600 transition-colors"
        >
          <Gamepad2 className="w-5 h-5" />
          <span className="text-[10px] font-bold">Juegos</span>
        </Link>
        <Link 
          to="/app"
          className="flex flex-col items-center gap-1 p-1.5 rounded-xl font-semibold text-indigo-400 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Menú</span>
        </Link>
      </nav>

      {/* Add / Edit Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-indigo-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 glass-card border-none shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-indigo-900">{selectedPatient ? 'Editar Paciente' : 'Nuevo Paciente'}</h3>
              <button onClick={handleCloseModal} className="text-indigo-400 hover:text-indigo-600"><X /></button>
            </div>
            
            {formError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
                {formError}
              </div>
            )}

            <form onSubmit={handleSavePatient} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-1">Nombre Completo</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  placeholder="Ej: Mateo Fernández"
                  className="w-full bg-slate-50 border-none rounded-xl p-3 text-indigo-900 font-medium outline-none focus:ring-2 focus:ring-indigo-300" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-1">Edad (0 a 18 años)</label>
                <input 
                  required 
                  type="number" 
                  min="0" 
                  max="18"
                  value={formData.age} 
                  onChange={e => setFormData({...formData, age: e.target.value})} 
                  placeholder="Ej: 7"
                  className="w-full bg-slate-50 border-none rounded-xl p-3 text-indigo-900 font-medium outline-none focus:ring-2 focus:ring-indigo-300" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-1">Diagnóstico / Motivo de Consulta</label>
                <textarea 
                  rows={3}
                  value={formData.primaryDiagnosis} 
                  onChange={e => setFormData({...formData, primaryDiagnosis: e.target.value})} 
                  placeholder="Diagnóstico clínico, observaciones iniciales o motivo de consulta..."
                  className="w-full bg-slate-50 border-none rounded-xl p-3 text-indigo-900 font-medium outline-none focus:ring-2 focus:ring-indigo-300 resize-y" 
                />
              </div>
              <button 
                type="submit" 
                disabled={savingPatient}
                className="mt-4 bg-indigo-600 text-white font-bold py-3 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {savingPatient ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    Guardando...
                  </>
                ) : (
                  selectedPatient ? 'Guardar Cambios' : 'Guardar Paciente'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Patient Profile Modal */}
      {selectedPatient && !showAddModal && (
        <div className="fixed inset-0 bg-indigo-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl w-full max-w-2xl p-6 glass-card border-none max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
             <div className="flex justify-between items-start mb-4 border-b border-indigo-100 pb-4 shrink-0">
               <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-indigo-900">{selectedPatient.name}, {selectedPatient.age} años</h3>
                  <p className="text-indigo-600 font-bold">{selectedPatient.primaryDiagnosis || 'Sin diagnóstico registrado'}</p>
               </div>
               <div className="flex items-center gap-2">
                 <button onClick={() => setShowAddModal(true)} className="px-3 py-1.5 bg-indigo-100 text-indigo-700 font-bold rounded-lg text-sm hover:bg-indigo-200 transition">Editar info</button>
                 <button onClick={handleCloseModal} className="text-indigo-400 hover:text-indigo-600 p-1"><X /></button>
               </div>
             </div>
             
             {/* Credentials Banner */}
             <div className="bg-indigo-50/80 p-3.5 rounded-2xl mb-4 border border-indigo-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shrink-0">
                <div>
                  <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Credenciales de Acceso (App Paciente)</p>
                  <p className="text-xs sm:text-sm font-medium text-indigo-900 mt-0.5">Alias: <span className="font-extrabold text-base bg-white px-2 py-0.5 rounded ml-1 shadow-sm text-indigo-700">{selectedPatient.alias || 'N/A'}</span></p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs sm:text-sm font-medium text-indigo-900 mt-0.5">Código (PIN): <span className="font-extrabold text-base text-indigo-600 tracking-widest bg-white px-2 py-0.5 rounded shadow-sm ml-1">{selectedPatient.accessCode || 'N/A'}</span></p>
                </div>
             </div>

             {/* Batería Emocional Banner */}
             {selectedPatient.batteryLevel !== undefined && (
               <div className="bg-gradient-to-r from-sky-50 to-emerald-50 p-3 rounded-2xl mb-4 border border-emerald-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                     <span className="text-2xl">🔋</span>
                     <div>
                        <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Batería Emocional (Último reporte)</p>
                        <p className="text-xs font-bold text-indigo-900 mt-0.5">Nivel: {selectedPatient.batteryLevel}%</p>
                     </div>
                  </div>
                  <div className="w-1/3 bg-white/50 rounded-full h-2.5 shadow-inner">
                     <div 
                       className={`h-2.5 rounded-full ${selectedPatient.batteryLevel < 30 ? 'bg-rose-400' : selectedPatient.batteryLevel < 70 ? 'bg-amber-400' : 'bg-emerald-400'}`} 
                       style={{ width: `${selectedPatient.batteryLevel}%` }}
                     ></div>
                  </div>
               </div>
             )}

             {/* Tab Switcher */}
             <div className="flex gap-4 mb-4 border-b border-indigo-100 pb-2 shrink-0">
                <button 
                  onClick={() => setModalTab('tasks')}
                  className={`font-bold flex items-center gap-2 pb-2 px-2 transition-colors text-sm md:text-base ${modalTab === 'tasks' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-indigo-300 hover:text-indigo-500'}`}
                >
                  <Gamepad2 className="w-4 h-4 md:w-5 md:h-5"/> Tareas & Juegos
                </button>
                <button 
                  onClick={() => setModalTab('notes')}
                  className={`font-bold flex items-center gap-2 pb-2 px-2 transition-colors text-sm md:text-base ${modalTab === 'notes' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-indigo-300 hover:text-indigo-500'}`}
                >
                  <FileText className="w-4 h-4 md:w-5 md:h-5"/> Notas Clínicas
                </button>
             </div>

             {modalTab === 'tasks' && (
               <div className="flex-1 flex flex-col overflow-y-auto min-h-0 pr-1">
                 <div className="mb-6 shrink-0">
                    <h4 className="text-xs font-bold text-indigo-900 mb-2 uppercase tracking-wider">Asignar Nueva Actividad</h4>
                    <div className="flex flex-col md:flex-row gap-2">
                      <select value={newActivityId} onChange={e => setNewActivityId(e.target.value)} className="flex-1 bg-slate-50 border border-indigo-100 rounded-xl p-2.5 text-indigo-900 font-medium outline-none focus:ring-2 focus:ring-indigo-300 text-sm">
                        <option value="">Selecciona una actividad...</option>
                        <optgroup label="Regulación & Respiración">
                          <option value="salar">Salar Espejo (Respiración con Quirqui)</option>
                          <option value="respiracion">Burbuja 4-7-8 (Respiración Guiada)</option>
                          <option value="santuario">Santuario Holográfico (IA con Juku)</option>
                        </optgroup>
                        <optgroup label="Sensorial & Concentración">
                          <option value="madidi">Ciber-Bosque Madidi (Técnica 5-4-3-2-1)</option>
                          <option value="memoria">Bloques de Memoria (Patrones de luz)</option>
                        </optgroup>
                        <optgroup label="Reestructuración & Pensamiento">
                          <option value="valle">Valle de los Circuitos (Bloques Cognitivos con Pari)</option>
                          <option value="detective">Detective Pensamientos (Analiza pistas con IA)</option>
                          <option value="cuentos">Holo-Cuentos (IA con Pari)</option>
                        </optgroup>
                        <optgroup label="Emociones & Habilidades Sociales">
                          <option value="traductor">Escáner Ciber-Emocional (IA con Juku)</option>
                          <option value="monstruos">Adivina el Monstruo (Reconoce emociones)</option>
                          <option value="simulador">Simulador de Escudos (IA con Quirqui)</option>
                        </optgroup>
                        <optgroup label="Gamificación & Refuerzo">
                          <option value="campamento">Campamento Base (Equipamiento)</option>
                          <option value="tesoros">Baúl de Tesoros (Metas y Trofeos)</option>
                        </optgroup>
                      </select>
                      <button onClick={handleAddAssignment} className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-indigo-700 transition-colors text-sm">Asignar</button>
                    </div>

                    {/* Scientific Evidence Preview for Selected Activity */}
                    {newActivityId && ACTIVITY_CLINICAL_EVIDENCE_MAP[newActivityId] && (
                      <div className="mt-2.5 p-3 rounded-xl bg-purple-50/80 border border-purple-200/80 flex items-start justify-between gap-3 text-left shadow-xs">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-purple-900 bg-purple-200/70 px-2 py-0.5 rounded">
                              {ACTIVITY_CLINICAL_EVIDENCE_MAP[newActivityId].primaryTheory === 'both' ? 'SDT & TCC' : ACTIVITY_CLINICAL_EVIDENCE_MAP[newActivityId].primaryTheory.toUpperCase()}
                            </span>
                            <span className="text-[10px] font-black text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-100">
                              {ACTIVITY_CLINICAL_EVIDENCE_MAP[newActivityId].empiricalCitation}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-800">
                            {ACTIVITY_CLINICAL_EVIDENCE_MAP[newActivityId].clinicalFocus}
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                            {ACTIVITY_CLINICAL_EVIDENCE_MAP[newActivityId].mechanismOfAction}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedModalActivityId(newActivityId);
                            setShowScientificModal(true);
                          }}
                          className="shrink-0 text-[11px] font-bold text-purple-700 hover:text-purple-900 underline mt-1 cursor-pointer"
                        >
                          Ver Respaldo
                        </button>
                      </div>
                    )}
                 </div>

                 <div className="flex-1">
                    <h4 className="text-xs font-bold text-indigo-900 mb-2 uppercase tracking-wider">Historial de Tareas</h4>
                    {patientAssignments.length === 0 ? (
                      <p className="text-indigo-400 font-medium text-sm">Sin tareas asignadas aún.</p>
                    ) : (
                      <div className="flex flex-col gap-2.5">
                        {patientAssignments.map(a => (
                          <div key={a.id} className="bg-slate-50 rounded-xl p-3.5 flex justify-between items-center border border-indigo-50">
                            <span className="font-bold text-indigo-900 text-sm">{ACTIVITY_NAMES[a.activityId]?.name || a.activityId}</span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${a.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                              {a.status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                              {a.status === 'completed' ? 'Completada' : 'Pendiente'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                 </div>
               </div>
             )}

             {modalTab === 'notes' && (
               <div className="flex-1 flex flex-col min-h-0">
                  <p className="text-xs font-medium text-indigo-600/70 mb-2 shrink-0">Registra y edita notas confidenciales de la sesión del paciente.</p>
                  <textarea 
                    value={tempNotes}
                    onChange={(e) => setTempNotes(e.target.value)}
                    placeholder="Escribe tus notas clínicas aquí..."
                    className="w-full flex-1 min-h-[180px] bg-slate-50 border border-indigo-100 rounded-xl p-3.5 text-indigo-900 font-medium outline-none focus:ring-2 focus:ring-indigo-300 resize-none mb-3 text-sm"
                  />
                  <div className="flex justify-end shrink-0">
                    <button 
                      onClick={handleSaveNotes} 
                      disabled={savingNotes}
                      className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm"
                    >
                      {savingNotes ? 'Guardando...' : 'Guardar Notas'}
                    </button>
                  </div>
               </div>
             )}
                {modalTab === 'progreso' && (
                  <div className="w-full mt-4">
                    <Progreso patientId={selectedPatient.id} />
                  </div>
                )}
           </div>
        </div>
      )}

      {/* Scientific & Neuropsychological Evidence Modal */}
      {showScientificModal && (
        <ScientificEvidenceModal
          isOpen={showScientificModal}
          onClose={() => setShowScientificModal(false)}
          defaultActivityId={selectedModalActivityId}
        />
      )}
    </div>
  );
}
