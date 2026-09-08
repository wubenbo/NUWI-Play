import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, getAdditionalUserInfo } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import TherapistDashboard from './pages/Dashboard';
import PatientPortal from './pages/PatientPortal';
import { LandingPage } from './pages/LandingPage';
import { Gamepad2, UserCircle2, LogIn, KeyRound, ArrowLeft } from 'lucide-react';
import { AudioProvider } from './context/AudioContext';
import { LANDING_IMAGES } from './config/landingImages';

// Landing Page Route Wrapper
function LandingWrapper({ hasActiveSession }: { hasActiveSession: boolean }) {
  const navigate = useNavigate();
  return (
    <LandingPage 
      onEnterApp={() => navigate('/app')} 
      hasActiveSession={hasActiveSession} 
    />
  );
}

// Internal Auth & Mode Selection Screen
function Home({ onSignOut }: { onSignOut: () => void }) {
  const isPatient = auth.currentUser?.isAnonymous || localStorage.getItem("patientSession") !== null;
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full relative">
      <div className="w-full flex justify-between items-center shrink-0">
        <Link 
          to="/"
          className="text-indigo-600 font-bold glass-card px-4 py-2 border-none rounded-full text-xs sm:text-sm hover:bg-white/70 transition shadow-sm flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ver Presentación (Web)</span>
        </Link>
        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          className="text-indigo-500 font-bold glass-card px-4 py-2 border-none rounded-full text-xs sm:text-sm hover:bg-white/60 transition shadow-sm cursor-pointer"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full my-auto py-6">
        <div className="text-center mb-8 md:mb-10">
          <img 
            src={LANDING_IMAGES.logo} 
            alt="Nuwi Play Logo" 
            loading="lazy"
            decoding="async"
            className="w-24 h-24 mb-4 mx-auto object-contain" 
            referrerPolicy="no-referrer"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 mb-3 tracking-tight">Nuwi Play</h1>
          <p className="text-indigo-600/80 font-semibold text-base sm:text-lg max-w-md mx-auto">
            Centro de Atención Psicológica Infantil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl">
          {!isPatient && (
            <Link 
              to="/therapist" 
              className="glass-card nav-item flex flex-col items-center justify-center gap-3 sm:gap-4 p-6 sm:p-8 md:p-10 cursor-pointer animate-fade-in"
              style={{ animationDelay: '100ms' }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-400/20 rounded-2xl flex items-center justify-center">
                <UserCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
              </div>
              <div className="text-center">
                <h2 className="text-lg sm:text-xl font-bold text-indigo-900 mb-1">Portal Terapeuta</h2>
                <p className="text-indigo-600/70 text-xs sm:text-sm font-medium">Gestiona pacientes y asigna actividades</p>
              </div>
            </Link>
          )}
          <Link 
            to="/play" 
            className="glass-card nav-item flex flex-col items-center justify-center gap-3 sm:gap-4 p-6 sm:p-8 md:p-10 cursor-pointer animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-400/20 rounded-2xl flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
            </div>
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-bold text-indigo-900 mb-1">Modo Paciente</h2>
              <p className="text-indigo-600/70 text-xs sm:text-sm font-medium">Juega y aprende con actividades</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full text-center py-2 text-xs text-indigo-400/70 font-medium shrink-0">
        Nuwi Play · Plataforma Terapéutica Interactiva
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border border-indigo-100">
            <h3 className="text-xl font-black text-indigo-950 mb-2">¿Cerrar Sesión?</h3>
            <p className="text-slate-600 text-sm font-medium mb-6">
              Estás a punto de cerrar tu sesión actual. ¿Deseas continuar?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-indigo-600 bg-indigo-50 font-bold hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  onSignOut();
                }}
                className="flex-1 px-4 py-2.5 rounded-xl text-white bg-rose-500 font-bold hover:bg-rose-600 transition-colors cursor-pointer shadow-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Authentication Card (Preserving existing logic intact)
interface LoginCardProps {
  showPatientLogin: boolean;
  setShowPatientLogin: (val: boolean) => void;
  alias: string;
  setAlias: (val: string) => void;
  pin: string;
  setPin: (val: string) => void;
  loginError: string;
  therapistLoginError: string;
  loadingLogin: boolean;
  handlePatientLoginSubmit: (e: React.FormEvent) => void;
  handleTherapistLogin: () => void;
}

function LoginCard({
  showPatientLogin,
  setShowPatientLogin,
  alias,
  setAlias,
  pin,
  setPin,
  loginError,
  therapistLoginError,
  loadingLogin,
  handlePatientLoginSubmit,
  handleTherapistLogin
}: LoginCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="mesh-bg"></div>

      <Link 
        to="/"
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-indigo-700 text-xs sm:text-sm font-bold hover:bg-white/80 transition-all shadow-sm z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la Presentación</span>
      </Link>

      <div className="glass-card max-w-sm w-full p-8 flex flex-col items-center text-center z-10">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-md overflow-hidden border-2 border-purple-200 p-2">
          <img 
            src={LANDING_IMAGES.logo} 
            alt="Nuwi Play" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain" 
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-3xl font-bold text-indigo-900 mb-2">Nuwi Play</h1>
        <p className="text-indigo-600/80 mb-8 font-medium">Inicia sesión para continuar</p>
        
        {showPatientLogin ? (
          <form onSubmit={handlePatientLoginSubmit} className="w-full flex flex-col gap-4">
            <div>
              <input 
                type="text" required placeholder="Tu Alias" 
                value={alias} onChange={(e) => setAlias(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl p-3 text-indigo-900 font-medium outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <input 
                type="text" required placeholder="Código Secreto (PIN)" 
                value={pin} onChange={(e) => setPin(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl p-3 text-indigo-900 font-medium outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm font-bold">{loginError}</p>}
            <button 
              type="submit" disabled={loadingLogin}
              className="flex items-center justify-center gap-3 w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-emerald-600 transition disabled:opacity-50 mt-2 cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5" />
              {loadingLogin ? 'Entrando...' : 'Entrar a Jugar'}
            </button>
            <button 
              type="button" 
              onClick={() => setShowPatientLogin(false)} 
              className="text-indigo-400 font-bold text-sm mt-2 cursor-pointer"
            >
              Volver
            </button>
          </form>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <button 
              onClick={() => setShowPatientLogin(true)}
              className="flex items-center justify-center gap-3 w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-emerald-600 transition shadow-lg shadow-emerald-200 cursor-pointer"
            >
              <KeyRound className="w-5 h-5" />
              Acceso Paciente
            </button>
            
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-indigo-100"></div>
              <span className="flex-shrink-0 mx-4 text-indigo-300 text-xs font-bold uppercase">Terapeuta</span>
              <div className="flex-grow border-t border-indigo-100"></div>
            </div>

            {therapistLoginError && (
              <div className="mb-2 text-left bg-red-50 p-3 rounded-lg border border-red-100">
                <p className="text-red-600 text-sm font-bold break-words">{therapistLoginError}</p>
              </div>
            )}

            <button 
              onClick={handleTherapistLogin}
              className="flex items-center justify-center gap-3 w-full bg-white text-indigo-600 font-bold py-3 px-4 rounded-xl hover:bg-slate-50 transition border border-indigo-100 cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              Ingresar con Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patientSession, setPatientSession] = useState<string | null>(localStorage.getItem("patientSession"));

  // Login UI states
  const [showPatientLogin, setShowPatientLogin] = useState(false);
  const [alias, setAlias] = useState('');
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [therapistLoginError, setTherapistLoginError] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        if (!user.isAnonymous) {
          // Bootstrap therapist role for demo
          try {
            const userRef = doc(db, 'users', user.uid);
            const snap = await getDoc(userRef);
            if (!snap.exists()) {
              await setDoc(userRef, {
                role: 'therapist', // Granting therapist role for demo purposes
                name: user.displayName || 'Dr. Demo',
                email: user.email || 'demo@psiconube.com',
                createdAt: Date.now(),
                updatedAt: Date.now()
              });
            }
          } catch (e) {
            console.error("Failed to bootstrap user:", e);
          }
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsAuthReady(true);
    });
    return unsub;
  }, []);

  const handleTherapistLogin = async () => {
    const provider = new GoogleAuthProvider();
    setTherapistLoginError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const additionalInfo = getAdditionalUserInfo(result);
      
      if (additionalInfo?.isNewUser) {
        await signOut(auth);
        setTherapistLoginError("Registro deshabilitado para esta demo. Solo cuentas existentes pueden acceder.");
      }
    } catch (e: any) {
      console.error("Login failed", e);
      setTherapistLoginError(e.message || "Error al iniciar sesión");
    }
  };

  const handlePatientLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoadingLogin(true);
    try {
      const aliasDoc = await getDoc(doc(db, 'aliases', alias.toLowerCase().replace(/\s+/g, '')));
      
      if (!aliasDoc.exists()) {
        setLoginError('El Alias sugerido es incorrecto o no existe.');
        setLoadingLogin(false);
        return;
      }
      
      const patientId = aliasDoc.data().patientId;
      const patientDoc = await getDoc(doc(db, 'patients', patientId));
      
      if (!patientDoc.exists() || patientDoc.data().accessCode !== pin.trim()) {
        setLoginError('Código Oculto (PIN) incorrecto para este alias.');
        setLoadingLogin(false);
        return;
      }
      
      localStorage.setItem('patientSession', patientId);
      setPatientSession(patientId);
      setShowPatientLogin(false);
      
    } catch (err: any) {
      console.error("Auth layer or network failed:", err);
      setLoginError('Ocurrió un error. Verifica tu conexión.');
    }
    setLoadingLogin(false);
  };

  const handleLogout = async () => {
    if (auth.currentUser) {
      await signOut(auth);
    }
    localStorage.removeItem('patientSession');
    setPatientSession(null);
    setAlias('');
    setPin('');
    setShowPatientLogin(false);
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center text-indigo-900 font-bold bg-[#F4F8FF]">
        Cargando Nuwi Play...
      </div>
    );
  }

  const hasActiveSession = Boolean(isAuthenticated || patientSession);

  return (
    <AudioProvider>
      <div className="mesh-bg"></div>
      <Router>
        <Routes>
          {/* Default Landing Page as initial screen */}
          <Route 
            path="/" 
            element={<LandingWrapper hasActiveSession={hasActiveSession} />} 
          />

          {/* Application Portal / Login Screen */}
          <Route 
            path="/app" 
            element={
              !hasActiveSession ? (
                <LoginCard
                  showPatientLogin={showPatientLogin}
                  setShowPatientLogin={setShowPatientLogin}
                  alias={alias}
                  setAlias={setAlias}
                  pin={pin}
                  setPin={setPin}
                  loginError={loginError}
                  therapistLoginError={therapistLoginError}
                  loadingLogin={loadingLogin}
                  handlePatientLoginSubmit={handlePatientLoginSubmit}
                  handleTherapistLogin={handleTherapistLogin}
                />
              ) : (
                <Home onSignOut={handleLogout} />
              )
            } 
          />

          {/* Alias /login redirects to /app */}
          <Route path="/login" element={<Navigate to="/app" replace />} />

          {/* Therapist Guardian Dashboard */}
          <Route 
            path="/therapist" 
            element={
              isAuthenticated ? (
                <TherapistDashboard />
              ) : (
                <Navigate to="/app" replace />
              )
            } 
          />

          {/* Patient Biome Portal and Activities */}
          <Route 
            path="/play" 
            element={
              hasActiveSession ? (
                <PatientPortal />
              ) : (
                <Navigate to="/app" replace />
              )
            } 
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
}
