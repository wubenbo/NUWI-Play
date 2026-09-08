import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundFx } from '../lib/soundFx';
import { ttsService } from '../services/ttsService';

export type CompanionKey = 'juku' | 'quirqui' | 'pari' | 'lama' | 'wayra';

export interface CompanionInfo {
  name: string;
  role: string;
  avatar: string;
  image?: string;
  color: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
}

export const COMPANIONS: Record<CompanionKey, CompanionInfo> = {
  juku: {
    name: 'Juku',
    role: 'El Operador (Oso Jukumari)',
    avatar: '🐻‍❄️',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczO4x2PHxZ4IjmnoF1mbyr5ygGA_rYCpRql8WoaZtpg7xo6Qz9PH2ezquDIY_kgGd9nSWIySd2goXkzR1as7v0mDsa7gZziouomy_ZBaVQifzvE5-oLFgQ0AtIXxfJhn4pkH6MEtQ5Qo8GPSHnOjmF2y=w512-h512-s-no-gm-rw',
    color: 'from-indigo-500 to-sky-500',
    badgeBg: 'bg-indigo-50 border-indigo-200',
    textColor: 'text-indigo-900',
    borderColor: 'border-indigo-400'
  },
  quirqui: {
    name: 'Quirqui',
    role: 'El Escudo (Quirquincho)',
    avatar: '🦔',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPw1OBfDBsDpgZv6R_Vjz2065a0i4wpt_DA1-IKbO9Vx-DhJebl2yZBq5Mn3AnJpRnO58FMCJFcxm4FTCMbpU-SG2PLJC0N_PKbsHvanXpXv7UeISfX_tIULGEZBmHsy_imTItfR0G5xEqQapY269Wz=w512-h512-s-no-gm-rw',
    color: 'from-sky-400 to-teal-500',
    badgeBg: 'bg-sky-50 border-sky-200',
    textColor: 'text-sky-900',
    borderColor: 'border-sky-400'
  },
  pari: {
    name: 'Pari',
    role: 'Modo Turbo (Paraba)',
    avatar: '🦜',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczN2_wWYyu-TB-4YDPSdaindNYvUXC8HHlgMZper7i45zaopv1ryzw6AaDFE1j_b7LjHv1RNJ4rF3KRClQCx3_6qWgk2pxuXEKjVsK8QOlpd1Uo8psKLmN8v_QbERp2l56fUHY02fl0HahAhyOFUrjjN=w512-h512-s-no-gm-rw',
    color: 'from-pink-500 to-purple-500',
    badgeBg: 'bg-pink-50 border-pink-200',
    textColor: 'text-pink-900',
    borderColor: 'border-pink-400'
  },
  lama: {
    name: 'Lama',
    role: 'La Capitana (Llama Asertiva)',
    avatar: '🦙',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOkPAyNhVdGmMcR-9PZDnHC7G_pSWfc-NWICuSTk1JPhiaJZAcSysiO38w-Jo6wt_7EGuqcCr6DV0garw84DkjBnl9ZamHHwd0SJZxCHHkGG12UxjZnFZKJYgMLE5MXLkQoewHF-VRwJlPPnpLrQUWy=w512-h512-s-no-gm-rw',
    color: 'from-amber-400 to-orange-500',
    badgeBg: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-900',
    borderColor: 'border-amber-400'
  },
  wayra: {
    name: 'Wayra',
    role: 'El Observador (Cóndor Andino)',
    avatar: '🦅',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNiwkRu6F0p0wPBLzX_zIjW-EtYxCvI5uGmCG35B-u4902OJFY8nYDwzHvOUwBvAEHHQ0iHZgl2rNY_LWhfrCdgEVhkqzBoQkpNphA23viu7xVX4pux89RhR4pzYaJEF4ERcckf0gLiVylPLMXgOXpy=w512-h512-s-no-gm-rw',
    color: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-cyan-50 border-cyan-200',
    textColor: 'text-cyan-900',
    borderColor: 'border-cyan-400'
  }
};

interface CompanionGuideProps {
  companion: CompanionKey;
  message: string;
  actionHint?: string;
  reaction?: 'neutral' | 'happy' | 'thinking' | 'cheering';
}

const CompanionGuide = React.memo(function CompanionGuide({
  companion,
  message,
  actionHint,
  reaction = 'neutral'
}: CompanionGuideProps) {
  const [muted, setMuted] = React.useState(!soundFx.enabled);
  const data = COMPANIONS[companion] || COMPANIONS.juku;

  useEffect(() => {
    // Only auto-play if audio is enabled globally
    if (soundFx.enabled) {
      ttsService.speak(message, companion);
    }

    return () => {
      ttsService.stop();
    }
  }, [message, companion]);

  const toggleSound = () => {
    soundFx.enabled = !soundFx.enabled;
    setMuted(!soundFx.enabled);
    if (soundFx.enabled) {
      soundFx.playPop(700);
    }
  };

  const reactionAnim = {
    neutral: { scale: [1, 1.03, 1], transition: { repeat: Infinity, duration: 3 } },
    happy: { y: [0, -6, 0], transition: { repeat: Infinity, duration: 1.2 } },
    thinking: { rotate: [-2, 2, -2], transition: { repeat: Infinity, duration: 2 } },
    cheering: { scale: [1, 1.15, 1], rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 0.8 } }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-4 px-2">
      <div className={`glass-card p-3 sm:p-4 rounded-3xl border flex items-center justify-between gap-3 shadow-md bg-white/70 backdrop-blur-md ${data.badgeBg}`}>
        <div className="flex items-center gap-3 min-w-0">
          <motion.div
            animate={reactionAnim[reaction]}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center text-2xl sm:text-3xl shadow-md border-2 border-white flex-shrink-0 relative overflow-hidden`}
          >
            {data.image ? (
              <img src={data.image} alt={data.name} loading="lazy" decoding="async" className="w-8 h-8 sm:w-10 sm:h-10 object-contain z-10" />
            ) : (
              <span className="z-10">{data.avatar}</span>
            )}
            <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full px-1 shadow z-20">
              ✨
            </span>
          </motion.div>

          <div className="text-left min-w-0">
            <div className="flex items-center gap-2">
              <span className={`font-black text-xs sm:text-sm ${data.textColor}`}>
                {data.name}
              </span>
              <span className="text-[10px] font-bold text-slate-500 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200 truncate">
                {data.role.split('(')[0]}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug mt-0.5 line-clamp-2">
              "{message}"
            </p>
            {actionHint && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#823CEB] mt-0.5">
                <Sparkles className="w-3 h-3 animate-spin" /> {actionHint}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={toggleSound}
          title={muted ? 'Activar sonido' : 'Silenciar sonido'}
          className="p-2 sm:p-2.5 rounded-xl bg-white/80 hover:bg-white text-slate-600 hover:text-[#823CEB] border border-slate-200 shadow-sm transition-all flex-shrink-0"
        >
          {muted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
        </button>
      </div>
    </div>
  );
});
export default CompanionGuide;
